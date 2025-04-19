import { defineStore } from "pinia";
import { ref } from "vue";

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAlertsStore = defineStore("alerts", {
  // other options...
});

export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 0, name: "Eduardo" }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});

export const useSlidesStore = defineStore("slides", () => {
  const slides = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchSlides = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await fetch("http://localhost:3000/slides");
      const data = await res.json();
      slides.value = data;
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };
  return { slides, isLoading, error, fetchSlides };
});
