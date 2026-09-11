<script setup lang="ts">
import { ref } from 'vue'
import type { Task, Priority } from './types'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  (e: 'save', payload: { id: string; text: string; priority: Priority }): void
  (e: 'cancel'): void
}>()

const editTaskText = ref(props.task.text)
const editTaskPriority = ref<Priority>(props.task.priority)

function handleSave() {
  if (!editTaskText.value) return

  emit('save', {
    id: props.task.id,
    text: editTaskText.value,
    priority: editTaskPriority.value,
  })
}
</script>

<template>
  <li class="task-item editing">
    <form class="edit-form" @submit.prevent="handleSave">
      <input v-model.trim="editTaskText" type="text" class="edit-input" required />
      <select v-model="editTaskPriority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" :disabled="!editTaskText">Save</button>
      <button type="button" @click="emit('cancel')">Cancel</button>
    </form>
  </li>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  padding: 0.6rem 0.8rem;
  background: var(--surface);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);

  .edit-form {
    display: flex;
    gap: 0.5rem;
    width: 100%;

    .edit-input {
      flex: 1;
    }
  }
}
</style>
