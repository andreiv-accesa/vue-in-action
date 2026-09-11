<template>
  <form :class="['flex', horizontal ? 'flex-row' : 'flex-col', 'gap-2']">
    <slot />
  </form>
</template>

<script setup lang="ts">
defineProps<{
  horizontal?: boolean
}>()
</script>
