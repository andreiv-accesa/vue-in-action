<script setup lang="ts">
import type { Task } from './types'
import { getHighlightedSegments } from '@/shared/utils/getHighlightedSegments'

defineProps<{
  task: Task
  searchQuery: string
}>()

const emit = defineEmits<{
  (e: 'toggle', task: Task): void
  (e: 'remove', id: string): void
  (e: 'start-edit', task: Task): void
}>()
</script>

<template>
  <li class="task-item" :class="{ completed: task.isCompleted }" :data-priority="task.priority">
    <label class="task-checkbox-label">
      <input type="checkbox" :checked="task.isCompleted" @change="emit('toggle', task)" />
      <span class="task-text"
        ><template
          v-for="(segment, index) in getHighlightedSegments(task.text, searchQuery)"
          :key="index"
          ><mark v-if="segment.match">{{ segment.text }}</mark
          ><span v-else>{{ segment.text }}</span></template
        ></span
      >
    </label>

    <div class="task-actions">
      <button
        type="button"
        class="action-btn edit-btn"
        aria-label="Edit task"
        @click="emit('start-edit', task)"
      >
        ✎
      </button>
      <button
        type="button"
        class="action-btn remove-btn"
        aria-label="Remove task"
        @click="emit('remove', task.id)"
      >
        ✕
      </button>
    </div>
  </li>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.8rem;
  background: var(--surface);
  border: 1px solid var(--border-strong);
  border-left: 4px solid var(--border-strong);
  border-radius: var(--radius);
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;

  &[data-priority='low'] {
    border-left-color: var(--priority-low);
  }
  &[data-priority='medium'] {
    border-left-color: var(--priority-medium);
  }
  &[data-priority='high'] {
    border-left-color: var(--priority-high);
  }

  &.completed .task-text {
    text-decoration: line-through;
    opacity: 0.6;
  }

  .task-checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    cursor: pointer;
    flex: 1;
  }

  .task-text {
    display: inline;

    mark {
      padding: 0;
      margin: 0;
      background-color: var(--mark-bg);
      color: var(--mark-color);
      border-radius: 2px;
    }
  }

  .task-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .action-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    min-height: 2rem;
    padding: 0.25rem;
    border: 1px solid transparent;
    border-radius: var(--radius, 4px);
    background: transparent;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      top: -6px;
      right: -6px;
      bottom: -6px;
      left: -6px;
    }

    &.edit-btn:hover {
      color: var(--accent);
      background: color-mix(in srgb, var(--accent) 15%, transparent);
    }

    &.remove-btn:hover {
      color: var(--danger);
      background: color-mix(in srgb, var(--danger) 15%, transparent);
    }
  }
}
</style>
