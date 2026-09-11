<script setup lang="ts">
import { computed } from 'vue'
import type { Priority } from './types'

const searchQuery = defineModel<string>('searchQuery', { required: true })
const priorityFilter = defineModel<Priority | 'all'>('priorityFilter', { required: true })

const emit = defineEmits<{ (e: 'clear-filters'): void }>()

const hasActiveFilters = computed(() => searchQuery.value !== '' || priorityFilter.value !== 'all')

function handleReset() {
  emit('clear-filters')
}
</script>

<template>
  <form @reset.prevent="handleReset" class="filter-form">
    <label for="search-input" class="sr-only">Search tasks</label>
    <input
      id="search-input"
      v-model.trim="searchQuery"
      type="search"
      placeholder="Search by name..."
      class="search-input"
    />

    <label for="filter-priority" class="sr-only">Filter by priority</label>
    <select id="filter-priority" v-model="priorityFilter">
      <option value="all">All Priorities</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

    <button type="reset" :disabled="!hasActiveFilters">Clear Filters</button>
  </form>
</template>

<style scoped>
.filter-form {
  display: flex;
  gap: 0.5rem;
}

.search-input {
  flex: 1;
}
</style>
