<template>
    <MinesMap
    class="grow"
      :rows
      :cols
      :mines-position
      @restart="()=>{minesPosition = generateMinesPosition(rows, cols, mines)}"
      difficulty="Medium"
    />
</template>
<script setup lang="ts">
const rows = 16;
const cols = 16;
const mines = 40;

const minesPosition = ref<{x: number, y: number}[]>(generateMinesPosition(rows, cols, mines))
</script>
