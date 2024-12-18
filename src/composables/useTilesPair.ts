import { ref, computed, watchEffect } from 'vue'

type Tile = { uniqueID: string; mathID: string; isMathed: boolean; content: string }

const items: Tile[] = [
  { uniqueID: '1', content: '👩', isMathed: false, mathID: 'face' },
  { uniqueID: '2', content: '👩', isMathed: false, mathID: 'face' },
  { uniqueID: '3', content: '👨‍🌾', isMathed: false, mathID: 'person' },
  { uniqueID: '4', content: '👨‍🌾', isMathed: false, mathID: 'person' },
  { uniqueID: '5', content: '🎃', isMathed: false, mathID: 'pumpkin' },
  { uniqueID: '6', content: '🎃', isMathed: false, mathID: 'pumpkin' },
]

export function useTilesPair(timeout = 2000) {
  const tiles = ref(items)
  const timeoutID = ref<NodeJS.Timeout | number>(0)
  const counter = ref(0)
  const pair = ref<[Tile, Tile] | []>([])

  const isPaired = computed(
    () => pair.value[0]?.mathID === pair.value[1]?.mathID && pair.value.length !== 0,
  )

  const isFilled = computed(() => counter.value % 2 === 0 && pair.value.length === 2)

  function chooseTile(tile: Tile) {
    if (isTileAlreadyOpen(tile)) return

    if (counter.value >= 2) resetTiles()

    pair.value[counter.value % 2] = tile
    counter.value++

    if (isPaired.value) {
      pair.value.forEach((i) => (i.isMathed = true))
    }
  }

  function resetTiles() {
    pair.value = []
    counter.value = 0
  }

  function isTileAlreadyOpen(tile: Tile) {
    return pair.value.some((i) => i.uniqueID === tile.uniqueID) || tile.isMathed
  }

  watchEffect((onCleanup) => {
    if (isFilled.value) {
      timeoutID.value = setTimeout(resetTiles, timeout)
    }

    onCleanup(() => {
      clearTimeout(timeoutID.value)
    })
  })
  return { tiles, pair, isPaired, resetTiles, chooseTile }
}
