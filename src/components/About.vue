<!--./src/components/About.vue -->

<template>
  <div class="section">
    <h1 class="text-center font-semibold">About SmartMask</h1>
    <p class="text-center">
      A small web wallet to make the smartBCH experience more enjoyable.
    </p>
    <p class="text-center">Version: {{ version }}</p>
  </div>
</template>

<script>
import App from "../App.vue";

export default {
  name: "About",
  data: function () {
    return {
      version: App.data().version,
    };
  },
};
</script>

<style scoped>
h1,
p {
  margin-bottom: 0.5em;
}
.section {
  padding: 1em;
}
</style>
