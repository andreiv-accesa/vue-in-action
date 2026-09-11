<script setup lang="ts">
import { ChevronLeft } from '@/components/ui/icons'

defineProps<{
  title: string
  showBack?: boolean
}>()

const emit = defineEmits<{
  back: []
}>()
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <button v-if="showBack" class="back-button" @click="emit('back')" aria-label="Go back">
        <ChevronLeft :size="20" />
      </button>
      <h1 class="header-title">{{ title }}</h1>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background-color: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 1rem;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.back-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: var(--accent-subtle, rgba(99, 102, 241, 0.1));
}

.header-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text);
}
</style>
