<script setup>
import { useRacingStore } from '~~/stores/racing'

const racingStore = useRacingStore()

const horses = computed(() => racingStore.horses)
const currentRaceHorses = computed(() => racingStore.currentRaceHorses)

const isHorseRacing = (horseId) => {
  return currentRaceHorses.value.some(horse => horse.id === horseId)
}
</script>

<template>
  <UCard
    variant="soft"
  >
    <div class="text-xl font-bold mb-4">
      Horse List
    </div>
    <div class="space-y-1 max-h-96 overflow-y-auto">
      <UCard
        v-for="horse in horses"
        :key="horse.id"
        :class="{ 'border border-primary': isHorseRacing(horse.id) }"
      >
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-1">
            <div
              class="w-4 h-4 rounded-full"
              :style="{ backgroundColor: horse.color }"
            />
            <span class="font-medium text-sm">{{ horse.name }}</span>
          </div>
          <div class="text-right">
            <div class="text-xs">
              Condition: {{ horse.condition }}
            </div>
            <div class="text-xs text-primary">
              Wins: {{ horse.totalWins }}
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </UCard>
</template>
