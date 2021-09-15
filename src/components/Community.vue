<!--./src/components/Community.vue -->

<template>
  <div class="section">
    <ul class="m-auto text-center mt-2 max-w-xs">
      <li class="mb-4 border rounded-lg p-4 border-gray-300">
        <img
          @click="goToURI('https://smartbch.org/')"
          class="cursor-pointer mx-auto mb-2"
          src="/img/smartbch.png"
          width="200"
          height="47"
        />
        <p>Information about the main smartBCH project!</p>
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
      </li>
      <li class="my-4 border rounded-lg p-4 border-gray-300">
        <img
          @click="goToURI('https://benswap.cash/')"
          class="cursor-pointer mx-auto mb-2"
          src="/img/benswap.png"
          width="200"
          height="35"
        />
        <p>The smartBCH DEX.</p>
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
      </li>
      <li class="my-4 border rounded-lg p-4 border-gray-300">
        <img
          @click="goToURI('https://coinflex.com/')"
          class="cursor-pointer mx-auto mb-2"
          src="/img/coinflex.png"
          width="200"
          height="38"
        />
        <p>Buy smartBCH and switch between chains.</p>
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
      </li>
      <li class="my-4 border rounded-lg p-4 border-gray-300">
        <img
          @click="goToURI('https://smartscan.cash/')"
          class="cursor-pointer mx-auto mb-2"
          src="/img/smartscan.png"
          width="200"
          height="53"
        />
        <p>The primary smartBCH explorer.</p>
        <a
          class="
            underline
            text-blue-500
            hover:text-blue-700
            active:text-blue-900
          "
          href="https://smartscan.cash/"
          >smartscan.cash</a
        >
      </li>
      <li class="mt-4 border rounded-lg p-4 border-gray-300">
        <img
          @click="goToURI('https://marketcap.cash/')"
          class="cursor-pointer mx-auto mb-2"
          src="/img/marketcapcash.png"
          width="200"
          height="22"
        />
        <p>Price information for smartBCH tokens.</p>
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
