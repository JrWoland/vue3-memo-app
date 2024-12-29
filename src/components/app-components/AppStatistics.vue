<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ timer: number; attempts: number }>()

const formattedTime = computed(() => {
  return `Time: ${props.timer || 0}s`
})
const formattedAttempts = computed(() => {
  return `Attempts: ${props.attempts || 0}`
})
</script>
<template>
  <div>{{ formattedTime }}</div>
  <div>{{ formattedAttempts }}</div>
</template>
