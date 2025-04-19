<script setup>
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";
</script>

<template>
  <div class="w-100">
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>

<style scoped></style>
