import { ref, computed } from 'vue'
import { timesOverlap } from '@/utils/schedule'

const MAX_SKS = 24

export function useCourseSelection(initial = []) {
  const selected = ref([...initial])
  const feedback = ref(null)

  const totalSks = computed(() => selected.value.reduce((sum, c) => sum + c.sks, 0))
  const selectedCount = computed(() => selected.value.length)
  const selectedIds = computed(() => new Set(selected.value.map((c) => c.id)))

  function isSelected(course) {
    return selectedIds.value.has(course.id)
  }

  function toggleCourse(course) {
    feedback.value = null

    if (isSelected(course)) {
      selected.value = selected.value.filter((c) => c.id !== course.id)
      return true
    }

    const duplicateSubject = selected.value.find((c) => c.name === course.name)
    if (duplicateSubject) {
      feedback.value = { message: `Kamu sudah memilih kelas lain untuk "${course.name}".` }
      return false
    }

    const clashing = selected.value.find((c) => timesOverlap(c, course))
    if (clashing) {
      feedback.value = { message: `Jadwal bentrok dengan "${clashing.name}" (${clashing.day}, ${clashing.startTime}-${clashing.endTime}).` }
      return false
    }

    if (totalSks.value + course.sks > MAX_SKS) {
      feedback.value = { message: `Total SKS akan melebihi batas maksimal ${MAX_SKS} SKS.` }
      return false
    }

    selected.value = [...selected.value, course]
    return true
  }

  function setSelected(courses) {
    selected.value = [...courses]
    feedback.value = null
  }

  return { selected, selectedCount, totalSks, maxSks: MAX_SKS, feedback, isSelected, toggleCourse, setSelected }
}