<!--./src/components/SmartMask.vue -->

<template>
  <div class="section">
    <h1 class="text-center font-semibold">SmartMask</h1>
    <p class="text-center" v-if="!validNetwork">Please connect to the smartBCH network!</p>
  </div>
</template>

<script>
export default {
  name: "SmartMask",
  data: function() {
    return {
      validNetwork: window.ethereum.chainId === '0x2710',
    };
  },
};
</script>

<style scoped>
  h1, p {
    margin-bottom: .5em;
  }
  .section {
      padding: 1em;
  }
</style>
