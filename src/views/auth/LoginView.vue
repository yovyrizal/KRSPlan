<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import AuthIllustrationPanel from '@/components/auth/AuthIllustrationPanel.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({ email: '', password: '', remember: false })
const isSubmitting = ref(false)
const errorMessage = ref('')

async function handleSubmit() {
  errorMessage.value = ''
  isSubmitting.value = true
  try {
    // TODO: ganti dengan pemanggilan API login asli (lihat src/services/apiClient.js)
    await new Promise((resolve) => setTimeout(resolve, 600))
    authStore.login({
      user: { id: 1, name: 'Mahasiswa', email: form.value.email, role: 'user' },
      token: 'dummy-token',
    })
    router.push({ name: 'dashboard' })
  } catch {
    errorMessage.value = 'Email atau password salah. Silakan coba lagi.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="w-full max-w-4xl bg-white rounded-4xl shadow-card grid md:grid-cols-2 overflow-hidden">
    <div class="p-8 md:p-12 flex flex-col justify-center">
      <h1 class="text-2xl font-bold mb-8">KRS<span class="text-app-yellow">Plan</span></h1>
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Sudah siap war KRS?</h2>
      <p class="text-gray-500 mb-8">Visualisasikan jadwal KRS-mu dengan mudah, cepat, dan otomatis di sini.</p>

      <form class="space-y-5" @submit.prevent="handleSubmit">
        <div>
          <label class="block text-sm font-semibold text-gray-800 mb-1.5" for="email">Email</label>
          <input
            id="email" v-model="form.email" type="email" required
            placeholder="xxxxxxxx@student.upnyk.ac.id"
            class="w-full rounded-lg bg-gray-100 px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-app-green/20 focus:outline-none transition"
          />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-800 mb-1.5" for="password">Password</label>
          <input
            id="password" v-model="form.password" type="password" required
            placeholder="••••••••••••"
            class="w-full rounded-lg bg-gray-100 px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-app-green/20 focus:outline-none transition"
          />
        </div>
        <div class="flex items-center justify-between text-sm">
          <label class="inline-flex items-center gap-2 text-gray-600 cursor-pointer select-none">
            <input v-model="form.remember" type="checkbox" class="rounded border-gray-300 text-app-yellow focus:ring-app-yellow/40" />
            Ingat saya
          </label>
          <a href="#" class="text-gray-700 hover:text-app-green font-medium">Lupa Password</a>
        </div>

        <p v-if="errorMessage" class="text-sm text-app-red">{{ errorMessage }}</p>

        <button
          type="submit" :disabled="isSubmitting"
          class="w-full rounded-lg bg-app-yellow hover:bg-app-yellow-dark text-white font-semibold py-2.5 transition-colors disabled:opacity-60"
        >
          {{ isSubmitting ? 'Memproses...' : 'SIGN IN' }}
        </button>

        <p class="text-center text-sm text-gray-600">
          Belum punya akun?
          <RouterLink :to="{ name: 'register' }" class="text-app-red font-semibold">Sign Up</RouterLink>
        </p>
      </form>
    </div>

    <AuthIllustrationPanel />
  </div>
</template>