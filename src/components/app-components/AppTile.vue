<script setup lang="ts">
import VanillaTilt from 'vanilla-tilt'
import { onMounted, ref } from 'vue'

defineProps<{ open: boolean; mathed: boolean; bgc: string }>()

const tilt = ref<HTMLElement | null>(null)

onMounted(() => {
  if (tilt.value) {
    VanillaTilt.init(tilt.value, { max: 20, speed: 900 })
  }
})
</script>

<template>
  <div class="tile" ref="tilt">
    <div class="tile-flipper" :class="{ open: open || mathed, mathed }">
      <div class="tile__side tile__side--front" :class="bgc">
        <div class="parallax">
          <slot></slot>
        </div>
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
  background-color: rgb(236, 236, 236);
  border-radius: 10px;
}

.tile__side.red {
  background-color: rgba(255, 47, 116, 0.663);
}

.tile__side.purple {
  background-color: rgba(109, 60, 255, 0.526);
}

.tile__side.blue {
  background-color: rgba(61, 171, 255, 0.619);
}

.tile-flipper.open {
  transform: rotateY(180deg);
}

.tile-flipper.mathed {
  border: 4px solid rgb(142, 255, 182);
}

.tile__side {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  transform-style: preserve-3d;
  font-size: 4em;
  border-radius: 6px;
  backface-visibility: hidden;
}

.tile__side--back {
  transform: rotateY(0deg);
}

.tile__side--front {
  transform: rotateY(180deg);
}

.parallax {
  backface-visibility: hidden;
  transform: translateZ(25px);
}

.hide {
  display: none;
}
</style>
