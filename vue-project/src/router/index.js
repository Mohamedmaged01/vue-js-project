import { createRouter, createWebHistory } from "vue-router";
import productsPage from "../components/productsPage.vue";
import productDetails from "../components/ProductDetails.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: productsPage,
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
