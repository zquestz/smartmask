<!--./src/components/Community.vue -->

<template>
  <div class="section">
    <h1 class="text-center font-semibold">Community</h1>
    <ul class="text-center">
      <li><a class="underline hover:text-blue-500" href="https://benswap.cash/">benswap.cash</a> - The smartBCH DEX.</li>
      <li><a class="underline hover:text-blue-500" href="https://coinflex.com/">coinflex.com</a> - Buy smartBCH.</li>
      <li><a class="underline hover:text-blue-500" href="https://marketcap.cash/">marketcap.cash</a> - Price information for smartBCH tokens.</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Community",
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