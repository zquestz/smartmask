<template>
  <header class="bg-gray-900">
    <div class="flex flex-col flex-wrap p-5 w-full">
      <nav>
        <ul class="flex flex-wrap items-center justify-center text-base">
          <li
            class="
              mx-3
              text-sm
              font-semibold
              active:text-blue-700
              hover:text-blue-700
              text-white
            "
          >
            <router-link to="/" active-class="text-blue-500"
              >Wallet</router-link
            >
          </li>
          <li
            class="
              mx-3
              text-sm
              font-semibold
              active:text-blue-700
              hover:text-blue-700
              text-white
            "
          >
            <router-link to="community" active-class="text-blue-500"
              >Community</router-link
            >
          </li>
          <li
            class="
              mx-3
              text-sm
              font-semibold
              active:text-blue-700
              hover:text-blue-700
              text-white
            "
          >
            <router-link to="about" active-class="text-blue-500"
              >About</router-link
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "NavBar",
};
</script>
