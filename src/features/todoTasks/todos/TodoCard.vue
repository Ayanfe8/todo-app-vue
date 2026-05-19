<script setup lang="ts">
import { Pencil, Trash2 } from 'lucide-vue-next'
import { useDeleteTodo } from '@/features/todoTasks/composables/useTodoQueries'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import type { Todo } from '@/types'

defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  edit: [todo: Todo]
  navigate: [id: string]
}>()

const deleteMutation = useDeleteTodo()
</script>

<template>
  <li
    class="border rounded p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
    role="button"
    tabindex="0"
    @click="emit('navigate', todo.id)"
    @keydown.enter.prevent="emit('navigate', todo.id)"
    @keydown.space.prevent="emit('navigate', todo.id)"
  >
    <div>
      <p class="font-medium">{{ todo.name }}</p>
      <p class="text-sm text-gray-500">
        Status:
        <span
          :class="todo.status === 'DONE' ? 'text-green-600' : 'text-yellow-600'"
        >
          {{ todo.status }}
        </span>
      </p>
    </div>

    <div class="flex gap-2">
      <!-- Edit button -->
      <button
        class="text-blue-400 hover:text-blue-300 transition-colors"
        title="Edit Todo"
        @click.stop="emit('edit', todo)"
      >
        <Pencil :size="20" />
      </button>

      <!-- Delete button with confirmation dialog -->
      <AlertDialog>
        <AlertDialogTrigger as-child>
          <button
            class="text-red-400 hover:text-red-300 transition-colors"
            title="Delete Todo"
            @click.stop
          >
            <Trash2 :size="20" />
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              class="bg-red-600 hover:bg-red-700"
              @click.stop="deleteMutation.mutate(todo.id)"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </li>
</template>