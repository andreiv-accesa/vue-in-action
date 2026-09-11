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

  <label>
    Enter your age
    <input v-model="age" />
  </label>
  <p>
    Can you drive:
    <span :class="{ can: canDrive === 'Yes', cant: canDrive === 'No' }">{{ canDrive }}</span>
  </p>

  <hr />
  <MathQuiz />
</template>

<style scoped>
.can {
  color: green;
}
.cant {
  color: red;
}
</style>
