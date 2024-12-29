import { ref, computed, watchEffect } from 'vue'

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

const items: Tile[] = images
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

  watchEffect((onCleanup) => {
    if (isFilled.value) {
      timeoutID.value = setTimeout(resetPair, timeout)
    }

    onCleanup(() => {
      clearTimeout(timeoutID.value)
    })
  })
  return { tiles, pair, isPaired, resetTiles, chooseTile, showAll, isTileAlreadyOpen }
}
