<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { deleteTodo } from '@/api/tasks'
import { useTodo, useUpdateTodo } from '@/features/todoTasks/composables/useTodoQueries'
import ErrorState from '@/components/ErrorState.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import TodoForm from '@/features/todoTasks/todos/TodoForm.vue'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Trash2, Edit } from 'lucide-vue-next'
import type { TodoFormData } from '@/features/todoTasks/todos/todo-schema'

const route = useRoute()
const router = useRouter()
const queryClient = useQueryClient()

const id = computed(() => {
  const routeId = route.params.id
  return typeof routeId === 'string' && routeId.trim() ? routeId : ''
})

if (!id.value) {
  router.replace('/todos')
}

const isEditing = ref(false)
const showConfirm = ref(false)

const { data: todo, isLoading, isError, error, refetch } = useTodo(id)
const updateMutation = useUpdateTodo()

const errorMessage = computed(() => {
  const err = error.value
  if (err instanceof Error) return err.message
  if (typeof err === 'string') return err
  return String(err ?? 'An unexpected error occurred.')
})

// Local mutation — needs to navigate after success unlike the shared composable
const deleteMutation = useMutation({
  mutationFn: () => deleteTodo(id.value),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
    router.push('/todos')
  },
  onError: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
    console.error('Failed to delete todo', error.value)
  },
})

const handleSubmit = async (formData: TodoFormData, editId?: string) => {
  if (editId) {
    try {
      await updateMutation.mutateAsync({ id: editId, data: formData })
      queryClient.invalidateQueries({ queryKey: ['todo', editId] })
      isEditing.value = false
    } catch (err) {
      console.error('Failed to update todo', err)
    }
  }
}
</script>

<template>
  <p v-if="isLoading" class="p-6 text-sm">Loading...</p>

  <ErrorState v-else-if="isError" :message="errorMessage" :retry="refetch" />

  <p v-else-if="!todo" class="p-6 text-gray-500">Todo not found.</p>

  <main v-else class="p-6 space-y-6">
    <Button variant="outline" size="sm" @click="router.back()">
      <ArrowLeft :size="16" /> Back
    </Button>

    <TodoForm v-if="isEditing" :initial-data="todo" :on-submit-todo="handleSubmit" />

    <template v-else>
      <div class="border rounded p-4 space-y-4">
        <h1 class="text-2xl font-semibold">{{ todo.name }}</h1>

        <p>
          Status:
          <span
            :class="todo.completed ? 'text-green-600 font-medium' : 'text-orange-600 font-medium'"
          >
            {{ todo.completed ? 'Completed' : 'Pending' }}
          </span>
        </p>

        <p v-if="todo.description">Description: {{ todo.description }}</p>

        <p v-if="todo.createdAt" class="text-sm text-gray-500">
          Created: {{ new Date(todo.createdAt).toLocaleString() }}
        </p>
      </div>

      <div class="flex gap-3">
        <Button size="sm" @click="isEditing = true"> <Edit :size="16" /> Edit </Button>
        <Button variant="destructive" size="sm" @click="showConfirm = true">
          <Trash2 :size="16" /> Delete
        </Button>
      </div>
    </template>

    <ConfirmDialog
      :open="showConfirm"
      title="Delete Todo"
      description="Are you sure you want to delete this todo? This cannot be undone."
      @cancel="showConfirm = false"
      @confirm="deleteMutation.mutate()"
    />
  </main>
</template>
