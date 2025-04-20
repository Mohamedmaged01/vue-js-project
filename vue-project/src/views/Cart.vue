<template>
    <div class="container my-5 cart-container">
        <h2 class="text-center mb-4">Your Shopping Cart</h2>

        <div v-if="cart.items.length === 0" class="empty-cart text-center py-5">
            <i class="fas fa-shopping-cart fa-3x mb-3 text-muted"></i>
            <h4 class="text-muted">Your cart is empty</h4>
            <p class="text-muted">Start shopping to add items to your cart</p>
            <router-link to="/products" class="btn btn-primary mt-3">
                Continue Shopping
            </router-link>
        </div>

        <div v-else>
            <div class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead class="table-light">
                        <tr>
                            <th scope="col" class="text-start">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in cart.items" :key="item.product.id">
                            <td class="text-start">
                                <div class="d-flex align-items-center">
                                    <img :src="item.product.image" 
                                         :alt="item.product.name" 
                                         class="product-thumbnail me-3">
                                    <span>{{ item.product.name }}</span>
                                </div>
                            </td>
                            <td>{{ formatCurrency(item.product.price) }}</td>
                            <td>
                                <div class="quantity-control d-flex justify-content-center">
                                    <button class="btn btn-outline-secondary btn-sm" 
                                            @click="cart.decreaseQuantity(item.product.id)"
                                            :disabled="item.quantity <= 1">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <span class="quantity mx-2">{{ item.quantity }}</span>
                                    <button class="btn btn-outline-secondary btn-sm" 
                                            @click="cart.increaseQuantity(item.product.id)"
                                            :disabled="item.product.inStock === 0">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </td>
                            <td>{{ formatCurrency(item.product.price * item.quantity) }}</td>
                            <td>
                                <button class="btn btn-outline-danger btn-sm" 
                                        @click="cart.removeProductFromCart(item.product.id)">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="cart-summary p-4 bg-light rounded">
                <div class="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>{{ formatCurrency(cart.totalPrice) }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span>Tax (10%):</span>
                    <span>{{ formatCurrency(cart.tax) }}</span>
                </div>
                <div class="d-flex justify-content-between fw-bold fs-5 mt-3">
                    <span>Grand Total:</span>
                    <span>{{ formatCurrency(cart.grandTotal) }}</span>
                </div>

                <div class="d-flex justify-content-between mt-4">
                    <router-link to="/products" class="btn btn-outline-secondary">
                        <i class="fas fa-arrow-left me-2"></i>Continue Shopping
                    </router-link>
                    <button class="btn btn-success" @click="checkout">
                        Proceed to Checkout <i class="fas fa-arrow-right ms-2"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart';
import { useRouter } from 'vue-router';

const router = useRouter();
const cart = useCartStore();

const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(value);
};

const checkout = () => {
  if (cart.items.length === 0) {
    alert('Your cart is empty. Please add items before checkout.');
    return;
  }
  
  router.push('/checkout');
};
</script>

<style scoped>
.cart-container {
    max-width: 1200px;
    margin: 0 auto;
}

.empty-cart {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 40px;
}

.product-thumbnail {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
}

.quantity-control {
    align-items: center;
}

.quantity {
    min-width: 30px;
    text-align: center;
}

.cart-summary {
    margin-top: 30px;
}

.table th {
    font-weight: 500;
}

.btn-outline-danger:hover {
    color: white;
}

@media (max-width: 768px) {
    .product-thumbnail {
        width: 40px;
        height: 40px;
    }
    
    .cart-summary .d-flex {
        flex-direction: column;
        gap: 10px;
    }
    
    .cart-summary .btn {
        width: 100%;
        margin-top: 10px;
    }
}
</style>