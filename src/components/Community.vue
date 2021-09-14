<!--./src/components/Community.vue -->

<template>
  <div class="section">
    <h1 class="text-center font-semibold">Community</h1>
    <ul class="m-auto text-center mt-2 max-w-xs">
      <li class="mb-8">
        <img
          @click="goToURI('https://benswap.cash/')"
          class="cursor-pointer mx-auto mb-2"
          src="/img/benswap.png"
          width="200"
          height="35"
        />
        <a
          class="
            underline
            text-blue-500
            hover:text-blue-700
            active:text-blue-900
          "
          href="https://benswap.cash/"
          >benswap.cash</a
        >
        - The smartBCH DEX.
      </li>
      <li class="mb-8">
        <img
          @click="goToURI('https://coinflex.com/')"
          class="cursor-pointer mx-auto mb-2"
          src="/img/coinflex.png"
          width="200"
          height="38"
        />
        <a
          class="
            underline
            text-blue-500
            hover:text-blue-700
            active:text-blue-900
          "
          href="https://coinflex.com/"
          >coinflex.com</a
        >
        - Buy smartBCH.
      </li>
      <li class="mb-8">
        <img
          @click="goToURI('https://smartbch.org/')"
          class="cursor-pointer mx-auto mb-2"
          src="/img/smartbch.png"
          width="200"
          height="47"
        />
        <a
          class="
            underline
            text-blue-500
            hover:text-blue-700
            active:text-blue-900
          "
          href="https://smartbch.org/"
          >smartbch.org</a
        >
        - Information about the main smartBCH project!
      </li>
      <li>
        <img
          @click="goToURI('https://marketcap.cash/')"
          class="cursor-pointer mx-auto mb-2"
          src="/img/marketcapcash.png"
          width="200"
          height="22"
        />
        <a
          class="
            underline
            text-blue-500
            hover:text-blue-700
            active:text-blue-900
          "
          href="https://marketcap.cash/"
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
  methods: {
    goToURI: function (uri) {
      location.href = uri;
    },
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
