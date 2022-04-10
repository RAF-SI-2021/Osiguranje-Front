<template>
    <div id="big" class="text-center">
        <!--h1 id="pera" class="mt-4" v-if="state.email">Hi: {{state.email}}</h1-->
        <div id="divForm" class="text-center">
            <form @submit.prevent="submitForm" class="border border-primary p-3">
                <h3>Please log in!</h3>
                <!--img src="/favicon.ico" height="70"-->
                <div class="form-group">
                    <label for="email">Email</label>
                    <input v-model="state.email" type="text" class="form-control" id="email" placeholder="Enter email"  autofocus>
                    <small id="usernameHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    <div v-for="error in v$.email.$errors" :key="error.$uid">
                        <span ref="error-span">{{error.$message}}</span>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input v-model="state.password" type="password" class="form-control" id="password" placeholder="Enter password" >
                    <div v-for="error in v$.password.$errors" :key="error.$uid">
                        <span ref="error-span">{{error.$message}}</span>
                    </div>
                </div>
<!--                <div class="checkbox">-->
<!--                    <label>-->
<!--                        <input type="checkbox" value="remember-me">Remember Me-->
<!--                    </label>-->
<!--                </div>-->
                <div class="mt-2">
                    <button type="submit" class="btn btn-primary btn-lg">Sign in</button>
                </div>

                <RouterLink to="/admin">Admin</RouterLink>
<!--                <p>Don't have an account? <a href="#">Register here</a></p>-->
                
            </form>
        </div>
    </div>
</template>

<script>
import {reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core'
import {required,minLength, maxLength, email} from '@vuelidate/validators'
import { authAPI } from '../api/authAPI';
import { userAPI } from '../api/userAPI';
import { userStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

export default {

    setup(){

        const router = useRouter();
        const store = userStore();

        const state = reactive({
            email:'',
            password:''
        })

        const rules = computed(()=>{
            return {
                email:{required, minLength:minLength(4), maxLength:maxLength(24), email},
                password:{required, minLength:minLength(8), maxLength:maxLength(24)}
            }
        })

        const v$ = useVuelidate(rules,state);

        function submitForm(){
            // this.v$.$validate();
            // console.log(this.v$.$error);
            authAPI.login(state.email, state.password)
                .then(res=>{
                    localStorage.setItem('token', res.headers.authorization.split(' ')[1]);
                    userAPI.getCurrentUser()
                        .then((res) => {
                            store.setUser(res.data);
                            console.log(store.user);
                        })
                    router.push('/admin');
                })
                .catch(err=>{
                    console.log(err);
                })
        }

        return{
            state,v$, submitForm
        }
    }

}
</script>

<style scoped>

h3{
    color:white;
}

p{
    color:white;
}

form{
    margin:auto;
    max-width:500px;
    background-color: #152733;
}

span{
    color: red;
}

label{
    font-size:large;
    color:white;
}

input{
    border-radius: 30px;
}

*{
    padding:0px;
    margin:1px;
}

#big{
    margin-top:20px;
}

.border{
    border-radius:30px;
    
}
    
</style>
