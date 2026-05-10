import { defineStore } from 'pinia'
import { ref } from 'vue'
import axiosInstance from '@/api/axios'
import type { User, AuthTokenResponse } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(true)

  async function loadUser() {
    const token = localStorage.getItem('accessToken')
    if (!token) { loading.value = false; return }
    try {
      const res = await axiosInstance.get<User>('/auth/me')
      user.value = res.data
    } catch {
      logout()
    } finally {
      loading.value = false
    }
  }

  async function login(data: { email: string; password: string }) {
    const res = await axiosInstance.post<AuthTokenResponse>('/auth/login', data)
    localStorage.setItem('accessToken', res.data.accessToken)
    localStorage.setItem('refreshToken', res.data.refreshToken)
    user.value = res.data.user
  }

  async function register(data: { name: string; email: string; password: string }) {
    const res = await axiosInstance.post<AuthTokenResponse>('/auth/register', data)
    localStorage.setItem('accessToken', res.data.accessToken)
    localStorage.setItem('refreshToken', res.data.refreshToken)
    user.value = res.data.user
  }

  function logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    user.value = null
  }

  return { user, loading, loadUser, login, register, logout }
})