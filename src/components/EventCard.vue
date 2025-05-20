<template>
  <div class="card" :class="typeClass">
    <div class="card-header">
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
    <div class="date">
      <IconDate />
      {{ dayjs(event.date).format('DD MMMM YYYY') }}
    </div>
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
import IconDate from './icons/IconDate.vue'

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
  padding: 12px;
  padding-top: 8px;
  color: #222;
  background-color: var(--card-color);
  box-shadow: 0px 0px 5px var(--card-color);

  border-radius: 12px;

  width: 315px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.card-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.disabled-link {
  opacity: 0.3;
}

.type {
  font-size: 0.8rem;
  font-weight: 300;
  padding: 0 8px;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--card-color);
}

.name {
  line-height: 1.25;
}

.date,
.place {
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1;

  svg {
    width: 15px;
    opacity: 0.8;
  }
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
