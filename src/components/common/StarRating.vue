<script setup>
import { ref } from 'vue'
import { Star } from 'lucide-vue-next'

defineProps({
  modelValue: { type: Number, default: 0 },
})
const emit = defineEmits(['update:modelValue'])

const hovered = ref(0)
</script>

<template>
  <div class="flex items-center gap-2" @mouseleave="hovered = 0">
    <button
      v-for="star in 5" :key="star"
      type="button"
      :aria-label="`Beri rating ${star} bintang`"
      class="transition-transform hover:scale-110"
      @mouseenter="hovered = star"
      @click="emit('update:modelValue', star)"
    >
      <Star
        class="w-9 h-9"
        :fill="(hovered || modelValue) >= star ? '#F7B32B' : 'none'"
        :class="(hovered || modelValue) >= star ? 'text-app-yellow' : 'text-gray-300'"
      />
    </button>
  </div>
</template>