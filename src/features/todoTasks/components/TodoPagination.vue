<script setup lang="ts">
import { Button } from '@/components/ui/button'

const props = defineProps<{
  page: number
  hasNextPage: boolean
  totalPages: number
}>()

const emit = defineEmits<{
  'update:page': [page: number]
}>()
</script>

<template>
  <div class="flex justify-center items-center gap-4 mt-6">
    <Button
      variant="outline"
      :disabled="props.page === 1"
      @click="emit('update:page', props.page - 1)"
    >
      ← Prev
    </Button>

    <span class="font-medium">
      Page {{ props.page }} of {{ props.totalPages }}
    </span>

    <Button
      variant="outline"
      :disabled="!props.hasNextPage"
      @click="emit('update:page', props.page + 1)"
    >
      Next →
    </Button>
  </div>
</template>