<script setup>
import { useRacingStore } from '~~/stores/racing'

const racingStore = useRacingStore()
let animationFrames = {}
const horseRefs = ref({})

const currentRaceHorses = computed(() => racingStore.currentRaceHorses)
const currentRound = computed(() => racingStore.currentRound)
const currentRaceDistance = computed(() => racingStore.currentRaceDistance)
const horsePositions = computed(() => racingStore.horsePositions)

// Function to set horse refs
const setHorseRef = (el, horseId) => {
  if (el) {
    horseRefs.value[horseId] = el
  }
  else {
    delete horseRefs.value[horseId]
  }
}

const animateHorse = (horseId, targetPosition) => {
  const horseElement = horseRefs.value[horseId]
  if (!horseElement) {
    console.warn(`Horse element not found in refs: horse-${horseId}`)
    return
  }

  const trackLane = horseElement.parentElement
  if (!trackLane) return

  if (animationFrames[horseId]) {
    cancelAnimationFrame(animationFrames[horseId])
  }

  // Calculate target position
  const trackWidth = trackLane.offsetWidth - 32 // Horses have a width of 32px
  const targetPixels = (targetPosition / 100) * trackWidth

  const currentLeft = parseFloat(horseElement.style.left) || 0

  // If the target position is less than or equal to the current position, don't animate backward
  if (targetPixels <= currentLeft) {
    return // Don't animate backward
  }

  const startPosition = currentLeft
  const distance = targetPixels - startPosition
  const duration = 200
  const startTime = performance.now()

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    const currentPosition = startPosition + (distance * progress)
    horseElement.style.left = `${currentPosition}px`
    horseElement.style.transform = 'translateX(-50%)'

    if (progress < 1) {
      animationFrames[horseId] = requestAnimationFrame(animate)
    }
    else {
      // Animation complete
      delete animationFrames[horseId]
      horseElement.style.transform = 'translateX(-50%)'
    }
  }

  animationFrames[horseId] = requestAnimationFrame(animate)
}

// Watch for position changes
watch(horsePositions, async (newPositions) => {
  if (!newPositions) return

  // Wait for DOM updates
  await nextTick()

  Object.entries(newPositions).forEach(([horseId, position]) => {
    if (typeof position === 'number') {
      animateHorse(parseInt(horseId), position)
    }
  })
}, { deep: true, immediate: true })

watch(currentRaceHorses, async (newHorses) => {
  if (newHorses && newHorses.length > 0) {
    // Wait for DOM updates
    await nextTick()

    // Small additional delay to ensure all refs are set
    setTimeout(() => {
      newHorses.forEach((horse) => {
        const horseElement = horseRefs.value[horse.id]
        if (horseElement) {
          horseElement.style.left = '0px'
          horseElement.style.transform = 'translateX(-50%)'
        }
      })
    }, 50)
  }
}, { immediate: true })

onUnmounted(() => {
  Object.values(animationFrames).forEach((frameId) => {
    cancelAnimationFrame(frameId)
  })
  animationFrames = {}
  horseRefs.value = {}
})
</script>

<template>
  <UCard
    variant="soft"
  >
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">
        Race Track
      </h1>
      <div
        v-if="currentRound > 0"
        class="text-sm"
      >
        Round {{ currentRound }} - {{ currentRaceDistance }}m
      </div>
    </div>

    <div class="min-h-96">
      <UAlert
        v-if="currentRaceHorses.length === 0"
        color="info"
        title="Generate a race schedule and start racing!"
      />

      <div
        v-else
        class="space-y-2"
      >
        <div
          v-for="horse in currentRaceHorses"
          :key="horse.id"
          class="relative h-7 bg-white rounded border-2 border-gray-300 track-lane"
        >
          <div class="absolute inset-0 flex items-center bg-primary-150">
            <div class="absolute right-0 w-2 h-full bg-red-500" />
          </div>
          <div
            :ref="el => setHorseRef(el, horse.id)"
            class="absolute top-0 h-6 w-6 flex items-center justify-center horse-element"
            :style="{
              left: '0px',
              transform: 'translateX(-50%)',
              zIndex: 10,
            }"
          >
            <div
              class="w-6 h-6 rounded flex items-center justify-center p-1"
              :style="{ backgroundColor: horse.color }"
            >
              <NuxtImg src="/horse.svg" />
            </div>
          </div>
          <div class="absolute left-5 -bottom-2 text-xs font-medium text-gray-700 leading-8 z-5">
            {{ horse.name }}
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<style scoped>
.horse-element {
  transition: none !important;
}

.track-lane {
  position: relative;
  overflow: visible;
}
</style>
