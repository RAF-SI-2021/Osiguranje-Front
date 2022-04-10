<template>
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-5">
              <h2 class="text-uppercase text-center mb-5">New User</h2>

              <form @submit.prevent="submitForm">

                  
                
                <div class="form-outline mb-4">
                  <label class="form-label" for="email">Your Email</label>
                  <input v-model="state.email" type="email" id="email" class="form-control form-control-lg" />
                  <div v-for="error in v$.email.$errors" :key="error.$uid">
                        <span>{{error.$message}}</span>
                  </div>
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="name">Name</label>
                  <input v-model="state.name" type="text" id="name" class="form-control form-control-lg" />
                  <div v-for="error in v$.name.$errors" :key="error.$uid">
                        <span>{{error.$message}}</span>
                  </div>
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="surname">Surname</label>
                  <input v-model="state.surname" type="text" id="surname" class="form-control form-control-lg" />
                  <div v-for="error in v$.surname.$errors" :key="error.$uid">
                        <span>{{error.$message}}</span>
                  </div>
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="jmbg">JMBG</label>
                  <input v-model="state.jmbg" type="text" id="jmbg" class="form-control form-control-lg" />
                    <div v-for="error in v$.jmbg.$errors" :key="error.$uid">
                        <span>{{error.$message}}</span>
                    </div>
                </div>


                <div class="form-outline mb-4">
                  <label class="form-label" for="position">Position</label>
                  <input v-model="state.position" type="text" id="position" class="form-control form-control-lg" />
                  <div v-for="error in v$.position.$errors" :key="error.$uid">
                        <span>{{error.$message}}</span>
                    </div>
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="phoneNumber">Phone number</label>
                  <input v-model="state.phoneNumber" type="tel" id="phoneNumber" class="form-control form-control-lg" />
                  <div v-for="error in v$.phoneNumber.$errors" :key="error.$uid">
                        <span>{{error.$message}}</span>
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
import {reactive, computed} from 'vue';
import useVuelidate from '@vuelidate/core'
import {required,minLength, maxLength, email, numeric} from '@vuelidate/validators'
import { userAPI } from '../api/userAPI';
import { useRouter } from 'vue-router';

export default {

    setup(){

        const router = useRouter();

        const state = reactive({
            email:'',
            name:'',
            surname:'',
            jmbg:'',
            position:'',
            phoneNumber:'',
            active: false
        })

        const rules = computed(()=>{
            return {
                email:{required, minLength:minLength(4), maxLength:maxLength(24), email},
                name:{required, minLength:minLength(2), maxLength:maxLength(24)},
                surname:{required, minLength:minLength(2), maxLength:maxLength(24)},
                jmbg:{required, minLength:minLength(13), maxLength:maxLength(13)},
                position:{required},
                phoneNumber:{required, numeric},
                
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
              userAPI.createNewUser(newUser).then(response => {
                // console.log(response);
                if(response.status === 200){
                  router.push('/admin/users');
                }
              }).catch(error => {
                console.log(error);
              })
            }
        }

        return{
            state,v$, submitForm
        }
    }

}
</script>

<style scoped>

span{
    color: red;
}

    
</style>