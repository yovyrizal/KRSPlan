import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import AuthLayout from '@/layouts/AuthLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const routes = [
  {
    path: '/',
    component: AuthLayout,
    meta: { requiresGuest: true },
    children: [
      { path: '', redirect: { name: 'login' } }, // '/' otomatis ke /login
      { path: 'login', name: 'login', component: () => import('@/views/auth/LoginView.vue') },
      { path: 'register', name: 'register', component: () => import('@/views/auth/RegisterView.vue') },
      { path: 'email-verification', name: 'email-verification', component: () => import('@/views/auth/EmailVerificationView.vue') },
      { path: 'verify-email', name: 'verify-email', component: () => import('@/views/auth/EmailVerificationView.vue') },
    ],
  },
  {
    path: '/',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('@/views/dashboard/DashboardView.vue') },
      { path: 'rencana-saya', name: 'rencana-saya', component: () => import('@/views/RencanaSayaView.vue') },
      { path: 'buat-rencana', name: 'buat-rencana', component: () => import('@/views/BuatRencanaView.vue') },
      { path: 'ulasan', name: 'ulasan', component: () => import('@/views/UlasanView.vue') },
      { path: 'tentang-kami', name: 'tentang-kami', component: () => import('@/views/TentangKamiView.vue') },
      { path: 'profil', name: 'profil', component: () => import('@/views/ProfilView.vue') },
      {
        path: 'admin/dashboard',
        name: 'admin-dashboard',
        component: () => import('@/views/admin/AdminDashboardView.vue'),
        meta: { requiresAdmin: true },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login' })
  }
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return next({ name: 'dashboard' })
  }
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return next({ name: 'dashboard' })
  }
  next()
})

export default router