<template>
    <div>
        <h1 class="text-7xl pb-10">MineSweeper</h1>
        <div class="difficultySelector">
            <h2 class="difficultySelector__title text-3xl">Difficulty Selector</h2>
            <div class="difficultySelector__buttons flex flex-col">
                <DifficultyButton label="Easy" to="easy" />
                <DifficultyButton label="Medium" to="medium" />
                <DifficultyButton label="Hard" to="hard" />
                <DifficultyButton label="Custom" to="custom" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

</script>
<style></style>