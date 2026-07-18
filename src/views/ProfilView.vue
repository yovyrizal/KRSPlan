<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>

<template>
  <div class="max-w-xl">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Profil Saya</h1>

    <div class="bg-white rounded-2xl shadow-sm p-6 space-y-5">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-full bg-app-green-light flex items-center justify-center text-app-green font-bold text-xl">
          {{ user?.name?.charAt(0).toUpperCase() ?? '?' }}
        </div>
        <div>
          <p class="font-bold text-gray-900">{{ user?.name ?? '-' }}</p>
          <p class="text-sm text-gray-500">{{ user?.email ?? '-' }}</p>
        </div>
      </div>
      <div class="border-t border-gray-100 pt-5">
        <p class="text-sm text-gray-500 mb-1">Role</p>
        <span class="inline-block rounded-full bg-app-green-light text-app-green text-xs font-semibold px-3 py-1 capitalize">
          {{ user?.role ?? 'user' }}
        </span>
      </div>
    </div>
  </div>
</template>