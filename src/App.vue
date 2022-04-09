<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Navbar />

  <RouterView />

  <Footer />
</template>

<style>
  :root {
    --slider-connect-bg: #4b4646;
    --slider-tooltip-bg: #4b4646;
    --slider-handle-ring-color: #4b4646;
  }

  body {
    padding-bottom: 60px;
  }
</style>
