<script setup></script>

<template>
  <div>
    <h1 class="text-center mt-5">Welcome, Admin</h1>
    <div class="container">
      <h3 class="mt-5">Navigate to:</h3>
      <div class="row">
        <div class="col-4 p-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <RouterLink to="/admin/users">All Users</RouterLink>
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4 p-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <RouterLink to="#">Add New User</RouterLink>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
