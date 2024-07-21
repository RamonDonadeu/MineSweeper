<template>
  <div>
    <div>
      <div>Title</div>
      <div class="flex justify-between">
        <div>
          {{ minesRemaining }}
        </div>
        <div>
          <div v-on:click="openMap" v-if="clicks === 0" class="cursor-pointer">
            Open Map
          </div>
        </div>
      </div>
    </div>
    <div v-if="initialized" class="flex flex-col justify-center">
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
            v-on:click.right="
              () => {
                if (clickedCellsMap[rowIndex - 1][colIndex - 1]) return;
                if (cellsValueMap[rowIndex - 1][colIndex - 1] === -2) {
                  cellsValueMap[rowIndex - 1][colIndex - 1] =
                    calculateCellValue(rowIndex - 1, colIndex - 1);
                  minesRemaining++;
                } else {
                  cellsValueMap[rowIndex - 1][colIndex - 1] = -2;
                  minesRemaining--;
                }
              }
            "
            @contextmenu.prevent
            @click="
              () => {
                if (cellsValueMap[rowIndex - 1][colIndex - 1] === -2) return;
                clickCell(rowIndex - 1, colIndex - 1);
                clicks++;
              }
            "
          />
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
}>();
const clickedCellsMap = ref<boolean[][]>([]);
const cellsValueMap = ref<number[][]>([]);
const initialized = ref<boolean>(false);
const minesRemaining = ref<number>(props.minesPosition.length);
const EMPTY = 0;
const MINE = -1;
const clicks = ref<number>(0);

onBeforeMount(() => {
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
});

function clickCell(x: number, y: number) {
  const cellValue = cellsValueMap.value[x][y];
  clickedCellsMap.value[x][y] = true;
  if (cellValue === MINE) {
    showAllMines();
    console.log("You lost");
  }
  if (cellValue === EMPTY) {
    clickAdjacentEmptyCells(x, y);
    return;
  }
}

function showAllMines() {
  props.minesPosition.forEach(({ x, y }) => {
    cellsValueMap.value[x][y] = -1;
    clickedCellsMap.value[x][y] = true;
  });
}
function clickAdjacentEmptyCells(x: number, y: number) {
  const adjacentCellsClicked: { x: number; y: number }[] = [];
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
      if (
        cellsValueMap.value[i][j] === 0 &&
        clickedCellsMap.value[i][j] === false
      ) {
        adjacentCellsClicked.push({ x: i, y: j });
      }
      clickedCellsMap.value[i][j] = true;
    }
  }
  adjacentCellsClicked.forEach((cell) => {
    clickAdjacentEmptyCells(cell.x, cell.y);
  });
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
  clicks.value++;
}
</script>
