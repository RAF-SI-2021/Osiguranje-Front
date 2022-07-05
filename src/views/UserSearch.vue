<script setup>
import { data } from '../mock-data/data';
import { ref, reactive, onMounted, inject } from 'vue';
import UserCard from "../components/UserCard.vue";
import { userAPI } from '../api/userAPI';

console.log(data);

const toast = inject('toast');
const emitter = inject('emitter');

const obj = reactive({
    users: [],
    filteredUsers: [],
    search: '',
})

const userToReset = ref({});

const loading = ref(true)

emitter.on("reset", (user) => {
  userToReset.value = user;
})

onMounted(() => {
    userAPI.getAllUsers()
        .then(res => {
            obj.users = res.data;
            obj.filteredUsers = res.data;
            loading.value = false;
        })
        .catch(err => {
            toast.error('Could not get response from server');
            console.log(err);
            loading.value = false;
        })
})

function handleSearch(e) {
    obj.search = e.target.value;
    obj.filteredUsers = obj.users.filter(user => {
        // search by name, surname, email, phone and position
        return user.firstName.toLowerCase().includes(obj.search.toLowerCase()) ||
            user.lastName.toLowerCase().includes(obj.search.toLowerCase()) ||
            user.email.toLowerCase().includes(obj.search.toLowerCase()) ||
            user.position.toLowerCase().includes(obj.search.toLowerCase());
    });
    // console.log(obj.filteredUsers);
}

function resetLimit(id) {
    userAPI.resetLimit(id)
        .then(res => {
            toast.success('Limit reseted');
            userToReset.value = {};
        })
        .catch(err => {
            toast.error('Could not get response from server');
            console.log(err);
        })
}

</script>

<template>
    <vue-element-loading :active="loading" spinner="bar-fade-scale" style="height: 100vh" />
    <div class="container">
        <h1 class="mt-3 text-center">User List</h1>
        <div class="row justify-content-center">
            <div class="col-6">
                <div class="input-group mt-3 mb-3">
                    <input type="text" class="form-control" @input="handleSearch" />
                    <span class="input-group-text" id="inputGroup-sizing-default">
                        <svg
                            fill="#000000"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 30 30"
                            width="30px"
                            height="30px"
                        >
                            <path
                                d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </div>

        <div class="row justify-content-center">
            <UserCard v-for="user in obj.filteredUsers" :key="user.id"
                :id="user.id"
                :name="user.firstName"
                :surname="user.lastName"
                :jmbg="user.jmbg"
                :email="user.email"
                :phone="user.phoneNumber"
                :position="user.position"
                :active="user.active">
            </UserCard>
        </div>
    </div>

    <div class="modal fade" id="approveModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Limit Reset Confirmation</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to reset the limit for: {{ userToReset.firstName + " " + userToReset.lastName }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="resetLimit(userToReset.id)">Reset Limit</button>
          </div>
        </div>
      </div>
    </div>
</template>
