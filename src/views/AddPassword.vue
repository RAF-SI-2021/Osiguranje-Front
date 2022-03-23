<script setup>
import { ref, reactive } from 'vue';
import router from '@/router'; 


const form = reactive({
    password: '',
    confirmPassword: '',
})

const err = ref('')

const ok = ref(false)

function onReset(evt) {
    form.password = '';
    form.confirmPassword = '';
}

function onSubmit(evt) {
    
    ok.value = false;

    if(form.password==='') alert('Password required.')
    else if(form.confirmPassword === '') alert('Need to confirm password.')
    else if(form.confirmPassword !== form.password) alert('Password does not match');
    else ok.value = true;
    
    if (ok.value) router.push({name: 'addPassword', params:{pass:password}});
    else{
        form.password = '';
        form.confirmPassword = '';
        evt.preventDefault();
    }  
}



</script>

<template>
<div class="container">
    <h2 class="mt-5 text-center">Add Password</h2>
    <div class="row justify-content-center">
            <div class="col-5">
                <form @submit="onSubmit" @reset="onReset">
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" v-model="form.password" class="form-control" id="exampleInputPassword1">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword2" class="form-label">Confirm Password</label>
                        <input type="password" v-model="form.confirmPassword" class="form-control" id="exampleInputPassword2">
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label" for="exampleCheck1">Save password</label>
                    </div>

                    
                    <div class="d-flex justify-content-between">
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <button type="reset" class="btn btn-danger">Reset</button>
                    </div>
                </form>
            </div>
        </div>
</div>

</template>