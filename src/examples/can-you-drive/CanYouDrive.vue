<script setup lang="ts">
import MathQuiz from './quiz/MathQuiz.vue'
import { computed, ref } from 'vue'

const message = ref('hello world!')
const age = ref()

setTimeout(() => {
  console.log('Changed!')
  message.value = 'Bye!'
  age.value = 24
}, 5e3)

const canDrive = computed(() => (age.value > 18 ? 'Yes' : 'No'))
</script>

<template>
  <p>{{ message }}</p>

  <fieldset class="border border-(--border) rounded p-4 flex flex-col gap-2">
    <legend class="text-base font-semibold">Age Verification</legend>
    <label for="age-input">Enter your age:</label>
    <input
      id="age-input"
      v-model.number="age"
      type="number"
      class="w-full px-3 py-2 border border-(--border) rounded bg-(--surface) text-(--text)"
    />
  </fieldset>

  <p class="mt-4">
    Can you drive:
    <span :class="{ success: canDrive === 'Yes', danger: canDrive === 'No' }">{{ canDrive }}</span>
  </p>

  <hr class="my-4 border-t border-(--border)" />
  <MathQuiz />
</template>

<style scoped>
.success {
  color: var(--success);
  font-weight: 600;
}

.danger {
  color: var(--danger);
  font-weight: 600;
}
</style>
