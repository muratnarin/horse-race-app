import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useRacingStore = defineStore('racing', () => {
  // State variables
  const horses = ref([])
  const raceSchedule = ref([])
  const currentRound = ref(0)
  const isRacing = ref(false)
  const raceResults = ref([])
  const currentRaceHorses = ref([])
  const horsePositions = ref({})

  // Race distances for each round
  const distances = [1200, 1400, 1600, 1800, 2000, 2200]

  // Horse colors
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2',
    '#A3E4D7', '#F9E79F', '#FADBD8', '#D5DBDB', '#AED6F1',
  ]

  // Computed properties
  const currentRaceDistance = computed(() => {
    return currentRound.value > 0 ? distances[currentRound.value - 1] : 0
  })

  const isGameComplete = computed(() => {
    return currentRound.value >= 6 && !isRacing.value
  })

  const calculateRaceDuration = (distance) => {
    // Defined a base duration for the shortest distance (1200m) and scaled it proportionally for other distances
    const baseDuration = 3000 // 3 seconds for 1200m
    const baseDistance = 1200
    return Math.round((distance / baseDistance) * baseDuration)
  }

  // Actions
  const initializeHorses = () => {
    horses.value = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      name: `Horse ${index + 1}`,
      condition: Math.floor(Math.random() * 100) + 1,
      color: colors[index],
      totalWins: 0,
    }))
  }

  const generateRaceSchedule = () => {
    raceSchedule.value = distances.map((distance, index) => ({
      round: index + 1,
      distance: distance,
      completed: false,
      horses: [],
      results: [],
    }))
    currentRound.value = 0
    raceResults.value = []
    horsePositions.value = {}
  }

  const selectRandomHorses = () => {
    // Fisher-Yates Shuffle used here to randomly select 10 horses
    const shuffled = [...horses.value]

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled.slice(0, 10)
  }

  const calculateRaceTime = (horse, distance) => {
    // Calculated base speed according to horse condition and added some randomness since it's a horse race :)
    const baseSpeed = horse.condition / 100
    const randomFactor = 0.8 + Math.random() * 0.4 // 0.8 to 1.2
    const timePerMeter = (2 - baseSpeed) * randomFactor
    return distance * timePerMeter
  }

  const startRace = async () => {
    if (isRacing.value || raceSchedule.value.length === 0) return

    isRacing.value = true

    for (let round = 0; round < 6; round++) {
      currentRound.value = round + 1
      const selectedHorses = selectRandomHorses()
      currentRaceHorses.value = selectedHorses

      raceSchedule.value[round].horses = selectedHorses

      // Resetting horse positions for the new round
      const resetPositions = {}
      selectedHorses.forEach((horse) => {
        resetPositions[horse.id] = 0
      })
      horsePositions.value = resetPositions

      // Added small delay here to ensure UI updates
      await new Promise(resolve => setTimeout(resolve, 500))

      await runSingleRace(selectedHorses, distances[round])

      // Mark as completed after the current round finishes
      raceSchedule.value[round].completed = true

      // Small delay to ensure the UI can reflect the results
      await new Promise(resolve => setTimeout(resolve, 2000))
    }

    isRacing.value = false
  }

  const runSingleRace = async (raceHorses, distance) => {
    const horseTimes = raceHorses.map(horse => ({
      horse,
      finalTime: calculateRaceTime(horse, distance),
    })).sort((a, b) => a.finalTime - b.finalTime)

    // Calculate race duration based on distance - longer races take more time
    const raceDuration = calculateRaceDuration(distance)
    const updateInterval = 50
    const totalUpdates = raceDuration / updateInterval

    console.log(`Race ${currentRound.value}: ${distance}m - Duration: ${raceDuration / 1000}s`)

    return new Promise((resolve) => {
      let updateCount = 0

      const updatePositions = () => {
        updateCount++
        const progress = updateCount / totalUpdates

        if (progress >= 1) {
          // Race finished - set final positions
          const finalPositions = {}
          raceHorses.forEach((horse) => {
            finalPositions[horse.id] = 100
          })
          horsePositions.value = { ...finalPositions }

          // Calculate and store results
          const results = horseTimes.map((item, index) => ({
            position: index + 1,
            horse: item.horse,
            time: item.finalTime.toFixed(2),
          }))

          // Update winner's total wins
          if (results.length > 0) {
            const winner = results[0].horse
            const horseIndex = horses.value.findIndex(h => h.id === winner.id)
            if (horseIndex !== -1) {
              horses.value[horseIndex].totalWins++
            }
          }

          raceResults.value.push({
            round: currentRound.value,
            distance,
            results,
          })

          raceSchedule.value[currentRound.value - 1].results = results

          resolve()
          return
        }

        // Update horse positions based on their performance
        const newPositions = {}
        raceHorses.forEach((horse) => {
          const horseData = horseTimes.find(h => h.horse.id === horse.id)
          const relativeSpeed = 1 / horseData.finalTime
          const normalizedSpeed = relativeSpeed / Math.max(...horseTimes.map(h => 1 / h.finalTime))

          const baseProgress = progress * normalizedSpeed

          // Apply easing for more realistic acceleration
          const easedProgress = 1 - Math.pow(1 - Math.min(baseProgress, 1), 1.5)
          const calculatedPosition = easedProgress * 100

          const currentPosition = horsePositions.value[horse.id] || 0
          newPositions[horse.id] = Math.max(currentPosition, Math.min(calculatedPosition, 100))
        })

        horsePositions.value = { ...newPositions }

        setTimeout(updatePositions, updateInterval)
      }

      updatePositions()
    })
  }

  const resetGame = () => {
    raceSchedule.value = []
    currentRound.value = 0
    isRacing.value = false
    raceResults.value = []
    currentRaceHorses.value = []
    horsePositions.value = {}
    horses.value.forEach((horse) => {
      horse.totalWins = 0
    })
  }

  return {
    // State
    horses,
    raceSchedule,
    currentRound,
    isRacing,
    raceResults,
    currentRaceHorses,
    horsePositions,
    // Computed
    currentRaceDistance,
    isGameComplete,
    // Actions
    initializeHorses,
    generateRaceSchedule,
    startRace,
    resetGame,
    selectRandomHorses,
    calculateRaceTime,
    calculateRaceDuration,
  }
})
