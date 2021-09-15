<!--./src/components/SmartMask.vue -->

<template>
  <div class="section">
    <p class="text-center text-red-500" v-if="hasError()">{{ errorMessage }}</p>
    <div v-if="hasActiveAccount()">
      <div
        class="
          cursor-auto
          text-blue-500 text-center text-xs
          whitespace-pre-wrap
          font-mono
          break-all
        "
      >
        {{ activeAccount }}
      </div>
      <p class="text-center mt-2">{{ BCHBalance }} BCH</p>
      <QR :account="activeAccount" :size="250" />
      <div class="m-3 text-center">
        <button
          class="
            m-1
            bg-blue-500
            hover:bg-blue-600
            active:bg-blue-700
            text-white
            font-bold
            py-2
            px-4
            rounded
          "
        >
          Send Crypto
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import QR from "./QR.vue";
import Web3 from "web3/dist/web3.min.js";
import Decimal from "decimal.js";
import { setIntervalAsync } from "set-interval-async/fixed";
import { clearIntervalAsync } from "set-interval-async";

const web3js = new Web3("wss://smartbch-wss.greyh.at");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Debugging helpers.
window.web3js = web3js;
window.Web3NoMeta = Web3;

export default {
  name: "SmartMask",
  data: function () {
    return {
      connected: null,
      pendingConnection: null,
      accounts: [],
      errorMessage: "",
      activeAccount: "",
      balance: 0,
      BCHBalance: 0,
      stopRequests: false,
      timer: null,
      bindingRetries: 0,
      bindingsAdded: false,
    };
  },
  mounted: async function () {
    this.checkState();
    this.timer = setIntervalAsync(this.checkState, 5000);
  },
  unmounted: function () {
    this.cancelAutoUpdate();
  },
  components: {
    QR,
  },
  methods: {
    addBindings: function () {
      if (!this.backendAvailable() || this.bindingsAdded) {
        this.bindingRetries += 1;
        return;
      }

      window.ethereum.on("accountsChanged", (chainId) => {
        this.resetConnection();
        this.updateAccount();
      });

      window.ethereum.on("chainChanged", (chainId) => {
        this.resetConnection();
        this.checkState();
      });

      this.bindingsAdded = true;
    },
    fallbackCopyTextToClipboard: function (text) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand("copy");
      } catch (err) {
        window.prompt("Copy to clipboard, then close the dialog.", text);
      }

      document.body.removeChild(textArea);
    },
    copyTextToClipboard: function (text) {
      if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
      }
      navigator.clipboard.writeText(text);
    },
    goToSmartScan: function () {
      location.href = this.smartScanURI(this.activeAccount);
    },
    resetConnection: function () {
      this.connected = false;
      this.pendingConnection = false;
      this.stopRequests = false;
    },
    cancelAutoUpdate: function () {
      clearIntervalAsync(this.timer);
    },
    backendAvailable: function () {
      return typeof window.ethereum !== "undefined";
    },
    validNetwork: function () {
      return window.ethereum.chainId === "0x2710";
    },
    hasAccounts: function () {
      return this.accounts.length > 0;
    },
    hasActiveAccount: function () {
      return this.activeAccount !== "";
    },
    hasError: function () {
      return this.errorMessage !== "";
    },
    updateBalance: async function () {
      if (this.connected) {
        this.balance = new Decimal(
          web3js.utils.fromWei(await web3js.eth.getBalance(this.activeAccount))
        );
        this.BCHBalance = this.balance.toFixed(8);
        console.log(
          "Updated balance for " + this.activeAccount + " : " + this.balance
        );
      }
    },
    smartScanURI: function (a) {
      return "https://smartscan.cash/address/" + a;
    },
    unavailable: function () {
      return !(this.backendAvailable() && this.validNetwork());
    },
    shouldAttemptConnection: function () {
      if (this.stopRequests) {
        return false;
      }

      if (this.pendingConnection) {
        return false;
      }

      return true;
    },
    handleConnected: function () {
      this.errorMessage = "";
      this.connected = true;
      this.pendingConnection = false;
    },
    handleConnectionFailed: function (error) {
      this.connected = false;
      this.pendingConnection = false;
      this.stopRequests = true;

      const errorPrefix = "Error " + error.code + ": ";

      if (error.code === 4001) {
        this.errorMessage = errorPrefix + "Access to accounts denied.";
      } else {
        this.errorMessage = errorPrefix + error.message;
      }
    },
    updateAccount: async function () {
      if (this.shouldAttemptConnection()) {
        this.pendingConnection = true;

        try {
          this.accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          this.handleConnected();

          if (this.accounts.length > 0) {
            this.activeAccount = this.accounts[0];
            await this.updateBalance();
          }
        } catch (error) {
          this.handleConnectionFailed(error);
        }
      }
    },
    checkState: async function () {
      this.addBindings();

      if (this.unavailable()) {
        this.resetData();
        this.errorMessage = "Please connect to the smartBCH network!";

        if (this.bindingRetries < 15) {
          await delay(250);
          this.checkState();
        }

        return;
      }

      this.updateAccount();
    },
    resetData: function () {
      this.connected = null;
      this.pendingConnection = null;
      this.accounts = [];
      this.errorMessage = "";
      this.activeAccount = "";
      this.balance = 0;
      this.BCHBalance = 0;
      this.stopRequests = false;
    },
  },
};
</script>

<style scoped>
h1,
p {
  margin-bottom: 0.5em;
}
.section {
  padding: 1em;
}
</style>
