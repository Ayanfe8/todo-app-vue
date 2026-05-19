<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { TaskStatus } from '@/types'

// Using v-model pattern with defineModel (Vue 3.4+)
// replaces the React controlled input + callback prop pattern
const search = defineModel<string>('search', { required: true })
const statusFilter = defineModel<TaskStatus | 'all'>('statusFilter', { required: true })
</script>

<template>
  <div class="flex gap-3">
    <input
      type="text"
      placeholder="Search tasks..."
      v-model="search"
      class="border px-3 py-2 rounded-md w-full"
      aria-label="Search tasks"
    />

    <Select v-model="statusFilter">
      <SelectTrigger>
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="DONE">Done</SelectItem>
        <SelectItem value="TODO">TODO</SelectItem>
        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
        <SelectItem value="CANCELLED">Cancelled</SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>