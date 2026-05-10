<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'

const auth = useAuthStore()
</script>

<template>
  <header class="border-b bg-white">
    <div class="max-w-6xl mx-auto flex justify-between items-center p-4">
      <div class="flex items-center gap-6">
        <RouterLink to="/" class="font-semibold text-lg">Todo App</RouterLink>
        <RouterLink to="/todos" class="text-sm hover:underline">Todos</RouterLink>
        <RouterLink to="/error-test" class="text-sm hover:underline">Error Test</RouterLink>
      </div>
      <div class="flex items-center gap-4">
        <span v-if="auth.user" class="text-sm text-muted-foreground">
          {{ auth.user.email }}
        </span>
        <Button v-if="auth.user" variant="outline" size="sm" @click="auth.logout">
          Logout
        </Button>
      </div>
    </div>
  </header>
</template>