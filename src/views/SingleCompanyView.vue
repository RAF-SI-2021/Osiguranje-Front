<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { companyAPI } from "../api/companyAPI";

const loading = ref(false);
const company = ref({
  name: "",
  address: "",
  registrationID: 0,
  taxID: 0,
  industrialClassificationID: 0,
  bankAccounts: [],
  employees: []
});
const route = useRoute();
const id = route.params.id;

onMounted(() => {
  loading.value = true;
  companyAPI.getCompanyById(id).then((res) => {
    loading.value = false;
    company.value = res.data;
  }).catch((err) => {
    loading.value = false;
    console.log(err);
  });
})

</script>

<template>
  <div class="container">
    <h1 class="mt-5">{{ company.name }}</h1>
    <div class="row row-cols-2">

    </div>
  </div>
</template>