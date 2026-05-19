<script setup lang="ts">
import AppNavbar from './AppNavbar.vue'
</script>

<template>
  <div class="min-h-screen bg-muted/40">
    <AppNavbar />
    <main class="max-w-6xl mx-auto p-6">
      <!-- slot replaces React children prop -->
      <slot />
    </main>
  </div>
</template>