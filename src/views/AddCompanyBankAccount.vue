<template>
  <vue-element-loading :active="loading" spinner="bar-fade-scale" style="height: 100vh; width: 100vw" />
  <div class="container">
    <h2 class="text-center mt-5">Add Company Bank Account</h2>
    <div class="row justify-content-center">
      <div class="col-6">
        <form @submit.prevent="submitForm">
          <div class="form-outline mb-4">
            <label class="form-label" for="company">Company</label>
            <select class="form-select" id="company" v-model="bankAccount.companyId">
              <option :selected="i === 0" v-for="(company, i) in companies" :value="company.id">
                {{ company.name }}
              </option>
            </select>
          </div>

          <div class="form-outline mb-4">
            <label class="form-label" for="accountNumber">Bank Account Number</label>
            <input class="form-control" type="text" id="accountNumber" v-model="bankAccount.accountNumber" />
            <div
              class="input-errors"
              v-for="error of v$.accountNumber.$errors"
              :key="error.$uid"
            >
              <div class="text-danger">{{ error.$message }}</div>
            </div>
          </div>

          <div class="form-outline mb-4">
            <label class="form-label" for="bankName">Bank Name</label>
            <input class="form-control" type="text" id="bankName" v-model="bankAccount.bankName" />
            <div
              class="input-errors"
              v-for="error of v$.bankName.$errors"
              :key="error.$uid"
            >
              <div class="text-danger">{{ error.$message }}</div>
            </div>
          </div>

          <div class="form-outline mb-4">
            <label class="form-label" for="accountType">Account Type</label>
            <input class="form-control" type="text" id="accountType" v-model="bankAccount.accountType" />
            <div
              class="input-errors"
              v-for="error of v$.accountType.$errors"
              :key="error.$uid"
            >
              <div class="text-danger">{{ error.$message }}</div>
            </div>
          </div>

          <button class="btn btn-primary" type="submit">Add Bank Account</button>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { maxLength, minLength, required } from "@vuelidate/validators";
import { companyAPI } from "../api/companyAPI";

const companies = ref([])
const loading = ref(false);
const toast = inject("toast");

onMounted(() => {
  companyAPI.getCompanies().then(res => {
    companies.value = res.data;
  });
})

const bankAccount = reactive({
  companyId: 1,
  accountNumber: "",
  bankName: "",
  accountType: ""
});

const rules = computed(() => {
  return {
    companyId: {
      required
    },
    accountNumber: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(50)
    },
    bankName: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(50)
    },
    accountType: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(50)
    }
  };
});

const v$ = useVuelidate(rules, bankAccount);

function submitForm() {
  v$.value.$validate().then(() => {
    if (!v$.value.$invalid) {
      loading.value = true
      companyAPI.addCompanyBankAccount(bankAccount.companyId, bankAccount).then(res => {
        loading.value = false
        toast.success("Bank account added successfully")
      }).catch(err => {
        loading.value = false
        toast.error("Something went wrong")
      });
    }
  });
}
</script>

<style scoped>

</style>