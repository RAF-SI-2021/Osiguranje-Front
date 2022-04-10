<template>
    <div class="container user-edit-container">
      <h1 class="mt-3 mb-3 text-center">Editing User</h1>
      <div class="row justify-content-center"></div>

      <div class="row justify-content-center" v-if="user">
        <form class="col-6" @submit="submit">
          <div class="mb-3">
            <label class="form-label">Name:</label>
            <input type="text" class="form-control" v-model="user.name">
            <div v-for="error in v$.name.$errors" :key="error.$uid">
              <span>{{error.$message}}</span>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Surname:</label>
            <input type="text" class="form-control" v-model="user.surname">
            <div v-for="error in v$.surname.$errors" :key="error.$uid">
              <span>{{error.$message}}</span>
            </div>
          </div>
          <!-- <div class="mb-3">
            <label class="form-label">JMBG:</label>
            <input type="number" class="form-control" v-model="user.jmbg">
            <div v-for="error in v$.jmbg.$errors" :key="error.$uid">
              <span>{{error.$message}}</span>
            </div>
          </div> -->
          <div class="mb-3">
            <label class="form-label">E-mail:</label>
            <input type="email" class="form-control" v-model="user.email">
            <div v-for="error in v$.email.$errors" :key="error.$uid">
              <span>{{error.$message}}</span>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Phone Number:</label>
            <input type="text" class="form-control" v-model="user.phoneNumber">
           <!-- <div v-for="error in v$.phone.$errors" :key="error.$uid">
             <span>{{error.$message}}</span>
           </div> -->

          </div>
          <div class="mb-3">
            <label class="form-label">Position:</label>
            <input type="text" class="form-control" v-model="user.position">
            <div v-for="error in v$.position.$errors" :key="error.$uid">
              <span>{{error.$message}}</span>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Active:</label>
            <br>
            <ToggleButton v-model="user.active" @input="valueChanged"></ToggleButton>
          </div>
          <div class="mb-3">
            <button type="submit" class="btn btn-lg btn-primary">Confirm Edit</button>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
import { data } from '../../mock-data/data';
import {reactive, computed, onMounted, ref} from 'vue';
import { useRoute, useRouter } from 'vue-router'
import ToggleButton from '../misc/ToggleButton.vue';
import {email, maxLength, minLength, numeric, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { userAPI } from '../../api/userAPI';

export default {
    displayName: "User Edit",
    setup() {
        const route = useRoute();
        const router = useRouter();

        function fetchUserData(id) {
            const users = [];
            userAPI.getAllUsers().then(response => {
                for (var i = 0; i < response.data.length; i++) {
                console.log(response.data[i].id, id);
                if (response.data[i].id === id) {
                  console.log("FOUND");
                  return response.data[i];
                }
            }
            });
            
            return null;
        }

      const rules = computed(() => {
        return {
          email:{required, minLength:minLength(4), maxLength:maxLength(24), email},
          name:{required, minLength:minLength(2), maxLength:maxLength(24)},
          surname:{required, minLength:minLength(2), maxLength:maxLength(24)},
          // jmbg:{required, minLength:minLength(13), maxLength:maxLength(13)},
          position:{required},
          phoneNumber:{required, numeric},
        }
      })

      const state = reactive({
        param_userid: "",
        current_user: null
      });

      const user = ref({
        name: '',
        surname: '',
        email: '',
        jmbg: 0,
        position: '',
        phoneNumber: 0
      })

      const v$ = useVuelidate(rules, user);

      onMounted(() => {
        console.log(state);
        state.param_userid = Number(route.params.id);
        // let userFetched = fetchUserData(state.param_userid);
        // console.log("user", userFetched);
        // state.current_user = userFetched;
        // user.value = userFetched;
        userAPI.getAllUsers().then(response => {
                for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].id === state.param_userid) {
                  console.log("FOUND");
                  user.value = {
                    name: response.data[i].firstName,
                    surname: response.data[i].lastName,
                    email: response.data[i].email,
                    jmbg: response.data[i].jmbg,
                    position: response.data[i].position,
                    phoneNumber: response.data[i].phoneNumber,
                    active: response.data[i].active
                  }
                }
            }
          });
        
      });

        function valueChanged(val) {
            console.log("VALUE CHANGED", val);
            user.value.active = val;
        }


      function submit(e) {
        e.preventDefault();
        this.v$.$validate();
        if (!this.v$.$invalid) {
          let userToUpdate = {
            id: state.param_userid,
            firstName: user.value.name,
            lastName: user.value.surname,
            email: user.value.email,
            // jmbg: user.value.jmbg.toString(),
            position: user.value.position,
            phoneNumber: user.value.phoneNumber,
            active: user.value.active,
            permissions: {
              isAdmin: true,
              stockTrading: true,
              stockOverview: true,
              contractConclusion: true
            }
          }
          userAPI.updateUser(userToUpdate).then(response => {
            console.log(response);
            router.push('/admin/users');
          });
        }
      }


        return { state, valueChanged, submit, v$, user };
    },
    components: { ToggleButton }
}
</script>

<style scoped>
.user-edit-container {
    margin-top:50px;
}

span {
  color: red;
}
</style>
