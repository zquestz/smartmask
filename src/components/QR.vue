<!--./src/components/QR.vue -->

<template>
  <qrcode-vue
    :value="account"
    :size="size"
    level="H"
    render-as="svg"
    class="m-auto border bg-white rounded-lg border-gray-300 p-4"
  />
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  props: ["account", "size"],
  components: {
    QrcodeVue,
  },
};
</script>
