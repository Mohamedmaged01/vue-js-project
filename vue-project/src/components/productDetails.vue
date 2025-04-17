// ProductDetail.vue
<template>
  <div class="product-detail-page">
    <!-- Breadcrumb navigation -->
    <div class="breadcrumb">
      <router-link to="/">Home</router-link> /
      <router-link to="/products">Products</router-link> /
      <router-link :to="`/products/${product.category}`">{{
        product.category
      }}</router-link>
      /
      <span class="current">{{ product.name }}</span>
    </div>

    <div class="product-content">
      <!-- Product image -->
      <div class="product-image-container">
        <img :src="product.image" :alt="product.name" class="product-image" />
      </div>

      <!-- Product info -->
      <div class="product-info">
        <!-- Reviews -->
        <div class="product-rating">
          <div class="stars">
            <span
              v-for="i in 5"
              :key="i"
              class="star"
              :class="{ filled: i <= product.rating }"
              >★</span
            >
          </div>
          <span class="review-count">{{ product.reviewCount }} reviews</span>
        </div>

        <!-- Product title and price -->
        <h1 class="product-title">
          {{ product.name ? product.name.toUpperCase() : "" }}
        </h1>

        <div class="product-price">${{ product.price }}</div>

        <!-- Quantity selector -->
        <div class="quantity-selector">
          <button @click="decrementQuantity" class="quantity-btn">−</button>
          <input
            v-model="quantity"
            type="number"
            min="1"
            class="quantity-input"
          />
          <button @click="incrementQuantity" class="quantity-btn">+</button>
        </div>

        <!-- Add to cart button -->
        <button @click="addToCart" class="add-to-cart-btn">ADD TO CART</button>

        <!-- Product tabs -->
        <div class="product-tabs">
          <div class="tab-headers">
            <div
              v-for="tab in tabs"
              :key="tab.id"
              class="tab-header"
              :class="{ active: activeTab === tab.id }"
              @click="activeTab = tab.id"
            >
              {{ tab.label }}
            </div>
          </div>

          <div class="tab-content">
            <!-- Description tab -->
            <div v-if="activeTab === 'description'" class="tab-pane">
              <p>{{ product.description || defaultDescription }}</p>
            </div>

            <!-- Warranty tab -->
            <div v-if="activeTab === 'warranty'" class="tab-pane">
              <p>{{ product.warranty || defaultWarranty }}</p>
            </div>

            <!-- Reviews tab -->
            <div v-if="activeTab === 'reviews'" class="tab-pane">
              <div v-if="product.reviews && product.reviews.length > 0">
                <div
                  v-for="(review, index) in product.reviews"
                  :key="index"
                  class="review-item"
                >
                  <div class="review-header">
                    <div class="review-stars">
                      <span
                        v-for="i in 5"
                        :key="i"
                        class="star"
                        :class="{ filled: i <= review.rating }"
                        >★</span
                      >
                    </div>
                    <div class="review-author">{{ review.author }}</div>
                    <div class="review-date">{{ review.date }}</div>
                  </div>
                  <div class="review-content">{{ review.content }}</div>
                </div>
              </div>
              <div v-else class="no-reviews">
                No reviews yet. Be the first to review this product.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Related products -->
    <div class="related-products">
      <h2 class="section-title">RELATED PRODUCTS</h2>
      <div class="related-products-grid">
        <div
          v-for="relatedProduct in relatedProducts"
          :key="relatedProduct.id"
          class="related-product-card"
          @click="navigateToProduct(relatedProduct.id)"
        >
          <div class="related-product-image">
            <img :src="relatedProduct.image" :alt="relatedProduct.name" />
          </div>
          <div class="related-product-info">
            <h3 class="related-product-name">{{ relatedProduct.name }}</h3>
            <p class="related-product-price">${{ relatedProduct.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "ProductDetail",
  setup() {
    const route = useRoute();
    const router = useRouter();

    // State
    const product = ref({});
    const relatedProducts = ref([]);
    const quantity = ref(1);
    const loading = ref(true);
    const error = ref(null);
    const activeTab = ref("description");

    // Default content
    const defaultDescription =
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const defaultWarranty =
      "This product comes with a standard 1-year manufacturer warranty covering all defects in materials and workmanship. Extended warranty options are available at checkout.";

    // Tabs configuration
    const tabs = [
      { id: "description", label: "DESCRIPTION" },
      { id: "warranty", label: "WARRANTY" },
      { id: "reviews", label: "REVIEWS" },
    ];

    // Fetch product details
    const fetchProductDetails = async () => {
      try {
        loading.value = true;
        error.value = null;

        const productId = route.params.id;

      
        const response = await axios.get(
          `http://localhost:3000/products/${productId}`
        );
        product.value = response.data;

        if (!product.value.reviews) {
          product.value.reviews = [];
        }

        if (!product.value.reviewCount) {
          product.value.reviewCount = product.value.reviews.length || 3;
        }

        if (!product.value.rating) {
          product.value.rating = 5;
        }

        // Fetch related products (products in same category)
        const relatedResponse = await axios.get(
          `http://localhost:3000/products?category=${product.value.category}&id_ne=${productId}&_limit=3`
        );
        relatedProducts.value = relatedResponse.data;

        loading.value = false;
      } catch (err) {
        error.value = "Failed to load product details. Please try again later.";
        loading.value = false;
        console.error("Error fetching product details:", err);
      }
    };

    // Methods
    const incrementQuantity = () => {
      quantity.value++;
    };

    const decrementQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--;
      }
    };

    const addToCart = () => {
      // Logic to add product to cart
      // This would typically interact with a store like Vuex/Pinia
      console.log(`Added ${quantity.value} of ${product.value.name} to cart`);

      // Show success notification (you might want to use a toast library)
      alert(`${quantity.value} x ${product.value.name} added to your cart!`);
    };

    const navigateToProduct = (productId) => {
      router.push(`/products/${productId}`);
    };

    // Lifecycle hooks
    onMounted(() => {
      fetchProductDetails();
    });

    return {
      product,
      relatedProducts,
      quantity,
      loading,
      error,
      activeTab,
      tabs,
      defaultDescription,
      defaultWarranty,
      incrementQuantity,
      decrementQuantity,
      addToCart,
      navigateToProduct,
    };
  },
};
</script>

<style scoped>
.product-detail-page {
  font-family: "Poppins", "Segoe UI", sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  color: #333;
}

/* Breadcrumb Navigation */
.breadcrumb {
  padding: 20px 0;
  font-size: 14px;
  color: #606060;
}

.breadcrumb a {
  text-decoration: none;
  color: #606060;
  transition: color 0.3s ease;
}

.breadcrumb a:hover {
  color: #f39c12;
}

.breadcrumb .current {
  color: #f39c12;
}

/* Product Content Layout */
.product-content {
  display: flex;
  gap: 50px;
  margin-bottom: 60px;
}

/* Product Image */
.product-image-container {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image {
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
}

/* Product Info Section */
.product-info {
  flex: 1;
}

/* Rating Stars */
.product-rating {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.stars {
  display: flex;
  margin-right: 10px;
}

.star {
  color: #ddd;
  font-size: 20px;
}

.star.filled {
  color: #f39c12;
}

.review-count {
  color: #666;
  font-size: 14px;
}

/* Product Title and Price */
.product-title {
  font-size: 32px;
  font-weight: 600;
  margin: 10px 0;
  color: #2c3e50;
}

.product-price {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 25px;
}

/* Quantity Selector */
.quantity-selector {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.quantity-btn {
  width: 40px;
  height: 40px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quantity-btn:hover {
  background: #eee;
}

.quantity-input {
  width: 60px;
  height: 40px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 16px;
  margin: 0 5px;
  outline: none;
}

/* Add to Cart Button */
.add-to-cart-btn {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-bottom: 40px;
}

.add-to-cart-btn:hover {
  background-color: #1a2530;
}

/* Product Tabs */
.product-tabs {
  margin-top: 30px;
}

.tab-headers {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.tab-header {
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
}

.tab-header.active {
  color: #3498db;
  border-bottom-color: #3498db;
}

.tab-content {
  line-height: 1.6;
  color: #555;
}

.tab-pane {
  padding: 10px 0;
}

/* Review Items */
.review-item {
  border-bottom: 1px solid #eee;
  padding: 20px 0;
}

.review-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.review-stars {
  margin-right: 15px;
}

.review-author {
  font-weight: 600;
  margin-right: 15px;
}

.review-date {
  color: #888;
  font-size: 12px;
}

.review-content {
  line-height: 1.5;
}

.no-reviews {
  color: #888;
  font-style: italic;
}

/* Related Products Section */
.related-products {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid #eee;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
  color: #2c3e50;
}

.related-products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.related-product-card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  background: white;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.related-product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.related-product-image {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #f9f9f9;
}

.related-product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.related-product-info {
  padding: 15px 20px;
  text-align: center;
}

.related-product-name {
  color: #3498db;
  font-size: 16px;
  margin-bottom: 5px;
}

.related-product-price {
  font-weight: 600;
  color: #2c3e50;
}

/* Responsive Design */
@media (max-width: 992px) {
  .product-content {
    flex-direction: column;
  }

  .product-image-container {
    margin-bottom: 30px;
  }
}

@media (max-width: 768px) {
  .related-products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .tab-headers {
    flex-direction: column;
    border-bottom: none;
  }

  .tab-header {
    border-bottom: 1px solid #ddd;
    padding: 15px 10px;
  }

  .tab-header.active {
    border-bottom: 1px solid #3498db;
    background: #f5f9fd;
  }
}

@media (max-width: 480px) {
  .related-products-grid {
    grid-template-columns: 1fr;
  }

  .product-title {
    font-size: 24px;
  }

  .quantity-selector {
    justify-content: center;
  }

  .add-to-cart-btn {
    width: 100%;
  }
}
</style>
