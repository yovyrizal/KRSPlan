<script setup>
import { computed } from 'vue'
import { useScheduleStore } from '@/stores/scheduleStore'
import { Trash2 } from 'lucide-vue-next'

const scheduleStore = useScheduleStore()
const plans = computed(() => scheduleStore.plans)

function formatDate(dateString) {
  return new Date(dateString).toLocaleString('id-ID', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

function handleDelete(id) {
  if (confirm('Hapus rencana ini?')) scheduleStore.removePlan(id)
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-1">Rencana Saya</h1>
    <p class="text-gray-500 text-sm mb-6">Daftar lengkap semua rencana KRS yang sudah kamu buat.</p>

    <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
      <table class="w-full text-sm text-left">
        <thead class="bg-gray-50 text-gray-500 uppercase text-xs">
          <tr>
            <th class="px-5 py-3 font-semibold">Nama Rencana</th>
            <th class="px-5 py-3 font-semibold">Dibuat</th>
            <th class="px-5 py-3 font-semibold">Diperbarui</th>
            <th class="px-5 py-3 font-semibold text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="plan in plans" :key="plan.id">
            <td class="px-5 py-3.5 font-medium text-gray-900">{{ plan.title }}</td>
            <td class="px-5 py-3.5 text-gray-500">{{ formatDate(plan.createdAt) }}</td>
            <td class="px-5 py-3.5 text-gray-500">{{ formatDate(plan.updatedAt) }}</td>
            <td class="px-5 py-3.5 text-right">
              <button type="button" class="text-gray-400 hover:text-app-red" @click="handleDelete(plan.id)">
                <Trash2 class="w-4 h-4 inline" />
              </button>
            </td>
          </tr>
          <tr v-if="plans.length === 0">
            <td colspan="4" class="px-5 py-8 text-center text-gray-400">Belum ada rencana. Yuk buat yang pertama!</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>