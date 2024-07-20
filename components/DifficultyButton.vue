<template>
    <NuxtLink :to="to">
        <button>
            {{ label }}
        </button>
    </NuxtLink>
</template>
<script setup lang="ts">
defineProps<{
    label: string,
    to: string
}>()
</script>