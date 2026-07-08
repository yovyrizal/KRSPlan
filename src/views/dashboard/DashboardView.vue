<script setup>
import { computed } from 'vue'
import { useScheduleStore } from '@/stores/scheduleStore'
import SemesterCard from '@/components/dashboard/SemesterCard.vue'
import AddPlanCard from '@/components/dashboard/AddPlanCard.vue'

const scheduleStore = useScheduleStore()
const plans = computed(() => scheduleStore.plans)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Rencana KRS</h1>
        <p class="text-gray-500 text-sm mt-1">Semua Rencanamu tersimpan disini</p>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-lg bg-app-green hover:bg-app-green-dark text-white text-sm font-semibold px-4 py-2.5 transition-colors"
        @click="scheduleStore.addPlan()"
      >
        <span class="text-lg leading-none">+</span> Tambah rencana
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <SemesterCard v-for="plan in plans" :key="plan.id" :plan="plan" />
      <AddPlanCard @click="scheduleStore.addPlan()" />
    </div>
  </div>
</template>