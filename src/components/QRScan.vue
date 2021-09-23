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
    qrbox: {
      type: Number,
      default: 250,
    },
    fps: {
      type: Number,
      default: 10,
    },
    aspectRatio: {
      type: Number,
      default: 1,
    },
  },
  mounted: function () {
    if (this.html5QrCode === null) {
      this.html5QrCode = new Html5Qrcode("reader");
    }

    const config = {
      fps: this.fps,
      qrbox: this.qrbox,
      aspectRatio: this.aspectRatio,
    };

    this.html5QrCode.start(
      { facingMode: "environment" },
      config,
      this.onScanSuccess
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
