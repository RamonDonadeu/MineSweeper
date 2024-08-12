<template>
  <div
    v-if="open"
    class="absolute  w-full h-full flex justify-center items-center"
  >
    <div class="absolute w-full h-full z-40" />
    <div class="z-50 bg-white p-4 rounded-md flex flex-col settingsPopup">
      <span class="text-2xl text-center mb-8">Settings</span>
      <div class="flex flex-row justify-between gap-8">
        <span>Number of Rows</span>
        <NumberInput
          :value="rows"
          @update:model="(value) => emit('update:rows', value)"
        />
      </div>
      <div class="flex flex-row justify-between gap-8">
        <span>Number of Columns</span> 
        <NumberInput
          :value="columns" 
          @update:model="(value) => emit('update:columns', value)"
        />
      </div>
      <div class="flex flex-row justify-between gap-8">
        <span>Number of Mines</span> 
        <NumberInput
          :value="mines" 
          @update:model="(value) => emit('update:mines', value)"
        />
      </div>
      <button @click="()=> open=false">
        Start
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">

const open = defineModel('open', { type: Boolean, required: true });
const rows = ref <number>(8);
const columns = ref<number>(8);
const mines = ref<number>(10);

const emit = defineEmits(['update:rows', 'update:columns', 'update:mines'])

</script>
<style>
.settingsPopup{
  border: 1px solid black;   
}</style>