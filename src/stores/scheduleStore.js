import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useScheduleStore = defineStore('schedule', () => {
  const plans = ref([
    { id: 1, title: 'Semester 2', createdAt: '2026-03-22T12:00:00', updatedAt: '2026-03-22T15:00:00' },
    { id: 2, title: 'Semester 3', createdAt: '2026-03-22T12:00:00', updatedAt: '2026-03-22T15:00:00' },
  ])

  function addPlan(title) {
    const now = new Date().toISOString()
    plans.value.push({
      id: Date.now(),
      title: title || `Semester ${plans.value.length + 2}`,
      createdAt: now,
      updatedAt: now,
    })
  }

  function removePlan(id) {
    plans.value = plans.value.filter((plan) => plan.id !== id)
  }

  return { plans, addPlan, removePlan }
})