<!--./src/components/SmartMask.vue -->

<template>
  <div class="section text-center m-4">
    <p class="text-red-500 mb-2" v-if="hasError()">{{ errorMessage }}</p>
    <p class="text-blue-500 mb-2" v-if="hasNotice()">
      {{ noticeMessage }}
    </p>
    <div v-if="hasActiveAccount()">
      <div v-if="isAssetsView()">
        <p class="text-lg mt-4 mb-2 font-semibold">
          <img class="mx-auto mb-2 w-16" src="/img/bch.svg" />
          {{ BCHBalance(balance) }} BCH
        </p>
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
          Send
        </button>
        <button
          @click="showDeposit()"
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
          Receive
        </button>
        <h1 v-if="tokenBalances.length > 0" class="mb-4 mt-8 font-semibold">
          - Token Assets -
        </h1>
        <div
          class="px-4 m-auto max-w-xs flex flex-nowrap items-center"
          v-for="asset in tokenBalances"
          v-bind:key="asset.address"
        >
          <div class="flex-none">
            <img class="m-2 w-8" :src="assetIcon(asset.address)" />
          </div>
          <div
            class="m-2 text-left overflow-hidden overflow-ellipsis flex-grow"
          >
            {{ assetBalanceFormatter(asset.balance) }} {{ asset.symbol }}
          </div>
        </div>
      </div>
      <div v-if="isDepositView()">
        <Deposit
          :activeAccount="activeAccount"
          :copySupported="copySupported()"
        />
        <button
          @click="goHome()"
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
          Close
        </button>
      </div>
      <div v-if="isWithdrawaltView()">
        <div class="max-w-xs m-auto">
          <div class="field-group">
            <img class="w-16 block mb-2 mx-auto" :src="assetImage()" />
            <select
              v-model="sendContract"
              class="
                field
                p-2
                font-mono
                w-full
                outline-none
                rounded-l
                mb-4
                bg-white
              "
            >
              <option value="">BCH - {{ balance }}</option>
              <option
                v-for="asset in tokenBalances"
                v-bind:value="asset.address"
                v-bind:key="asset.address"
              >
                {{ asset.symbol }} - {{ asset.balance }}
              </option>
            </select>
            <label class="field-label block mb-1" for="recipient"
              >- Recipient -</label
            >
            <div class="flex items-center">
              <div class="w-full">
                <input
                  v-model="sendTo"
                  class="field p-2 font-mono w-full outline-none rounded-l"
                  type="text"
                  name="recipient"
                  id="recipient"
                />
              </div>
              <div>
                <button
                  @click="showScan()"
                  class="
                    bg-blue-500
                    hover:bg-blue-600
                    active:bg-blue-700
                    text-white
                    font-bold
                    py-2
                    px-3
                    rounded-r
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="field-group my-6">
            <label class="field-label block mb-1" for="recipient"
              >- Amount -</label
            >
            <div class="flex items-center w-full min-w-full">
              <div class="w-full">
                <input
                  v-model="sendAmount"
                  class="field p-2 font-mono w-full outline-none rounded-l"
                  placeholder="0"
                  type="number"
                  name="amount"
                  id="amount"
                />
              </div>
              <div>
                <button
                  @click="maxSend()"
                  class="
                    bg-blue-500
                    hover:bg-blue-600
                    active:bg-blue-700
                    text-white
                    font-bold
                    py-2
                    px-3
                    rounded-r
                    align-bottom
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <button
            @click="goHome()"
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
              align-bottom
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
              align-bottom
            "
          >
            Send
          </button>
        </div>
      </div>
      <div v-if="isScanView()">
        <QRScan :qrbox="200" :fps="10" :aspectRatio="1" @result="onScan" />
        <button
          @click="showWithdrawal()"
          class="
            m-2
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
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Deposit from "./Deposit.vue";
import QRScan from "./QRScan.vue";
import Web3 from "web3/dist/web3.min.js";
import Decimal from "decimal.js";
import { setIntervalAsync } from "set-interval-async/fixed";
import { clearIntervalAsync } from "set-interval-async";
import { assetList } from "../assetList.js";
import { each, map, reverse } from "lodash";
import { BigNumber } from "bignumber.js";

const web3js = new Web3("wss://smartbch-wss.greyh.at");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Debugging helpers.
window.web3js = web3js;
window.Web3NoMeta = Web3;
window.assetList = assetList;

// For SEP20 transfers.
const minABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    type: "function",
  },
];

export default {
  name: "SmartMask",
  data: function () {
    return {
      accounts: [],
      activeAccount: "",
      assetList: assetList,
      attemptedRegistration: false,
      balance: new BigNumber(0),
      bindingRetries: 0,
      bindingsAdded: false,
      connected: null,
      currentView: "assets",
      errorMessage: "",
      noCopy: null,
      noticeMessage: "",
      pendingConnection: null,
      sendAmount: new BigNumber(0),
      sendContract: "",
      sendTo: "",
      stopRequests: false,
      timer: null,
      tokenBalances: [],
    };
  },
  components: {
    Deposit,
    QRScan,
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
  methods: {
    onScan: function (result) {
      try {
        this.sendTo = web3js.utils.toChecksumAddress(
          this.parseScanResult(result)
        );
        this.showWithdrawal();
      } catch (e) {
        this.setError("Invalid Recipient Address: " + e.message);
      }
    },
    parseScanResult: function (result) {
      return result.replace("ethereum:", "");
    },
    addBindings: function () {
      if (!this.backendAvailable() || this.bindingsAdded) {
        this.bindingRetries += 1;
        return;
      }

      if (window.ethereum.isMetaMask) {
        window.ethereum.on("accountsChanged", (chainId) => {
          this.resetConnection();
          this.updateAccount();
        });

        window.ethereum.on("chainChanged", (chainId) => {
          this.resetConnection();
          this.checkState();
        });
      }

      this.bindingsAdded = true;
    },
    assetImage: function () {
      if (this.sendingBCH()) {
        return "/img/bch.svg";
      } else {
        return "/img/assets/" + this.sendContract + ".png";
      }
    },
    sendingBCH: function () {
      return this.sendContract === "";
    },
    getTokenBalances: async function () {
      try {
        const resp = await this.callMultiple(
          map(this.assetList, (_, tokenAddress) => {
            return {
              to: tokenAddress,
              data:
                Web3.utils.sha3("balanceOf(address)").slice(0, 10) +
                "000000000000000000000000" +
                Web3.utils.stripHexPrefix(this.activeAccount),
              returnType: "uint256",
            };
          })
        );

        var newBalances = [];

        each(resp, (_, i) => {
          const k = Object.keys(this.assetList)[i];
          const asset = this.assetList[k];
          if (asset.symbol === "LAW") {
            // LAW contract returns a long and invalid response.
            // Must be truncated to get the right value.
            asset.balance = this.convertValue(
              resp[i].substring(0, 66),
              asset.decimals
            );
          } else {
            asset.balance = this.convertValue(resp[i], asset.decimals);
          }
          newBalances.push(asset);
        });

        return newBalances;
      } catch (error) {
        return null;
      }
    },
    callMultiple: function (transactionConfigs) {
      const batch = new web3js.eth.BatchRequest();
      const promises = transactionConfigs.map((transactionConfig) => {
        return new Promise((res, rej) => {
          const req = web3js.eth.call.request(
            transactionConfig,
            (err, data) => {
              if (err) {
                rej(err);
              } else {
                res(data);
              }
            }
          );
          batch.add(req);
        });
      });

      batch.execute();
      return Promise.all(promises);
    },
    convertValue: function (data, decimals) {
      const convertedValue = new BigNumber(
        new BigNumber(data)
          .dividedBy(new BigNumber(`1e${decimals}`))
          .toFixed(decimals)
      );
      return convertedValue.toString();
    },
    assetIcon: function (address) {
      return "/img/assets/" + address + ".png";
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
    isAssetsView: function () {
      return this.currentView === "assets";
    },
    isScanView: function () {
      return this.currentView === "scan";
    },
    showWithdrawal: function () {
      this.resetNotices();

      this.currentView = "withdrawal";
    },
    showDeposit: function () {
      this.resetNotices();

      this.currentView = "deposit";
    },
    showAssets: function () {
      this.resetNotices();

      this.currentView = "assets";
    },
    showScan: function () {
      this.resetNotices();

      this.currentView = "scan";
    },
    resetNotices: function () {
      this.errorMessage = "";
      this.noticeMessage = "";
    },
    goHome: function () {
      this.showAssets();
    },
    assetBalanceFormatter: function (bal) {
      return new BigNumber(new BigNumber(bal).toFixed(10)).toString();
    },
    sendAction: function () {
      if (this.validateSend()) {
        this.resetNotices();
        if (this.sendingBCH()) {
          this.sendBCH();
        } else {
          this.sendAsset();
        }
      }
    },
    sendAsset: function () {
      const asset = this.assetList[this.sendContract];
      const contract = new web3js.eth.Contract(minABI, this.sendContract);
      const gasPrice = web3js.utils.toWei("0.00000000105", "ether");
      const decimals = web3js.utils.toBN(asset.decimals);
      const amount = new BigNumber(this.sendAmount);
      const value = amount.multipliedBy(web3js.utils.toBN(10).pow(decimals));

      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: this.activeAccount,
              to: web3js.utils.toChecksumAddress(this.sendContract),
              value: web3js.utils.toHex(0),
              gasPrice: web3js.utils.toHex(gasPrice),
              data: contract.methods
                .transfer(this.sendTo, web3js.utils.toBN(value))
                .encodeABI(),
            },
          ],
        })
        .then((txHash) => console.log(txHash))
        .catch((error) => console.log(error));
    },
    sendBCH: function () {
      let value = web3js.utils.toWei(this.sendAmount.toString(), "ether");
      const gasPrice = web3js.utils.toWei("0.00000000105", "ether");
      const gas = "21000";

      // Send max case, deduct the gas from the value.
      if (this.sendAmount.toString() === this.balance.toString()) {
        value =
          new BigNumber(value) - new BigNumber(gas) * new BigNumber(gasPrice);

        if (value < 0) {
          value = "0";
        } else {
          value = value.toString();
        }
      }

      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: this.activeAccount,
              to: web3js.utils.toChecksumAddress(this.sendTo),
              value: web3js.utils.toHex(value),
              gas: web3js.utils.toHex(gas),
              gasPrice: web3js.utils.toHex(gasPrice),
            },
          ],
        })
        .then((txHash) => console.log(txHash))
        .catch((error) => console.log(error));
    },
    validateSend: function () {
      try {
        const address = web3js.utils.toChecksumAddress(this.sendTo);
      } catch (e) {
        this.setError("Invalid Recipient Address");
        return false;
      }

      if (this.sendingBCH() && this.sendAmount > this.balance) {
        this.setError("Invalid amount");
        return false;
      }

      if (
        !this.sendingBCH() &&
        this.sendAmount > this.assetList[this.sendContract].balance
      ) {
        this.setError("Invalid amount");
        return false;
      }

      return true;
    },
    maxSend: function () {
      if (this.sendingBCH()) {
        this.sendAmount = this.balance;
      } else {
        this.sendAmount = this.assetList[this.sendContract].balance;
      }
    },
    setNotice: function (text) {
      this.noticeMessage = text;
      this.noticeDate = Date.now();
    },
    setError: function (text) {
      this.errorMessage = text;
      this.errorDate = Date.now();
    },
    BCHBalance: function (bal) {
      return new BigNumber(bal.toFixed(8)).toString();
    },
    goToSmartScan: function () {
      location.href = this.smartScanURI(this.activeAccount);
    },
    paste: async function () {
      if (this.copySupported()) {
        this.sendTo = await navigator.clipboard.readText();
      } else {
        console.log("Clipboard not available");
      }
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

        var pendingBalances = [];

        each(await this.getTokenBalances(), (v) => {
          if (new BigNumber(v.balance).gt(0)) {
            pendingBalances.push(v);
          }
        });

        this.tokenBalances = reverse(
          pendingBalances.sort(function (a, b) {
            if (a.symbol < b.symbol) {
              return 1;
            }
            if (a.symbol > b.symbol) {
              return -1;
            }
            return 0;
          })
        );

        console.log("Refreshing balance for " + this.activeAccount);
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
      // Fresh connections clear the notifications.
      if (this.connected !== true) {
        this.resetNotices();
      }

      this.connected = true;
      this.pendingConnection = false;

      // Notifications must persist for at least 3 seconds.
      if (Date.now() - this.noticeDate > 3000) {
        this.noticeMessage = "";
        this.noticeDate = 0;
      }

      // Errors must persist for at least 3 seconds.
      if (Date.now() - this.errorDate > 3000) {
        this.errorMessage = "";
        this.errorDate = 0;
      }
    },
    formatError: function (err) {},
    handleConnectionFailed: function (error) {
      this.noticeMessage = "";
      this.connected = false;
      this.pendingConnection = false;
      this.stopRequests = true;

      const errorPrefix = "Error " + error.code + ": ";

      if (error.code === 4001) {
        this.setError(errorPrefix + "Access to accounts denied.");
      } else {
        this.setError(errorPrefix + error.message);
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
            this.updateBalance();
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
        iconUrls: ["https://smartmask.cash/img/smartbch_logo.png"],
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
        this.setError("Please connect to the smartBCH network!");

        if (this.bindingRetries < 15) {
          await delay(250);
          this.checkState();
        }

        return;
      }

      this.updateAccount();
    },
    resetData: function () {
      this.accounts = [];
      this.activeAccount = "";
      this.balance = new BigNumber(0);
      this.connected = null;
      this.errorMessage = "";
      this.pendingConnection = null;
      this.sendAmount = new BigNumber(0);
      this.sendContract = "";
      this.sendTo = "";
      this.stopRequests = false;
      this.tokenBalances = {};
    },
  },
};
</script>
