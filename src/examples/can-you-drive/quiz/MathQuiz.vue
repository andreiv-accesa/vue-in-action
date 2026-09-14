<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

defineOptions({
  name: 'MathQuiz',
})

type MathQuestion = {
  question: string
  answer: number
}

const QUESTIONS: MathQuestion[] = [
  { question: 'How much is 2 x 2?', answer: 4 },
  { question: 'What is 5 + 7?', answer: 12 },
  { question: 'What is 15 - 8?', answer: 7 },
  { question: 'What is 9 x 6?', answer: 54 },
  { question: 'What is 49 / 7?', answer: 7 },
  { question: 'What is 12 x 12?', answer: 144 },
  { question: 'What is 8 + 14?', answer: 22 },
  { question: 'What is 100 - 37?', answer: 63 },
  { question: 'What is 8 x 7?', answer: 56 },
  { question: 'What is 81 / 9?', answer: 9 },
  { question: 'What is 15 x 3?', answer: 45 },
  { question: 'What is 64 / 8?', answer: 8 },
  { question: 'What is 17 + 28?', answer: 45 },
  { question: 'What is 50 - 18?', answer: 32 },
  { question: 'What is 11 x 11?', answer: 121 },
  { question: 'What is 7 x 4?', answer: 28 },
  { question: 'What is 90 / 6?', answer: 15 },
  { question: 'What is 13 + 19?', answer: 32 },
  { question: 'What is 100 / 4?', answer: 25 },
  { question: 'What is 6 x 14?', answer: 84 },
  { question: 'What is 14 x 5?', answer: 70 },
  { question: 'What is 144 / 12?', answer: 12 },
  { question: 'What is 85 - 29?', answer: 56 },
  { question: 'What is 16 x 4?', answer: 64 },
  { question: 'What is 72 / 8?', answer: 9 },
  { question: 'What is 23 + 47?', answer: 70 },
  { question: 'What is 9 x 9?', answer: 81 },
  { question: 'What is 96 / 6?', answer: 16 },
  { question: 'What is 35 + 48?', answer: 83 },
  { question: 'What is 18 x 3?', answer: 54 },
]

const currentQuestionIndex = ref(0)
const score = ref(0)
const userAnswer = ref<number | null>(null)
const isFinished = ref(false)

let timerId: ReturnType<typeof setInterval> | null = null

const currentQuestion = computed(() => QUESTIONS[currentQuestionIndex.value] ?? null)

function evaluateAndAdvance() {
  if (isFinished.value) return

  if (userAnswer.value !== null && userAnswer.value === currentQuestion.value?.answer) {
    score.value++
  }

  userAnswer.value = null
  currentQuestionIndex.value++

  if (currentQuestionIndex.value >= QUESTIONS.length) {
    finishQuiz()
  }
}

function startTimer() {
  stopTimer()
  timerId = setInterval(evaluateAndAdvance, 4e3)
}

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId)
    timerId = null
  }
}

function finishQuiz() {
  stopTimer()
  isFinished.value = true
}

function handleSubmit() {
  evaluateAndAdvance()
  if (!isFinished.value) {
    startTimer()
  }
}

onMounted(startTimer)
onUnmounted(stopTimer)
</script>

<template>
  <div class="max-w-sm">
    <div v-if="!isFinished" class="flex flex-col gap-4">
      <p>Your score: {{ score }}</p>

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
        <fieldset class="flex flex-col gap-2">
          <legend class="text-lg font-bold">
            Question {{ currentQuestionIndex + 1 }} / {{ QUESTIONS.length }}
          </legend>
          <p class="text-base font-semibold">{{ currentQuestion?.question }}</p>
        </fieldset>
        <input
          v-model.number="userAnswer"
          type="number"
          placeholder="Enter answer"
          autofocus
          class="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--surface)] text-[var(--text)]"
        />
        <button
          type="submit"
          class="px-4 py-2 bg-[var(--accent)] text-white rounded font-medium hover:opacity-90 transition-opacity"
        >
          Submit
        </button>
      </form>
    </div>

    <div
      v-else
      class="flex flex-col gap-3 p-4 bg-[var(--surface)] rounded border border-[var(--border)]"
    >
      <h2 class="text-xl font-bold">Quiz Complete!</h2>
      <p class="text-base">Final Score: {{ score }} / {{ QUESTIONS.length }}</p>
    </div>
  </div>
</template>
