<script setup>
import { useRacingStore } from '~~/stores/racing'

const racingStore = useRacingStore()
const raceResults = computed(() => racingStore.raceResults)
</script>

<template>
  <UCard
    variant="soft"
  >
    <div class="text-xl font-bold mb-4">
      Results
    </div>

    <div
      v-if="raceResults.length === 0"
      class="text-center text-gray-500 py-8"
    >
      No race results yet
    </div>

    <div
      v-else
      class="space-y-4 max-h-96 overflow-y-auto"
    >
      <UCard
        v-for="result in raceResults"
        :key="result.round"
      >
        <div class="font-bold text-sm mb-2">
          Round {{ result.round }} - {{ result.distance }}m
        </div>
        <div class="space-y-1">
          <div
            v-for="(position, index) in result.results"
            :key="position.horse.id"
            class="flex items-center justify-between text-xs"
            :class="{
              'text-primary font-bold': index === 0,
              'text-secondary': index === 1,
              'text-error': index === 2,
            }"
          >
            <div class="flex items-center space-x-1">
              <span class="font-medium">{{ position.position }}.</span>
              <div
                class="w-3 h-3 rounded-full"
                :style="{ backgroundColor: position.horse.color }"
              />
              <span>{{ position.horse.name }}</span>
            </div>
            <span>{{ position.time }}s</span>
          </div>
        </div>
      </UCard>
    </div>
  </UCard>
</template>
