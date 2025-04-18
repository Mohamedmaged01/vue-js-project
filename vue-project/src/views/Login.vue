<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <!-- Left half: Image -->
    <div class="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12 order-sm-0 order-12" style="margin-right: -120px;">
      <img 
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" 
        alt="Login Illustration" 
        class="object-cover h-screen w-full"
      />
    </div>
    <!-- Right half: Login Form -->
    <div class="col-12 col-xl-6 col-lg-5 col-md-6 col-sm-12 order-first order-xl-0">
      <div class="max-w-md mx-auto">
        <h2 class="text-3xl font-bold mb-6 text-center">Login</h2>
        <p v-if="error" class="text-red-500 mb-4 text-center">{{ error }}</p>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p class="mt-4 text-center">
          Don't have an account? <router-link to="/register" class="text-blue-500">Register</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        // Check if user exists in db.json
        const response = await axios.get('http://localhost:3000/users', {
          params: {
            email: this.email,
            password: this.password
          }
        })

        if (response.data.length > 0) {
          // User found, redirect to home
          this.$router.push('/')
        } else {
          // User not found or incorrect credentials
          this.error = 'Email or password is incorrect'
        }
      } catch (error) {
        this.error = 'An error occurred. Please try again.'
        console.error(error)
      }
    }
  }
}
</script>