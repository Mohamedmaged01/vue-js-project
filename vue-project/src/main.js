import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "bootstrap";
import "./style.css";

import { createPinia } from "pinia";
const pinia = createPinia();

import router from "./router/index.js";

import { createApp } from "vue";
import App from "./App.vue";

createApp(App).use(router).use(pinia).mount("#app");
