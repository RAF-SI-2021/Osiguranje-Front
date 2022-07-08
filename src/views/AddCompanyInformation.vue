<script>
import { ref, reactive, computed, inject } from 'vue';
import useVuelidate from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
import { companyAPI } from '../api/companyAPI';

export default {

    setup() {

        const form = reactive({
            companyName: '',
            companyRegistrationId: '',
            companyTaxId: '',
            sicCode: '',
            address: '',

        })

        const rules = computed(() => {
            return {
                companyName: { required  },
                companyRegistrationId: { required, numeric },
                companyTaxId: { required, numeric },
                sicCode: { required, numeric },
                address: { required },
            }
        })

        const v$ = useVuelidate(rules, form);
        const loading = ref(false);
        const toast = inject('toast');


        function onSubmit(evt) {
            this.v$.$validate();
            if(!this.v$.$error){
              const newCompany = {
                name: form.companyName,
                registrationID: form.companyRegistrationId,
                taxID: form.companyTaxId,
                industrialClassificationID: form.sicCode,
                address: form.address,
              }
              loading.value = true;
              companyAPI.createNewCompany(newCompany).then(response => {
                loading.value = false;
                toast.success("Company created successfully!");
             }).catch(error => {
                loading.value = false;
                toast.error("Something went wrong");
              })
            } else { 
                 evt.preventDefault();
            }
            console.log(form);
            

        }

        function onReset() {
            form.companyName = '';
            form.companyRegistrationId = '';
            form.companyTaxId = '';
            form.sicCode = '';
            form.address = '';
        }

        return {
            form, v$, onSubmit, onReset, loading
        }

    },


}



</script>

<template>
  <vue-element-loading :active="loading" spinner="bar-fade-scale" style="height: 100vh" />
  <div class="container">
        <h2 class="mt-5 text-center">Add Company Information</h2>
        <div class="row justify-content-center">
            <div class="col-5">
                <form @submit.prevent="onSubmit">

                    <div class="row">
                        <div class="mb-3">
                        <label for="companyName" class="form-label">Company name</label>
                            <input
                                type="text"
                                v-model="form.companyName"
                                class="form-control"
                                id="companyName"
                            />
                        </div>
                        <div
                            class="input-errors"
                            v-for="error of v$.companyName.$errors"
                            :key="error.$uid"
                        >
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="mb-3">
                        <label for="companyRegistrationId" class="form-label">Company registration Id</label>
                            <input
                                type="text"
                                v-model="form.companyRegistrationId"
                                class="form-control"
                                id="companyRegistrationId"
                            />
                        </div>
                        <div
                            class="input-errors"
                            v-for="error of v$.companyRegistrationId.$errors"
                            :key="error.$uid"
                        >
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="mb-3">
                        <label for="companyTaxId" class="form-label">Company Tax Id</label>
                            <input
                                type="text"
                                v-model="form.companyTaxId"
                                class="form-control"
                                id="companyTaxId"
                            />
                        </div>
                        <div
                            class="input-errors"
                            v-for="error of v$.companyTaxId.$errors"
                            :key="error.$uid"
                        >
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="mb-3">
                        <label for="sicCode" class="form-label">SIC Code</label>
                            <input
                                type="text"
                                v-model="form.sicCode"
                                class="form-control"
                                id="sicCode"
                            />
                        </div>
                        <div
                            class="input-errors"
                            v-for="error of v$.sicCode.$errors"
                            :key="error.$uid"
                        >
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="mb-3">
                        <label for="address" class="form-label">Address</label>
                            <input
                                type="text"
                                v-model="form.address"
                                class="form-control"
                                id="address"
                            />
                        </div>
                        <div
                            class="input-errors"
                            v-for="error of v$.address.$errors"
                            :key="error.$uid"
                        >
                            <div class="error-msg">{{ error.$message }}</div>
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