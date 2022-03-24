<template>
    <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div class="card" style="border-radius: 15px;">
                        <div class="card-body p-5">
                            <h2
                                class="text-uppercase text-center mb-5"
                            >User: {{ state.param_userid }}</h2>

                            <div class="row justify-content-center"></div>

                            <!-- TODO: Replace the div within the row with the UserCard component -->
                            <div class="row" v-if="state.current_user.id">
                                <div class="col-6 p-3">
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="email">Email</label>
                                        <input
                                            v-model="state.current_user.email"
                                            type="email"
                                            id="email"
                                            class="form-control form-control-lg"
                                        />
                                        <div v-for="error in v$.current_user.email.$errors" :key="error.$uid">
                                            <span>{{ error.$message }}</span>
                                        </div>
                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="name">Name</label>
                                        <input
                                            v-model="state.current_user.name"
                                            type="text"
                                            id="name"
                                            class="form-control form-control-lg"
                                        />
                                        <div v-for="error in v$.current_user.name.$errors" :key="error.$uid">
                                            <span>{{ error.$message }}</span>
                                        </div>
                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="surname">Surname</label>
                                        <input
                                            v-model="state.current_user.surname"
                                            type="text"
                                            id="surname"
                                            class="form-control form-control-lg"
                                        />
                                        <div v-for="error in v$.current_user.surname.$errors" :key="error.$uid">
                                            <span>{{ error.$message }}</span>
                                        </div>
                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="jmbg">JMBG</label>
                                        <input
                                            v-model="state.current_user.jmbg"
                                            type="text"
                                            id="jmbg"
                                            class="form-control form-control-lg"
                                        />
                                        <div v-for="error in v$.current_user.jmbg.$errors" :key="error.$uid">
                                            <span>{{ error.$message }}</span>
                                        </div>
                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="position">Position</label>
                                        <input
                                            v-model="state.current_user.position"
                                            type="text"
                                            id="position"
                                            class="form-control form-control-lg"
                                        />
                                        <div v-for="error in v$.current_user.position.$errors" :key="error.$uid">
                                            <span>{{ error.$message }}</span>
                                        </div>
                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="phoneNumber">Phone number</label>
                                        <input
                                            v-model="state.current_user.phone"
                                            type="tel"
                                            id="phoneNumber"
                                            class="form-control form-control-lg"
                                        />
                                        <div
                                            v-for="error in v$.current_user.phone.$errors"
                                            :key="error.$uid"
                                        >
                                            <span>{{ error.$message }}</span>
                                        </div>
                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="password">Password</label>
                                        <input
                                            v-model="state.password"
                                            type="password"
                                            id="password"
                                            class="form-control form-control-lg"
                                        />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="passwordConfirm">Password - once more</label>
                                        <input
                                            v-model="state.confirmPassword"
                                            type="password"
                                            id="passwordConfirm"
                                            class="form-control form-control-lg"
                                        />
                                        <div
                                            v-for="(error,idx) in state.passwordErrors"
                                            :key="idx"
                                        >
                                            <span>{{ error.message }}</span>
                                        </div>
                                    </div>
                                    <p>
                                        Active:
                                        <ToggleButton
                                            v-model="state.current_user.active"
                                            @input="valueChanged"
                                        ></ToggleButton>
                                        {{ state.current_user.active }}
                                    </p>
                                    <div>
                                        <button @click="submitData">Save user</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { data } from '../../mock-data/data';
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, email, numeric } from '@vuelidate/validators'
import { reactive, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import ToggleButton from '../misc/ToggleButton.vue';

export default {
    displayName: "User Edit",
    setup() {
        const route = useRoute();
        function fetchUserData(id) {
            const users = data;
            for (var i = 0; i < users.length; i++) {
                console.log(users[i].id, id);
                if (users[i].id === id) {
                    return users[i];
                }
            }
            return null;
        }

        function valueChanged(val) {
            console.log("VALUE CHANGED", val);
        }

        function validatePassword() {
            if(state.password !== state.confirmPassword) {
                return {
                    message: "Passwords do not match"
                }
            }
            return null;
        }

        function submitData() {
            
            this.v$.$validate();
            state.passwordErrors = [];

            if(this.v$.$error) {
                console.log("Errors, not calling API.")
                return;
            }
            var passwordValidation = validatePassword();
            if(passwordValidation!==null) {
                state.passwordErrors.push(passwordValidation);
            }
            if(state.passwordErrors.length > 0) {
                console.log("New password, but errors - Not calling API.");
                return;
            }


            if(state.password.length>0) {
                console.log("MOCK API CALL - Edit User - New Password")
            }
            else {
                console.log("MOCK API CALL - Edit User")
            }
        }

        const state = reactive({
            param_userid: "",
            current_user: {
                id: null,
                name: null,
                surname: null,
                jmbg: null,
                email: null,
                position: null,
                phone: null,
                active: null
            },
            password: "",
            confirmPassword: "",
            passwordErrors: []
        });

        const rules = computed(() => {
            return {
                current_user: {
                    email: { required, minLength: minLength(4), maxLength: maxLength(24), email },
                    name: { required, minLength: minLength(2), maxLength: maxLength(24) },
                    surname: { required, minLength: minLength(2), maxLength: maxLength(24) },
                    jmbg: { required, minLength: minLength(13), maxLength: maxLength(13) },
                    position: { required },
                    phone: { required, numeric }
                }

            }
        })

        let v$ = useVuelidate(rules, state);


        onMounted(() => {
            console.log(state);
            state.param_userid = Number(route.params.id);
            let user = fetchUserData(state.param_userid);
            console.log("user", user);
            state.current_user = user;
            v$ = useVuelidate(rules, state);
            console.log(v$)
        });
        return { state, v$, valueChanged, submitData };
    },
    components: { ToggleButton }
}
</script>

<style scoped>
.user-edit-container {
    margin-top: 50px;
}
</style>
