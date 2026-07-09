<script setup>
import { Users, ClipboardList, Activity } from 'lucide-vue-next'

const stats = [
  { label: 'Total Pengguna', value: '—', icon: Users },
  { label: 'Total Rencana Dibuat', value: '—', icon: ClipboardList },
  { label: 'Aktif Hari Ini', value: '—', icon: Activity },
]
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
    <p class="text-gray-500 text-sm mb-6">Ringkasan aktivitas seluruh pengguna KRSPlan.</p>

    <div class="grid sm:grid-cols-3 gap-5">
      <div v-for="stat in stats" :key="stat.label" class="bg-white rounded-2xl p-5 shadow-sm">
        <div class="w-9 h-9 rounded-lg bg-app-green-light flex items-center justify-center mb-3">
          <component :is="stat.icon" class="w-5 h-5 text-app-green" />
        </div>
        <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
        <p class="text-xs text-gray-500 mt-1">{{ stat.label }}</p>
      </div>
    </div>

    <p class="text-xs text-gray-400 mt-6">*Angka masih placeholder — sambungkan ke endpoint statistik admin begitu tersedia.</p>
  </div>
</template>