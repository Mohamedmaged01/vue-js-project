import { createRouter, createWebHistory } from "vue-router";
import productsPage from "./src/views/productsPage.vue";
import productDetails from "./src/views/productDetails.vue";
import Home from "./src/views/Home.vue";
import Login from "./src/views/Login.vue";
import Register from "./src/views/Register.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/products",
    name: "Products",
    component: productsPage,
  },
  {
    path: "/products/:id",
    name: "ProductDetail",
    component: productDetails,
    props: true,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
