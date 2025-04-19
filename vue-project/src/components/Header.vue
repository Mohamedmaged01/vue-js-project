<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-nav w-100 shadow-sm mb-1">
    <div class="container-fluid">
      <!-- Logo -->
      <router-link to="/" class="nav-link navbar-brand ms-3">
        <img
          src="https://vue-ecom.vercel.app/img/fi-logo.svg"
          alt="Logo"
          height="50"
          width="50"
        />
      </router-link>

      <!-- Toggle button -->
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar links -->
      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
        ref="navbarCollapse"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center fs-6">
          <li class="nav-item ms-3">
            <router-link to="/" class="nav-link hover-link">Home</router-link>
          </li>
          <li class="nav-item ms-3">
            <router-link to="/products" class="nav-link hover-link"
              >Products</router-link
            >
          </li>
          <li class="nav-item ms-3">
            <router-link to="/" class="nav-link hover-link"
              >Contact</router-link
            >
          </li>
        </ul>
        <div class="d-lg-flex align-items-center">
          <!-- Search form -->
          <form class="d-flex me-4">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>

          <!-- Links -->
          <ul class="navbar-nav d-lg-flex flex-lg-row mb-2 mb-lg-0 fs-5">
            <li class="nav-item ms-3">
              <router-link to="/login" class="nav-link hover-link"
                >Sign In</router-link
              >
            </li>
            <li class="nav-item ms-3">
              <router-link to="/register" class="nav-link hover-link"
                >Register</router-link
              >
            </li>
            <li class="nav-item ms-3 position-relative">
              <router-link to="/cart" class="nav-link">
                <i class="fas fa-shopping-cart hover-link"></i>
                <span v-if="cartItemsCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {{ cartItemsCount }}
                  <span class="visually-hidden">items in cart</span>
                </span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { Collapse } from "bootstrap";
import { useCartStore } from "../stores/cart.js"; 

const cartStore = useCartStore();
const navbarCollapse = ref(null);
let bsCollapseInstance = null;

const cartItemsCount = computed(() => {
  return cartStore.items.reduce((total, item) => total + item.quantity, 0);
});

const toggleMenu = () => {
  if (bsCollapseInstance) {
    bsCollapseInstance.toggle();
  }
};

onMounted(() => {
  if (navbarCollapse.value) {
    bsCollapseInstance = new Collapse(navbarCollapse.value, {
      toggle: false,
    });
  }
});
</script>

<style scoped>
.bg-nav {
  background-color: #f8f8f8;
}
.hover-link:hover {
  color: #ddb00f;
  font-weight: bold;
  transform: scale(1.03);
}


.badge {
  font-size: 0.7em;
  padding: 0.35em 0.5em;
  min-width: 1.5em;
}
</style>