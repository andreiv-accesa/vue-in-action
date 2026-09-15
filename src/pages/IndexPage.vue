<script setup lang="ts">
import { computed } from 'vue'

interface Example {
  id: string
  path: string
  title: string
  description: string
}

const examples = computed<Example[]>(() => [
  {
    id: 'can-you-drive',
    path: '/examples/can-you-drive',
    title: '02 Can You Drive?',
    description: 'Learn about computed properties and lifecycle hooks',
  },
  {
    id: 'image-gallery',
    path: '/examples/image-gallery',
    title: '03 Image Gallery',
    description: 'Master list management and state handling',
  },
  {
    id: 'task-list',
    path: '/examples/task-list',
    title: '04 Task List',
    description: 'Build a complete CRUD application with filtering',
  },
  {
    id: 'event-registration',
    path: '/examples/event-registration',
    title: '05 Event Registration',
    description: 'Manage event registrations with dynamic data',
  },
])
</script>

<template>
  <div class="w-full space-y-8">
    <section
      class="rounded-xl bg-linear-to-br from-(--accent) to-[color-mix(in_srgb,var(--accent)_70%,var(--surface))] px-6 py-12 text-center text-white shadow-sm"
    >
      <h1 class="mb-2 text-4xl font-bold tracking-tight">Vue 3 Learning Examples</h1>
      <p class="m-0 text-lg opacity-95">Explore practical Vue 3 patterns and best practices</p>
    </section>

    <section class="grid gap-6 md:grid-cols-2">
      <div
        v-for="example in examples"
        :key="example.id"
        class="overflow-hidden rounded-xl border border-(--border) bg-(--surface) transition-all duration-300 hover:-translate-y-0.5 hover:border-(--accent) hover:shadow-lg"
      >
        <router-link :to="example.path" class="block p-6 text-inherit no-underline">
          <h2 class="mb-2 text-xl font-semibold text-(--text)">{{ example.title }}</h2>
          <p class="m-0 text-[0.95rem] text-[color-mix(in_srgb,var(--text)_70%,transparent)]">
            {{ example.description }}
          </p>
        </router-link>
      </div>
    </section>
  </div>
</template>
