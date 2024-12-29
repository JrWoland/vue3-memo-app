<script setup lang="ts">
import { type Tile } from '@/composables/useTilesPair'
import AppTile from './AppTile.vue'
import AppButton from './AppButton.vue'
import CanvasWrapper from './CanvasWrapper.vue'

defineProps<{
  rows: number
  columns: number
  tiles: Tile[]
  pair: [Tile, Tile] | []
  onResetTiles: () => void
  onTileChoose: (tile: Tile) => void
}>()
</script>
<template>
  <div></div>
  <div class="app-tiles">
    <AppTile
      v-for="tile in tiles"
      :key="tile.uniqueID"
      :open="pair.includes(tile)"
      :mathed="tile.isMathed"
      :bgc="tile.rarity"
      @click="onTileChoose(tile)"
    >
      <CanvasWrapper :src="tile.content" />
    </AppTile>
  </div>
  <AppButton @click="onResetTiles">Reset game</AppButton>
</template>
<style scoped lang="scss">
.app-tiles {
  display: grid;
  gap: 10px;
  grid-template-rows: repeat(v-bind(rows), 1fr);
  grid-template-columns: repeat(v-bind(columns), 1fr);
}
</style>
