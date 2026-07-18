<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import {
  LayoutDashboard, ClipboardList, FilePlus2,
  MessageSquareText, Info, UserRound, ShieldCheck, LogOut,
} from 'lucide-vue-next'

defineProps({
  collapsed: { type: Boolean, default: false },
})

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const menuSections = computed(() => {
  const sections = [
    {
      label: 'Navigasi',
      items: [
        { name: 'dashboard', label: 'Dashboard', to: { name: 'dashboard' }, icon: LayoutDashboard },
        { name: 'rencana-saya', label: 'Rencana Saya', to: { name: 'rencana-saya' }, icon: ClipboardList },
      ],
    },
    {
      label: 'Menu',
      items: [
        { name: 'buat-rencana', label: 'Buat Rencana', to: { name: 'buat-rencana' }, icon: FilePlus2 },
        { name: 'ulasan', label: 'Ulasan', to: { name: 'ulasan' }, icon: MessageSquareText },
        { name: 'tentang-kami', label: 'Tentang Kami', to: { name: 'tentang-kami' }, icon: Info },
      ],
    },
    {
      label: 'Profile',
      items: [
        { name: 'profil', label: 'Profil Saya', to: { name: 'profil' }, icon: UserRound },
      ],
    },
  ]

  if (authStore.isAdmin) {
    sections.push({
      label: 'Admin',
      items: [
        { name: 'admin-dashboard', label: 'Admin Dashboard', to: { name: 'admin-dashboard' }, icon: ShieldCheck },
      ],
    })
  }
  return sections
})

const isActive = (itemName) => route.name === itemName

function handleLogout() {
  // TODO: kalau backend punya endpoint logout (invalidate token di server), panggil dulu di sini
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-30 hidden md:flex flex-col bg-app-green transition-all duration-300 ease-in-out"
    :class="collapsed ? 'w-20' : 'w-64'"
  >
    <div class="h-16 flex items-center shrink-0" :class="collapsed ? 'justify-center' : 'px-5'">
      <span v-if="!collapsed" class="text-white font-bold text-xl tracking-tight">
        KRS<span class="text-app-yellow">Plan</span>
      </span>
      <span v-else class="text-white font-bold text-xl">K</span>
    </div>

    <nav class="flex-1 overflow-y-auto px-3 pb-6 space-y-6">
      <div v-for="section in menuSections" :key="section.label">
        <p v-if="!collapsed" class="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">
          {{ section.label }}
        </p>
        <ul class="space-y-1">
          <li v-for="item in section.items" :key="item.name">
            <RouterLink
              :to="item.to"
              class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
              :class="[
                isActive(item.name) ? 'bg-white text-app-green shadow-sm' : 'text-white/85 hover:bg-white/10 hover:text-white',
                collapsed ? 'justify-center' : '',
              ]"
            >
              <component :is="item.icon" class="w-5 h-5 shrink-0" />
              <span v-if="!collapsed">{{ item.label }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>

    <div class="px-3 py-4 border-t border-white/10 shrink-0">
      <button
        type="button"
        class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium w-full transition-colors text-white/85 hover:bg-app-red/90 hover:text-white"
        :class="collapsed ? 'justify-center' : ''"
        @click="handleLogout"
      >
        <LogOut class="w-5 h-5 shrink-0" />
        <span v-if="!collapsed">Logout</span>
      </button>
    </div>
  </aside>
</template>