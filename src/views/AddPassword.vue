<script>
import { ref, reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, sameAs } from '@vuelidate/validators'
import router from '@/router';

export default {

    setup() {

        const form = reactive({
            password: '',
            confirmPassword: '',
        })

        const rules = computed(() => {
            return {
                password: { required, minLength: minLength(3) },
                confirmPassword: { required, minLength: minLength(3), sameAs: sameAs(form.password) }
            }
        })

        const v$ = useVuelidate(rules, form);
        const ok = ref(false)


        function onSubmit(evt) {

            this.v$.$validate();

            ok.value = false;

            if (!this.v$.$error) {
                ok.value = true;
                alert('Validacija prosla')
            }

            if (ok.value) router.push({ name: 'addPassword', params: { pass: password } });
            else evt.preventDefault();

        }

        function onReset() {
            form.password = '';
            form.confirmPassword = '';
        }

        return {
            form, v$, onSubmit, onReset
        }

    },


}



</script>

<template>
    <div class="container">
        <h2 class="mt-5 text-center">Add Password</h2>
        <div class="row justify-content-center">
            <div class="col-5">
                <form @submit="onSubmit">
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input
                            type="password"
                            v-model="form.password"
                            class="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div
                        class="input-errors"
                        v-for="error of v$.password.$errors"
                        :key="error.$uid"
                    >
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                    <br />
                    <div class="mb-3">
                        <label for="exampleInputPassword2" class="form-label">Confirm Password</label>
                        <input
                            type="password"
                            v-model="form.confirmPassword"
                            class="form-control"
                            id="exampleInputPassword2"
                        />
                    </div>

                    <div
                        class="input-errors"
                        v-for="error of v$.confirmPassword.$errors"
                        :key="error.$uid"
                    >
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                    <br />
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