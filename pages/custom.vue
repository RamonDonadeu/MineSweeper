<template>
    <div class="grow max-w-5xl h-full w-full mx-auto relative">
        <CustomOptionsPopup
            v-model:open="isCustomOptionsPopupOpen"
            @update:rows="(value: number) => {
                rows = value
            minesPosition = generateMinesPosition(rows, cols, mines)
            }"
            @update:columns="(value: number) => {cols = value
                minesPosition = generateMinesPosition(rows, cols, mines)}"
            @update:mines="(value: number) => {mines = value
                minesPosition = generateMinesPosition(rows, cols, mines)}"
        ></CustomOptionsPopup>
        <MinesMap
            class="grow"
            :rows
            :cols
            :mines-position="minesPosition"
            @restart="() => {
                isCustomOptionsPopupOpen = true
                minesPosition = generateMinesPosition(rows, cols, mines)
            }"
            difficulty="Custom"
        />
    </div>
</template>
<script setup lang="ts">

const isCustomOptionsPopupOpen = ref<boolean>(true);
const rows = ref<number>(8);
const cols = ref<number>(8);
const mines = ref<number>(10);

const minesPosition = ref<{ x: number, y: number }[]>(generateMinesPosition(rows, cols, mines))

onMounted(() => {    
    minesPosition.value = generateMinesPosition(rows.value, cols.value, mines.value)
setInterval(() => {
    console.log(minesPosition.value)
    console.log(isCustomOptionsPopupOpen.value)
}, 1000)
}),


watch(()=> isCustomOptionsPopupOpen.value, (value) => {
    console.log('change')
    console.log(value)
})
</script>
