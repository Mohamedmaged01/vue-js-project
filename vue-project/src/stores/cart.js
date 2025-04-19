// import { defineStore } from "pinia";

// export const useCartStore = defineStore("cart", {
//   state: () => ({
//     items: [],
//   }),
//   getters: {
//     totalItems: (state) => state.items.length,
//     totalPrice: (state) =>
//       state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
//   },
//   actions: {
//     addItem(product) {
//       const existing = this.items.find((item) => item.id === product.id);
//       if (existing) {
//         existing.quantity++;
//       } else {
//         this.items.push({ ...product, quantity: 1 });
//       }
//     },
//     removeItem(id) {
//       this.items = this.items.filter((item) => item.id !== id);
//     },
//     clearCart() {
//       this.items = [];
//     },
//   },
// });
