<!--./src/components/Community.vue -->

<template>
  <div class="section m-4 text-center">
    <ul class="m-auto mt-2 max-w-xs">
      <li class="mb-4 border bg-white rounded-lg p-4 border-gray-300">
        <img
          @click="goToURI('https://smartbch.org/')"
          class="cursor-pointer mx-auto mb-2"
          src="/img/smartbch.png"
          width="200"
          height="47"
        />
        <p class="mb-2">Information about the main smartBCH project!</p>
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
      <li class="my-4 border bg-white rounded-lg p-4 border-gray-300">
        <img
          @click="goToURI('https://benswap.cash/')"
          class="cursor-pointer mx-auto mb-2"
          src="/img/benswap.png"
          width="200"
          height="35"
        />
        <p class="mb-2">The smartBCH DEX.</p>
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
      <li class="my-4 border bg-white rounded-lg p-4 border-gray-300">
        <img
          @click="goToURI('https://mistswap.fi/')"
          class="cursor-pointer mx-auto mb-2"
          src="/img/mistswap.png"
          width="200"
          height="35"
        />
        <p class="mb-2">Alternative smartBCH DEX with a focus on MIST</p>
        <a
          class="
            underline
            text-blue-500
            hover:text-blue-700
            active:text-blue-900
          "
          href="https://mistswap.fi/"
          >mistswap.fi</a
        >
      </li>
      <li class="my-4 border bg-white rounded-lg p-4 border-gray-300">
        <img
          @click="goToURI('https://coinflex.com/')"
          class="cursor-pointer mx-auto mb-2"
          src="/img/coinflex.png"
          width="200"
          height="38"
        />
        <p class="mb-2">Buy BCH and switch between chains.</p>
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
      <li class="my-4 border bg-white rounded-lg p-4 border-gray-300">
        <img
          @click="goToURI('https://smartscan.cash/')"
          class="cursor-pointer mx-auto mb-2"
          src="/img/smartscan.png"
          width="200"
          height="53"
        />
        <p class="mb-2">The primary smartBCH explorer.</p>
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
      <li class="mt-4 border bg-white rounded-lg p-4 border-gray-300">
        <img
          @click="goToURI('https://marketcap.cash/')"
          class="cursor-pointer mx-auto mb-2"
          src="/img/marketcapcash.png"
          width="200"
          height="22"
        />
        <p class="mb-2">Price information for smartBCH tokens.</p>
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
