<template>
  <div class="w-100 min-vh-100 p-0 m-0 mt-5">
    <div class="container-fluid p-0 m-0">
      <div class="row m-0 h-100">
        <!-- Left half: Login Form -->
        <div
          class="col-md-6 d-flex align-items-center justify-content-center p-3 order-md-0 order-1"
        >
          <div class="card p-4 shadow-sm" style="max-width: 500px; width: 100%">
            <h2
              class="text-center mb-4 fw-bold"
              style="font-size: 2rem; color: #333"
            >
              Login
            </h2>
            <p v-if="error" class="text-danger text-center mb-3">{{ error }}</p>
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label
                  for="email"
                  class="form-label fw-medium"
                  style="color: #555"
                >
                  Email
                </label>
                <input
                  v-model="email"
                  type="email"
                  id="email"
                  class="form-control"
                  placeholder="Enter your email"
                  required
                  style="border-radius: 8px"
                />
              </div>
              <div class="mb-4">
                <label
                  for="password"
                  class="form-label fw-medium"
                  style="color: #555"
                >
                  Password
                </label>
                <input
                  v-model="password"
                  type="password"
                  id="password"
                  class="form-control"
                  placeholder="Enter your password"
                  required
                  style="border-radius: 8px"
                />
              </div>
              <button
                type="submit"
                class="btn w-100 text-white"
                style="
                  background-color: #00d1b2;
                  border-color: #00d1b2;
                  border-radius: 8px;
                  padding: 12px;
                  font-weight: 500;
                "
                @mouseover="this.style.backgroundColor = '#00b89c'"
                @mouseout="this.style.backgroundColor = '#00d1b2'"
              >
                Login
              </button>
            </form>
            <p class="text-center mt-3">
              Don't have an account?
              <router-link to="/register" class="text-primary fw-medium"
                >Register</router-link
              >
            </p>
          </div>
        </div>
        <!-- Right half: Image -->
        <div class="col-md-6 d-none d-md-block p-0 order-md-1 order-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="Login Illustration"
            class="img-fluid w-100 h-100 object-fit-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "../stores/counter";
import { toast } from "vue3-toastify";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  setup() {
    const auth = useAuthStore();

    return { auth };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.get("http://localhost:3000/users", {
          params: { email: this.email, password: this.password },
        });
        if (response.data.length > 0) {
          const user = response.data[0];
          console.log(user);
          this.auth.login(user); // user login
          sessionStorage.setItem("welcomeShow", "true");

          // toast.success(`Welcome back 🎉, ${user.firstName} !`, {
          //   position: "top-right",
          //   timeout: 3000,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          // });
          this.$router.push("/");
        } else {
          this.error = "Email or password is incorrect";
        }
      } catch (error) {
        this.error = "An error occurred. Please try again.";
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
/* Optional: Add custom styles to fine-tune the design */
.card {
  border: none;
  border-radius: 12px;
}
.form-control:focus {
  border-color: #00d1b2;
  box-shadow: 0 0 0 0.2rem rgba(0, 209, 178, 0.25);
}
</style>
