<script setup lang="ts">
import TodoCard from './TodoCard.vue'
import type { Todo } from '@/types'

defineProps<{
  todos: Todo[]
}>()

const emit = defineEmits<{
  edit: [todo: Todo]
  navigate: [id: string]
}>()
</script>

<template>
  <ul class="space-y-3">
    <TodoCard
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @edit="emit('edit', $event)"
      @navigate="emit('navigate', $event)"
    />
  </ul>
</template>