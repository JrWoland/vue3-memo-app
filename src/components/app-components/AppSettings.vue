<script setup lang="ts">
type Item = { timeout: number; items: number; label: string }

defineProps({
  list: {
    type: Array<Item>,
    required: true,
  },
})
const model = defineModel()
</script>
<template>
  <select v-model="model">
    <option v-for="i in list" :value="i" :key="i.label">{{ i.label }}</option>
  </select>
</template>
