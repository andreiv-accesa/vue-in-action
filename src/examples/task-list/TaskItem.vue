<script setup lang="ts">
import type { Task } from './types'
import { getHighlightedSegments } from '@/shared/utils/getHighlightedSegments'
import { Edit } from '@/components/ui/icons'
import IconButton from '@/components/ui/IconButton.vue'

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
  <li
    class="w-full flex items-center justify-between p-2.5 bg-[var(--surface)] border border-[var(--border)] border-l-4 rounded transition-colors"
    :class="{ 'opacity-60': task.isCompleted }"
    :data-priority="task.priority"
  >
    <label class="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0">
      <input
        type="checkbox"
        :checked="task.isCompleted"
        class="w-4 h-4 cursor-pointer"
        @change="emit('toggle', task)"
      />
      <span
        class="text-sm"
        :class="{ 'line-through text-[var(--text-secondary)]': task.isCompleted }"
      >
        <template
          v-for="(segment, index) in getHighlightedSegments(task.text, searchQuery)"
          :key="index"
        >
          <mark
            v-if="segment.match"
            class="p-0 m-0 bg-[var(--mark-bg)] text-[var(--mark-color)] rounded-sm"
          >
            {{ segment.text }}
          </mark>
          <span v-else>{{ segment.text }}</span>
        </template>
      </span>
    </label>

    <div class="flex items-center gap-2 ml-2 flex-shrink-0">
      <IconButton ariaLabel="Edit task" type="edit" @click="emit('start-edit', task)">
        <Edit :size="18" />
      </IconButton>
      <IconButton ariaLabel="Remove task" type="remove" @click="emit('remove', task.id)">
        ✕
      </IconButton>
    </div>
  </li>
</template>

<style scoped>
li[data-priority='low'] {
  border-left-color: var(--priority-low);
}

li[data-priority='medium'] {
  border-left-color: var(--priority-medium);
}

li[data-priority='high'] {
  border-left-color: var(--priority-high);
}
</style>
