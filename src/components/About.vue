<!--./src/components/About.vue -->

<template>
  <div class="section max-w-xs m-auto">
    <h1 class="text-center font-semibold">SmartMask</h1>
    <p class="text-center">
      A small web wallet to make the smartBCH experience more enjoyable.
    </p>
    <p class="text-center">
      Version: {{ version }}
      [<a
        class="underline text-blue-500 hover:text-blue-700 active:text-blue-900"
        href="https://github.com/zquestz/smartmask"
        >Source</a
        >]
    </p>
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
