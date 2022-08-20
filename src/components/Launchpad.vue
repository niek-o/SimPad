<template>
  <div class="flex justify-center place-items-center bg-launchpadBase border-black border-4 w-[48rem] h-[48rem] rounded-xl">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-4">
        <!--Top circle buttons-->
        <div class="flex flex-row gap-4 justify-center">
          <RoundTile v-for="() in grid" />
        </div>

        <div class="flex gap-4 justify-center">
          <!--Left circle buttons-->
          <div class="flex flex-col gap-4">
            <RoundTile v-for="() in grid" />
          </div>

          <!--Main grid-->
          <div class="flex flex-col gap-4">
            <div class="flex flex-row gap-4" v-for="rows in grid">
              <div v-for="cell in rows">
                <SquareTile @click="click(cell)" :cell="cell" />
              </div>
            </div>
          </div>

          <!--Right circle buttons-->
          <div class="flex flex-col gap-4">
            <RoundTile v-for="() in grid" />
          </div>
        </div>
        <!--Bottom circle buttons-->
        <div class="flex flex-row gap-4 justify-center">
          <RoundTile v-for="() in grid" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SquareTile            from "./SquareTile.vue";
import RoundTile             from "./RoundTile.vue";
import { useGridStore }      from "../store/grid";
import { cellType }          from "../utils/types";
import { useColorStore }     from "../store/color";
import { useLaunchpadStore } from "../store/launchpad";

const gridStore      = useGridStore();
const colorStore     = useColorStore();
const launchpadStore = useLaunchpadStore();

gridStore.init();

const grid = gridStore.grid;

function click(cell: cellType) {
  launchpadStore.launchpad.changeColor({
    r: colorStore.r,
    g: colorStore.g,
    b: colorStore.b
  }, cell.cc);
}
</script>

<style scoped>

</style>
