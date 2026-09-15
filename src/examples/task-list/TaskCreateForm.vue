<script setup lang="ts">
import { ref } from 'vue'
import type { Priority } from './types'
import FormRow from '@/components/ui/FormRow.vue'

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
  <FormRow>
    <label for="new-task-input" class="sr-only">Task text</label>
    <input
      id="new-task-input"
      v-model.trim="newTaskText"
      type="text"
      placeholder="Enter new task..."
      class="flex-1 px-3 py-2 border border-(--border) rounded bg-(--surface) text-(--text) focus-visible:outline-2 focus-visible:outline-(--accent)"
      required
      autofocus
    />

    <label for="new-task-priority" class="sr-only">Priority</label>
    <select
      id="new-task-priority"
      v-model="newTaskPriority"
      class="form-select border border-(--border) rounded bg-(--surface) text-(--text) focus-visible:outline-2 focus-visible:outline-(--accent)"
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

    <button
      type="submit"
      :disabled="!newTaskText"
      class="px-4 py-2 bg-(--accent) text-white rounded font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
      @click="handleSubmit"
    >
      Add Task
    </button>
  </FormRow>
</template>
