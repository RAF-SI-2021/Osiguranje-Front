<template>
    <div class="container user-edit-container">
        <h1 class="mt-3 text-center">User: {{state.param_userid}} </h1>
        <div class="row justify-content-center"></div>

        <!-- TODO: Replace the div within the row with the UserCard component -->
        <div class="row" v-if="state.current_user">
            <div class="col-6 p-3">
                <p>Name: <input v-model="state.current_user.name"> </p>
                <p>Surname: <input v-model="state.current_user.surname"></p>
                <p>JMBG: <input v-model="state.current_user.jmbg"></p>
                <p>Email: <input v-model="state.current_user.email"></p>
                <p>Phone: <input v-model="state.current_user.phone"></p>
                <p>Position: <input v-model="state.current_user.position"></p>
                <p>Active: <ToggleButton v-model="state.current_user.active" @input="valueChanged"></ToggleButton> {{state.current_user.active}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { data } from '../../mock-data/data';
import {reactive, computed, onMounted } from 'vue';
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

        const state = reactive({
            param_userid: "",
            current_user: null
        });
        onMounted(() => {
            console.log(state);
            state.param_userid = Number(route.params.id);
            let user = fetchUserData(state.param_userid);
            console.log("user", user);
            state.current_user = user;
        });
        return { state, valueChanged };
    },
    components: { ToggleButton }
}
</script>

<style scoped>
.user-edit-container {
    margin-top:50px;
}
</style>
