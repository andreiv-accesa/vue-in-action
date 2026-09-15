<script setup lang="ts">
import EventCard from './EventCard.vue'
import BookingItem from './BookingItem.vue'

function handleRegister() {
  console.log('Registered for event')
}
</script>

<template>
  <h2 class="text-xl font-medium">All Events</h2>
  <ul class="list-none grid gap-8 md:grid-cols-2">
    <EventCard
      v-for="i in 8"
      :key="i"
      title="Vue Conference 2026"
      date="June 15, 2026"
      description="Join us for an exciting Vue.js conference!"
      @register="handleRegister"
    />
  </ul>
  <h2 class="text-xl font-medium">Your Bookings</h2>
  <ul class="list-none flex flex-col gap-4">
    <BookingItem v-for="i in 3" :key="i" text="Vue Conference 2026" />
  </ul>
</template>
