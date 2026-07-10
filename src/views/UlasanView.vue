<script setup>
import { ref } from 'vue'
import StarRating from '@/components/common/StarRating.vue'

const rating = ref(0)
const reviewText = ref('')
const isSubmitting = ref(false)
const isSubmitted = ref(false)

async function handleSubmit() {
  if (rating.value === 0 || isSubmitting.value) return
  isSubmitting.value = true
  isSubmitted.value = false
  try {
    // TODO: ganti dengan POST ke endpoint ulasan asli, kirim { rating: rating.value, comment: reviewText.value }
    await new Promise((resolve) => setTimeout(resolve, 600))
    isSubmitted.value = true
    rating.value = 0
    reviewText.value = ''
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto text-center">
    <h1 class="text-xl font-bold text-gray-900 uppercase tracking-wide mb-6">Berikan Ulasan Kamu</h1>

    <div class="flex justify-center mb-6">
      <StarRating v-model="rating" />
    </div>

    <form @submit.prevent="handleSubmit">
      <textarea
        v-model="reviewText"
        rows="6"
        placeholder="Menurutmu, seberapa membantu KRSPlan buat menyusun rencana KRS-mu sebagai mahasiswa Sistem Informasi?"
        class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-app-green focus:ring-2 focus:ring-app-green/20 focus:outline-none transition resize-none"
      ></textarea>

      <p v-if="isSubmitted" class="text-sm text-app-green font-medium mt-4">Terima kasih atas ulasannya! 🎉</p>

      <button
        type="submit"
        :disabled="rating === 0 || isSubmitting"
        class="mt-6 rounded-lg bg-app-green hover:bg-app-green-dark text-white font-semibold px-8 py-2.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isSubmitting ? 'Mengirim...' : 'Submit' }}
      </button>
    </form>
  </div>
</template>