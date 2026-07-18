<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Filter, AlertCircle } from 'lucide-vue-next'
import { useCourseStore } from '@/stores/courseStore'
import { useScheduleStore } from '@/stores/scheduleStore'
import { useCourseSelection } from '@/composables/useCourseSelection'
import CourseCard from '@/components/dashboard/CourseCard.vue'

const router = useRouter()
const courseStore = useCourseStore()
const scheduleStore = useScheduleStore()
const { selected, selectedCount, totalSks, maxSks, feedback, isSelected, toggleCourse } = useCourseSelection()

const searchQuery = ref('')
const isFilterOpen = ref(false)
const dayFilter = ref('Semua Hari')
const dayOptions = ['Semua Hari', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']

onMounted(() => {
  courseStore.fetchCourses()
})

const filteredCourses = computed(() =>
  courseStore.courses.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesDay = dayFilter.value === 'Semua Hari' || course.day === dayFilter.value
    return matchesSearch && matchesDay
  })
)

function handleSave() {
  if (selectedCount.value === 0) return
  // TODO: ganti dengan POST ke endpoint rencana asli, kirim daftar course id yang dipilih
  scheduleStore.addPlan(undefined, selected.value)
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <div>
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Buat Rencana</h1>
      <p class="text-gray-500 text-sm mt-1">Buat rencana KRS kamu disini</p>
    </div>

    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
      <div class="flex gap-3">
        <div class="relative w-full sm:w-72">
          <Search class="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            v-model="searchQuery" type="text" placeholder="Cari MataKuliah"
            class="w-full rounded-lg bg-app-bg/60 pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-app-green/20 focus:outline-none transition"
          />
        </div>
        <div class="relative">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg bg-app-green hover:bg-app-green-dark text-white text-sm font-semibold px-4 py-2.5 transition-colors whitespace-nowrap"
            @click="isFilterOpen = !isFilterOpen"
          >
            <Filter class="w-4 h-4" /> Filter
          </button>
          <div v-if="isFilterOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-card p-2 z-10">
            <p class="text-xs font-semibold text-gray-400 uppercase px-2 pt-1 pb-2">Hari</p>
            <button
              v-for="day in dayOptions" :key="day" type="button"
              class="w-full text-left px-2 py-1.5 rounded-md text-sm"
              :class="dayFilter === day ? 'bg-app-green-light text-app-green font-semibold' : 'text-gray-600 hover:bg-gray-50'"
              @click="dayFilter = day; isFilterOpen = false"
            >
              {{ day }}
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center bg-white rounded-lg shadow-sm px-5 py-2.5 gap-5 shrink-0">
        <div class="text-center">
          <p class="text-xs text-gray-400">Terpilih</p>
          <p class="text-lg font-bold text-app-green">{{ selectedCount }}</p>
        </div>
        <div class="w-px h-8 bg-gray-100"></div>
        <div class="text-center">
          <p class="text-xs text-gray-400">Total SKS</p>
          <p class="text-lg font-bold" :class="totalSks > maxSks ? 'text-app-red' : 'text-app-green'">
            {{ totalSks }} <span class="text-gray-400 font-medium text-sm">/ {{ maxSks }}</span>
          </p>
        </div>
      </div>
    </div>

    <div v-if="feedback" class="flex items-center gap-2 bg-app-red/10 text-app-red text-sm rounded-lg px-4 py-2.5 mb-4">
      <AlertCircle class="w-4 h-4 shrink-0" /> {{ feedback.message }}
    </div>

    <div v-if="courseStore.isLoading" class="text-center text-gray-400 py-10">Memuat mata kuliah...</div>
    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <CourseCard
        v-for="course in filteredCourses" :key="course.id"
        :course="course" :checked="isSelected(course)"
        @toggle="toggleCourse(course)"
      />
      <p v-if="filteredCourses.length === 0" class="col-span-full text-center text-gray-400 py-10">
        Mata kuliah tidak ditemukan.
      </p>
    </div>

    <div class="sticky bottom-4 flex justify-end">
      <button
        type="button" :disabled="selectedCount === 0"
        class="rounded-lg bg-app-green hover:bg-app-green-dark text-white font-semibold px-6 py-3 shadow-card transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        @click="handleSave"
      >
        Simpan Rencana ({{ selectedCount }} matkul, {{ totalSks }} SKS)
      </button>
    </div>
  </div>
</template>