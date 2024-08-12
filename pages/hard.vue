<template>    
    <MinesMap
    class="grow"
      :rows
      :cols
      :mines-position
      @restart="()=>{minesPosition = generateMinesPosition(rows, cols, mines)}"
      difficulty="Hard"
    />
</template>
<script setup lang="ts">
const rows = 16;
const cols = 30;
const mines = 99;

const minesPosition = ref<{x: number, y: number}[]>(generateMinesPosition(rows, cols, mines))
</script>
