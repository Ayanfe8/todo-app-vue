<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ErrorState from '@/components/ErrorState.vue'
import { getErrorMessage } from '@/lib/errors'

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Confirm Password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

const auth = useAuthStore()
const router = useRouter()
const error = ref<string | null>(null)

const { handleSubmit, defineField, errors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(registerSchema),
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')

const onSubmit = handleSubmit(async (values) => {
  error.value = null
  try {
    await auth.register(values)
    router.push('/login')
  } catch (err) {
    error.value = getErrorMessage(err)
  }
})
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <ErrorState
          v-if="error"
          :message="error"
          :retry="() => (error = null)"
        />
        <form @submit="onSubmit" class="flex flex-col gap-4">
          <div>
            <Label for="name">Name</Label>
            <Input
              id="name"
              type="text"
              v-model="name"
              v-bind="nameAttrs"
            />
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">
              {{ errors.name }}
            </p>
          </div>

          <div>
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              v-model="email"
              v-bind="emailAttrs"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">
              {{ errors.email }}
            </p>
          </div>

          <div>
            <Label for="password">Password</Label>
            <Input
              id="password"
              type="password"
              v-model="password"
              v-bind="passwordAttrs"
            />
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">
              {{ errors.password }}
            </p>
          </div>

          <div>
            <Label for="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              v-model="confirmPassword"
              v-bind="confirmPasswordAttrs"
            />
            <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">
              {{ errors.confirmPassword }}
            </p>
          </div>

          <Button type="submit" class="mt-2" :disabled="isSubmitting">
            {{ isSubmitting ? 'Registering...' : 'Register' }}
          </Button>

          <p class="text-center text-sm text-muted-foreground mt-4">
            Already have an account?
            <RouterLink
              to="/login"
              class="font-medium text-primary hover:underline"
            >
              Login
            </RouterLink>
          </p>
        </form>
      </CardContent>
    </Card>
  </div>
</template>