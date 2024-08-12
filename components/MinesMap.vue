<template>
  <div class="flex flex-col justify-center items-center h-full w-full relative">
    <div
      v-if="(gameFinished || gameLost)"
      class="z-10 absolute w-full h-full flex flex-col justify-center items-center text-4xl mt-14 "
    >
      <div
        v-if="!closedPopup"
        class="bg-white p-8 rounded-lg absolute flex-col justify-center items-center border-black border-2"
      >
        <div class="text-center text-6xl pb-8">
          <div
            v-if="!gameLost"
          >
            Victory!
          </div>
          <div
            v-if="gameLost"
          >
            Game Over
          </div>
        </div>
        <div class="w-full flex flex-col justify-center">
          <button
            class=" p-4"
            @click="() => {
              $emit('restart');
            }"
          >
            Restart
          </button>
          <button
            class=" p-4"
          >
            <router-link to="/">
              Back to Home
            </router-link>
          </button>
          <button 
            class=" p-4"
            @click="() => {
              closedPopup = true
            }"
          >
            See Map
          </button>
        </div>
      </div>
    </div>
    <div class="w-full text-3xl py-8">
      {{ `${difficulty} - ${rows}x${cols} - ${minesPosition.length} mines` }}
    </div>
    <div class="grow justify-center flex-col flex pb-16 overflow-auto">
      <div class="flex justify-between">
        <div>
          {{ minesRemaining }}
        </div>
        <div>
          <div
            v-if="nClickedCells === 0 && hasMapEmptyCells"
            class="cursor-pointer"
            @click="openMap"
          >
            Open Map
          </div>
        </div>
      </div>      
      
      <div
        v-if="initialized"
        class="flex flex-col justify-center overflow-auto"
      >
        <div
          v-for="rowIndex in rows"
          :key="'row-' + (rowIndex - 1)"
          class="flex flex-row"
        >
          <div
            v-for="colIndex in cols"
            :key="'col-' + (colIndex - 1)"
            class="flex flex-col"
          >
            <MapCell
              :is-clicked="clickedCellsMap[rowIndex - 1][colIndex - 1]"
              :value="cellsValueMap[rowIndex - 1][colIndex - 1]"
              @click.right="rightClick(rowIndex - 1, colIndex - 1)"
              @contextmenu.prevent
              @click="() => {
              
                clickCell(rowIndex - 1, colIndex - 1);
              }
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  rows: number;
  cols: number;
  minesPosition: { x: number; y: number }[];
  difficulty: string;
}>();

const clickedCellsMap = ref<boolean[][]>([]);
const cellsValueMap = ref<number[][]>([]);
const initialized = ref<boolean>(false);
const minesRemaining = ref<number>(props.minesPosition.length);
const EMPTY = 0;
const MINE = -1;
const nClickedCells = ref<number>(0);
const gameFinished = computed(() => isGameFinished())
const gameLost = ref<boolean>(false);
const closedPopup = ref<boolean>(false);
const hasMapEmptyCells = computed(() => {
  return cellsValueMap.value.some((row) => row.some((cell) => cell === 0));
});

defineEmits(['restart']);

onMounted(() => {
  initializeMap();
});

watch( () => props.minesPosition, () => {
  reset()
}, { deep: true });

function initializeMap() {  
  console.log(props.minesPosition)
  for (let x = 0; x < props.rows; x++) {
    const clickedRow = [];
    const valuesRow = [];
    for (let y = 0; y < props.cols; y++) {
      clickedRow.push(false);
      valuesRow.push(calculateCellValue(x, y));
    }
    clickedCellsMap.value.push(clickedRow);
    cellsValueMap.value.push(valuesRow);
  }
  initialized.value = true;
}

function clickCell(x: number, y: number) {
  if (cellsValueMap.value[x][y] === -2) return  
  if (cellsValueMap.value[x][y] === -3) {
    cellsValueMap.value[x][y] = calculateCellValue(x, y)
  }
  if (clickedCellsMap.value[x][y]) {
    if (aroundCellIsFlagged(x, y, cellsValueMap.value[x][y])) {
      clickAdjacentCells(x, y)
    }
    return
  }  
  if (clickedCellsMap.value[x][y]) return  
  const cellValue = cellsValueMap.value[x][y];
  clickedCellsMap.value[x][y] = true;  
  nClickedCells.value++;
  if (cellValue === MINE) {
    showAllMines();
    gameLost.value = true;
  }
  if (cellValue === EMPTY) {
    clickAdjacentCells(x, y);
    return;
  }
}

function showAllMines() {
  console.log(props.minesPosition)
  props.minesPosition.forEach(({ x, y }) => {
    cellsValueMap.value[x][y] = -1;
    clickedCellsMap.value[x][y] = true;
  });
}

function clickAdjacentCells(x: number, y: number) {
  for (
    let i = x - 1 < 0 ? 0 : x - 1;
    i <= (x + 1 >= props.rows ? props.rows - 1 : x + 1);
    i++
  ) {
    for (
      let j = y - 1 < 0 ? 0 : y - 1;
      j <= (y + 1 >= props.cols ? props.cols - 1 : y + 1);
      j++
    ) {
      if(cellsValueMap.value[i][j] !== -2 && !clickedCellsMap.value[i][j]) {
        clickCell(i,j)
      }
    }
  }
}
function calculateCellValue(x: number, y: number) {
  if (isMine(x, y)) return -1;
  return getAdjacentMines(x, y);

  function getAdjacentMines(x: number, y: number) {
    let adjacentMines = 0;

    for (
      let i = x - 1 < 0 ? 0 : x - 1;
      i <= (x + 1 >= props.rows ? props.rows - 1 : x + 1);
      i++
    ) {
      for (
        let j = y - 1 < 0 ? 0 : y - 1;
        j <= (y + 1 >= props.cols ? props.cols - 1 : y + 1);
        j++
      ) {
        if (isMine(i, j)) {
          adjacentMines++;
        }
      }
    }

    return adjacentMines;
  }

  function isMine(x: number, y: number) {
    return props.minesPosition.some((position) => {
      return position.x === x && position.y === y;
    });
  }
}

function openMap() {
  let y = generateRandomNumber(0, props.cols);
  let x = generateRandomNumber(0, props.rows);
  while (cellsValueMap.value[x][y] !== 0) {
    y = generateRandomNumber(0, props.cols);
    x = generateRandomNumber(0, props.rows);
  }
  clickedCellsMap.value[x][y];
  clickCell(x, y);
}
// const remainingTiles = () => {
//   let tilesClicked = props.rows*props.cols
//   clickedCellsMap.value.forEach((row) => {
//     row.forEach((cell) => {
//     if(cell) tilesClicked--
//   })
//   })
//   return tilesClicked
// }

function isGameFinished() {
  return nClickedCells.value + props.minesPosition.length === props.rows * props.cols
}

function rightClick(x: number, y: number) {
  if (clickedCellsMap.value[x][y]) return;
  if (cellsValueMap.value[x][y] === -2) {
    cellsValueMap.value[x][y] = -3;    
    minesRemaining.value++;
  }
  else if (cellsValueMap.value[x][y] === -3) {
    cellsValueMap.value[x][y] =
      calculateCellValue(x, y);
  } else {
    cellsValueMap.value[x][y] = -2;
    minesRemaining.value--;
  }
}

function aroundCellIsFlagged(x: number, y: number, minesAround: number) {
  let flagged = 0;
  for (
    let i = x - 1 < 0 ? 0 : x - 1;
    i <= (x + 1 >= props.rows ? props.rows - 1 : x + 1);
    i++
  ) {
    for (
      let j = y - 1 < 0 ? 0 : y - 1;
      j <= (y + 1 >= props.cols ? props.cols - 1 : y + 1);
      j++
    ) {
      if (cellsValueMap.value[i][j] === -2) {
        flagged++;
      }
    }
  }
  return flagged === minesAround;
}

function reset() {
  clickedCellsMap.value = [];
  cellsValueMap.value = [];
  initialized.value = false;
  minesRemaining.value = props.minesPosition.length;
  nClickedCells.value = 0;
  gameLost.value = false;
  initializeMap();
}
</script>
