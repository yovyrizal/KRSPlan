<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Mail, ShieldCheck, Headset, ArrowLeft, ArrowRight } from 'lucide-vue-next'
import OtpInput from '@/components/auth/OtpInput.vue'

const router = useRouter()
const route = useRoute()
const code = ref('')
const isSubmitting = ref(false)

async function handleVerify() {
  if (code.value.length < 6) return
  isSubmitting.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 600))
    router.push({ name: 'login' })
  } finally {
    isSubmitting.value = false
  }
}

function resendCode() {
}
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
          Kami telah mengirimkan kode verifikasi ke email kamu. Silakan masukkan kode tersebut di bawah ini.
        </p>

        <OtpInput v-model="code" :length="6" class="mb-6" />

        <button
          type="button" :disabled="isSubmitting || code.length < 6"
          class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-app-green hover:bg-app-green-dark text-white font-semibold py-2.5 transition-colors disabled:opacity-50"
          @click="handleVerify"
        >
          {{ isSubmitting ? 'Memverifikasi...' : 'Verifikasi' }}
          <ArrowRight class="w-4 h-4" />
        </button>

        <p class="text-sm text-gray-500 mt-5">
          Belum menerima kode?
          <button type="button" class="text-app-green font-semibold hover:underline" @click="resendCode">Kirim ulang kode</button>
        </p>

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