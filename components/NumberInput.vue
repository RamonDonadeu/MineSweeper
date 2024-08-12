<template>
  <input
    v-model="value"
    type="number"
  >
</template>
<script setup lang="ts">
const value = defineModel('value', { type: Number, required: true })
const emit = defineEmits(['update:model'])
watch(() => value.value, (newValue) => {
    emit('update:model', newValue)
})
</script>