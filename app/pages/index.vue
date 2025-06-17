<script setup>
import { useRacingStore } from '~~/stores/racing'

const racingStore = useRacingStore()

onMounted(() => {
  // Initialize the horses when the page is mounted, page refresh will also refresh the horses
  racingStore.initializeHorses()
})
</script>

<template>
  <UContainer>
    <TopBar />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 lg:gap-4 space-y-4">
      <div class="col-span-2">
        <HorseList />
      </div>
      <div class="col-span-4">
        <RaceTrack />
      </div>
      <div class="col-span-2">
        <Results />
      </div>
    </div>
  </UContainer>
</template>
