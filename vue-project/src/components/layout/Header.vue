<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-nav w-100 shadow-sm">
    <div class="container-fluid">
      <!-- Logo -->
      <router-link to="/" class="nav-link">
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
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar links -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center fs-6">
          <li class="nav-item ms-5 hover-link">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item ms-5 hover-link">
            <router-link to="/" class="nav-link">Products</router-link>
          </li>
          <li class="nav-item ms-5 hover-link">
            <router-link to="/" class="nav-link">Contact</router-link>
          </li>
        </ul>

        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end fs-6">
          <li class="nav-item ms-5 hover-link">
            <router-link to="/login" class="nav-link">Sign In</router-link>
          </li>
          <li class="nav-item ms-5 hover-link">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
          <li class="nav-item ms-5 hover-link">
            <router-link to="/" class="nav-link"
              ><i class="fas fa-shopping-cart"></i
            ></router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style scoped>
.bg-nav {
  background-color: #f8f8f8;
}
.hover-link:hover {
  color: #ddb00f;
  font-weight: bold;
  transform: scale(1.03);
}
</style>
