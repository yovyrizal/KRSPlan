<script setup>
const testimonials = [
  { name: 'Adi', prodi: 'Keperawatan', quote: 'KRSPlan bantu aku lihat semua opsi jadwal tanpa buka Excel manual lagi.' },
  { name: 'Salsa', prodi: 'Sistem Informasi', quote: 'Paling suka deteksi bentrok otomatisnya, jadi nggak perlu cek satu-satu.' },
  { name: 'Rizky', prodi: 'Teknik Elektro', quote: 'Tampilannya simpel, gampang dipakai pas lagi war KRS.' },
]
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-1">Ulasan</h1>
    <p class="text-gray-500 text-sm mb-6">Apa kata mahasiswa lain tentang KRSPlan. <span class="text-gray-400">(data contoh)</span></p>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="item in testimonials" :key="item.name" class="bg-white rounded-2xl p-5 shadow-sm">
        <p class="text-gray-700 text-sm mb-4">"{{ item.quote }}"</p>
        <p class="font-semibold text-gray-900 text-sm">{{ item.name }}</p>
        <p class="text-gray-400 text-xs">{{ item.prodi }}</p>
      </div>
    </div>
  </div>
</template>