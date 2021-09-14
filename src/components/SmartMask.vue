<!--./src/components/SmartMask.vue -->

<template>
  <div class="section">
    <h1 class="text-center font-semibold">SmartMask</h1>
    <p class="text-center" v-if="showError()">{{errorMessage}}</p>
    <h2 class="text-center" v-if="hasAccounts()">Account</h2>
    <div class="text-center" v-if="hasAccounts()">
      <select class="inline-block w-64 overflow-ellipsis" v-model="activeAccount">
        <option class="text-center" v-for="(account) in accounts" :key="account">{{ account }}</option>
      </select>
    </div>
    <QR v-if="this.hasActiveAccount()" :account="activeAccount" :size="200" />
  </div>
</template>

<script>
import QR from './QR.vue'

export default {
  name: "SmartMask",
  data: function() {
    return {
      connected: null,
      accounts: [],
      errorMessage: "",
      activeAccount: "",
    };
  },
  created: async function() {
    await this.checkState()
  },
  components: {
    QR,
  },
  methods: {
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
      return this.activeAccount != ""
    },
    showError: function() {
      return this.errorMessage !== ""
    },
    checkState: async function() {
      if (this.backendAvailable() && this.validNetwork()) {
        if (this.connected !== true) {
          try {
            this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            if (this.accounts.length > 0) {
              this.activeAccount = this.accounts[0]
            }
            this.connected = true
          } catch (error) {
            if (error.code === 4001) {
              this.errorMessage = "Error: Access to accounts denied."
              this.connected = false
            }
          }
        }
      } else {
        this.resetData()
        this.errorMessage = "Please connect to the smartBCH network!"
      }
    },
    resetData: function() {
      this.connected = null
      this.accounts = []
      this.errorMessage = ""
      this.activeAccount = ""
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
