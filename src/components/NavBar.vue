<template>
  <header class="bg-gray-900">
    <div class="container flex flex-col flex-wrap p-5 md:items-center md:flex-row">
      <nav>
        <ul class="flex flex-wrap items-center justify-center text-base">
          <li class="mr-5 text-sm font-semibold hover:text-blue-500 text-white">
            <router-link to="/">Wallet</router-link>
          </li>
          <li class="mr-5 text-sm font-semibold hover:text-blue-500 text-white">
            <router-link to="resources">Resources</router-link>
          </li>
          <li class="mr-5 text-sm font-semibold hover:text-blue-500 text-white">
            <router-link to="about">About</router-link>
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
