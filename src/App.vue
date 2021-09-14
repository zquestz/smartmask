<!-- ./src/App.vue -->

<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script type="text/javascript">
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  data: function () {
    return {
      version: "0.1.1",
    };
  },
};
</script>

<style>
body {
  width: 100vw;
  min-width: 100vw;
  height: 100vh;
  min-height: 100vh;
}
</style>
