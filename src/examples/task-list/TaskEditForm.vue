<script setup lang="ts">
import { ref } from 'vue'
import type { Task, Priority } from './types'
import FormRow from '@/components/ui/FormRow.vue'
import { Check, X } from '@/components/ui/icons'

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
  <FormRow horizontal class="w-full items-center">
    <label for="edit-task-input" class="sr-only">Edit task text</label>
    <input
      id="edit-task-input"
      v-model.trim="editTaskText"
      type="text"
      class="flex-1 min-w-0 px-3 py-2 border border-[var(--border)] rounded bg-[var(--surface)] text-[var(--text)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
      required
    />

    <label for="edit-task-priority" class="sr-only">Edit task priority</label>
    <select
      id="edit-task-priority"
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
      :aria-label="editTaskText ? 'Save task' : 'Save task disabled'"
      class="inline-flex items-center justify-center w-10 h-10 bg-[var(--accent)] text-white rounded font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
      @click="handleSave"
    >
      <Check :size="18" aria-hidden="true" />
      <span class="sr-only">Save</span>
    </button>

    <button
      type="button"
      aria-label="Cancel editing"
      class="inline-flex items-center justify-center w-10 h-10 bg-[var(--border)] text-[var(--text)] rounded font-medium hover:bg-[var(--border-strong)] transition-colors"
      @click="emit('cancel')"
    >
      <X :size="18" aria-hidden="true" />
      <span class="sr-only">Cancel</span>
    </button>
  </FormRow>
</template>
