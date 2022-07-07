<script>
import { ref, reactive, computed, onMounted } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import router from "@/router";
import { companyAPI } from "../api/companyAPI";
export default {
  setup() {
    const companies = ref([]);

    onMounted(() => {
      companyAPI.getCompanies().then((res) => {
        companies.value = res.data;
        console.log(res.data);
      });
    });

    const form = reactive({
      company: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      companyPosition: "",
      note: "",
    });
    const rules = computed(() => {
      return {
        company: { required },
        firstName: { required },
        lastName: { required },
        phoneNumber: { required },
        email: { required, email },
        companyPosition: { required },
      };
    });
    const v$ = useVuelidate(rules, form);
    const ok = ref(false);
    function onSubmit(evt) {
      this.v$.$validate();
      ok.value = false;
      if (!this.v$.$error) {
        ok.value = true;
        alert("Validacija prosla");
        console.log(form);
      } else {
        evt.preventDefault();
      }
      console.log(form);
    }

    return {
      form,
      v$,
      onSubmit,
    };
  },
};
</script>

<template>
  <div class="container">
    <h2 class="mt-5 text-center">Employee contact</h2>
    <br>
    <div class="row justify-content-center">
      <div class="col-5">
        <form @submit="onSubmit">
          <div class="row">
            <div class="form-outline mb-4">
              <label for="company">Company:</label>
              <select class="form-select" id="company">
                <option
                  :selected="i === 0"
                  v-for="(company, i) in companies"
                  :value="company.id"
                >
                  {{ company.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-outline mb-4">
            <div class="mb-3">
              <label for="firstName" class="form-label">First Name</label>
              <input
                type="text"
                v-model="form.firstName"
                class="form-control"
                id="firstName"
              />
            </div>
            <div
              class="input-errors"
              v-for="error of v$.firstName.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div class="form-outline mb-4">
            <div class="mb-3">
              <label for="lastName" class="form-label">Last Name</label>
              <input
                type="text"
                v-model="form.lastName"
                class="form-control"
                id="lastName"
              />
            </div>
            <div
              class="input-errors"
              v-for="error of v$.lastName.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div class="form-outline mb-4">
            <div class="mb-3">
              <label for="phoneNumber" class="form-label">Phone Number</label>
              <input
                type="text"
                v-model="form.phoneNumber"
                class="form-control"
                id="phoneNumber"
              />
            </div>
            <div
              class="input-errors"
              v-for="error of v$.phoneNumber.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div class="form-outline mb-4">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="text"
                v-model="form.email"
                class="form-control"
                id="email"
              />
            </div>
            <div
              class="input-errors"
              v-for="error of v$.email.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div class="form-outline mb-4">
            <div class="mb-3">
              <label for="companyPosition" class="form-label"
                >Company Position</label
              >
              <input
                type="text"
                v-model="form.companyPosition"
                class="form-control"
                id="companyPosition"
              />
            </div>
            <div
              class="input-errors"
              v-for="error of v$.companyPosition.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <div class="form-outline mb-4">
            <div class="mb-3">
              <label for="note" class="form-label">Note</label>
              <textarea
                type="text"
                v-model="form.note"
                class="form-control"
                id="note"
              >
              </textarea>
            </div>
          </div>

          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button @click="onReset()" class="btn btn-danger">Reset</button>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>


<style scoped>
.error-msg {
    color: red;
}
</style> 