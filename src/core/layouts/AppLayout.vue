<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import AppHeader from '@/components/ui/AppHeader.vue'

const router = useRouter()
const route = useRoute()

const handleBack = () => {
  router.back()
}
</script>

<template>
  <div class="min-h-screen bg-[canvas] text-[canvastext]">
    <AppHeader
      :title="(route.meta.title as string) || 'Vue Examples'"
      :show-back="(route.meta.showBack as boolean) || false"
      @back="handleBack"
    />
    <main class="mx-auto flex flex-col w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <RouterView />
    </main>
  </div>
</template>
