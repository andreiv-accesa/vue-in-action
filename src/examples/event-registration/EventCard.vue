<script setup lang="ts">
import SectionCard from '@/components/ui/SectionCard.vue'

defineProps<{ title: string; date: string; description: string }>()
defineEmits<{ (e: 'register'): void }>()
</script>

<template>
  <SectionCard>
    <template #header>
      {{ title }}
    </template>

    <p class="p-4 border-b border-(--border)">{{ date }}</p>
    <p class="p-4">{{ description }}</p>

    <template #footer>
      <button class="text-sm text-(--accent) ml-auto block" @click="$emit('register')">
        Register
      </button>
    </template>
  </SectionCard>
</template>
