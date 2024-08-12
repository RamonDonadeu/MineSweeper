<template>
    <MinesMap
      class="grow"
      :rows
      :cols
      :mines-position="minesPosition"
      @restart="() => {
        minesPosition = generateMinesPosition(rows, cols, mines)
      console.log(minesPosition)
      }"
      difficulty="Easy"
    />
</template>
<script setup lang="ts">
const rows = 8;
const cols = 8;
const mines = 10;

const minesPosition = ref<{x: number, y: number}[]>(generateMinesPosition(rows, cols, mines))
</script>
