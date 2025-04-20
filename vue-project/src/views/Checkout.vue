<template>
    <div class="container my-5 checkout-container">
        <h2 class="mb-4 text-center">Checkout</h2>

        <div class="row">
            <!-- Shipping and Payment Form -->
            <div class="col-lg-7">
                <form class="checkout-form card p-4 mb-4 needs-validation" novalidate
                    :class="{ 'was-validated': formSubmitted }" @submit.prevent="placeOrder" id="checkout-form">
                    <h3 class="mb-4"><i class="fas fa-truck me-2"></i>Shipping Information</h3>

                    <div class="row g-3">
                        <div class="col-md-6">
                            <div class="form-floating">
                                <input type="text" class="form-control" id="firstName" v-model="shipping.firstName"
                                    required>
                                <label for="firstName">First Name</label>
                                <div class="invalid-feedback">
                                    Please provide your first name.
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-floating">
                                <input type="text" class="form-control" id="lastName" v-model="shipping.lastName"
                                    required>
                                <label for="lastName">Last Name</label>
                                <div class="invalid-feedback">
                                    Please provide your last name.
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="form-floating">
                                <input type="text" class="form-control" id="address" v-model="shipping.address"
                                    required>
                                <label for="address">Street Address</label>
                                <div class="invalid-feedback">
                                    Please provide your shipping address.
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3 class="mt-5 mb-4"><i class="fas fa-credit-card me-2"></i>Payment Method</h3>

                    <div class="payment-methods">
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="radio" id="cashOnDelivery" v-model="payment.method"
                                value="cash" required>
                            <label class="form-check-label" for="cashOnDelivery">
                                <i class="fas fa-money-bill-wave me-2"></i> Cash on Delivery
                            </label>
                            <div class="invalid-feedback">
                                Please select a payment method.
                            </div>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" id="creditCard" v-model="payment.method"
                                value="card" required>
                            <label class="form-check-label" for="creditCard">
                                <i class="fas fa-credit-card me-2"></i> Credit/Debit Card (Visa/Mastercard)
                            </label>
                        </div>

                        <!-- Card payment form -->
                        <div v-if="payment.method === 'card'" class="card-payment-form mt-4">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="cardName" v-model="payment.cardName" required>
                                <label for="cardName">Name on Card</label>
                                <div class="invalid-feedback">Please enter the name on the card.</div>
                            </div>

                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="cardNumber" v-model="payment.cardNumber" required pattern="\d{16}">
                                <label for="cardNumber">Card Number</label>
                                <div class="invalid-feedback">Please enter a valid 16-digit card number.</div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="expiry" v-model="payment.expiry" required placeholder="MM/YY">
                                        <label for="expiry">Expiry (MM/YY)</label>
                                        <div class="invalid-feedback">Please enter the expiry date.</div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="cvc" v-model="payment.cvc" required pattern="\d{3}">
                                        <label for="cvc">CVC</label>
                                        <div class="invalid-feedback">Please enter the 3-digit CVC.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Order Summary -->
            <div class="col-lg-5">
                <div class="order-summary card p-4 sticky-top">
                    <h3 class="mb-4"><i class="fas fa-receipt me-2"></i>Order Summary</h3>

                    <div v-for="item in cart.items" :key="item.product.id" class="order-item">
                        <img :src="item.product.image" :alt="item.product.name" class="product-thumbnail">
                        <div class="item-details">
                            <h6>{{ item.product.name }}</h6>
                            <div class="d-flex justify-content-between">
                                <span class="text-muted">{{ item.quantity }} × {{ formatCurrency(item.product.price) }}</span>
                                <span>{{ formatCurrency(item.product.price * item.quantity) }}</span>
                            </div>
                        </div>
                    </div>

                    <hr>

                    <div class="price-row">
                        <span>Subtotal:</span>
                        <span>{{ formatCurrency(cart.totalPrice) }}</span>
                    </div>

                    <div class="price-row">
                        <span>Shipping:</span>
                        <span :class="{ 'text-success': shippingCost === 0 }">
                            {{ shippingCost === 0 ? 'FREE' : formatCurrency(shippingCost) }}
                        </span>
                    </div>

                    <div class="price-row">
                        <span>Tax (10%):</span>
                        <span>{{ formatCurrency(taxAmount) }}</span>
                    </div>

                    <hr>

                    <div class="price-row total">
                        <span>Total:</span>
                        <span>{{ formatCurrency(grandTotal) }}</span>
                    </div>

                    <button type="submit" form="checkout-form" class="btn btn-primary w-100 mt-3 checkout-btn"
                        :disabled="isProcessing || cart.items.length === 0">
                        <template v-if="isProcessing">
                            <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                            Processing...
                        </template>
                        <template v-else>
                            <i class="fas fa-lock me-2"></i>Place Order
                        </template>
                    </button>

                    <div v-if="cart.items.length === 0" class="text-center text-danger mt-2">
                        Your cart is empty
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '../stores/cart';
import { useRouter } from 'vue-router';

const router = useRouter();
const cart = useCartStore();
const isProcessing = ref(false);
const formSubmitted = ref(false);

// Form data
const shipping = ref({
    firstName: '',
    lastName: '',
    address: ''
});

const payment = ref({
    method: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
});

// Computed properties
const shippingCost = computed(() => {
    return cart.totalPrice > 50 ? 0 : 5.99;
});

const taxAmount = computed(() => {
    return cart.totalPrice * 0.1;
});

const grandTotal = computed(() => {
    return cart.totalPrice + taxAmount.value + shippingCost.value;
});

const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(value);
};

const validateForm = () => {
    formSubmitted.value = true;

    const basicValid = shipping.value.firstName &&
        shipping.value.lastName &&
        shipping.value.address &&
        payment.value.method;

    const cardValid = payment.value.method === 'card'
        ? payment.value.cardName &&
          /^\d{16}$/.test(payment.value.cardNumber) &&
          payment.value.expiry &&
          /^\d{3}$/.test(payment.value.cvc)
        : true;

    return basicValid && cardValid;
};

const generateOrderId = () => {
    return 'ORD-' + Math.random().toString(36).substr(2, 8).toUpperCase();
};

const placeOrder = async () => {
    if (!validateForm()) return;

    isProcessing.value = true;

    try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        const order = {
            id: generateOrderId(),
            date: new Date().toISOString(),
            shipping: { ...shipping.value },
            payment: { method: payment.value.method },
            items: [...cart.items],
            total: grandTotal.value
        };

        console.log('Order placed:', order);
        cart.clearCart();
        router.push('/');

    } catch (error) {
        console.error('Checkout error:', error);
    } finally {
        isProcessing.value = false;
    }
};
</script>

<style scoped>
.checkout-container {
    max-width: 1200px;
}

.checkout-form {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
}

.order-summary {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
    top: 20px;
}

.product-thumbnail {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 15px;
}

.order-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.item-details {
    flex: 1;
}

.price-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.price-row.total {
    font-size: 1.1rem;
    font-weight: 600;
}

.checkout-btn {
    background-color: #4a6baf;
    border: none;
    padding: 12px;
    font-weight: 500;
    transition: all 0.3s;
}

.checkout-btn:hover {
    background-color: #3a5a9f;
    transform: translateY(-2px);
}

.checkout-btn:disabled {
    background-color: #cccccc;
    transform: none;
}

.form-floating {
    margin-bottom: 1rem;
}

@media (max-width: 992px) {
    .order-summary {
        position: static;
        margin-top: 30px;
    }
}
</style>
