<template>
  <div class="flex flex-col h-full items-center">
    <header class="flex flex-row justify-between w-full text-2xl px-8 py-2 shadow-md z-100">
      <div>G</div>
      <div>language</div>
    </header>
    <div class="grow max-w-5xl h-full w-full mx-auto">
      <slot class="grow justify-center" />
    </div>
    <AppFooter />
  </div>
</template>
<script setup lang="ts"></script>
