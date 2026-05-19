<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-vue-next'

const isDev = import.meta.env.DEV
</script>

<template>
  <main class="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
    <div class="max-w-2xl space-y-6">
      <div class="flex justify-center">
        <CheckCircle2
          :size="48"
          class="text-green-600"
          aria-hidden="true"
          focusable="false"
        />
      </div>
      <h1 class="text-4xl font-bold tracking-tight">Welcome to Todo Manager</h1>
      <p class="text-gray-600 text-lg">
        A modern Vue + Vue Query powered todo application.
        Manage your tasks efficiently and stay productive.
      </p>
      <div class="flex justify-center gap-4">
        <RouterLink to="/todos">
          <Button size="lg">View Todos</Button>
        </RouterLink>
        <RouterLink v-if="isDev" to="/error-test">
          <Button variant="outline" size="lg">Test Error Page</Button>
        </RouterLink>
      </div>
    </div>
  </main>
</template>