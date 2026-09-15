<script setup lang="ts">
import RoundedCard from '@/components/ui/RoundedCard.vue'

defineProps<{ text: string }>()
defineEmits<{ (e: 'cancel'): void }>()
</script>

<template>
  <RoundedCard>
    {{ text }}
    <section class="flex justify-end p-4">
      <button class="text-sm text-(--danger)" @click="$emit('cancel')">Cancel</button>
    </section>
  </RoundedCard>
</template>
