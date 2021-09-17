<!--./src/components/About.vue -->

<template>
  <div class="section text-center max-w-xs m-auto mb-4 p-4">
    <h1 class="font-semibold mb-2">SmartMask</h1>
    <p class="mb-2">
      A small web wallet to make the smartBCH experience more enjoyable.
    </p>
    <p class="mb-2">
      Version: {{ version }} [<a
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
