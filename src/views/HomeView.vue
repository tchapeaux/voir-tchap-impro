<script setup lang="ts">
import { computed, ref } from 'vue'
import dayjs from 'dayjs'

import EventCard from '@/components/EventCard.vue'
import EVENTS from '../data/thomas-events.json'
import { type Event } from '@/types/events'

const pastClosed = ref(true)

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

const nextEvent = computed(() => futureEvents.value[0])
const otherEvents = computed(() => futureEvents.value.slice(1))

const pastEvents = computed(() =>
  EVENTS.items.filter((e) => !futureEvents.value.includes(e)).sort(sortEventByDateDesc)
)

const eventsYears = computed(() => {
  const years = otherEvents.value.map((e) => dayjs(e.date).format('YYYY'))
  return Array.from(new Set(years))
})

function eventsByYear(year: string) {
  return otherEvents.value.filter((e) => dayjs(e.date).format('YYYY') === year)
}

const pastEventsYears = computed(() => {
  const years = pastEvents.value.map((e) => dayjs(e.date).format('YYYY'))
  return Array.from(new Set(years))
})

function pastEventsByYear(year: string) {
  return pastEvents.value.filter((e) => dayjs(e.date).format('YYYY') === year)
}
</script>

<template>
  <div class="events-container">
    <div v-if="futureEvents.length === 0" class="no-events">Pas de spectacles à venir.</div>
    <template v-else>
      <section class="next-event-section" v-if="nextEvent">
        <h2>Prochainement</h2>
        <div class="next-event-wrapper">
          <EventCard :event="nextEvent" class="highlighted-card" />
        </div>
      </section>

      <div v-for="year in eventsYears" :key="year" class="events-year-section">
        <div class="year-separator">
          <span>{{ year }}</span>
          <div class="line"></div>
        </div>
        <ul class="events-list">
          <li
            v-for="(event, eventIdx) in eventsByYear(year)"
            :key="eventIdx"
            class="event-item"
            :style="{ animationDelay: `${eventIdx * 100}ms` }"
          >
            <EventCard :event="event" />
          </li>
        </ul>
      </div>
    </template>

    <button class="showPast" v-if="pastClosed" @click="() => (pastClosed = !pastClosed)">
      Voir les événements passés
    </button>
    <template v-else>
      <h2>Déjà passés</h2>
      <div v-for="year in pastEventsYears" :key="year" class="events-year-section">
        <div class="year-separator">
          <span>{{ year }}</span>
          <div class="line"></div>
        </div>
        <ul class="events-list past-list">
          <li v-for="(event, eventIdx) in pastEventsByYear(year)" :key="eventIdx">
            <EventCard :event="event" />
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<style scoped>
.events-container {
  margin-top: 3rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.no-events {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}

h2 {
  text-align: center;
  font-size: 1.8rem;
  color: var(--vt-c-indigo);
}

.next-event-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.next-event-wrapper {
  display: flex;
  justify-content: center;
}

.highlighted-card {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.events-year-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.year-separator {
  display: flex;
  align-items: center;
  gap: 16px;
  opacity: 0.8;
}

.year-separator span {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--vt-c-divider-dark-1);
}

.year-separator .line {
  flex: 1;
  height: 2px;
  background-color: var(--vt-c-divider-light-2);
  border-radius: 2px;
}

.events-list {
  list-style: none;
  margin: 0;
  padding: 0;

  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.event-item {
  animation: slideUp 0.5s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.showPast {
  width: 100%;
  text-align: center;

  font-size: 1rem;
  color: #666;

  background: none;
  border: 2px dashed #ccc;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    color: teal;
    border-color: teal;
    background-color: rgba(0, 128, 128, 0.05);
  }
}

.past-list {
  opacity: 0.7;
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
