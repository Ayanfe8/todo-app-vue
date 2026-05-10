import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login',    component: () => import('@/pages/LoginPage.vue') },
    { path: '/register', component: () => import('@/pages/RegisterPage.vue') },
    { path: '/',         component: () => import('@/pages/Home.vue') },
    { path: '/error-test', component: () => import('@/pages/ErrorTest.vue') },
    {
      path: '/todos',
      component: () => import('@/pages/Todos.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/todos/:id',
      component: () => import('@/pages/TodoDetails.vue'),
      meta: { requiresAuth: true }
    },
    { path: '/:pathMatch(.*)*', component: () => import('@/pages/NotFound.vue') }
  ]
})

// This replaces your ProtectedRoute component entirely
router.beforeEach(async (to) => {
  const auth = useAuthStore()

  // Wait for initial auth check on first load
  if (auth.loading) await auth.loadUser()

  if (to.meta.requiresAuth && !auth.user) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
})

export default router