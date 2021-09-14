<template>
  <qrcode-vue :value="value" :size="size" level="H" class="m-4 mx-auto" />
</template>

<script>
  import QrcodeVue from 'qrcode.vue'


  export default {
    data() {
      return {
        value: this.account,
        size: this.size,
      }
    },
    props: ["account", "size"],
    components: {
      QrcodeVue,
    },
  }
</script>