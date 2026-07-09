<script setup>
import { Target, Sparkles, Users } from 'lucide-vue-next'
</script>

<template>
  <div class="max-w-2xl">
    <h1 class="text-2xl font-bold text-gray-900 mb-1">Tentang Kami</h1>
    <p class="text-gray-500 text-sm mb-6">Kenapa KRSPlan dibuat.</p>

    <div class="bg-white rounded-2xl p-6 shadow-sm space-y-6">
      <p class="text-gray-700 text-sm leading-relaxed">
        KRSPlan dibuat untuk membantu mahasiswa menyusun rencana jadwal KRS tanpa takut bentrok,
        supaya proses pengisian KRS di awal semester jadi lebih cepat dan nggak bikin panik.
      </p>
      <div class="grid sm:grid-cols-3 gap-5">
        <div class="text-center">
          <div class="w-10 h-10 mx-auto rounded-full bg-app-green-light flex items-center justify-center mb-2">
            <Target class="w-5 h-5 text-app-green" />
          </div>
          <p class="text-sm font-semibold text-gray-900">Fokus</p>
          <p class="text-xs text-gray-500">Bebas jadwal bentrok</p>
        </div>
        <div class="text-center">
          <div class="w-10 h-10 mx-auto rounded-full bg-app-yellow/20 flex items-center justify-center mb-2">
            <Sparkles class="w-5 h-5 text-app-yellow-dark" />
          </div>
          <p class="text-sm font-semibold text-gray-900">Cepat</p>
          <p class="text-xs text-gray-500">Visualisasi otomatis</p>
        </div>
        <div class="text-center">
          <div class="w-10 h-10 mx-auto rounded-full bg-app-red/10 flex items-center justify-center mb-2">
            <Users class="w-5 h-5 text-app-red" />
          </div>
          <p class="text-sm font-semibold text-gray-900">Untuk Mahasiswa</p>
          <p class="text-xs text-gray-500">Dari kebutuhan nyata</p>
        </div>
      </div>
    </div>
  </div>
</template>