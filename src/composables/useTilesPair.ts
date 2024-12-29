import { shuffleArray } from '@/helpers/shuffleArray'
import { ref, computed, watchEffect, type Ref } from 'vue'
import weapons from '@/assets/weapons.json'

export type Tile = {
  uniqueID: string
  mathID: string
  isMathed: boolean
  content: string
  rarity: string
}

function getTiles(numOfItems: number) {
  const items: Tile[] = weapons
    .slice(0, numOfItems)
    .map((i) => [
      {
        uniqueID: crypto.randomUUID().toString(),
        isMathed: false,
        content: i.path,
        mathID: i.path,
        rarity: i.rarity,
      },
      {
        uniqueID: crypto.randomUUID().toString(),
        isMathed: false,
        content: i.path,
        mathID: i.path,
        rarity: i.rarity,
      },
    ])
    .flat(1)

  return items
}

type Settings = { timeout: number; items: number }

export function useTilesPair(settings: Ref<Settings>) {
  const items = ref(getTiles(settings.value.items))
  const timeoutID = ref<number>(0)
  const counter = ref(0)
  const pair = ref<[Tile, Tile] | []>([])

  const tiles = computed(() => shuffleArray(items.value))
  const isPaired = computed(
    () => pair.value[0]?.mathID === pair.value[1]?.mathID && pair.value.length !== 0,
  )
  const bothTilesSelected = computed(() => counter.value % 2 === 0 && pair.value.length === 2)

  function openTile(tile: Tile) {
    if (isTileAlreadyOpen(tile)) return

    if (counter.value >= 2) resetPair()

    pair.value[counter.value % 2] = tile
    counter.value++

    if (isPaired.value) {
      pair.value.forEach((i) => (i.isMathed = true))
    }
  }

  function resetTiles() {
    resetPair()
    tiles.value.forEach((i) => (i.isMathed = false))
    items.value = getTiles(settings.value.items)
  }

  function showAll() {
    tiles.value.forEach((i) => (i.isMathed = true))
  }

  function resetPair() {
    pair.value = []
    counter.value = 0
  }

  function isTileAlreadyOpen(tile: Tile) {
    return pair.value.some((i) => i.uniqueID === tile.uniqueID) || tile.isMathed
  }

  watchEffect(() => {
    items.value = getTiles(settings.value.items)
  })

  watchEffect((onCleanup) => {
    if (bothTilesSelected.value) {
      timeoutID.value = setTimeout(resetPair, settings.value.timeout)
    }

    onCleanup(() => {
      clearTimeout(timeoutID.value)
    })
  })
  return { tiles, pair, isPaired, resetTiles, openTile, showAll, isTileAlreadyOpen }
}
