import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite' // aktifkan baris ini + di plugins[] JIKA pakai Tailwind v4

export default defineConfig({
  plugins: [vue(), tailwindcss()], // tambahkan tailwindcss() di sini jika v4
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})