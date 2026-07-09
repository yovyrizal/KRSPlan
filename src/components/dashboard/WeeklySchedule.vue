<script setup>
import { computed } from 'vue'

const props = defineProps({
  courses: { type: Array, default: () => [] },
})

const HOUR_HEIGHT = 64
const GRID_START_HOUR = 6
const GRID_END_HOUR = 18
const hourMarks = []
for (let h = GRID_START_HOUR; h <= GRID_END_HOUR; h += 2) hourMarks.push(h)

const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']
const totalHeight = (GRID_END_HOUR - GRID_START_HOUR) * HOUR_HEIGHT

const colorPalette = [
  { bg: 'bg-rose-100', border: 'border-rose-300', text: 'text-rose-700' },
  { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-700' },
  { bg: 'bg-emerald-100', border: 'border-emerald-300', text: 'text-emerald-700' },
  { bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-700' },
  { bg: 'bg-violet-100', border: 'border-violet-300', text: 'text-violet-700' },
]
// warna ditentukan dari id (bukan urutan array), biar warna tiap matkul konsisten & ga "loncat" pas mode edit nambah/kurangin pilihan
function colorFor(course) {
  return colorPalette[course.id % colorPalette.length]
}

function formatHourLabel(hour) {
  const period = hour < 12 ? 'AM' : 'PM'
  const displayHour = hour % 12 === 0 ? 12 : hour % 12
  return `${displayHour} ${period}`
}

function timeToMinutes(time) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

const coursesByDay = computed(() => {
  const map = {}
  days.forEach((day) => { map[day] = [] })
  props.courses.forEach((course) => {
    if (map[course.day]) map[course.day].push({ ...course, color: colorFor(course) })
  })
  return map
})

function blockStyle(course) {
  const startMinutes = timeToMinutes(course.startTime) - GRID_START_HOUR * 60
  const durationMinutes = timeToMinutes(course.endTime) - timeToMinutes(course.startTime)
  return {
    top: `${(startMinutes / 60) * HOUR_HEIGHT}px`,
    height: `${(durationMinutes / 60) * HOUR_HEIGHT}px`,
  }
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
      <div class="min-w-[640px]">
        <div class="grid" style="grid-template-columns: 64px repeat(5, 1fr)">
          <div></div>
          <div v-for="day in days" :key="day" class="text-center text-xs font-semibold text-gray-500 uppercase py-3 border-b border-gray-100">
            {{ day }}
          </div>
        </div>

        <div class="grid" style="grid-template-columns: 64px repeat(5, 1fr)">
          <div class="relative" :style="{ height: totalHeight + 'px' }">
            <span
              v-for="hour in hourMarks" :key="hour"
              class="absolute -translate-y-1/2 text-xs text-gray-400 right-2"
              :style="{ top: `${(hour - GRID_START_HOUR) * HOUR_HEIGHT}px` }"
            >{{ formatHourLabel(hour) }}</span>
          </div>

          <div v-for="day in days" :key="day" class="relative border-l border-gray-100" :style="{ height: totalHeight + 'px' }">
            <div
              v-for="hour in hourMarks" :key="hour"
              class="absolute left-0 right-0 border-t border-gray-100"
              :style="{ top: `${(hour - GRID_START_HOUR) * HOUR_HEIGHT}px` }"
            ></div>

            <div
              v-for="course in coursesByDay[day]" :key="course.id"
              class="absolute left-1 right-1 rounded-lg border px-2 py-1 overflow-hidden"
              :class="[course.color.bg, course.color.border]"
              :style="blockStyle(course)"
            >
              <p class="text-xs font-bold truncate" :class="course.color.text">{{ course.name }}</p>
              <p class="text-[11px]" :class="course.color.text">{{ course.startTime }} - {{ course.endTime }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>