import { ref } from 'vue'
import { useDebounce } from '@/composables/useDebounce'
import type { TaskStatus } from '@/types'

export function useTodoFilters() {
  const page = ref(1)
  const search = ref('')
  const statusFilter = ref<TaskStatus | 'all'>('all')
  const debouncedSearch = useDebounce(search, 500)

  return { page, search, statusFilter, debouncedSearch }
}