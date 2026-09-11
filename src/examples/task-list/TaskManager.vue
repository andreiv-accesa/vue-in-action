<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { generateId } from '@/shared/utils/generateId'
import type { Task, Priority } from './types'

import TaskEditForm from './TaskEditForm.vue'
import TaskItem from './TaskItem.vue'

const tasks = useStorage<Task[]>('tasks-app-data', [])
const searchQuery = ref('')
const selectedPriorityFilter = ref<Priority | 'all'>('all')
const editingTaskId = ref<string | null>(null)

const newTaskText = ref('')
const newTaskPriority = ref<Priority>('medium')

const filteredTasks = computed(() => {
  const query = searchQuery.value.toLowerCase()

  return tasks.value.filter((task) => {
    const matchesSearch = !query || task.text.toLowerCase().includes(query)
    const matchesPriority =
      selectedPriorityFilter.value === 'all' || task.priority === selectedPriorityFilter.value

    return matchesSearch && matchesPriority
  })
})

function handleAddTask() {
  if (!newTaskText.value) return

  tasks.value.push({
    id: generateId(),
    text: newTaskText.value,
    priority: newTaskPriority.value,
    isCompleted: false,
  })

  newTaskText.value = ''
  newTaskPriority.value = 'medium'
}

function handleToggleTask(task: Task) {
  task.isCompleted = !task.isCompleted
}

function handleRemoveTask(id: string) {
  tasks.value = tasks.value.filter((t) => t.id !== id)
  if (editingTaskId.value === id) {
    editingTaskId.value = null
  }
}

function handleStartEdit(task: Task) {
  editingTaskId.value = task.id
}

function handleSaveEdit(payload: { id: string; text: string; priority: Priority }) {
  const targetTask = tasks.value.find((t) => t.id === payload.id)
  if (targetTask) {
    targetTask.text = payload.text
    targetTask.priority = payload.priority
  }
  editingTaskId.value = null
}

function handleCancelEdit() {
  editingTaskId.value = null
}

const hasActiveFilters = computed(
  () => searchQuery.value !== '' || selectedPriorityFilter.value !== 'all',
)

function handleClearFilters() {
  searchQuery.value = ''
  selectedPriorityFilter.value = 'all'
}
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <form class="flex gap-2 items-center w-full">
      <input
        id="new-task-input"
        v-model.trim="newTaskText"
        type="text"
        placeholder="Enter new task..."
        class="flex-1 px-3 py-2 border border-[var(--border)] rounded bg-[var(--surface)] text-[var(--text)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
        required
        autofocus
      />

      <select
        id="new-task-priority"
        v-model="newTaskPriority"
        class="px-3 py-2 border border-[var(--border)] rounded bg-[var(--surface)] text-[var(--text)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        type="submit"
        :disabled="!newTaskText"
        class="px-4 py-2 bg-[var(--accent)] text-white rounded font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity whitespace-nowrap"
        @click="handleAddTask"
      >
        Add Task
      </button>
    </form>

    <form class="flex gap-2 items-center w-full">
      <input
        id="search-input"
        v-model.trim="searchQuery"
        type="search"
        placeholder="Search by name..."
        class="flex-1 px-3 py-2 border border-[var(--border)] rounded bg-[var(--surface)] text-[var(--text)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
      />

      <select
        id="filter-priority"
        v-model="selectedPriorityFilter"
        class="px-3 py-2 border border-[var(--border)] rounded bg-[var(--surface)] text-[var(--text)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
      >
        <option value="all">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        type="reset"
        :disabled="!hasActiveFilters"
        class="px-4 py-2 bg-[var(--border)] text-[var(--text)] rounded font-medium hover:bg-[var(--border-strong)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
        @click="handleClearFilters"
      >
        Clear
      </button>
    </form>

    <hr class="border-t border-[var(--border)] my-2" />

    <main class="w-full">
      <TransitionGroup
        v-if="filteredTasks.length"
        name="task-list"
        tag="ul"
        class="relative flex flex-col-reverse gap-2 p-0 m-0 list-none"
        aria-label="Tasks list"
      >
        <li v-for="task in filteredTasks" :key="task.id" class="w-full">
          <TaskEditForm
            v-if="editingTaskId === task.id"
            :task="task"
            @save="handleSaveEdit"
            @cancel="handleCancelEdit"
          />
          <TaskItem
            v-else
            :task="task"
            :search-query="searchQuery"
            @toggle="handleToggleTask"
            @remove="handleRemoveTask"
            @start-edit="handleStartEdit"
          />
        </li>
      </TransitionGroup>

      <p v-else class="text-center text-[var(--text-secondary)] py-8">No tasks found.</p>
    </main>
  </div>
</template>

<style scoped>
.task-list-move,
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.3s ease;
}

.task-list-enter-from,
.task-list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.task-list-leave-active {
  position: absolute;
}
</style>
