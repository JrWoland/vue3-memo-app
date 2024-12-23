<template>
  <canvas ref="canvas" :width="width" :height="height"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: '',
    required: true,
  },
  width: {
    type: Number,
    default: 120,
  },
  height: {
    type: Number,
    default: 70,
  },
})

const canvas = ref<HTMLCanvasElement | null>(null)

function renderImg() {
  if (canvas.value === null || !props.src) return

  const ctx = canvas.value.getContext('2d')

  if (ctx === null) return

  const image = new Image()
  image.src = props.src
  image.onload = () => {
    ctx.clearRect(0, 0, props.width, props.height) // Clear the canvas
    ctx.drawImage(image, 0, 0, props.width, props.height)
  }
  image.onerror = () => {
    console.error('Error loading image:', props.src)
  }
}

onMounted(() => {
  renderImg()
})
</script>
<style scoped>
canvas {
  display: block;
}
</style>
