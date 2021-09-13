<!-- ./src/App.vue -->

<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script type="text/javascript">
import _ from 'web3/dist/web3.min.js'
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  data: function() {
    return {
      version: '0.1.0',
    };
  },
};
</script>

<style>
  body {
    height: 100vh;
    min-height: 100vh;
  }
</style>
