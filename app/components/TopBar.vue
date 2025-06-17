<script setup>
import { useRacingStore } from '~~/stores/racing'

const racingStore = useRacingStore()

const isRacing = computed(() => racingStore.isRacing)
const raceSchedule = computed(() => racingStore.raceSchedule)
const currentRound = computed(() => racingStore.currentRound)

const generateSchedule = () => {
  racingStore.generateRaceSchedule()
}

const startRacing = () => {
  racingStore.startRace()
}

const resetGame = () => {
  racingStore.resetGame()
}
</script>

<template>
  <UCard
    variant="soft"
    class="my-4"
  >
    <div class="flex">
      <UButton
        color="info"
        :disabled="isRacing || raceSchedule.length > 0"
        @click="generateSchedule"
      >
        Generate Program
      </UButton>
      <div class="flex-grow" />
      <UTooltip :text="raceSchedule.length === 0 ? 'Generate Race Schedule first' : 'Start Race'">
        <UButton
          class="mr-2"
          :disabled="isRacing || raceSchedule.length === 0"
          @click="startRacing"
        >
          {{ isRacing ? 'Racing...' : 'Start' }}
        </UButton>
      </UTooltip>

      <UButton
        color="error"
        variant="outline"
        :disabled="isRacing"
        @click="resetGame"
      >
        Reset
      </UButton>
    </div>
  </UCard>

  <!-- Race Schedule -->
  <UCard
    v-if="raceSchedule.length > 0"
    class="my-4"
    variant="soft"
  >
    <div class="text-xl font-bold mb-4">
      Race Schedule
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
      <UCard
        v-for="race in raceSchedule"
        :key="race.round"
        class="text-center"
        :class="{
          'border border-primary': race.completed && !isRacing,
          'border border-secondary': race.round === currentRound && isRacing,
        }"
      >
        <div class="font-bold">
          Race {{ race.round }}
        </div>
        <div class="text-xs text-gray-100">
          {{ race.distance }}m
        </div>
      </UCard>
    </div>
  </UCard>
</template>
