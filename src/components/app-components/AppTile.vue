<script setup lang="ts">
import VanillaTilt from 'vanilla-tilt'
import { onMounted, ref } from 'vue'

defineProps<{ open: boolean; mathed: boolean }>()

const tilt = ref<HTMLElement | null>(null)

onMounted(() => {
  if (tilt.value) {
    VanillaTilt.init(tilt.value, { max: 20, speed: 900 })
  }
})
</script>

<template>
  <div class="tile" ref="tilt" data-tilt data-tilt-glare data-tilt-max-glare="0.8">
    <div class="tile-flipper" :class="{ open: open || mathed, mathed }">
      <div class="tile__side tile__side--front">
        <slot></slot>
      </div>
      <div class="tile__side tile__side--back"></div>
    </div>
  </div>
</template>
<style scoped>
.tile {
  position: relative;
  cursor: pointer;
  perspective: 700px;
  transform-style: preserve-3d;
  transform: perspective(1000px);
}

.tile-flipper {
  width: 7rem;
  height: 7rem;
  transition: transform 1s;
  transform-style: preserve-3d;
  background-color: rgb(255, 243, 208);
  border: 4px solid rgb(255, 237, 183);
  border-radius: 10px;
}

.tile-flipper.open {
  transform: rotateY(180deg);
}
.tile-flipper.mathed {
  border-color: rgb(142, 255, 182);
  background-color: rgb(214, 255, 228);
}

.tile__side {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
  font-size: 4em;
}

.tile__side--back {
  transform: rotateY(0deg);
}

.tile__side--front {
  transform: rotateY(180deg) translateZ(20px);
}

.hide {
  display: none;
}
</style>
