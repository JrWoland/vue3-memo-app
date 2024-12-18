<script setup lang="ts">
import AppSettings from './app-components/AppSettings.vue'
import AppStatistics from './app-components/AppStatistics.vue'
import AppTiles from './app-components/AppTiles.vue'
</script>

<template>
  <h1>Memory APP</h1>
  <AppStatistics />
  <AppTiles :size="3" />
  <AppSettings />
</template>
