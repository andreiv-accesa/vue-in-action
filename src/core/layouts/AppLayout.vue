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
  <div class="flex flex-col h-full bg-[canvas] text-[canvastext]">
    <AppHeader
      :title="(route.meta.title as string) || 'Vue Examples'"
      :show-back="(route.meta.showBack as boolean) || false"
      @back="handleBack"
    />
    <main class="flex-1 overflow-y-auto">
      <div class="mx-auto flex flex-col w-full max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>
