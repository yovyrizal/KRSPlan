import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCourseStore = defineStore('course', () => {
  const courses = ref([])
  const isLoading = ref(false)

  async function fetchCourses() {
    isLoading.value = true
    try {
      // TODO: ganti dengan pemanggilan API asli
      await new Promise((resolve) => setTimeout(resolve, 400))
      courses.value = [
        { id: 1, code: 'BIN101', name: 'Bahasa Indonesia', lecturer: 'Dr. Montiela', sks: 2, day: 'Senin', startTime: '09:30', endTime: '12:30' },
        { id: 2, code: 'BIN102', name: 'Bahasa Indonesia', lecturer: 'Dr. Aditya', sks: 2, day: 'Selasa', startTime: '13:00', endTime: '15:00' },
        { id: 3, code: 'MAT104', name: 'Kalkulus I', lecturer: 'Dr. Rahman', sks: 3, day: 'Senin', startTime: '10:00', endTime: '12:00' },
        { id: 4, code: 'INF201', name: 'Algoritma Pemrograman', lecturer: 'Dr. Sari', sks: 3, day: 'Rabu', startTime: '08:00', endTime: '10:30' },
        { id: 5, code: 'SIF102', name: 'Basis Data', lecturer: 'Dr. Wijaya', sks: 3, day: 'Kamis', startTime: '09:00', endTime: '11:30' },
        { id: 6, code: 'UNP110', name: 'Pendidikan Pancasila', lecturer: 'Dr. Hartono', sks: 2, day: 'Jumat', startTime: '08:00', endTime: '10:00' },
        { id: 7, code: 'SIS102', name: 'Pengantar Sistem Informasi', lecturer: 'Dr. Zainudin', sks: 3, day: 'Selasa', startTime: '06:30', endTime: '08:30' },
      ]
    } finally {
      isLoading.value = false
    }
  }

  return { courses, isLoading, fetchCourses }
})