<script setup lang="ts">
import AppSettings from './app-components/AppSettings.vue'
import AppStatistics from './app-components/AppStatistics.vue'
import AppTiles from './app-components/AppTiles.vue'
import { useTilesPair } from '@/composables/useTilesPair'

const { tiles, chooseTile, pair, showAll, resetTiles } = useTilesPair()
</script>

<template>
  <h1>Memory APP</h1>
  <AppStatistics />
  <AppTiles
    :rows="2"
    :columns="4"
    :tiles="tiles"
    :pair="pair"
    @reset-tiles="resetTiles"
    @show-all-tiles="showAll"
    @tile-choose="chooseTile"
  />
  <AppSettings />
</template>
