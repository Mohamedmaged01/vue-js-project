<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "./stores/counter";
const auth = useAuthStore();
onMounted(() => {
  auth.loadUser();
});
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

auth.loadUser();
</script>

<template>
  <div class="w-100">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<style scoped></style>
