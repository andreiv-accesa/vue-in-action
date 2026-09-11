<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { generateId } from '@/shared/utils/generateId'
import type { Task, Priority } from './types'

import TaskCreateForm from './TaskCreateForm.vue'
import TaskEditForm from './TaskEditForm.vue'
import TaskFilterForm from './TaskFilterForm.vue'
import TaskItem from './TaskItem.vue'

const tasks = useStorage<Task[]>('tasks-app-data', [])
const searchQuery = ref('')
const selectedPriorityFilter = ref<Priority | 'all'>('all')
const editingTaskId = ref<string | null>(null)

const filteredTasks = computed(() => {
  const query = searchQuery.value.toLowerCase()

  return tasks.value.filter((task) => {
    const matchesSearch = !query || task.text.toLowerCase().includes(query)
    const matchesPriority =
      selectedPriorityFilter.value === 'all' || task.priority === selectedPriorityFilter.value

    return matchesSearch && matchesPriority
  })
})

function handleAddTask(payload: { text: string; priority: Priority }) {
  tasks.value.push({
    id: generateId(),
    text: payload.text,
    priority: payload.priority,
    isCompleted: false,
  })
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

function handleClearFilters() {
  searchQuery.value = ''
  selectedPriorityFilter.value = 'all'
}
</script>

<template>
  <div class="task-manager">
    <TaskCreateForm @add-task="handleAddTask" />

    <TaskFilterForm
      v-model:searchQuery="searchQuery"
      v-model:priorityFilter="selectedPriorityFilter"
      @clear-filters="handleClearFilters"
    />

    <hr class="divider" />

    <main>
      <TransitionGroup
        v-if="filteredTasks.length"
        name="task-list"
        tag="ul"
        class="task-list"
        aria-label="Tasks list"
      >
        <li v-for="task in filteredTasks" :key="task.id" class="task-list-item">
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

      <p v-else class="description">No tasks found.</p>
    </main>
  </div>
</template>

<style scoped>
.task-manager {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.divider {
  border: none;
  border-top: 1px solid var(--border);
  margin-block: 0.5rem 1rem;
}

.task-list {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.task-list-item {
  width: 100%;
}

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
