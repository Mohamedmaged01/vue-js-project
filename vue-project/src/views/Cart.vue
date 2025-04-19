<template>
    <div class="container my-5">
        <h2 class="text-center">Shopping Cart</h2>

        <div v-if="cart.items.length === 0" class="text-center text-danger my-4">
            Sorry, Please Add More Products...
        </div>

        <table v-else class="table table-bordered table-striped text-center mt-4">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in cart.items" :key="item.product.id">
                    <td>{{ item.product.name }}</td>
                    <td>{{ formatCurrency(item.product.price) }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ formatCurrency(item.product.price * item.quantity) }}</td>
                    <td>
                        <button class="btn btn-primary btn-sm me-1" @click="cart.increaseQuantity(item)"
                            :disabled="item.product.inStock === 0">+</button>
                        <button class="btn btn-danger btn-sm" @click="cart.decreaseQuantity(item)">-</button>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="4">Total</th>
                    <th colspan="2">{{ formatCurrency(cart.totalPrice) }}</th>
                </tr>
                <tr>
                    <th colspan="4">Tax</th>
                    <th colspan="2">{{ formatCurrency(cart.tax) }}</th>
                </tr>
                <tr>
                    <th colspan="4">Grand Total</th>
                    <th colspan="2">{{ formatCurrency(cart.grandTotal) }}</th>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart';
const cart = useCartStore();

const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(value);
</script>

<style scoped>
.table th,
.table td {
    vertical-align: middle;
}
</style>