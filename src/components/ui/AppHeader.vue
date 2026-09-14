<script setup lang="ts">
import { ArrowLeft } from '@/components/ui/icons'

defineProps<{
  title: string
  showBack?: boolean
}>()

const emit = defineEmits<{ back: [] }>()
</script>

<template>
  <header class="border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-sm">
    <div class="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <button
        v-if="showBack"
        class="flex h-9 w-9 items-center justify-center rounded-md border-0 bg-transparent p-0 text-[var(--text)] transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
        @click="emit('back')"
        aria-label="Go back"
      >
        <ArrowLeft :size="24" />
      </button>
      <h1 class="m-0 text-2xl font-semibold text-[var(--text)]">{{ title }}</h1>
    </div>
  </header>
</template>
