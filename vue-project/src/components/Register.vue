<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <!-- Left half: Image -->
    <div class="w-1/2 hidden md:block">
      <img 
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" 
        alt="Register Illustration" 
        class="object-cover h-screen w-full"
      />
    </div>
    <!-- Right half: Register Form -->
    <div class="w-full md:w-1/2 p-8">
      <div class="max-w-md mx-auto">
        <h2 class="text-3xl font-bold mb-6 text-center">Register</h2>
        <p v-if="error" class="text-red-500 mb-4 text-center">{{ error }}</p>
        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              v-model="firstName"
              type="text"
              id="firstName"
              class="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div class="mb-4">
            <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              v-model="lastName"
              type="text"
              id="lastName"
              class="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
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
            Register
          </button>
        </form>
        <p class="mt-4 text-center">
          Already have an account? <router-link to="/login" class="text-blue-500">Login</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async handleRegister() {
      // Validation
      const nameRegex = /^[A-Za-z]+$/
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

      if (!nameRegex.test(this.firstName)) {
        this.error = 'First name must contain only letters'
        return
      }

      if (!nameRegex.test(this.lastName)) {
        this.error = 'Last name must contain only letters'
        return
      }

      if (!passwordRegex.test(this.password)) {
        this.error = 'Password must be at least 8 characters long and contain letters and numbers'
        return
      }

      try {
        // Check if email already exists
        const emailCheck = await axios.get('http://localhost:3000/users', {
          params: { email: this.email }
        })

        if (emailCheck.data.length > 0) {
          this.error = 'Email already exists'
          return
        }

        // Register new user
        await axios.post('http://localhost:3000/users', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        })

        // Redirect to home
        this.$router.push('/')
      } catch (error) {
        this.error = 'An error occurred. Please try again.'
        console.error(error)
      }
    }
  }
}
</script>