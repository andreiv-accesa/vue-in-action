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
  <div class="index-page">
    <section class="hero">
      <h1>Vue 3 Learning Examples</h1>
      <p>Explore practical Vue 3 patterns and best practices</p>
    </section>

    <section class="examples">
      <div v-for="example in examples" :key="example.id" class="example-card">
        <router-link :to="example.path" class="card-link">
          <h2>{{ example.title }}</h2>
          <p>{{ example.description }}</p>
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.index-page {
  min-height: calc(100vh - 80px);
  background-color: var(--surface);
}

.hero {
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(
    135deg,
    var(--accent),
    color-mix(in srgb, var(--accent) 70%, var(--surface))
  );
  color: white;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.hero h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
}

.hero p {
  margin: 0;
  font-size: 1.125rem;
  opacity: 0.95;
}

.examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.example-card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.example-card:hover {
  border-color: var(--accent);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
  transform: translateY(-2px);
}

.card-link {
  display: block;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
}

.example-card h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: var(--text);
}

.example-card p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
}
</style>
