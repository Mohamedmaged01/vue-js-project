<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="w-100">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<style scoped></style>
