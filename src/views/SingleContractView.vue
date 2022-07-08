<template>
  <div class="container">
    <h1 class="mt-5 text-center">Contract Info</h1>
    <div class="row row-cols-2">
      <div class="col">
        <p class="mt-4"><strong>Contract Reference Number: </strong>{{ contract.refNumber }}</p>
        <p><strong>Contract Status: </strong>{{ contract.status }}</p>
        <p><strong>Contract Description: </strong>{{ contract.description }}</p>
        <p><strong>Contract Creation Date: </strong>{{ contract.creationDate }}</p>
        <p><strong>Last Updated: </strong>{{ contract.lastUpdated }}</p>
      </div>
      <div class="col">
        <div class="d-flex justify-content-between align-items-end">
          <h3 class="mt-4 text-center">Transaction Items</h3>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTransactionItem">Add Transaction Item</button>
        </div>
        <p v-if="contract.transactions.length === 0" class="text-center mt-5"><strong>No Transaction Items to display</strong></p>
        <div v-else class="mt-5">

        </div>
      </div>
    </div>
  </div>


  <div class="modal fade" id="addTransactionItem">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Transaction Item</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row row-cols-2 mb-2">
            <div class="col">
              <label class="form-label">Transaction Type</label>
              <select class="form-select" v-model="transactionItem.transcationType">
                <option selected value="BUY">Purchase</option>
                <option value="SELL">Sell</option>
              </select>
            </div>
            <div class="col">
              <label class="form-label">Security Type</label>
              <select class="form-select" v-model="transactionItem.securityType" @change="onSelectChange">
                <option selected value="STOCK">Stock</option>
                <option value="FUTURE">Future</option>
                <option value="FOREX">Forex</option>
              </select>
            </div>
          </div>
          <div class="row row-cols-2 mb-2">
            <div class="col">
              <label class="form-label">Security</label>
              <select class="form-select" v-model="transactionItem.securityId">
                <option :selected="i === 0" v-for="(security, i) in options" :key="security.id" :value="security.id">{{ security.name }} - {{ security.ticker }}</option>
              </select>
            </div>
            <div class="col">
              <label class="form-label">Account</label>
              <select class="form-select" v-model="transactionItem.accountId">
                <option selected value="1">Cash</option>
                <option value="2">Margin</option>
              </select>
            </div>
          </div>
          <div class="row row-cols-2">
            <div class="col">
              <label class="form-label">Quantity</label>
              <input class="form-control" type="number" v-model="transactionItem.quantity" />
            </div>
            <div class="col">
              <label class="form-label">Price Per Share</label>
              <input class="form-control" type="number" v-model="transactionItem.pricePerShare" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addItem">Add</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { contractAPI } from "../api/contractAPI";
import { securitiesAPI } from "../api/securitiesAPI";

const contract = ref({
  refNumber: "",
  status: "",
  description: "",
  creationDate: "",
  lastUpdated: "",
  transactions: []
});
const route = useRoute();
const contractId = route.params.id;
const allSecurities = ref({});
const options = ref([])
const toast = inject("toast");

const transactionItem = reactive({
  transcationType: "BUY",
  securityType: "STOCK",
  securityId: 1,
  accountId: 1,
  quantity: 0,
  pricePerShare: 0
})

onMounted(() => {
  Promise.all([
    contractAPI.getContractById(contractId),
    securitiesAPI.getSecurities()
  ]).then((values) => {
    contract.value = values[0].data;
    allSecurities.value = values[1].data;
    options.value = allSecurities.value.stocks;
  })
})

function onSelectChange(e) {
  transactionItem.securityType = e.target.value;
  if (e.target.value === "STOCK") {
    options.value = allSecurities.value.stocks;
  } else if (e.target.value === "FUTURE") {
    options.value = allSecurities.value.futures;
  } else if (e.target.value === "FOREX") {
    options.value = allSecurities.value.forex;
  }
}

function addItem() {
  let newTransactionItem = {
    transactionType: transactionItem.transcationType,
    securityId: transactionItem.securityId,
    securityType: transactionItem.securityType,
    accountId: transactionItem.accountId,
    currencyId: 62,
    amount: transactionItem.quantity,
    pricePerShare: transactionItem.pricePerShare
  }
  contractAPI.addContractTransactionItem(contractId, newTransactionItem).then(() => {
    toast.success("Transaction Item Added");
    contract.value.transactions.push(newTransactionItem);
  })
}

</script>

<style scoped>

</style>