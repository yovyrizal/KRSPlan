<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Pencil, Download, ClipboardList, Clock, AlertTriangle, FileText } from 'lucide-vue-next'
import { useScheduleStore } from '@/stores/scheduleStore'
import { useCourseStore } from '@/stores/courseStore'
import { useCourseSelection } from '@/composables/useCourseSelection'
import { findScheduleConflicts, totalWeeklyHours } from '@/utils/schedule'
import WeeklySchedule from '@/components/dashboard/WeeklySchedule.vue'
import CoursePickerPanel from '@/components/dashboard/CoursePickerPanel.vue'

const route = useRoute()
const scheduleStore = useScheduleStore()
const courseStore = useCourseStore()

const planId = computed(() => Number(route.params.id))
const plan = computed(() => scheduleStore.plans.find((p) => p.id === planId.value))
const planTotalSks = computed(() => plan.value?.courses?.reduce((s, c) => s + c.sks, 0) ?? 0)

const isEditing = ref(false)
const { selected, totalSks, maxSks, feedback, isSelected, toggleCourse, setSelected } = useCourseSelection()

onMounted(() => {
  courseStore.fetchCourses()
})

const displayedCourses = computed(() => (isEditing.value ? selected.value : plan.value?.courses ?? []))
const conflicts = computed(() => findScheduleConflicts(plan.value?.courses ?? []))
const weeklyHours = computed(() => totalWeeklyHours(plan.value?.courses ?? []))

function startEdit() {
  setSelected(plan.value?.courses ?? [])
  isEditing.value = true
}

function handleSave() {
  scheduleStore.updatePlanCourses(planId.value, selected.value)
  isEditing.value = false
}

function handleCancel() {
  isEditing.value = false
}

function handleDownloadPng() {
  // TODO: pakai library seperti html2canvas untuk export elemen grid jadi PNG asli, mis:
  // html2canvas(gridRef.value).then(canvas => { ... trigger download ... })
  alert('Fitur download PNG masih dalam pengembangan.')
}
</script>

<template>
  <div v-if="!plan" class="text-center text-gray-400 py-20">Rencana tidak ditemukan.</div>

  <div v-else>
    <div class="flex items-center justify-between mb-4">
      <div>
        <h1 class="text-xl font-bold text-gray-900 uppercase">{{ plan.title }}</h1>
        <p class="text-sm text-gray-400">{{ isEditing ? totalSks : planTotalSks }} SKS</p>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-lg bg-app-green hover:bg-app-green-dark text-white text-sm font-semibold px-4 py-2.5 transition-colors"
        @click="handleDownloadPng"
      >
        <Download class="w-4 h-4" /> Download PNG
      </button>
    </div>

    <button
      v-if="!isEditing" type="button"
      class="inline-flex items-center gap-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2 mb-4 hover:bg-gray-50 transition-colors"
      @click="startEdit"
    >
      <Pencil class="w-3.5 h-3.5" /> Edit
    </button>
    <div class="border-b border-gray-200 mb-5"></div>

    <div class="flex flex-col md:flex-row gap-5 items-start">
      <div class="flex-1 w-full min-w-0">
        <WeeklySchedule :courses="displayedCourses" />
      </div>

      <CoursePickerPanel
        v-if="isEditing"
        :courses="courseStore.courses"
        :feedback="feedback"
        :total-sks="totalSks"
        :max-sks="maxSks"
        :is-selected="isSelected"
        @toggle="toggleCourse"
        @save="handleSave"
        @cancel="handleCancel"
      />
    </div>

    <template v-if="!isEditing">
      <div class="grid sm:grid-cols-3 gap-4 mt-5">
        <div class="bg-white rounded-2xl p-5 shadow-sm">
          <div class="w-9 h-9 rounded-lg bg-app-green-light flex items-center justify-center mb-3">
            <ClipboardList class="w-5 h-5 text-app-green" />
          </div>
          <p class="text-xs text-gray-400 mb-1">Jumlah SKS</p>
          <p class="text-lg font-bold text-gray-900 mb-2">{{ planTotalSks }} / {{ maxSks }} SKS</p>
          <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div class="h-full bg-app-green rounded-full" :style="{ width: `${Math.min(100, (planTotalSks / maxSks) * 100)}%` }"></div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-5 shadow-sm">
          <div class="w-9 h-9 rounded-lg bg-app-yellow/20 flex items-center justify-center mb-3">
            <Clock class="w-5 h-5 text-app-yellow-dark" />
          </div>
          <p class="text-xs text-gray-400 mb-1">Jam Belajar / Minggu</p>
          <p class="text-lg font-bold text-gray-900">{{ weeklyHours }} Jam</p>
        </div>

        <div class="bg-white rounded-2xl p-5 shadow-sm">
          <div class="w-9 h-9 rounded-lg flex items-center justify-center mb-3" :class="conflicts.length ? 'bg-app-red/10' : 'bg-app-green-light'">
            <AlertTriangle class="w-5 h-5" :class="conflicts.length ? 'text-app-red' : 'text-app-green'" />
          </div>
          <p class="text-xs text-gray-400 mb-1">Potensi Bentrok</p>
          <p class="text-lg font-bold" :class="conflicts.length ? 'text-app-red' : 'text-app-green'">{{ conflicts.length || 'Nihil' }}</p>
          <p class="text-xs" :class="conflicts.length ? 'text-app-red' : 'text-app-green'">{{ conflicts.length ? 'Perlu ditinjau' : 'Jadwal Aman' }}</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm p-5 mt-5">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-bold text-gray-900">Daftar Mata Kuliah</h2>
          <button type="button" class="inline-flex items-center gap-1.5 text-app-green text-sm font-semibold hover:underline">
            <FileText class="w-4 h-4" /> Cetak Transkrip
          </button>
        </div>
        <table class="w-full text-sm text-left">
          <thead class="text-gray-400 uppercase text-xs">
            <tr>
              <th class="py-2 font-semibold">Kode</th>
              <th class="py-2 font-semibold">Mata Kuliah</th>
              <th class="py-2 font-semibold">Dosen</th>
              <th class="py-2 font-semibold">SKS</th>
              <th class="py-2 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="course in plan.courses" :key="course.id">
              <td class="py-3 text-gray-500">{{ course.code ?? '-' }}</td>
              <td class="py-3 font-semibold text-app-green">{{ course.name }}</td>
              <td class="py-3 text-gray-500">{{ course.lecturer }}</td>
              <td class="py-3 text-gray-500">{{ course.sks }}</td>
              <td class="py-3 text-right">
                <button type="button" class="text-gray-400 hover:text-app-green" @click="startEdit"><Pencil class="w-4 h-4 inline" /></button>
              </td>
            </tr>
            <tr v-if="!plan.courses?.length">
              <td colspan="5" class="py-8 text-center text-gray-400">Belum ada mata kuliah. Klik "Edit" untuk menambahkan.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>