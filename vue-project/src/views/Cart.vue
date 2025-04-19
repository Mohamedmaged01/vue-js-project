// <script setup>
// import { useCartStore } from "@/stores/cart";
// const cart = useCartStore();
// </script>

// <template>
//   <div class="container py-5">
//     <h2>Your Cart</h2>
//     <div v-if="cart.items.length === 0">
//       <p>No items in cart.</p>
//     </div>
//     <div v-else>
//       <ul class="list-group mb-3">
//         <li v-for="item in cart.items" :key="item.id" class="list-group-item d-flex justify-content-between">
//           <div>
//             <h5>{{ item.name }}</h5>
//             <small>Price: {{ item.price }} x {{ item.quantity }}</small>
//           </div>
//           <div>
//             <strong>{{ item.price * item.quantity }} EGP</strong>
//             <button class="btn btn-sm btn-danger ms-3" @click="cart.removeItem(item.id)">Remove</button>
//           </div>
//         </li>
//       </ul>
//       <div class="text-end">
//         <h4>Total: {{ cart.totalPrice }} EGP</h4>
//         <button class="btn btn-warning" @click="cart.clearCart">Clear Cart</button>
//       </div>
//     </div>
//   </div>
// </template>
