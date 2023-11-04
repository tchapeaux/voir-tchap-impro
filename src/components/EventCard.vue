<template>
  <div class="card" :class="typeClass">
    <div class="card-header">
      <div class="date">{{ dayjs(event.date).format('DD MMM YY') }}</div>
      <div class="type">{{ event.type }}</div>
      <a
        class="external-link"
        :class="{ 'disabled-link': !hasUrl }"
        :href="event.url"
        @click="handleClick"
        :title="hasUrl ? `Plus d'infos pour ${event.name}` : undefined"
        :aria-hidden="!hasUrl"
        target="_blank"
        ><IconLink
      /></a>
    </div>
    <div class="name">{{ event.name }}</div>
    <div class="place">
      <IconPin />
      {{ event.place }}
    </div>
  </div>
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

function handleClick() {
  if (!props.event.url) {
    alert('Pas de lien disponible')
  }
}
</script>

<style scoped>
.card {
  padding: 16px;
  color: black;
  background-color: var(--card-color);
  box-shadow: 0px 0px 5px var(--card-color);

  width: 315px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.card-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.disabled-link {
  opacity: 0.3;
}

.date {
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1;
}

.type {
  font-size: 0.9rem;
  padding: 0 8px;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.1);
}

.place {
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

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
