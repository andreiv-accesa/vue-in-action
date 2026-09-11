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
  <div class="app-layout">
    <AppHeader
      :title="(route.meta.title as string) || 'Vue Examples'"
      :show-back="(route.meta.showBack as boolean) || false"
      @back="handleBack"
    />
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style>
