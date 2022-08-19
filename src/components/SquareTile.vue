<template>
  <div @click="click">
    <div v-if="!corner.middleSquare" class="tile h-14 w-14 bg-launchpadTile rounded-sm" />
    <div v-if="corner.leftTop" class="tile h-14 w-14 bg-launchpadTile rounded-sm rounded-br-xl" />
    <div v-if="corner.rightTop" class="tile h-14 w-14 bg-launchpadTile rounded-sm rounded-bl-xl" />
    <div v-if="corner.leftBottom" class="tile h-14 w-14 bg-launchpadTile rounded-sm rounded-tr-xl" />
    <div v-if="corner.rightBottom" class="tile h-14 w-14 bg-launchpadTile rounded-sm rounded-tl-xl" />
  </div>
</template>

<script setup lang="ts">
import { cellType }    from "../utils/types";
import { generateHSL } from "../utils/generateHSL";
import { computed }    from "vue";
import { hslToRgb }    from "../utils/convertHSLToRGB";

const props = defineProps<{
  cell: cellType;
}>();

const HSLColor = computed(() => props.cell.HSLColor);

const corner = {
  middleSquare: (props.cell.row === 3 && props.cell.col === 3)
                || (props.cell.row === 3 && props.cell.col === 4)
                || (props.cell.row === 4 && props.cell.col === 3)
                || (props.cell.row === 4 && props.cell.col === 4),
  leftTop:      props.cell.row === 3 && props.cell.col === 3,
  rightTop:     props.cell.row === 3 && props.cell.col === 4,
  leftBottom:   props.cell.row === 4 && props.cell.col === 3,
  rightBottom:  props.cell.row === 4 && props.cell.col === 4
};

function parseRGB() {
  return `rgb(${ HSLColor.value.r }, ${ HSLColor.value.g }, ${ HSLColor.value.b })`;
}

function parseBrightRGB() {
  if (HSLColor.value.r < 1 && HSLColor.value.g < 1 && HSLColor.value.b < 1) {
    return `rgb(10, 10, 10)`;
  }

  return `rgb(${ HSLColor.value.r + 100 }, ${ HSLColor.value.g + 100 }, ${ HSLColor.value.b + 100 })`;
}

const middleColor = computed(() => parseBrightRGB());
const baseColor   = computed(() => parseRGB());
</script>

<style scoped>
.tile {
  background: radial-gradient(v-bind(middleColor), v-bind(baseColor));
}
</style>
