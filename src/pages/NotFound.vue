<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-vue-next'

const router = useRouter()
</script>

<template>
  <main class="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
    <div class="max-w-md space-y-6">
      <div class="flex justify-center">
        <AlertTriangle
          :size="48"
          class="text-red-500"
          aria-hidden="true"
          focusable="false"
        />
      </div>
      <h1 class="text-3xl font-bold">404 - Page Not Found</h1>
      <p class="text-gray-600">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Button size="lg" @click="router.push('/')">Go Back Home</Button>
    </div>
  </main>
</template>