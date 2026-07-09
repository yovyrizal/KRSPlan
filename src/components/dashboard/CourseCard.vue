<script setup>
defineProps({
  course: { type: Object, required: true },
  checked: { type: Boolean, default: false },
})
defineEmits(['toggle'])
</script>

<template>
  <button
    type="button"
    class="text-left bg-white rounded-2xl p-5 shadow-sm border-2 transition-colors"
    :class="checked ? 'border-app-green' : 'border-transparent hover:border-gray-100'"
    @click="$emit('toggle')"
  >
    <div class="flex items-start justify-between mb-2">
      <h3 class="font-bold text-gray-900">{{ course.name }}</h3>
      <span
        class="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0"
        :class="checked ? 'bg-app-green border-app-green' : 'border-gray-300'"
      >
        <svg v-if="checked" class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
    </div>
    <p class="text-sm text-gray-500 mb-6">{{ course.day }}, {{ course.startTime }} - {{ course.endTime }}</p>
    <div class="flex items-center justify-between text-sm">
      <span class="text-gray-500">{{ course.lecturer }}</span>
      <span class="text-gray-500 font-medium">{{ course.sks }} SKS</span>
    </div>
  </button>
</template>