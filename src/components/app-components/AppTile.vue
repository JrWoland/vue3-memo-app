<script setup lang="ts">
defineProps<{ open: boolean; mathed: boolean }>()
</script>

<template>
  <div class="tile">
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
}

.tile-flipper {
  width: 6rem;
  height: 6rem;
  transition: transform 1s;
  transform-style: preserve-3d;
  border: 4px solid rgb(230, 230, 230);
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
  display: block;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
  font-size: 4em;
}

.tile__side--back {
  transform: rotateY(0deg);
}

.tile__side--front {
  transform: rotateY(180deg);
}

.hide {
  display: none;
}
</style>
