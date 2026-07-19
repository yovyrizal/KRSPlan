<script setup>
import { ref, computed } from 'vue'
import { previewImport, confirmImport } from '@/services/MatkulService.js'

const rawText = ref('')
const tahunPeriode = ref('')
const semesterKe = ref('')

const isPreviewing = ref(false)
const isConfirming = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const previewResult = ref(null) // { valid: [], invalid: [] }

const canPreview = computed(() => rawText.value.trim() !== '' && tahunPeriode.value.trim() !== '')

async function handlePreview() {
  errorMessage.value = ''
  successMessage.value = ''
  previewResult.value = null
  isPreviewing.value = true
  try {
    previewResult.value = await previewImport({
      rawText: rawText.value,
      tahunPeriode: tahunPeriode.value,
      semesterKe: semesterKe.value || null,
    })
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Gagal parsing data.'
  } finally {
    isPreviewing.value = false
  }
}

async function handleConfirm() {
  if (!previewResult.value?.valid?.length) return
  errorMessage.value = ''
  isConfirming.value = true
  try {
    const result = await confirmImport(previewResult.value.valid)
    successMessage.value = `Berhasil: ${result.berhasil} matkul ditambahkan. Duplikat (dilewati): ${result.duplikat}.`
    if (result.gagal?.length) {
      errorMessage.value = `${result.gagal.length} entri gagal diproses, cek console untuk detail.`
      console.error('Gagal import:', result.gagal)
    }
    previewResult.value = null
    rawText.value = ''
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Gagal mengimpor data.'
  } finally {
    isConfirming.value = false
  }
}
</script>

<template>
  <div class="max-w-5xl">
    <h1 class="text-2xl font-bold text-gray-900 mb-1">Import Mata Kuliah</h1>
    <p class="text-gray-500 text-sm mb-6">Paste data mentah (format tab-separated), preview dulu sebelum disimpan.</p>

    <!-- Form input -->
    <div class="bg-white rounded-xl p-5 shadow-sm space-y-4 mb-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold text-gray-800 mb-1.5">
            Tahun Periode <span class="text-app-red">*</span>
          </label>
          <input
            v-model="tahunPeriode"
            type="text"
            placeholder="Ganjil 2026/2027"
            class="w-full rounded-lg bg-gray-100 px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-app-green/20 focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-800 mb-1.5">
            Semester Ke (opsional)
          </label>
          <input
            v-model="semesterKe"
            type="number"
            placeholder="3"
            class="w-full rounded-lg bg-gray-100 px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-app-green/20 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-800 mb-1.5">Data Mentah</label>
        <textarea
          v-model="rawText"
          rows="10"
          placeholder="Paste data di sini..."
          class="w-full rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-mono focus:bg-white focus:ring-2 focus:ring-app-green/20 focus:outline-none"
        ></textarea>
      </div>

      <button
        type="button"
        :disabled="!canPreview || isPreviewing"
        class="rounded-lg bg-app-green hover:bg-app-green-dark text-white text-sm font-semibold px-5 py-2.5 transition-colors disabled:opacity-50"
        @click="handlePreview"
      >
        {{ isPreviewing ? 'Memproses...' : 'Preview' }}
      </button>
    </div>

    <p v-if="errorMessage" class="text-sm text-app-red mb-4">{{ errorMessage }}</p>
    <p v-if="successMessage" class="text-sm text-app-green font-medium mb-4">{{ successMessage }}</p>

    <!-- Hasil preview -->
    <div v-if="previewResult" class="space-y-6">
      <!-- Ringkasan -->
      <div class="flex gap-4 text-sm">
        <span class="text-app-green font-semibold">✓ {{ previewResult.valid.length }} valid</span>
        <span v-if="previewResult.invalid.length" class="text-app-red font-semibold">
          ✗ {{ previewResult.invalid.length }} bermasalah
        </span>
      </div>

      <!-- Baris bermasalah -->
      <div v-if="previewResult.invalid.length" class="bg-red-50 border border-red-200 rounded-xl p-4">
        <p class="text-sm font-semibold text-app-red mb-2">Baris berikut perlu diperbaiki manual (tidak akan diimport):</p>
        <ul class="text-sm text-gray-700 space-y-2">
          <li v-for="item in previewResult.invalid" :key="item._row">
            <span class="font-medium">Baris {{ item._row }}</span> — {{ item.namaMatkul || '(nama kosong)' }} ({{ item.kelas || '?' }}):
            <span class="text-app-red">{{ item._errors.join(', ') }}</span>
          </li>
        </ul>
      </div>

      <!-- Tabel valid -->
      <div v-if="previewResult.valid.length" class="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
              <th class="px-4 py-3 text-left">Kode</th>
              <th class="px-4 py-3 text-left">Nama Matkul</th>
              <th class="px-4 py-3 text-left">Kelas</th>
              <th class="px-4 py-3 text-left">SKS</th>
              <th class="px-4 py-3 text-left">Jadwal</th>
              <th class="px-4 py-3 text-left">Ruangan</th>
              <th class="px-4 py-3 text-left">Dosen</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in previewResult.valid" :key="item._row" class="border-t border-gray-100">
              <td class="px-4 py-2.5 font-mono text-xs">{{ item.kodeMatkul }}</td>
              <td class="px-4 py-2.5">{{ item.namaMatkul }}</td>
              <td class="px-4 py-2.5">{{ item.kelas }}</td>
              <td class="px-4 py-2.5">{{ item.sks }}</td>
              <td class="px-4 py-2.5">{{ item.hari }}, {{ item.jamMulai }}-{{ item.jamSelesai }}</td>
              <td class="px-4 py-2.5">{{ item.ruangan }}</td>
              <td class="px-4 py-2.5">{{ item.dosen.join(', ') }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        v-if="previewResult.valid.length"
        type="button"
        :disabled="isConfirming"
        class="rounded-lg bg-app-yellow hover:bg-app-yellow-dark text-white text-sm font-semibold px-5 py-2.5 transition-colors disabled:opacity-50"
        @click="handleConfirm"
      >
        {{ isConfirming ? 'Menyimpan...' : `Konfirmasi Import (${previewResult.valid.length} matkul)` }}
      </button>
    </div>
  </div>
</template>