<script setup>
import { ShieldCheck, ListChecks, Zap, CalendarCheck } from 'lucide-vue-next'
</script>

<template>
  <div class="hidden md:flex relative items-center justify-center overflow-hidden bg-app-green-light">
    <div class="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-app-green/20 blur-2xl"></div>
    <div class="absolute -bottom-16 -left-10 w-64 h-64 rounded-full bg-app-yellow/20 blur-2xl"></div>
    <img src="@/assets/image/KRS.png" class="w-full h-full object-cover" />
  </div>
</template>