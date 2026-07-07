import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // --- state ---
  const user = ref(null) // { id, name, email, role: 'user' | 'admin' }
  const token = ref(localStorage.getItem('krsplan_token') || null)

  // --- getters ---
  const isAuthenticated = computed(() => !!token.value)
  const role = computed(() => user.value?.role ?? 'user')
  const isAdmin = computed(() => role.value === 'admin')

  // --- actions ---
  function login({ user: userData, token: authToken }) {
    user.value = userData
    token.value = authToken
    localStorage.setItem('krsplan_token', authToken)
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('krsplan_token')
  }

  return { user, token, isAuthenticated, role, isAdmin, login, logout }
})