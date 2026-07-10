<script setup>
import TeamMemberCard from '@/components/common/TeamMemberCard.vue'

const developers = [
  { name: 'Dito', role: 'Frontend Developer', photoUrl: null },
  { name: 'Yovy', role: 'Backend Developer', photoUrl: null },
]

// TODO: ganti "Nama Kating X" dengan nama asli
const credits = [
  { name: 'Kak Guntur', role: '', photoUrl: null },
  { name: 'Kak Ivan', role: '', photoUrl: null },
  { name: 'Siapa lagi Yov?', role: '', photoUrl: null },
]
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-xl font-bold text-gray-900 uppercase tracking-wide text-center mb-10">Tentang Kami</h1>

    <section class="mb-10">
      <h2 class="text-lg font-bold text-gray-900 mb-4">Developer</h2>
      <div class="grid sm:grid-cols-2 gap-5">
        <TeamMemberCard
          v-for="(person, idx) in developers" :key="person.name"
          :index="idx" v-bind="person"
        />
      </div>
    </section>

    <section>
      <h2 class="text-lg font-bold text-gray-900 mb-1">Credit</h2>
      <p class="text-sm text-gray-500 mb-4">Kating yang menginspirasi kami membuat KRSPlan.</p>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <TeamMemberCard
          v-for="(person, idx) in credits" :key="person.name"
          :index="idx" v-bind="person"
        />
      </div>
    </section>
  </div>
</template>