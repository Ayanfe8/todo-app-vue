<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  useTodos,
  useCreateTodo,
  useUpdateTodo,
} from '@/features/todoTasks/composables/useTodoQueries'
import { useTodoFilters } from '@/features/todoTasks/composables/useTodoFilters'
import TodoForm from '@/features/todoTasks/todos/TodoForm.vue'
import TodoList from '@/features/todoTasks/todos/TodoList.vue'
import TodoFilter from '@/features/todoTasks/components/TodoFilter.vue'
import TodoPagination from '@/features/todoTasks/components/TodoPagination.vue'
import ErrorState from '@/components/ErrorState.vue'
import type { Todo } from '@/types'
import type { TodoFormData } from '@/features/todoTasks/todos/todo-schema'

const router = useRouter()
const selectedTodo = ref<Todo | null>(null)

const { page, search, statusFilter, debouncedSearch } = useTodoFilters()

const { data, isLoading, isError, error, refetch } = useTodos(
  page,
  10,
  debouncedSearch,
  statusFilter,
)

const todos = computed(() => data.value?.data ?? [])

const createMutation = useCreateTodo()
const updateMutation = useUpdateTodo()

// Handles the main create form at the top of the page
const handleSubmit = async (formData: TodoFormData, id?: string) => {
  if (id) {
    await updateMutation.mutateAsync({ id, data: formData })
    return
  }
  await createMutation.mutateAsync({ ...formData, status: 'TODO' })
}

// Handles the edit modal form
const handleEditSubmit = async (formData: TodoFormData, id?: string) => {
  if (!id) {
    console.error('Edit requires a valid todo id')
    selectedTodo.value = null
    return
  }
  await updateMutation.mutateAsync({ id, data: formData })
  selectedTodo.value = null
}

const closeModal = () => {
  selectedTodo.value = null
}

const handleModalKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeModal()
  }
}
</script>

<template>
  <section class="p-6 space-y-6">
    <h1 class="text-2xl font-bold">Tasks</h1>

    <p v-if="isLoading" class="p-6">Loading...</p>

    <ErrorState
      v-else-if="isError"
      :message="(error as Error)?.message ?? 'Failed to load todos'"
      :retry="refetch"
    />

    <template v-else>
      <TodoForm :on-submit-todo="handleSubmit" />

      <TodoFilter
        v-model:search="search"
        v-model:status-filter="statusFilter"
        @update:search="page = 1"
        @update:status-filter="page = 1"
      />

      <TodoList
        :todos="todos"
        @edit="(todo) => (selectedTodo = todo)"
        @navigate="(id) => router.push(`/todos/${id}`)"
      />

      <TodoPagination
        :page="page"
        :has-next-page="data?.meta?.hasNextPage ?? false"
        :total-pages="data?.meta?.totalPages ?? 1"
        @update:page="page = $event"
      />
    </template>

    <div
      v-if="selectedTodo"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      role="presentation"
      @click.self="closeModal"
    >
      <div
        class="bg-white p-6 rounded w-full max-w-md space-y-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-todo-title"
        @keydown="handleModalKeydown"
      >
        <h2 id="edit-todo-title" class="text-lg font-semibold">Edit Task</h2>
        <TodoForm
          :initial-data="selectedTodo"
          :on-submit-todo="handleEditSubmit"
        />
        <button @click="closeModal" class="text-sm text-gray-500">Cancel</button>
      </div>
    </div>
  </section>
</template>
