<template>
    <div>easy
        <MinesMap :rows :cols :mines-position />
    </div>
</template>
<script setup lang="ts">

const rows = 9
const cols = 9
const mines = 10

const minesPosition = generateMinesPosition(rows, cols, mines)
console.log(minesPosition)
</script>