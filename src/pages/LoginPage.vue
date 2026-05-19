<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
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

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const error = ref<string | null>(null)

const isValidRedirect = (value: unknown): value is string => {
  if (typeof value !== 'string') return false
  if (!value.startsWith('/') || value.startsWith('//')) return false
  try {
    const url = new URL(value, 'http://example.com')
    return url.origin === 'http://example.com'
  } catch {
    return false
  }
}

const from = isValidRedirect(route.query.redirect) ? route.query.redirect : '/' 

const { handleSubmit, defineField, errors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(loginSchema),
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  error.value = null
  try {
    await auth.login(values)
    router.push(from)
  } catch (err) {
    error.value = getErrorMessage(err)
  }
})
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle class="text-center font-bold text-xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <ErrorState
          v-if="error"
          :message="error"
          :retry="() => (error = null)"
        />
        <form @submit="onSubmit" class="flex flex-col gap-4">
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
            <div class="text-right mt-1">
              <RouterLink
                to="/forgot-password"
                class="text-sm text-muted-foreground hover:underline"
              >
                Forgot password?
              </RouterLink>
            </div>
          </div>

          <Button type="submit" class="mt-2" :disabled="isSubmitting">
            {{ isSubmitting ? 'Logging in...' : 'Login' }}
          </Button>

          <div class="relative my-4">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <p class="text-center text-sm text-muted-foreground">
            Don't have an account?
            <RouterLink
              to="/register"
              class="font-medium text-primary hover:underline"
            >
              Sign up
            </RouterLink>
          </p>
        </form>
      </CardContent>
    </Card>
  </div>
</template>