import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRacingStore } from '../stores/racing'

describe('Racing Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize 20 horses', () => {
    const store = useRacingStore()
    store.initializeHorses()

    expect(store.horses).toHaveLength(20)
    expect(store.horses[0]).toHaveProperty('name')
    expect(store.horses[0]).toHaveProperty('condition')
    expect(store.horses[0]).toHaveProperty('color')
  })

  it('should generate race schedule with 6 rounds', () => {
    const store = useRacingStore()
    store.generateRaceSchedule()

    expect(store.raceSchedule).toHaveLength(6)
    expect(store.raceSchedule[0].distance).toBe(1200)
    expect(store.raceSchedule[5].distance).toBe(2200)
  })

  it('should select 10 random horses for race', () => {
    const store = useRacingStore()
    store.initializeHorses()

    const selectedHorses = store.selectRandomHorses()

    expect(selectedHorses).toHaveLength(10)
    expect(selectedHorses[0]).toHaveProperty('id')
  })
})
