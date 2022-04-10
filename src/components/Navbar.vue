<script setup>
import { onMounted, ref } from 'vue';
import { userAPI } from '../api/userAPI';
import { useRouter } from 'vue-router';

const logged = ref(false);
const user = ref('');
const router = useRouter();

onMounted(() => {
  if (localStorage.getItem('token')) {
    logged.value = true;
    userAPI.getCurrentUser().then((res) => {
      user.value = res.data.firstName + ' ' + res.data.lastName;
    });
  }
})

function logout() {
  localStorage.removeItem('token');
  logged.value = false;
  user.value = '';
  router.push('/login');
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <RouterLink to="/" class="navbar-brand">RAF Insurance</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink to="/login" class="nav-link" v-if="!logged">Log In</RouterLink>
            <p class="nav-link" v-if="logged">{{ user }}</p>
          </li>
          <li v-if="logged">
            <a @click="logout" class="nav-link">Log Out</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

