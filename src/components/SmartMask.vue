<!--./src/components/SmartMask.vue -->

<template>
  <div class="section">
    <h1 class="text-center font-semibold">SmartMask</h1>
    <p class="text-center" v-if="showError()">{{errorMessage}}</p>
    <div v-if="hasAccounts()">
      <p class="text-center mt-2">{{balance}} BCH</p>
      <QR v-if="hasActiveAccount()" :account="activeAccount" :size="200" />
      <div class="text-center overflow-hidden overflow-ellipsis">
        <a class="text-xs text-blue-500" v-bind:href="smartScanURI(activeAccount)" target="_blank">{{ activeAccount }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import QR from './QR.vue'
import Web3 from 'web3/dist/web3.min.js'
import { setIntervalAsync } from 'set-interval-async/fixed'
import { clearIntervalAsync } from 'set-interval-async'

const web3js = new Web3(window.ethereum);

// Debugging helpers.
// window.web3js = web3js
// window.Web3NoMeta = Web3

export default {
  name: "SmartMask",
  data: function() {
    return {
      connected: null,
      pending_connection: null,
      accounts: [],
      errorMessage: "",
      activeAccount: "",
      balance: 0,
      timer: null,
    };
  },
  created: async function() {
    await this.checkState()
    this.timer = setIntervalAsync(this.updateAccount, 15000);
    this.addBindings()
  },
  beforeDestroy: function() {
    this.cancelAutoUpdate();
  },
  destroyed: function() {
    this.cancelAutoUpdate();
  },
  components: {
    QR,
  },
  methods: {
    addBindings: function() {
      window.ethereum.on('chainChanged', (chainId) => {
        this.checkState()
      });

      window.ethereum.on('accountsChanged', (chainId) => {
        this.updateAccount()
      });
    },
    backendAvailable: function() {
      return typeof(window.ethereum) !== 'undefined'
    },
    validNetwork: function() {
      return  window.ethereum.chainId === '0x2710'
    },
    hasAccounts: function() {
      return this.accounts.length > 0
    },
    hasActiveAccount: function() {
      return this.activeAccount !== ""
    },
    showError: function() {
      return this.errorMessage !== ""
    },
    getBCHBalance: async function() {
      return web3js.utils.fromWei(await web3js.eth.getBalance(this.activeAccount));
    },
    smartScanURI: function(a) {
      return "https://smartscan.cash/address/" + a
    },
    cancelAutoUpdate: function() {
      clearIntervalAsync(this.timer)
    },
    updateAccount: async function() {
      this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      if (this.accounts.length > 0) {
        this.activeAccount = this.accounts[0]
      }
      this.balance = await this.getBCHBalance()
    },
    checkState: async function() {
      if (this.backendAvailable() && this.validNetwork()) {
        if (this.connected !== true && this.pending_connection !== true) {
          try {
            this.pending_connection = true

            await this.updateAccount()

            this.errorMessage = ""
            this.connected = true
          } catch (error) {
            if (error.code === 4001) {
              this.errorMessage = "Error: Access to accounts denied."
              this.connected = false
            }
          }
          this.pending_connection = false
        }
      } else {
        this.resetData()
        this.errorMessage = "Please connect to the smartBCH network!"
      }
    },
    resetData: function() {
      this.connected = null
      this.pending_connection = null
      this.accounts = []
      this.errorMessage = ""
      this.activeAccount = ""
      this.balance = 0
    },
  }
}
</script>

<style scoped>
  h1, p {
    margin-bottom: .5em;
  }
  .section {
      padding: 1em;
  }
</style>
