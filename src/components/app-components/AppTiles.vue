<script setup lang="ts">
import { useTilesPair } from '@/composables/useTilesPair'
import AppTile from './AppTile.vue'

defineProps<{ size: number }>()

const { tiles, chooseTile, isPaired, pair } = useTilesPair()
</script>
<template>
  {{ isPaired ? 'YAYA' : ':()' }}
  <div></div>
  <div class="app-tiles" :data-size="size">
    <AppTile
      v-for="tile in tiles"
      :key="tile.uniqueID"
      :open="pair.includes(tile)"
      :mathed="tile.isMathed"
      @click="chooseTile(tile)"
    >
      {{ tile.content }}
    </AppTile>
  </div>
</template>
<style scoped lang="scss">
.app-tiles {
  display: grid;
  gap: 10px;
  grid-template-rows: repeat(v-bind(size), 1fr);
  grid-template-columns: repeat(v-bind(size), 1fr);
}
</style>
