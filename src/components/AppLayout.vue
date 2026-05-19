<script setup lang="ts">
import AppNavbar from './AppNavbar.vue'
</script>

<template>
  <div class="min-h-screen bg-muted/40">
    <AppNavbar />
    <main class="max-w-6xl mx-auto p-6">
      <!-- Child pages render here instead of slot -->
      <RouterView />
    </main>
  </div>
</template>