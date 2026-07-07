<script setup>
import { ref } from 'vue'

const props = defineProps({
  length: { type: Number, default: 6 },
  modelValue: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue', 'complete'])

const digits = ref(Array.from({ length: props.length }, (_, i) => props.modelValue[i] || ''))
const inputRefs = ref([])

function setInputRef(el, index) {
  if (el) inputRefs.value[index] = el
}

function onInput(index, event) {
  const value = event.target.value.replace(/[^0-9]/g, '').slice(-1)
  digits.value[index] = value
  emitValue()
  if (value && index < props.length - 1) inputRefs.value[index + 1]?.focus()
}

function onKeydown(index, event) {
  if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
    inputRefs.value[index - 1]?.focus()
  }
}

function onPaste(event) {
  const pasted = event.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, props.length)
  pasted.split('').forEach((char, i) => { digits.value[i] = char })
  emitValue()
  const nextEmpty = digits.value.findIndex((d) => !d)
  inputRefs.value[nextEmpty === -1 ? props.length - 1 : nextEmpty]?.focus()
}

function emitValue() {
  const code = digits.value.join('')
  emit('update:modelValue', code)
  if (code.length === props.length) emit('complete', code)
}
</script>

<template>
  <div class="flex justify-center gap-2 md:gap-3" @paste="onPaste">
    <input
      v-for="(digit, index) in digits"
      :key="index"
      :ref="(el) => setInputRef(el, index)"
      v-model="digits[index]"
      type="text"
      inputmode="numeric"
      maxlength="1"
      class="w-11 h-12 md:w-12 md:h-14 text-center text-lg font-semibold rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-app-green focus:ring-2 focus:ring-app-green/20 focus:outline-none transition"
      @input="onInput(index, $event)"
      @keydown="onKeydown(index, $event)"
    />
  </div>
</template>