<script setup>
import { ref, computed } from 'vue'
import { Search, Filter, AlertCircle } from 'lucide-vue-next'

const props = defineProps({
  courses: { type: Array, default: () => [] },
  feedback: { type: Object, default: null },
  totalSks: { type: Number, default: 0 },
  maxSks: { type: Number, default: 24 },
  isSelected: { type: Function, required: true },
})
const emit = defineEmits(['toggle', 'save', 'cancel'])

const searchQuery = ref('')
const isFilterOpen = ref(false)
const dayFilter = ref('Semua Hari')
const dayOptions = ['Semua Hari', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']

const filteredCourses = computed(() =>
  props.courses.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesDay = dayFilter.value === 'Semua Hari' || course.day === dayFilter.value
    return matchesSearch && matchesDay
  })
)
</script>

<template>
  <div class="w-full md:w-80 shrink-0 bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-3 h-fit">
    <div class="flex gap-2">
      <div class="relative flex-1">
        <Search class="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          v-model="searchQuery" type="text" placeholder="Cari Mata Kuliah"
          class="w-full rounded-lg bg-app-bg/60 pl-8 pr-3 py-2 text-xs text-gray-700 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-app-green/20 focus:outline-none transition"
        />
      </div>
      <div class="relative">
        <button type="button" class="p-2 rounded-lg bg-app-yellow hover:bg-app-yellow-dark text-white transition-colors" @click="isFilterOpen = !isFilterOpen">
          <Filter class="w-3.5 h-3.5" />
        </button>
        <div v-if="isFilterOpen" class="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-card p-2 z-10">
          <button
            v-for="day in dayOptions" :key="day" type="button"
            class="w-full text-left px-2 py-1.5 rounded-md text-xs"
            :class="dayFilter === day ? 'bg-app-green-light text-app-green font-semibold' : 'text-gray-600 hover:bg-gray-50'"
            @click="dayFilter = day; isFilterOpen = false"
          >{{ day }}</button>
        </div>
      </div>
    </div>

    <div class="space-y-2 max-h-80 overflow-y-auto pr-1">
      <label
        v-for="course in filteredCourses" :key="course.id"
        class="flex items-start justify-between gap-2 rounded-lg border border-gray-100 hover:border-app-green/40 px-3 py-2.5 cursor-pointer transition-colors"
      >
        <div>
          <p class="text-sm font-bold text-gray-900">{{ course.name }}</p>
          <p class="text-xs text-gray-400">{{ course.day }}, {{ course.startTime }} - {{ course.endTime }}</p>
          <p class="text-xs mt-1">
            <span class="text-app-green font-medium">{{ course.lecturer }}</span>
            <span class="text-gray-400"> · {{ course.sks }} SKS</span>
          </p>
        </div>
        <input
          type="checkbox" :checked="isSelected(course)"
          class="mt-1 rounded border-gray-300 text-app-green focus:ring-app-green/40"
          @change="emit('toggle', course)"
        />
      </label>
      <p v-if="filteredCourses.length === 0" class="text-center text-xs text-gray-400 py-6">Mata kuliah tidak ditemukan.</p>
    </div>

    <div v-if="feedback" class="flex items-start gap-2 bg-app-red/10 text-app-red text-xs rounded-lg px-3 py-2.5">
      <AlertCircle class="w-3.5 h-3.5 shrink-0 mt-0.5" /> {{ feedback.message }}
    </div>

    <div class="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-gray-100">
      <span>Total SKS</span>
      <span class="font-bold" :class="totalSks > maxSks ? 'text-app-red' : 'text-app-green'">{{ totalSks }} / {{ maxSks }}</span>
    </div>

    <div class="flex gap-2">
      <button type="button" class="flex-1 rounded-lg bg-app-green hover:bg-app-green-dark text-white text-sm font-semibold py-2 transition-colors" @click="emit('save')">Save</button>
      <button type="button" class="flex-1 rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold py-2 hover:bg-gray-50 transition-colors" @click="emit('cancel')">Cancel</button>
    </div>
  </div>
</template>