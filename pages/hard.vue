<template>
  <div>
    easy
    <MinesMap :rows :cols :mines-position />
  </div>
</template>
<script setup lang="ts">
const rows = 16;
const cols = 30;
const mines = 99;

const minesPosition = generateMinesPosition(rows, cols, mines);
</script>
