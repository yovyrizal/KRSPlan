<script setup>
import { ref } from 'vue'
import { PanelLeft } from 'lucide-vue-next'
import Sidebar from '@/components/layout/Sidebar.vue'

const isSidebarCollapsed = ref(false)
function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
</script>

<template>
  <div class="min-h-screen bg-app-bg">
    <Sidebar :collapsed="isSidebarCollapsed" />

    <div
      class="flex flex-col min-h-screen transition-all duration-300 ease-in-out"
      :class="isSidebarCollapsed ? 'md:pl-20' : 'md:pl-64'"
    >
      <header class="h-14 flex items-center px-4 md:px-6 bg-white/70 backdrop-blur border-b border-black/5">
        <button
          type="button"
          class="p-2 rounded-lg text-gray-600 hover:bg-black/5 transition-colors"
          @click="toggleSidebar"
        >
          <PanelLeft class="w-5 h-5" />
        </button>
      </header>

      <main class="flex-1 p-4 md:p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>