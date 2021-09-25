<!--./src/components/Deposit.vue -->

<template>
  <QR :account="activeAccount" :size="size" />
  <div class="m-3">
    <h3 class="uppercase text-sm">smartBCH Address</h3>
    <a
      v-if="copySupported"
      @click="copyToClipboard(activeAccount)"
      class="
        break-all
        font-mono
        whitespace-pre-wrap
        text-blue-500 text-xs
        hover:text-blue-700
        cursor-pointer
      "
    >
      {{ activeAccount }}
    </a>
    <p
      v-if="!copySupported"
      class="break-all font-mono whitespace-pre-wrap text-blue-500 text-xs mb-2"
    >
      {{ activeAccount }}
    </p>
  </div>
</template>

<script>
import QR from "./QR.vue";

export default {
  data: function () {
    return {};
  },
  props: {
    activeAccount: {
      type: String,
      default: "",
    },
    copySupported: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 250,
    },
  },
  components: {
    QR,
  },
  methods: {
    copyToClipboard: function (text) {
      if (!this.copySupported) {
        return;
      }

      navigator.clipboard.writeText(text);
    },
  },
};
</script>