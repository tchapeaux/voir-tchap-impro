<template>
  <component
    :is="hasUrl ? 'a' : 'div'"
    class="card"
    :class="[typeClass, { 'is-clickable': hasUrl }]"
    :href="hasUrl ? event.url : undefined"
    :target="hasUrl ? '_blank' : undefined"
    @click="handleClick"
  >
    <div class="card-header">
      <div class="type">{{ event.type }}</div>
      <IconLink v-if="hasUrl" class="link-icon" />
    </div>

    <div class="card-body">
      <div class="date-badge">
        <span class="day">{{ dayjs(event.date).format('DD') }}</span>
        <span class="month">{{ dayjs(event.date).format('MMM') }}</span>
      </div>

      <div class="info">
        <div class="name">{{ event.name }}</div>
        <div class="place">
          <IconPin />
          {{ event.place }}
        </div>
      </div>
    </div>
  </component>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { computed } from 'vue'

import IconPin from './icons/IconPin.vue'
import IconLink from './icons/IconLink.vue'

const props = defineProps({ event: { type: Object, required: true } })

const TYPE_CLASSES = {
  Championnat: 'type--championnat',
  Croutounz: 'type--croutounz',
  Invitation: 'type--invitation',
  Arbitrage: 'type--arbitrage'
}

// @ts-ignore
const typeClass = computed(() => TYPE_CLASSES[props.event.type] || undefined)

const hasUrl = computed(() => !!props.event.url)

function handleClick(e: MouseEvent) {
  if (!hasUrl.value) {
    // If it's a div (not clickable), do nothing or maybe show a toast?
    // For now, we just don't do anything as it's not a link.
    e.preventDefault()
  }
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 16px;
  border-radius: 16px;
  background-color: var(--card-color);
  color: #222;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  text-decoration: none; /* For the <a> tag */
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  /* Responsive width handled by parent grid, but min-width for sanity */
  min-width: 250px;
  height: 100%; /* Fill height of grid cell */
}

.card.is-clickable:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.type {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
}

.link-icon {
  width: 18px;
  height: 18px;
  opacity: 0.6;
  color: #222;
}

.card-body {
  display: flex;
  gap: 16px;
  align-items: center;
}

.date-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  padding: 8px 12px;
  min-width: 60px;
  line-height: 1;
}

.date-badge .day {
  font-size: 1.5rem;
  font-weight: 800;
}

.date-badge .month {
  font-size: 0.9rem;
  text-transform: uppercase;
  font-weight: 600;
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.2;
}

.place {
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
  opacity: 0.8;

  svg {
    width: 14px;
    height: 14px;
  }
}

/* Color Themes */
.type--championnat {
  --card-color: var(--pink);
}
.type--croutounz {
  --card-color: var(--green);
}
.type--invitation {
  --card-color: var(--gold);
}
.type--arbitrage {
  --card-color: var(--grey);
}
</style>
