<template>
  <Sidebar></Sidebar>
  <div class="w-screen h-screen flex justify-center place-items-center bg-background">
    <Launchpad class="drop-shadow-lg"></Launchpad>
  </div>
  <Logo class="absolute right-3 bottom-3 opacity-30"></Logo>
</template>

<script setup lang="ts">
import Sidebar   from "../components/Sidebar.vue";
import Launchpad from "../components/Launchpad.vue";
import Logo      from "../components/Logo.vue";
</script>

<style scoped>

</style>
