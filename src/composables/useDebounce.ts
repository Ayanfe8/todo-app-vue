import { ref, watch, type Ref } from 'vue'

export function useDebounce<T>(value: Ref<T>, delay = 500): Ref<T> {
  const debounced = ref<T>(value.value) as Ref<T>

  watch(value, (newVal) => {
    const timer = setTimeout(() => {
      debounced.value = newVal
    }, delay)
    return () => clearTimeout(timer)
  })

  return debounced
}