<template>
  <qrcode-vue :value="account" :size="size" level="H" class="m-4 mx-auto" />
</template>

<script>
  import QrcodeVue from 'qrcode.vue'


  export default {
    props: ["account", "size"],
    components: {
      QrcodeVue,
    },
  }
</script>