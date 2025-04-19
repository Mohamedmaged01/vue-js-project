import { createRouter, createWebHistory } from "vue-router";
import productsPage from "../views/productsPage.vue";
import productDetails from "../views/productDetails.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Cart from "../views/Cart.vue";


// 2- define routes

// import Checkout from "../views/Checkout.vue";

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
    // props: true,
  },
  // {
  //   path: "/contact",
  //   name: "Contact",
  //   component: contact,
  // },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
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
