
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    totalPrice: (state) =>
      state.items.reduce((total, item) => total + item.quantity * item.product.price, 0),
    tax: (state) =>
      state.items.reduce((total, item) => total + item.quantity * item.product.price, 0) * 0.1,
    grandTotal() {
      return this.totalPrice + this.tax;
    },
  },
  actions: {
    addProductToCart(product) {
      const existing = this.items.find((item) => item.product.id === book.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ product, quantity: 1 });
      }
      product.inStock--;
    },
    increaseQuantity(item) {
      item.quantity++;
      item.product.inStock--;
    },
    decreaseQuantity(item) {
      item.quantity--;
      if (item.quantity === 0) {
        this.items = this.items.filter((i) => i.product.id !== item.product.id);
      }
      item.product.inStock++;
    },
  },
});
