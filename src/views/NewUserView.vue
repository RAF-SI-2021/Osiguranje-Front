<template>
  <vue-element-loading :active="loading" spinner="bar-fade-scale" style="height: 100vh; width: 100vw" />
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-5">
              <h2 class="text-center mb-5">New User</h2>

              <form @submit.prevent="submitForm">

                  
                
                <div class="form-outline mb-4">
                  <label class="form-label" for="email">Your Email</label>
                  <input v-model="state.email" type="email" id="email" class="form-control form-control-lg" />
                  <div v-for="error in v$.email.$errors" :key="error.$uid">
                        <span class="test-error">{{error.$message}}</span>
                  </div>
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="name">Name</label>
                  <input v-model="state.name" type="text" id="name" class="form-control form-control-lg" />
                  <div v-for="error in v$.name.$errors" :key="error.$uid">
                        <span class="test-error">{{error.$message}}</span>
                  </div>
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="surname">Surname</label>
                  <input v-model="state.surname" type="text" id="surname" class="form-control form-control-lg" />
                  <div v-for="error in v$.surname.$errors" :key="error.$uid">
                        <span class="test-error">{{error.$message}}</span>
                  </div>
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="jmbg">JMBG</label>
                  <input v-model="state.jmbg" type="text" id="jmbg" class="form-control form-control-lg" />
                    <div v-for="error in v$.jmbg.$errors" :key="error.$uid">
                        <span class="test-error">{{error.$message}}</span>
                    </div>
                </div>


                <div class="form-outline mb-4">
                  <label class="form-label" for="position">Position</label>
                  <input v-model="state.position" type="text" id="position" class="form-control form-control-lg" />
                  <div v-for="error in v$.position.$errors" :key="error.$uid">
                        <span class="test-error">{{error.$message}}</span>
                    </div>
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="phoneNumber">Phone number</label>
                  <input v-model="state.phoneNumber" type="tel" id="phoneNumber" class="form-control form-control-lg" />
                  <div v-for="error in v$.phoneNumber.$errors" :key="error.$uid">
                        <span class="test-error">{{error.$message}}</span>
                  </div>
                </div>


                <div class="form-outline mb-4">
                  <input
                    class="form-check-input me-2"
                    type="checkbox"
                    value=""
                    checked
                    id="form2Example3cg"
                    v-model="state.active"
                  />
                  <label class="form-check-label" for="form2Example3g"> Active </label>
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="limit">Cash Limit</label>
                  <input class="form-control" type="number" id="limit" v-model="state.limit">
                  <div v-for="error in v$.limit.$errors" :key="error.$uid">
                    <span class="test-error">{{error.$message}}</span>
                  </div>
                </div>

                <div class="form-outline mb-4">
                  <input class="form-check-input me-2" type="checkbox" id="requireApproval" v-model="state.requireApproval">
                  <label class="form-check-label" for="requireApproval"> Require Approval for Order</label>
                </div>

                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-primary btn-block btn-lg gradient-custom-4 text-body">Register</button>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, computed, ref, inject} from 'vue';
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, email, numeric, minValue } from "@vuelidate/validators";
import { userAPI } from '../api/userAPI';
import { useRouter } from 'vue-router';
import { userStore } from "../stores/userStore";

export default {

    setup(){

        const store = userStore();
        const router = useRouter();
        const toast = inject('toast');
        const loading = ref(false);

        const state = reactive({
            email:'',
            name:'',
            surname:'',
            jmbg:'',
            position:'',
            phoneNumber:'',
            active: false,
            limit: 0,
            requireApproval: false
        })

        const rules = computed(()=>{
            return {
                email:{required, minLength:minLength(4), maxLength:maxLength(24), email},
                name:{required, minLength:minLength(2), maxLength:maxLength(24)},
                surname:{required, minLength:minLength(2), maxLength:maxLength(24)},
                jmbg:{required, minLength:minLength(13), maxLength:maxLength(13)},
                position:{required},
                phoneNumber:{required, numeric},
                limit: { required, numeric, minValue: minValue(1) }
            }
        })

        const v$ = useVuelidate(rules,state);

        function submitForm(){
            this.v$.$validate();
            if(!this.v$.$invalid){
              const newUser = {
                firstName: state.name,
                lastName: state.surname,
                jmbg: state.jmbg,
                email: state.email,
                position: state.position,
                phoneNumber: state.phoneNumber,
                active: state.active,
                permissions: {
                  stockTrading: false,
                  stockOverview: false,
                  contractConclusion: false,
                  admin: false
                }
              }
              loading.value = true;
              userAPI.createNewUser(newUser).then(response => {
                loading.value = false;
                toast.success("User created successfully!");

                console.log(response.data);
                let newUserId = response.data.id;

                const actuary = {
                  userId: newUserId,
                  actuaryType: "AGENT",
                  limit: state.limit,
                  approvedOrders: state.requireApproval
                }

                userAPI.createActuary(actuary).then(response => {
                  toast.success("Agent created successfully")
                  router.push('/admin/users');
                }).catch(error => {
                  toast.error("Error creating actuary!");
                });

              }).catch(error => {
                loading.value = false;
                toast.error("Something went wrong");
              })
            }
        }

        return{
            state,v$, submitForm, loading
        }
    }

}
</script>

<style scoped>

span{
    color: red;
}

    
</style>