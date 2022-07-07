<script setup>
import { ref, reactive, onMounted, inject, computed, watch } from "vue";
import { companyAPI } from "../api/companyAPI";

const companyList = ref([]);
const loading = ref(false);
const toast = inject("toast");

const searchTerms = reactive({
  name: "",
  registrationID: '',
  taxID: ''
})

onMounted(() => {
  loading.value = true;
  companyAPI.getCompanies().then((res) => {
    loading.value = false;
    companyList.value = res.data;
  }).catch((err) => {
    loading.value = false;
    toast.error("Failed to fetch companies")
  });
})

function search() {
  loading.value = true;
  companyAPI.searchCompanies(searchTerms).then((res) => {
    loading.value = false;
    companyList.value = res.data;
  }).catch((err) => {
    loading.value = false;
    toast.error("Failed to search companies")
  });
}

function resetSearch() {
  loading.value = true;
  companyAPI.getCompanies().then((res) => {
    loading.value = false;
    companyList.value = res.data;
  }).catch((err) => {
    loading.value = false;
    toast.error("Failed to fetch companies")
  });
}

</script>

<template>
  <vue-element-loading :active="loading" spinner="bar-fade-scale" style="height: 100vh" />
  <div class="container">
    <h1 class="text-center mt-5">Companies</h1>
    <h4>Search</h4>
    <div class="row row-cols-4 align-items-end">
      <div class="col">
        <label class="form-label">Company name</label>
        <input class="form-control" type="text" v-model="searchTerms.name" />
      </div>
      <div class="col">
        <label class="form-label">Registration ID</label>
        <input class="form-control" type="number" v-model="searchTerms.registrationID" />
      </div>
      <div class="col">
        <label class="form-label">Tax ID</label>
        <input class="form-control" type="number" v-model="searchTerms.taxID" />
      </div>
      <div class="col">
        <button class="btn btn-primary mx-2" @click="search">Search</button>
        <button class="btn btn-primary" @click="resetSearch">Reset Search</button>
      </div>
    </div>
    <h4 class="mt-3">Results</h4>
    <table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th>Company name</th>
          <th>Company Address</th>
          <th>Registration ID</th>
          <th>Tax ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="company in companyList">
          <td>{{ company.name }}</td>
          <td>{{ company.address }}</td>
          <td>{{ company.registrationID }}</td>
          <td>{{ company.taxID }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>