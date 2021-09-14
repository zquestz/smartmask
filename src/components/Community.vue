<!--./src/components/Community.vue -->

<template>
  <div class="section">
    <h1 class="text-center font-semibold">Community</h1>
    <ul class="m-auto text-center mt-2 max-w-xs">
      <li class="mb-8">
        <a href="https://benswap.cash/"
          ><img class="mx-auto mb-2" src="/img/benswap.png"></a
        >
        <a class="underline text-blue-500" href="https://benswap.cash/"
          >benswap.cash</a
        >
        - The smartBCH DEX.
      </li>
      <li class="mb-8">
        <a href="https://coinflex.com/"
          ><img class="mx-auto mb-2" src="/img/coinflex.png"></a
        >
        <a class="underline text-blue-500" href="https://coinflex.com/"
          >coinflex.com</a
        >
        - Buy smartBCH.
      </li>
      <li class="mb-8">
        <a href="https://smartbch.org/"
          ><img class="mx-auto mb-2" src="/img/smartbch.png"></a
        >
        <a class="underline text-blue-500" href="https://smartbch.org/"
          >smartbch.org</a
        >
        - Information about the main smartBCH project!
      </li>
      <li>
        <a href="https://marketcap.cash/"
          ><img class="mx-auto mb-2" src="/img/marketcapcash.png"></a
        >
        <a class="underline text-blue-500" href="https://marketcap.cash/"
          >marketcap.cash</a
        >
        - Price information for smartBCH tokens.
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Community",
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
