import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { getTodos, getTodo, createTodo, updateTodo, deleteTodo, type UpdateTodoData } from '@/api/tasks'
import type { TaskStatus } from '@/types'
import {  type Ref, computed } from 'vue'

export const useTodos = (
  page: Ref<number>,
  limit: number,
  search: Ref<string>,
  status: Ref<TaskStatus | 'all'>
) => useQuery({
  // Reactive refs in queryKey auto-refetch on change (replaces dependency arrays)
  queryKey: ['todos', page, search, status],
  queryFn: () => getTodos(page.value, limit, search.value, status.value),
  placeholderData: (prev) => prev,
})

export const useTodo = (id: Ref<string>) => useQuery({
  queryKey: ['todo', id],
  queryFn: () => getTodo(id.value),
  enabled: computed(() => !!id.value), // replaces enabled: !!id
})

export const useCreateTodo = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['todos'] })
  })
}

export const useUpdateTodo = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTodoData }) => updateTodo(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['todos'] })
  })
}

export const useDeleteTodo = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['todos'] })
  })
}