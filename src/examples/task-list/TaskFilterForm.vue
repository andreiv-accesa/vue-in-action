<script setup lang="ts">
import { computed } from 'vue'
import type { Priority } from './types'
import FormRow from '@/components/ui/FormRow.vue'

const searchQuery = defineModel<string>('searchQuery', { required: true })
const priorityFilter = defineModel<Priority | 'all'>('priorityFilter', { required: true })

const emit = defineEmits<{ (e: 'clear-filters'): void }>()

const hasActiveFilters = computed(() => searchQuery.value !== '' || priorityFilter.value !== 'all')

function handleReset() {
  emit('clear-filters')
}
</script>

<template>
  <FormRow>
    <label for="search-input" class="sr-only">Search tasks</label>
    <input
      id="search-input"
      v-model.trim="searchQuery"
      type="search"
      placeholder="Search by name..."
      class="flex-1 px-3 py-2 border border-(--border) rounded bg-(--surface) text-(--text) focus-visible:outline-2 focus-visible:outline-(--accent)"
    />

    <label for="filter-priority" class="sr-only">Filter by priority</label>
    <select
      id="filter-priority"
      v-model="priorityFilter"
      class="form-select border border-(--border) rounded bg-(--surface) text-(--text) focus-visible:outline-2 focus-visible:outline-(--accent)"
    >
      <option value="all">All Priorities</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

    <button
      type="reset"
      :disabled="!hasActiveFilters"
      class="px-4 py-2 bg-(--border) text-(--text) rounded font-medium hover:bg-(--border-strong) disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      @click="handleReset"
    >
      Clear Filters
    </button>
  </FormRow>
</template>
