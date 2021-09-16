<!--./src/components/SmartMask.vue -->

<template>
  <div class="section text-center">
    <p class="text-red-500" v-if="hasError()">{{ errorMessage }}</p>
    <p class="text-blue-500" v-if="hasNotice()">
      {{ noticeMessage }}
    </p>
    <div v-if="hasActiveAccount()">
      <p class="text-lg mt-2 font-semibold">{{ BCHBalance(balance) }} BCH</p>
      <div v-if="isDepositView()">
        <QR :account="activeAccount" :size="250" />
        <div class="m-3">
          <h3 class="uppercase text-sm">smartBCH Address</h3>
          <a
            v-if="copySupported()"
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
            v-if="!copySupported()"
            class="
              break-all
              font-mono
              whitespace-pre-wrap
              text-blue-500 text-xs
            "
          >
            {{ activeAccount }}
          </p>
        </div>
        <button
          @click="showWithdrawal()"
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
      <div v-if="isWithdrawaltView()">
        <div class="max-w-xs m-auto">
          <div class="field-group">
            <label class="field-label block mb-1" for="recipient"
              >- Recipient -</label
            >
            <input
              class="field p-2"
              type="text"
              name="recipient"
              id="recipient"
            />
          </div>
          <div class="field-group m-6">
            <label class="field-label block mb-1" for="recipient"
              >- Amount -</label
            >
            <input
              class="field p-2"
              placeholder="0"
              type="number"
              name="amount"
              id="amount"
            />
          </div>
          <button
            @click="closeWithdrawal()"
            class="
              m-1
              bg-gray-500
              hover:bg-blue-600
              active:bg-blue-700
              text-white
              font-bold
              py-2
              px-4
              rounded
            "
          >
            Cancel
          </button>
          <button
            @click="sendAction()"
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
            Send
          </button>
        </div>
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
      noticeMessage: "",
      activeAccount: "",
      balance: 0,
      stopRequests: false,
      timer: null,
      bindingRetries: 0,
      bindingsAdded: false,
      currentView: "deposit",
      attemptedRegistration: false,
      noCopy: null,
    };
  },
  created: async function () {
    this.noCopy = !navigator.clipboard;
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
    copySupported: function () {
      return this.noCopy !== true;
    },
    isDepositView: function () {
      return this.currentView === "deposit";
    },
    isWithdrawaltView: function () {
      return this.currentView === "withdrawal";
    },
    showWithdrawal: function () {
      this.currentView = "withdrawal";
    },
    closeWithdrawal: function () {
      this.currentView = "deposit";
    },
    sendAction: function () {},
    copyToClipboard: function (text) {
      if (!this.copySupported) {
        return;
      }

      navigator.clipboard.writeText(text);
    },
    setNotice: function (text) {
      this.noticeMessage = text;
      this.noticeDate = Date.now();
    },
    BCHBalance: function (bal) {
      return parseFloat(bal.toFixed(8)).toString();
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
    hasNotice: function () {
      return this.noticeMessage !== "";
    },
    updateBalance: async function () {
      if (this.connected) {
        this.balance = new Decimal(
          web3js.utils.fromWei(await web3js.eth.getBalance(this.activeAccount))
        );
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

      // Notifications must persist for at least 3 seconds.
      if (Date.now() - this.noticeDate > 3000) {
        this.noticeMessage = "";
        this.noticeDate = 0;
      }
    },
    handleConnectionFailed: function (error) {
      this.noticeMessage = "";
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
    smartBCHProvider: function () {
      return {
        chainId: "0x2710",
        rpcUrls: [
          "https://smartbch.greyh.at",
          "https://smartbch.fountainhead.cash/mainnet",
        ],
        chainName: "smartBCH",
        nativeCurrency: {
          name: "Bitcoin Cash",
          symbol: "BCH",
          decimals: 18,
        },
        blockExplorerUrls: ["https://smartscan.cash"],
        iconUrls: ["https://smartmask.greyh.at/img/smartbch_logo.png"],
      };
    },
    attemptMetaMaskProviderRegistration: async function () {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x2710" }],
        });
        return true;
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [this.smartBCHProvider()],
            });

            return true;
          } catch (addError) {
            return false;
          }
        }
        return false;
      }
    },
    checkState: async function () {
      this.addBindings();

      if (this.unavailable()) {
        let success = false;

        if (!this.attemptedRegistration) {
          this.attemptedRegistration = true;
          success = await this.attemptMetaMaskProviderRegistration();
        }

        if (success) {
          return;
        }

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
