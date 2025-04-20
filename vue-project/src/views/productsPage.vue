<template>
  <div class="furniture-shop">
    <h1 class="page-title">New arrivals</h1>

    <div class="breadcrumb">
      <router-link to="/">Home</router-link> /
      <router-link to="/products">Products</router-link>
    </div>

    <div class="shop-container">
      <div class="sidebar">
        <div class="categories">
          <h2 @click="toggleCategories">
            Catagories
            <span class="toggle">{{ categoriesOpen ? "−" : "+" }}</span>
          </h2>
          <transition name="fade">
            <ul v-show="categoriesOpen">
              <li v-for="category in categories" :key="category.value">
                <a href="#" @click.prevent="filterByCategory(category.value)"
                  :class="{ active: selectedCategory === category.value }">
                  {{ category.label }}
                </a>
              </li>
            </ul>
          </transition>
        </div>

        <div class="filter">
          <h2 @click="toggleFilters">
            Filter by <span class="toggle">{{ filtersOpen ? "−" : "+" }}</span>
          </h2>
          <transition name="fade">
            <div v-show="filtersOpen">
              <div class="color-filter">
                <h3>Color</h3>
                <div class="color-options">
                  <span v-for="color in availableColors" :key="color.value" :class="[
                    'color-dot',
                    color.value,
                    { active: selectedColor === color.value },
                  ]" @click="filterByColor(color.value)" :title="color.label"></span>
                </div>
              </div>

              <div class="price-filter">
                <h3>Price Range</h3>
                <div class="slider-container">
                  <div class="price-labels">
                    <span>${{ priceRange.min }}</span>
                    <span>${{ priceRange.max }}</span>
                  </div>
                  <input type="range" :min="priceRange.min" :max="priceRange.max" v-model="currentPriceMax"
                    class="slider" />
                  <div class="price-display">Up to ${{ currentPriceMax }}</div>
                </div>
              </div>

              <div class="filter-actions">
                <button class="reset-btn" @click="resetFilters">
                  Reset Filters
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <div class="product-container">
        <div class="shop-header">
          <div class="results-count" v-if="!loading">
            {{ filteredProducts.length }} product{{
              filteredProducts.length !== 1 ? "s" : ""
            }}
            found
          </div>

          <div class="sort-dropdown">
            <span>SORT BY </span>
            <select v-model="sortOption">
              <option value="default">DEFAULT</option>
              <option value="price-low">PRICE LOW TO HIGH</option>
              <option value="price-high">PRICE HIGH TO LOW</option>
              <option value="name">NAME</option>
            </select>
          </div>
        </div>

        <div v-if="loading" class="loading">
          <div class="loader"></div>
          <span>Loading products...</span>
        </div>

        <div v-else-if="error" class="error">
          <span class="error-icon">!</span>
          <p>{{ error }}</p>
          <button @click="fetchProducts" class="retry-btn">Try Again</button>
        </div>

        <transition-group name="product-list" tag="div" class="product-grid" v-else>
          <div class="product-card" v-for="product in displayedProducts" :key="product.id">
            <div class="product-image-container">
              <img :src="product.image" :alt="product.name" class="product-image" />
              <div class="product-actions">
                <button class="action-btn" @click.stop="navigateToProduct(product.id)">
                  <span class="action-icon">♥</span>
                </button>
                <button class="action-btn add-to-cart" @click="cartStore.addProductToCart(product)"
                  :disabled="product.inStock <= 0">
                  Add to Cart
                </button>
              </div>
            </div>
            <div class="product-info">
              <h3 class="product-name" @click="navigateToProduct(product.id)">
                {{ product.name }}
              </h3>
              <p class="product-price">${{ product.price }}</p>
            </div>
          </div>

          <div v-if="displayedProducts.length === 0" key="no-products" class="no-products">
            No products match your current filters.
          </div>
        </transition-group>

        <div class="load-more" v-if="hasMoreProducts && !loading">
          <button @click="loadMore">More +</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useCartStore } from "../stores/cart.js";

export default {
  name: "productsPage",
  setup() {
    const cartStore = useCartStore();
    const router = useRouter();
    const products = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const sortOption = ref("default");
    const currentPriceMax = ref(756);
    const priceRange = reactive({
      min: 36,
      max: 756,
    });
    const itemsPerPage = 6;
    const currentPage = ref(1);
    const selectedCategory = ref(null);
    const selectedColor = ref(null);
    const categoriesOpen = ref(true);
    const filtersOpen = ref(true);

    const categories = [
      { label: "Tables", value: "tables" },
      { label: "Lamps", value: "lamps" },
      { label: "Chairs", value: "chairs" },
      { label: "Sofas", value: "sofas" },
    ];

    const availableColors = [
      { label: "Yellow", value: "yellow" },
      { label: "Blue", value: "blue" },
      { label: "Black", value: "black" },
      { label: "Red", value: "red" },
    ];

    const toggleCategories = () => {
      categoriesOpen.value = !categoriesOpen.value;
    };

    const toggleFilters = () => {
      filtersOpen.value = !filtersOpen.value;
    };
    const navigateToProduct = (productId) => {
      router.push(`/products/${productId}`);
    };
    const fetchProducts = async () => {
      try {
        loading.value = true;
        error.value = null;
        const response = await axios.get("http://localhost:3000/products");
        products.value = response.data;
        loading.value = false;
      } catch (err) {
        error.value = "Failed to load products. Please try again later.";
        loading.value = false;
        console.error("Error fetching products:", err);
      }
    };

    const filterByCategory = (category) => {
      selectedCategory.value =
        category === selectedCategory.value ? null : category;
      currentPage.value = 1;
    };

    const filterByColor = (color) => {
      selectedColor.value = color === selectedColor.value ? null : color;
      currentPage.value = 1;
    };

    const resetFilters = () => {
      selectedCategory.value = null;
      selectedColor.value = null;
      currentPriceMax.value = priceRange.max;
      currentPage.value = 1;
      sortOption.value = "default";
    };

    const filteredProducts = computed(() => {
      let filtered = [...products.value];

      if (selectedCategory.value) {
        filtered = filtered.filter(
          (product) => product.category === selectedCategory.value
        );
      }

      if (selectedColor.value) {
        filtered = filtered.filter(
          (product) => product.color === selectedColor.value
        );
      }

      filtered = filtered.filter(
        (product) =>
          product.price >= priceRange.min &&
          product.price <= currentPriceMax.value
      );

      if (sortOption.value === "price-low") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortOption.value === "price-high") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortOption.value === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      }

      return filtered;
    });

    const displayedProducts = computed(() => {
      return filteredProducts.value.slice(0, currentPage.value * itemsPerPage);
    });

    const hasMoreProducts = computed(() => {
      return displayedProducts.value.length < filteredProducts.value.length;
    });

    const loadMore = () => {
      currentPage.value++;
    };

    const addToCart = (product) => {
      if (product.inStock <= 0) return;
      cartStore.addProductToCart(product);
    };

    onMounted(() => {
      fetchProducts();
    });

    return {
      products,
      loading,
      error,
      sortOption,
      currentPriceMax,
      priceRange,
      selectedCategory,
      selectedColor,
      categories,
      availableColors,
      categoriesOpen,
      filtersOpen,
      displayedProducts,
      filteredProducts,
      hasMoreProducts,
      toggleCategories,
      toggleFilters,
      filterByCategory,
      filterByColor,
      resetFilters,
      fetchProducts,
      loadMore,
      navigateToProduct,
      cartStore,
      addToCart
    };
  },
};
</script>

<style scoped>
.furniture-shop {
  font-family: "Poppins", "Segoe UI", sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  color: #333;
}

.product-name {
  color: #3498db;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}

.product-name:hover {
  text-decoration: underline;
}

.action-icon {
  font-size: 18px;
  color: #e74c3c;
  cursor: pointer;
}

.page-title {
  color: #2c3e50;
  text-align: center;
  margin: 30px 0;
  font-size: 36px;
  font-weight: 600;
  letter-spacing: 1px;
}

.breadcrumb {
  margin: 20px 0;
  color: #606060;
  font-size: 14px;
}

.breadcrumb a {
  text-decoration: none;
  color: #606060;
  transition: color 0.3s ease;
}

.breadcrumb a:hover {
  color: #f39c12;
}

.breadcrumb a:last-child {
  color: #f39c12;
}

.shop-container {
  display: flex;
  gap: 30px;
  margin-top: 20px;
}

.sidebar {
  width: 240px;
  background: linear-gradient(135deg, #2c3e50 0%, #1a2530 100%);
  color: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.sidebar h2 {
  margin-bottom: 20px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: color 0.3s ease;
  font-weight: 500;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar h2:hover {
  color: #f39c12;
}

.sidebar h3 {
  margin: 15px 0 10px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
}

.toggle {
  cursor: pointer;
  font-weight: bold;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.sidebar ul li {
  margin: 12px 0;
}

.sidebar ul li a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;
  display: block;
  padding: 5px 0;
  border-left: 3px solid transparent;
  padding-left: 10px;
}

.sidebar ul li a:hover,
.sidebar ul li a.active {
  color: white;
  border-left-color: #f39c12;
  padding-left: 15px;
}

.filter {
  margin-top: 25px;
}

.color-options {
  display: flex;
  gap: 12px;
  margin: 15px 0 25px;
}

.color-dot {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 2px solid transparent;
}

.color-dot:hover {
  transform: scale(1.1);
}

.color-dot.active {
  border-color: white;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
}

.yellow {
  background-color: #f1c40f;
}

.blue {
  background-color: #3498db;
}

.black {
  background-color: #2c3e50;
  border: 1px solid #4a6278;
}

.red {
  background-color: #e74c3c;
}

.slider-container {
  margin-top: 15px;
}

.price-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  margin: 15px 0;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #f39c12;
  cursor: pointer;
  transition: all 0.2s ease;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(243, 156, 18, 0.5);
}

.slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #f39c12;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.slider::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(243, 156, 18, 0.5);
}

.price-display {
  font-size: 14px;
  color: white;
  margin-top: 10px;
}

.filter-actions {
  margin-top: 25px;
}

.reset-btn {
  width: 100%;
  padding: 8px 0;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 14px;
}

.reset-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.product-container {
  flex: 1;
}

.shop-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.results-count {
  font-size: 14px;
  color: #666;
}

.sort-dropdown {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.sort-dropdown:hover {
  border-color: #bbb;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.sort-dropdown span {
  color: #666;
  margin-right: 5px;
}

.sort-dropdown select {
  border: none;
  background-color: transparent;
  outline: none;
  font-weight: 600;
  color: #f39c12;
  cursor: pointer;
  font-size: 14px;
}

.loading {
  text-align: center;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #666;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #f39c12;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.error {
  text-align: center;
  padding: 40px;
  color: #e74c3c;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.error-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  font-size: 30px;
  margin-bottom: 15px;
}

.retry-btn {
  margin-top: 15px;
  padding: 8px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.retry-btn:hover {
  background-color: #c0392b;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.no-products {
  grid-column: span 3;
  text-align: center;
  padding: 50px 0;
  color: #666;
}

.product-card {
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.product-image-container {
  position: relative;
  height: 220px;
  overflow: hidden;
  background-color: #f9f9f9;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-actions {
  position: absolute;
  bottom: -50px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.9);
  transition: bottom 0.3s ease;
}

.product-card:hover .product-actions {
  bottom: 0;
}

.action-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  background-color: transparent;
}

.action-btn.add-to-cart {
  background-color: #f39c12;
  color: white;
  padding: 8px 15px;
}

.action-btn.add-to-cart:hover {
  background-color: #e67e22;
}

.action-icon {
  font-size: 18px;
  color: #e74c3c;
}

.product-info {
  padding: 20px;
}

.product-name {
  color: #3498db;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
}

.product-price {
  color: #2c3e50;
  font-weight: 600;
  font-size: 18px;
}

.load-more {
  margin-top: 40px;
  text-align: center;
}

.load-more button {
  padding: 12px 25px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #3498db;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.load-more button:hover {
  background-color: #3498db;
  color: white;
  border-color: #3498db;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.product-list-enter-active,
.product-list-leave-active {
  transition: all 0.5s ease;
}

.product-list-enter-from,
.product-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .no-products {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .shop-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    margin-bottom: 20px;
  }

  .shop-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: 1fr;
  }

  .no-products {
    grid-column: span 1;
  }

  .page-title {
    font-size: 28px;
  }
}
</style>
