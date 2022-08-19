<template>
  <div class="w-64 h-64 flex flex-col gap-4 bg-launchpadBase p-2">
    <div class="picked-color w-full h-full"></div>

    <input v-model="HSLColor" class="mt-5 hue-slider w-full" type="range" min="0" max="360" @change="run()">
    <input v-model="HSLSaturation" class="mt-5 saturation-slider w-full" type="range" min="0" max="100" @change="run()">
    <input v-model="HSLLightness" class="mt-5 lightness-slider w-full" type="range" min="0" max="100" @change="run()">
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useColorStore }            from "../store/color";
import { generateHSL }              from "../utils/generateHSL";
import { hslToRgb }                 from "../utils/convertHSLToRGB";

const colorStore = useColorStore();

const HSLColor      = ref(0);
const HSLSaturation = ref(100);
const HSLLightness  = ref(50);

const selectedColor = computed(() => generateHSL(HSLColor.value, HSLSaturation.value, HSLLightness.value));

function run() {
  const { r, g, b } = hslToRgb(HSLColor.value, HSLSaturation.value / 100, HSLLightness.value / 100);

  colorStore.r = r;
  colorStore.g = g;
  colorStore.b = b;
}

onMounted(() => {
  run();
});
</script>

<style scoped>
.picked-color {
  background-color: v-bind(selectedColor);
}

.hue-slider {
  appearance: none;
}

.hue-slider::-webkit-slider-thumb {
  appearance: none;
  margin-top: -5px;
  width:      10px;
  height:     20px;
  background: var(--white);
  cursor:     pointer;
}

.hue-slider::-webkit-slider-runnable-track {
  background: linear-gradient(to right, #FF0000 0%, #FFFF00 17%, #00FF00 33%, #00FFFF 50%, #0000FF 67%, #FF00FF 83%, #FF0000 100%);
  height:     10px;
}

.saturation-slider {
  appearance: none;
}

.saturation-slider::-webkit-slider-thumb {
  appearance: none;
  margin-top: -5px;
  width:      10px;
  height:     20px;
  background: var(--white);
  cursor:     pointer;
}

.saturation-slider::-webkit-slider-runnable-track {
  background: linear-gradient(to right, #FFFFFF 0%, v-bind(selectedColor) 100%);
  height:     10px;
}

.lightness-slider {
  appearance: none;
}

.lightness-slider::-webkit-slider-thumb {
  appearance: none;
  margin-top: -5px;
  width:      10px;
  height:     20px;
  background: var(--white);
  cursor:     pointer;
}

.lightness-slider::-webkit-slider-runnable-track {
  background: linear-gradient(to right, #000000 0%, v-bind(selectedColor) 50%, #FFFFFF 100%);
  height:     10px;
}
</style>
