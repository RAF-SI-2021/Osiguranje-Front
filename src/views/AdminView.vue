<script setup>
import { onMounted, ref } from "vue";
import { adminLinks } from "../consts/AdminNavs";
import { userAPI } from "../api/userAPI";

const user = ref("");
onMounted(() => {
  if (localStorage.getItem("token")) {
    userAPI.getCurrentUser().then((res) => {
      user.value = res.data.firstName + " " + res.data.lastName;
    });
  }
});
</script>

<template>
  <div>
    <h1 class="text-center mt-5">Welcome, {{ user }}</h1>
    <div class="container">
      <h3 class="my-5">Navigate to:</h3>
      <div class="row row-cols-2 g-3">
        <div v-for="link in adminLinks" class="col d-flex align-items-start">
          <i
            class="bi text-muted flex-shrink-0 me-3"
            :class="link.icon"
            style="font-size: 1.75em"
          ></i>
          <div>
            <RouterLink :to="link.routeLink" class="h4">
              {{ link.routeName }}
            </RouterLink>
            <p>{{ link.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
