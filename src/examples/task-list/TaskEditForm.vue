<script setup lang="ts">
import { ref } from 'vue'
import type { Task, Priority } from './types'
import FormRow from '@/components/ui/FormRow.vue'

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
  <li
    class="flex items-center justify-between p-2.5 bg-[var(--surface)] border border-2 border-[var(--accent)] rounded"
  >
    <FormRow class="w-full">
      <input
        v-model.trim="editTaskText"
        type="text"
        class="flex-1 px-3 py-2 border border-[var(--border)] rounded bg-[var(--surface)] text-[var(--text)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
        required
      />
      <select
        v-model="editTaskPriority"
        class="px-3 py-2 border border-[var(--border)] rounded bg-[var(--surface)] text-[var(--text)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        type="submit"
        :disabled="!editTaskText"
        class="px-4 py-2 bg-[var(--accent)] text-white rounded font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        @click="handleSave"
      >
        Save
      </button>
      <button
        type="button"
        class="px-4 py-2 bg-[var(--border)] text-[var(--text)] rounded font-medium hover:bg-[var(--border-strong)] transition-colors"
        @click="emit('cancel')"
      >
        Cancel
      </button>
    </FormRow>
  </li>
</template>
