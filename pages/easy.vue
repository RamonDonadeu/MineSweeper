<template>
  <div>
    easy
    <MinesMap :rows :cols :mines-position />
  </div>
</template>
<script setup lang="ts">
const rows = 8;
const cols = 8;
const mines = 10;

const minesPosition = generateMinesPosition(rows, cols, mines);
</script>
