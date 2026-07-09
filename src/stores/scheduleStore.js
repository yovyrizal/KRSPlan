import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useScheduleStore = defineStore('schedule', () => {
  const plans = ref([
    {
      id: 1,
      title: 'Semester 2',
      createdAt: '2026-03-22T12:00:00',
      updatedAt: '2026-03-22T15:00:00',
      courses: [
        { id: 4, code: 'INF201', name: 'Algoritma Pemrograman', lecturer: 'Dr. Sari', sks: 3, day: 'Rabu', startTime: '08:00', endTime: '10:30' },
        { id: 7, code: 'SIS102', name: 'Pengantar Sistem Informasi', lecturer: 'Dr. Zainudin', sks: 3, day: 'Selasa', startTime: '06:30', endTime: '08:30' },
      ],
    },
    { id: 2, title: 'Semester 3', createdAt: '2026-03-22T12:00:00', updatedAt: '2026-03-22T15:00:00', courses: [] },
  ])

  function addPlan(title, courses = []) {
    const now = new Date().toISOString()
    plans.value.push({
      id: Date.now(),
      title: title || `Semester ${plans.value.length + 2}`,
      createdAt: now,
      updatedAt: now,
      courses,
    })
  }

  function updatePlanCourses(id, courses) {
    const plan = plans.value.find((p) => p.id === id)
    if (plan) {
      plan.courses = courses
      plan.updatedAt = new Date().toISOString()
    }
  }

  function removePlan(id) {
    plans.value = plans.value.filter((plan) => plan.id !== id)
  }

  return { plans, addPlan, updatePlanCourses, removePlan }
})