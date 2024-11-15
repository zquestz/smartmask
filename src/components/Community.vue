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
          @click="goToURI('https://mistswap.fi/')"
          class="cursor-pointer mx-auto mb-2"
          src="/img/mistswap.png"
          width="200"
          height="35"
        />
        <p class="mb-2">The latest smartBCH DEX with a focus on MIST.</p>
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
          @click="goToURI('https://benswap.cash/')"
          class="cursor-pointer mx-auto mb-2"
          src="/img/benswap.png"
          width="200"
          height="35"
        />
        <p class="mb-2">The first smartBCH DEX.</p>
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
        <p class="mb-2">The primary smartBCH explorer.</p>
        <a
          class="
            underline
            text-blue-500
            hover:text-blue-700
            active:text-blue-900
          "
          href="https://smartscout.cash/"
          >smartscout.cash</a
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
