import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTilesStore = defineStore('tiles', () => {
  const tileOne = ref<null | string>(null)
  const tileTwo = ref<null | string>(null)

  const isTheSame = computed(
    () =>
      tileOne.value === tileTwo.value &&
      typeof tileOne.value === 'string' &&
      typeof tileTwo.value === 'string',
  )

  function resetTiles() {
    tileOne.value = null
    tileTwo.value = null
  }

  return { isTheSame, tileOne, tileTwo, resetTiles }
})
