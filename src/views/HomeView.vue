<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'

import EventCard from '@/components/EventCard.vue'
import EVENTS from '../data/thomas-events.json'
import { type Event } from '@/types/events'

function sortEventByDateAsc(e1: Event, e2: Event) {
  return dayjs(e1.date).isBefore(dayjs(e2.date)) ? -1 : 1
}

function sortEventByDateDesc(e1: Event, e2: Event) {
  return dayjs(e1.date).isBefore(dayjs(e2.date)) ? 1 : -1
}

const futureEvents = computed(() =>
  // Substract a small value to keep recent events for a few days and avoid timezone issues
  EVENTS.items.filter((e) => dayjs(e.date) > dayjs().subtract(1, 'week')).sort(sortEventByDateAsc)
)

const pastEvents = computed(() =>
  EVENTS.items.filter((e) => !futureEvents.value.includes(e)).sort(sortEventByDateDesc)
)

const eventsYears = computed(() => {
  const years = futureEvents.value.map((e) => dayjs(e.date).format('YYYY'))
  return Array.from(new Set(years))
})

function eventsByYear(year: string) {
  return futureEvents.value.filter((e) => dayjs(e.date).format('YYYY') === year)
}
</script>

<template>
  <div v-if="futureEvents.length === 0" style="text-align: center">Pas de spectacles à venir.</div>
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

  <h2>Déjà passés</h2>
  <ul class="events-list">
    <li v-for="(event, eventIdx) in pastEvents" :key="eventIdx">
      <EventCard :event="event" />
    </li>
  </ul>
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

@media screen and (min-width: 720px) {
  .events-list {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (min-width: 1040px) {
  .events-list {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
