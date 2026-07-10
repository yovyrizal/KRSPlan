<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-app-bg text-center px-4">
    <p class="text-6xl font-bold text-app-green mb-2">404</p>
    <h1 class="text-xl font-bold text-gray-900 mb-2">Halaman tidak ditemukan</h1>
    <p class="text-gray-500 mb-6">URL yang kamu tuju sepertinya tidak tersedia.</p>
    <RouterLink :to="{ name: 'dashboard' }" class="rounded-lg bg-app-green text-white font-semibold px-5 py-2.5 hover:bg-app-green-dark transition-colors">
      Kembali ke Dashboard
    </RouterLink>
  </div>
</template>