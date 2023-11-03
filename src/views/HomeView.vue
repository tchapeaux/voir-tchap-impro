<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'

import EventCard from '@/components/EventCard.vue'
import EVENTS from '../data/thomas-events.json'

const futureEvents = computed(() => EVENTS.items.filter((e) => dayjs(e.date) > dayjs()))

const eventsYears = computed(() => {
  const years = futureEvents.value.map((e) => dayjs(e.date).format('YYYY'))
  return Array.from(new Set(years))
})

function eventsByYear(year: string) {
  return futureEvents.value.filter((e) => dayjs(e.date).format('YYYY') === year)
}
</script>

<template>
  <template v-if="futureEvents.length === 0">Rien à afficher.</template>
  <template v-else>
    <template v-for="year in eventsYears" :key="year">
      <h2>{{ year }}</h2>
      <ul class="events-list">
        <li v-for="(event, eventIdx) in eventsByYear(year)" :key="eventIdx">
          <EventCard :event="event" />
        </li>
      </ul>
    </template>
  </template>
</template>

<style scoped>
.events-list {
  list-style: none;
  margin: 0;
  padding: 0;

  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media screen and (min-width: 600px) {
  .events-list {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (min-width: 900px) {
  .events-list {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
