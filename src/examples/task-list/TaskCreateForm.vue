<script setup lang="ts">
import { ref } from 'vue'
import type { Priority } from './types'

const emit = defineEmits<{
  (e: 'add-task', payload: { text: string; priority: Priority }): void
}>()

const newTaskText = ref('')
const newTaskPriority = ref<Priority>('medium')

function handleSubmit() {
  if (!newTaskText.value) return

  emit('add-task', {
    text: newTaskText.value,
    priority: newTaskPriority.value,
  })

  newTaskText.value = ''
  newTaskPriority.value = 'medium'
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <label for="new-task-input" class="sr-only">Task text</label>
    <input
      id="new-task-input"
      v-model.trim="newTaskText"
      type="text"
      placeholder="Enter new task..."
      class="task-input"
      required
      autofocus
    />

    <label for="new-task-priority" class="sr-only">Priority</label>
    <select id="new-task-priority" v-model="newTaskPriority">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

    <button type="submit" :disabled="!newTaskText">Add Task</button>
  </form>
</template>

<style scoped>
.task-form {
  display: flex;
  gap: 0.5rem;
}

.task-input {
  flex: 1;
}
</style>
