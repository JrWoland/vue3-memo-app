<script setup lang="ts">
import { useTimer } from '@/composables/useTimer'
import AppSettings from './app-components/AppSettings.vue'
import AppStatistics from './app-components/AppStatistics.vue'
import AppTiles from './app-components/AppTiles.vue'
import { useTilesPair, type Tile } from '@/composables/useTilesPair'
import { useAttemps } from '@/composables/useAttempts'
import { computed, watch, watchEffect } from 'vue'
import { useSaveGame } from '@/composables/useSaveGame'
import { useSettings } from '@/composables/useSettings'

const { resetTimer, startTimer, stopTimer, time } = useTimer()
const { saveResult } = useSaveGame()
const { attempts, incrementAttempts, resetAttemps } = useAttemps()
const { levelsList, selectedLevel } = useSettings()
const { tiles, openTile, pair, resetTiles } = useTilesPair(selectedLevel)

const allMathed = computed(() => tiles.value.every((i) => i.isMathed))

function tileClick(tile: Tile) {
  if (allMathed.value) return
  if (attempts.value === 0) startTimer()
  incrementAttempts()
  openTile(tile)
  new Audio('/mp3/tile_click.mp3').play()
}

function resetGame() {
  resetTimer()
  resetAttemps()
  resetTiles()
}

function endGame() {
  saveResult({
    attempts: attempts.value,
    date: new Date().toISOString(),
    time: time.value,
    level: selectedLevel.value.label,
  })
  stopTimer()
  new Audio('/mp3/tada.mp3').play()
}

watchEffect(() => {
  if (allMathed.value) endGame()
})

watch(selectedLevel, () => resetGame())
</script>

<template>
  <h1>Memory APP</h1>
  <AppSettings v-model="selectedLevel" :list="levelsList" />
  <AppStatistics :timer="time" :attempts="attempts" />
  <AppTiles
    :rows="2"
    :columns="4"
    :tiles="tiles"
    :pair="pair"
    @reset-tiles="resetGame"
    @tile-choose="tileClick"
  />
</template>
