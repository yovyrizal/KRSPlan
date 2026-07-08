import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('krsplan_user') || 'null'))
  const token = ref(localStorage.getItem('krsplan_token') || null)

  const isAuthenticated = computed(() => !!token.value)
  const role = computed(() => user.value?.role ?? 'USER')
  const isAdmin = computed(() => role.value?.toUpperCase() === 'ADMIN')

  function login({ user: userData, token: authToken }) {
    user.value = userData
    token.value = authToken
    localStorage.setItem('krsplan_token', authToken)
    localStorage.setItem('krsplan_user', JSON.stringify(userData))
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('krsplan_token')
    localStorage.removeItem('krsplan_user')
  }

  return { user, token, isAuthenticated, role, isAdmin, login, logout }
})