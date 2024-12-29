import { ref, computed, watchEffect, type Ref } from 'vue'

function shuffleArray<T>(array: Array<T>) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export type Tile = {
  uniqueID: string
  mathID: string
  isMathed: boolean
  content: string
  rarity: string
}

const images = [
  { path: '/img/weapons/rarity_1.png', rarity: 'purple' },
  { path: '/img/weapons/rarity_2.png', rarity: 'red' },
  { path: '/img/weapons/rarity_3.png', rarity: 'purple' },
  { path: '/img/weapons/rarity_4.png', rarity: 'red' },
  { path: '/img/weapons/rarity_5.png', rarity: 'purple' },
  { path: '/img/weapons/rarity_6.png', rarity: 'purple' },
  { path: '/img/weapons/rarity_7.png', rarity: 'blue' },
  { path: '/img/weapons/rarity_8.png', rarity: 'blue' },
  { path: '/img/weapons/rarity_9.png', rarity: 'red' },
  { path: '/img/weapons/rarity_10.png', rarity: 'blue' },
]

function getTiles(numOfItems: number) {
  const items: Tile[] = images
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

  const tiles = computed(() => shuffleArray(items.value))

  const timeoutID = ref<NodeJS.Timeout | number>(0)
  const counter = ref(0)
  const pair = ref<[Tile, Tile] | []>([])

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
