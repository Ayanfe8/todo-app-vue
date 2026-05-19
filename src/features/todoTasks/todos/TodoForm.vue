<script setup lang="ts">
import { watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Todo } from '@/types'

// Define schema first before it is referenced
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
})

// Derive type from schema locally — no import needed
type TodoFormData = z.infer<typeof formSchema>

const props = withDefaults(defineProps<{
  initialData?: Todo | null
  onSubmitTodo: (formData: TodoFormData, id?: string) => Promise<void>
}>(), {
  initialData: null,
})

const { handleSubmit, defineField, errors, isSubmitting, resetForm } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    name: props.initialData?.name ?? '',
    description: props.initialData?.description ?? '',
  },
})

// Sync form when initialData changes (edit mode)
watch(
  () => props.initialData,
  (newData) => {
    resetForm({
      values: {
        name: newData?.name ?? '',
        description: newData?.description ?? '',
      },
    })
  }
)

const [name, nameAttrs] = defineField('name')
const [description, descriptionAttrs] = defineField('description')

const onSubmit = handleSubmit(async (values) => {
  await props.onSubmitTodo(values, props.initialData?.id)
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <div>
      <Label for="name">Name</Label>
      <Input id="name" v-model="name" v-bind="nameAttrs" />
      <p v-if="errors.name" class="text-red-500 text-sm mt-1">
        {{ errors.name }}
      </p>
    </div>

    <div>
      <Label for="description">Description</Label>
      <Input id="description" v-model="description" v-bind="descriptionAttrs" />
    </div>

    <Button type="submit" :disabled="isSubmitting">
      {{ props.initialData ? 'Update Todo' : 'Add Todo' }}
    </Button>
  </form>
</template>
