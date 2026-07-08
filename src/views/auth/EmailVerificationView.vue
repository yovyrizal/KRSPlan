<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Mail, ShieldCheck, Headset, ArrowLeft } from 'lucide-vue-next'
import { verifyEmail } from '@/services/AuthService'

const route = useRoute()
const message = ref('Kami telah mengirimkan link verifikasi ke email kamu. Silakan buka email dan klik link tersebut. (Cek juga folder spam)')
const isSubmitting = ref(false)
const isVerified = ref(false)
const errorMsg = ref('')

onMounted(async () => {
  const token = route.query.token
  if (!token) return

  isSubmitting.value = true
  errorMsg.value = ''

  try {
    const result = await verifyEmail(token)
    message.value = result.message || 'Email berhasil diverifikasi.'
    isVerified.value = true
  } catch (error) {
    errorMsg.value = error.response?.data?.error || error.response?.data?.message || 'Verifikasi gagal, silakan coba lagi.'
  } finally {
    isSubmitting.value = false
  }
})
</script>

<template>
  <div class="w-full max-w-md">
    <div class="bg-white rounded-3xl shadow-card overflow-hidden">
      <div class="h-1.5 bg-app-green"></div>
      <div class="p-8 text-center">
        <h1 class="text-lg font-bold text-gray-900 mb-6">KRS<span class="text-app-yellow">Plan</span></h1>

        <div class="w-14 h-14 mx-auto rounded-full bg-app-green-light flex items-center justify-center mb-5">
          <Mail class="w-6 h-6 text-app-green" />
        </div>

        <h2 class="text-xl font-bold text-app-green mb-2">Verifikasi Email Kamu</h2>
        <p class="text-sm text-gray-500 mb-6">
          {{ message }}
        </p>

        <p v-if="errorMsg" class="text-sm text-app-red mb-4">{{ errorMsg }}</p>

        <div v-if="isVerified" class="rounded-lg bg-app-green-light p-3 text-sm text-app-green mb-4">
          Email kamu sudah berhasil diverifikasi.
        </div>

        <RouterLink :to="{ name: 'login' }" class="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 mt-4 uppercase tracking-wide">
          <ArrowLeft class="w-3 h-3" /> Ganti Alamat Email
        </RouterLink>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3 mt-4">
      <div class="bg-white/80 rounded-xl px-4 py-3 flex items-center gap-2 text-xs text-gray-600">
        <ShieldCheck class="w-4 h-4 text-app-yellow shrink-0" />
        <div><p class="font-semibold text-gray-800">Akses Aman</p><p>Enkripsi TLS 1.3</p></div>
      </div>
      <div class="bg-white/80 rounded-xl px-4 py-3 flex items-center gap-2 text-xs text-gray-600">
        <Headset class="w-4 h-4 text-app-green shrink-0" />
        <div><p class="font-semibold text-gray-800">Bantuan 24/7</p></div>
      </div>
    </div>
  </div>
</template>