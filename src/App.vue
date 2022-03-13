<template>
  <div class="home">
    <img class="img" src="./assets/logo.png" alt="logo" />
    <h1 class="title">Hello, {{ msg }}!</h1>
    <button class="button" @click="toggle">toggle</button>
    <div>{{ greeting }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const msg = ref("Vue.js");
const greeting = ref("");

function toggle() {
  msg.value = msg.value === "Vue.js" ? "Webpack" : "Vue.js";
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .button {
    width: 60px;
  }
}
</style>
