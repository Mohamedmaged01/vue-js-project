import { createRouter, createWebHistory } from "vue-router";

// 1- import target components
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

// 2- define routes

const routes = [
    { path: "/", name: "home", component: Home },
    { path: "/login", name: "login", component: Login },
    {path: "/register", name: "register", component: Register },

];

// 3- create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 4- export router instance

export default router;
