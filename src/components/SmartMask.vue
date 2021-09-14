<!--./src/components/SmartMask.vue -->

<template>
  <div class="section">
    <h1 class="text-center font-semibold">SmartMask</h1>
    <p class="text-center" v-if="showError()">{{errorMessage}}</p>
    <h2 class="text-center" v-if="hasAccounts()">Accounts</h2>
    <ul class="text-center">
      <li v-for="(account, index) in accounts" :key="index">{{ account }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SmartMask",
  data: function() {
    return {
      connected: null,
      accounts: [],
      errorMessage: "",
    };
  },
  created: async function() {
    await this.checkState()
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
    showError: function() {
      return this.errorMessage !== ""
    },
    checkState: async function() {
      if (this.backendAvailable() && this.validNetwork()) {
        if (this.connected !== true) {
          try {
            this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
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
    }
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
