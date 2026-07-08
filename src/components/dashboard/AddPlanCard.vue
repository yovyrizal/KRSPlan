<script setup>
import { Plus } from 'lucide-vue-next'
defineEmits(['click'])
</script>

<template>
  <button
    type="button"
    class="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 text-gray-400 hover:border-app-green hover:text-app-green transition-colors py-10"
    @click="$emit('click')"
  >
    <span class="w-10 h-10 rounded-full border-2 border-dashed border-current flex items-center justify-center">
      <Plus class="w-5 h-5" />
    </span>
    <span class="text-sm font-semibold">Tambah Rencana</span>
  </button>
</template>