import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Public routes — no layout
    { path: '/login',      component: () => import('@/pages/LoginPage.vue') },
    { path: '/register',   component: () => import('@/pages/RegisterPage.vue') },
    { path: '/error-test', component: () => import('@/pages/ErrorTest.vue') },

    // Routes wrapped with AppLayout
    {
      path: '/',
      component: () => import('@/components/AppLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('@/pages/HomePage.vue'),
        },
        {
          path: 'todos',
          component: () => import('@/pages/Todos.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'todos/:id',
          component: () => import('@/pages/TodoDetails.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },

    { path: '/:pathMatch(.*)*', component: () => import('@/pages/NotFound.vue') },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (auth.loading) await auth.loadUser()
  if (to.meta.requiresAuth && !auth.user) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
})

export default router