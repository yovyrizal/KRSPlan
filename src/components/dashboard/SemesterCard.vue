<script setup>
import { Pencil, Plus, RefreshCcw } from 'lucide-vue-next'

defineProps({ plan: { type: Object, required: true } })

function formatDate(dateString) {
  return new Date(dateString).toLocaleString('id-ID', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}
</script>

<template>
  <RouterLink
    :to="{ name: 'rencana-detail', params: { id: plan.id } }"
    class="block bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
  >
    <div class="flex items-start justify-between mb-4">
      <h3 class="font-bold text-gray-900">{{ plan.title }}</h3>
      <span class="text-gray-400"><Pencil class="w-4 h-4" /></span>
    </div>
    <p class="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
      <Plus class="w-3.5 h-3.5" /> Created at : {{ formatDate(plan.createdAt) }}
    </p>
    <p class="flex items-center gap-1.5 text-xs text-gray-500">
      <RefreshCcw class="w-3.5 h-3.5" /> Last update : {{ formatDate(plan.updatedAt) }}
    </p>
  </RouterLink>
</template>