<script setup>
const props = defineProps({
  name: { type: String, required: true },
  role: { type: String, default: '' },
  photoUrl: { type: String, default: null },
  index: { type: Number, default: 0 },
})

// Warna avatar fallback gantian ikutin palet brand, biar nggak monoton kalau ditampilin sejajar
const palette = [
  { bg: 'bg-app-green-light', text: 'text-app-green' },
  { bg: 'bg-app-yellow/20', text: 'text-app-yellow-dark' },
  { bg: 'bg-app-red/10', text: 'text-app-red' },
]
const colors = palette[props.index % palette.length]
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm p-5 flex flex-col items-center text-center">
    <img
      v-if="photoUrl"
      :src="photoUrl"
      :alt="name"
      class="w-24 h-24 rounded-full object-cover mb-4"
    />
    <div
      v-else
      class="w-24 h-24 rounded-full flex items-center justify-center font-bold text-3xl mb-4"
      :class="[colors.bg, colors.text]"
    >
      {{ name.charAt(0).toUpperCase() }}
    </div>
    <p class="font-bold text-gray-900">{{ name }}</p>
    <p v-if="role" class="text-xs text-gray-500 mt-0.5">{{ role }}</p>
  </div>
</template>