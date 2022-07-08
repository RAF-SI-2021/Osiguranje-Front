<template>
  <div class="container">
    <h1 class="mt-5 text-center">Contracts</h1>
    <h4 class="mt-4">Search</h4>
    <div class="row row-cols-4 align-items-end">
      <div class="col">
        <label class="form-label">Company Name</label>
        <input type="text" class="form-control" v-model="searchTerms.companyName" />
      </div>
      <div class="col">
        <label class="form-label">Contract Number</label>
        <input type="text" class="form-control" v-model="searchTerms.contractNumber" />
      </div>
      <div class="col">
        <button class="btn btn-primary mx-3" @click="searchContracts">Search</button>
        <button class="btn btn-secondary" @click="clearSearch">Clear</button>
      </div>
    </div>

    <h4 class="my-4">Results</h4>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Creation Date</th>
          <th scope="col">Company Name</th>
          <th scope="col">Contract Number</th>
          <th scope="col">Status</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contract in contractsCopy" :key="contract.id">
          <td>{{ contract.creationDate }}</td>
          <td>{{ contract.company.name }}</td>
          <td>{{ contract.refNumber }}</td>
          <td>{{ contract.status }}</td>
          <td>{{ contract.description }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { contractAPI } from "../api/contractAPI";

const contracts = ref([])
const contractsCopy = ref([]);
const searchTerms = reactive({
  companyName: "",
  contractNumber: ""
})

onMounted(() => {
  contractAPI.getContracts().then(data => {
    contracts.value = data.data;
    contractsCopy.value = contracts.value
  });
})

function searchContracts() {
  contractsCopy.value = contracts.value.filter(contract => {
    return contract.company.name.toLowerCase().includes(searchTerms.companyName.toLowerCase()) &&
      contract.refNumber.toLowerCase().includes(searchTerms.contractNumber.toLowerCase());
  });
}

function clearSearch() {
  contractsCopy.value = contracts.value;
}
</script>

<style scoped>

</style>