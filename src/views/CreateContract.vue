<template>
  <div class="container">
    <h1 class="text-center my-5">Create Contract</h1>
    <div class="row justify-content-center">
      <div class="col-6">
        <form @submit.prevent="">
          <div class="form-outline mb-4">
            <label class="form-label" for="company">Company</label>
            <select class="form-select" id="company" v-model="contract.companyId">
              <option v-for="(company, i) in compaines" :key="company.id" :selected="i === 0" :value="company.id">{{ company.name }}</option>
            </select>
            <div
              class="input-errors"
              v-for="error of v$.companyId.$errors"
              :key="error.$uid"
            >
              <div class="text-danger">{{ error.$message }}</div>
            </div>
          </div>

          <div class="form-outline mb-4">
            <label class="form-label" for="referenceNumber">Contract Reference Number</label>
            <input class="form-control" type="text" id="referenceNumber"  v-model="contract.referenceNumber" />
            <div
              class="input-errors"
              v-for="error of v$.referenceNumber.$errors"
              :key="error.$uid"
            >
              <div class="text-danger">{{ error.$message }}</div>
            </div>
          </div>

          <div class="form-outline mb-4">
            <label class="form-label" for="note" >Note</label>
            <textarea class="form-control" id="note" rows="3" v-model="contract.note"></textarea>
          </div>

          <button type="submit" class="btn btn-primary btn-lg" @click="submit">Add Contract</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, reactive, ref } from "vue";
import { companyAPI } from "../api/companyAPI";
import { contractAPI } from "../api/contractAPI";
import { minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const toast = inject("toast");
const compaines = ref([]);
const items = ref(1);
const contract = reactive({
  companyId: 1,
  referenceNumber: "",
  note: "",
})

const rules = {
  companyId: { required },
  referenceNumber: { required, minLength: minLength(3) },
  note: {}
}

const v$ = useVuelidate(rules, contract);

onMounted(() => {
  companyAPI.getCompanies().then(res => {
    compaines.value = res.data;
  });
})

  function submit() {
    let contractToAdd = {
      companyID: contract.companyId,
      refNumber: contract.referenceNumber,
      description: contract.note
    }
    console.log(contractToAdd)
    v$.value.$validate();
    console.log(v$.value);
    if (v$.value.$invalid) {
      toast.error("Please fill in all required fields");
      return;
    }
    contractAPI.createContract(contractToAdd).then(res => {
      toast.success("Contract created");
    })
  }
</script>

<style scoped>

</style>