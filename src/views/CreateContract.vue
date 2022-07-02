<template>
  <div class="container">
    <h1 class="text-center my-5">Create Contract</h1>
    <div class="row justify-content-center">
      <div class="col-6">
        <form @submit.prevent="">
          <div class="form-outline mb-4">
            <label class="form-label" for="company">Company</label>
            <select class="form-select" id="company">
              <option selected value="1">Company 1</option>
              <option value="2">Company 2</option>
              <option value="3">Company 3</option>
            </select>
          </div>

          <div class="form-outline mb-4">
            <label class="form-label" for="referenceNumber">Contract Reference Number</label>
            <input class="form-control" type="text" id="referenceNumber" />
          </div>

          <div class="form-outline mb-4">
            <label class="form-label" for="note">Note</label>
            <textarea class="form-control" id="note" rows="3"></textarea>
          </div>

          <div class="d-flex justify-content-between align-items-start">
            <h4 class="mb-4">Transcation items</h4>
            <button class="btn btn-primary ml-auto" type="button" @click="addItem">Add item</button>
          </div>

          <div class="mb-4 p-2 border border-2 rounded" v-for="(item, index) in contract.transcationItems.length">
            <div class="d-flex justify-content-between align-items-start">
              <h5>#{{ index+1 }}</h5>
              <button class="btn btn-danger" type="button" @click="removeItem(index)"><i class="bi bi-x-lg"></i></button>
            </div>
            <div class="d-flex justify-content-around">
              <div class="form-outline mb-4">
                <label class="form-label">Action</label>
                <select class="form-select">
                  <option selected value="Buy">Buy</option>
                  <option value="Sell">Sell</option>
                </select>
              </div>

              <div class="form-outline mb-4">
                <label class="form-label">Security</label>
                <select class="form-select">
                  <option selected value="1">AAPL</option>
                  <option value="2">TSLA</option>
                  <option value="3">MSFT</option>
                </select>
              </div>

              <div class="form-outline mb-4">
                <label class="form-label">Bank Account</label>
                <select class="form-select">
                  <option selected value="Cash">Cash</option>
                  <option value="Margin">Margin</option>
                </select>
              </div>
            </div>

            <div class="form-outline mb-4">
              <label class="form-label">Amount</label>
              <input class="form-control" type="number" />
            </div>

            <div class="form-outline mb-4">
              <label class="form-label">Price Per Unit</label>
              <input class="form-control" type="number" />
            </div>

          </div>

          <button type="submit" class="btn btn-primary btn-lg">Add Contract</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const items = ref(1);
const contract = reactive({
  companyId: 1,
  referenceNumber: "",
  note: "",
  transcationItems: [
    {
      action: "Buy",
      securityId: 1,
      bankAccount: "Cash",
      currency: "EUR",
      amount: 1,
      pricePerUnit: 1
    }
  ]
})

  function addItem() {
    contract.transcationItems.push({
      action: "Buy",
      securityId: 1,
      bankAccount: "Cash",
      currency: "EUR",
      amount: 1,
      pricePerUnit: 1
    })
  }

  function removeItem(index) {
    contract.transcationItems.splice(index, 1)
  }
</script>

<style scoped>

</style>