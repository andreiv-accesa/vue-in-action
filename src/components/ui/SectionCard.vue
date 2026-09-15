<script setup lang="ts">
import RoundedCard from './RoundedCard.vue'
</script>

<template>
  <RoundedCard>
    <h3 v-if="$slots.header" class="text-lg font-medium p-4 border-b border-(--border)">
      <slot name="header" />
    </h3>

    <p v-if="$slots.default" class="border-b border-(--border)">
      <slot />
    </p>

    <section v-if="$slots.footer" class="p-4">
      <slot name="footer" />
    </section>
  </RoundedCard>
</template>
