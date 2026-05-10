<script setup lang="ts">
defineProps<{ message: string; retry?: () => void }>()
</script>

<template>
  <div role="alert" class="p-6 text-center space-y-4">
    <p class="text-red-600">{{ message }}</p>
    <button v-if="retry" @click="retry" class="underline">Retry</button>
  </div>
</template>