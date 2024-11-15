<!--./src/components/QRScan.vue -->

<template>
  <div class="mx-auto w-72 h-72 bg-black" id="reader"></div>
</template>

<script>
export default {
  data: function () {
    return {
      html5QrCode: null,
    };
  },
  props: {
    aspectRatio: {
      type: Number,
      default: 1,
    },
    fps: {
      type: Number,
      default: 10,
    },
    qrbox: {
      type: Number,
      default: 250,
    },
  },
  mounted: function () {
    if (this.html5QrCode === null) {
      this.html5QrCode = new Html5Qrcode("reader");
    }

    const config = {
      aspectRatio: this.aspectRatio,
      fps: this.fps,
      qrbox: this.qrbox,
    };

    this.html5QrCode.start(
      { facingMode: "environment" },
      config,
      this.onScanSuccess,
    );
  },
  unmounted: function () {
    if (this.html5QrCode !== null) {
      this.html5QrCode.stop();
    }
  },
  methods: {
    onScanSuccess(decodedText, decodedResult) {
      this.$emit("result", decodedText, decodedResult);
    },
  },
};
</script>
