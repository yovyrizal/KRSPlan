<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthIllustrationPanel from '@/components/auth/AuthIllustrationPanel.vue'

const router = useRouter()
const form = ref({ name: '', email: '', password: '' })
const isSubmitting = ref(false)

async function handleSubmit() {
  isSubmitting.value = true
  try {
    // TODO: ganti dengan pemanggilan API register asli
    await new Promise((resolve) => setTimeout(resolve, 600))
    router.push({ name: 'email-verification', query: { email: form.value.email } })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="w-full max-w-4xl bg-white rounded-4xl shadow-card grid md:grid-cols-2 overflow-hidden">
    <div class="p-8 md:p-12 flex flex-col justify-center">
      <h1 class="text-2xl font-bold mb-8">KRS<span class="text-app-yellow">Plan</span></h1>
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Buat Akun</h2>

      <form class="space-y-5" @submit.prevent="handleSubmit">
        <div>
          <label class="block text-sm font-semibold text-gray-800 mb-1.5" for="name">Nama</label>
          <input id="name" v-model="form.name" type="text" required placeholder="Nathan"
            class="w-full rounded-lg bg-gray-100 px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-app-green/20 focus:outline-none transition" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-800 mb-1.5" for="email">Email</label>
          <input id="email" v-model="form.email" type="email" required placeholder="xxxxxxxx@student.upnyk.ac.id"
            class="w-full rounded-lg bg-gray-100 px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-app-green/20 focus:outline-none transition" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-800 mb-1.5" for="password">Password</label>
          <input id="password" v-model="form.password" type="password" required placeholder="••••••••••••"
            class="w-full rounded-lg bg-gray-100 px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-app-green/20 focus:outline-none transition" />
        </div>

        <button type="submit" :disabled="isSubmitting"
          class="w-full rounded-lg bg-app-yellow hover:bg-app-yellow-dark text-white font-semibold py-2.5 transition-colors disabled:opacity-60">
          {{ isSubmitting ? 'Memproses...' : 'SIGN UP' }}
        </button>

        <p class="text-center text-sm text-gray-600">
          Sudah punya akun?
          <RouterLink :to="{ name: 'login' }" class="text-app-red font-semibold">Sign In</RouterLink>
        </p>
      </form>
    </div>

    <AuthIllustrationPanel />
  </div>
</template>