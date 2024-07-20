<template>
    <div class="h-8 w-8 mapCell" :isClicked="isClicked">
        <img v-if="value === -2" src="/assets/flag.svg" alt="" class="flag">
        <img v-if="isClicked && value === -1" src="/assets/mine.svg" alt="" class="mine">
        <p v-else-if="isClicked" :class="'value-' + value">
            {{ value }}
        </p>
    </div>
</template>
<script setup lang="ts">
defineProps<{
    isClicked: boolean,
    value?: number,
}>()
</script>
<style>
.mapCell {
    outline: 1px solid black;
    margin: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;
    background-color: lightgray;
}

.mapCell:hover {
    background-color: rgb(175, 172, 172);
    cursor: pointer;
}

.mapCell[isClicked='true'] {
    cursor: auto;
    background-color: rgb(237, 237, 237);
}

.mapCell>p {
    font-size: 1.2rem;
    text-align: center;
    font-weight: bolder;
}

.value-1 {
    color: green
}

.value-2 {
    color: blue
}

.value-3 {
    color: red
}

.value-4 {
    color: purple
}

.value-5 {
    color: yellow
}

.value-6 {
    color: orange
}

.value-7 {
    color: turquoise
}

.value-8 {
    color: brown
}

.value-0 {
    opacity: 0;
}

.mine {
    background-color: red
}
</style>