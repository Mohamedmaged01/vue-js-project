import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [], 
  }),
  
  getters: {

    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    
    
    totalPrice: (state) => {
      return state.items.reduce((total, item) => 
        total + (item.quantity * item.product.price), 0);
    },
   
    tax: (state) => {
      return state.totalPrice * 0.1;
    },
    
    grandTotal: (state) => {
      return state.totalPrice + state.tax;
    },
    
    isInCart: (state) => (productId) => {
      return state.items.some(item => item.product.id === productId);
    }
  },
  
  actions: {
  
    addProductToCart(product) {
      if (!product || product.inStock <= 0) return;
      
      const existingItem = this.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ product, quantity: 1 });
      }
      
      product.inStock--;
    },
    

    removeProductFromCart(productId) {
      const index = this.items.findIndex(item => item.product.id === productId);
      if (index !== -1) {
        const removedItem = this.items.splice(index, 1)[0];
        removedItem.product.inStock += removedItem.quantity;
      }
    },
    
   
    increaseQuantity(productId) {
      const item = this.items.find(item => item.product.id === productId);
      if (item && item.product.inStock > 0) {
        item.quantity++;
        item.product.inStock--;
      }
    },
    
    
    decreaseQuantity(productId) {
      const item = this.items.find(item => item.product.id === productId);
      if (item) {
        item.quantity--;
        item.product.inStock++;
        
        if (item.quantity <= 0) {
          this.removeProductFromCart(productId);
        }
      }
    },
  
    clearCart() {
      this.items.forEach(item => {
        item.product.inStock += item.quantity;
      });
      this.items = [];
    },
    
    
    completePurchase() {
      this.items = [];
    }
  }
});