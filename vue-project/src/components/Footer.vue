<template>
  <footer class="w-100 bg-light mt-1">
    <div class="w-100 bg-lightblue mb-3">
      <div class="container p-4">
        <div class="row p-4 align-items-center justify-content-center">
          <div class="col-md-6">
            <h2 class="fw-bold">Join our Newsletter</h2>
            <p class="text-muted">
              Nulla ac convallis lorem, eget euismod nisl. bibendum nec.
            </p>
          </div>
          <div class="col-md-6">
            <form class="mt-4">
              <div class="form-group align-items-center">
                <input
                  type="email"
                  class="form-control form-control-lg border-0 border-bottom border-secondary shadow-none bg-transparent"
                  placeholder="Your E-mail"
                  style="font-style: italic"
                />

                <button
                  type="submit"
                  class="px-4 hover-btn shadow"
                  style="margin-top: 0px; padding: 10px"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="container p-4">
      <div class="row mb-4">
        <div
          class="row col-md-6 col-sm-12 align-items-center justify-content-center"
        >
          <div class="col-4">
            <h5>Navigate</h5>
            <ul class="list-unstyled">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact Us </a></li>
              <li><a href="#">Sitemap </a></li>
            </ul>
          </div>
          <div class="col-4">
            <h5>Collection</h5>
            <ul class="list-unstyled">
              <li><a href="#">New arrivals </a></li>
              <li><a href="#">Featured </a></li>
              <li><a href="#">Catalog </a></li>
              <li><a href="#">Brands</a></li>
            </ul>
          </div>
          <div class="col-4">
            <h5>Categories</h5>
            <ul class="list-unstyled">
              <li><a href="#">Tables</a></li>
              <li><a href="#">Lamps</a></li>
              <li><a href="#">Chairs</a></li>
              <li><a href="#">Sofas</a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-6 col-sm-12 text-end">
          <p class="fs-4">399 Crowfield Road, Phoenix, Arizona 85012</p>
          <p class="fs-6"><a href="#">asff@fdsfsdc.com</a> | +602-926-5809</p>
        </div>
      </div>
      <div class="row align-items-center d-flex-reverse justify-content-center">
        <div
          class="col-md-6 col-sm-12 d-flex justify-content-md-end justify-content-sm-center fs-1"
        >
          <a href="#" class="me-3"><i class="fab fa-facebook"></i></a>
          <a href="#" class="me-3"><i class="fab fa-twitter"></i></a>
          <a href="#" class="me-3"><i class="fab fa-instagram"></i></a>
          <a href="#" class=""><i class="fab fa-pinterest"></i></a>
        </div>
        <div class="col-md-6 col-sm-12 text-center text-md-start">
          <p class="fs-5 mb-0">&copy; 2025. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.bg-lightblue {
  background-color: #dbf0fa;
}
.form-control::placeholder {
  color: #666;
}
.hover-btn {
  background-color: #333;
  color: #ddd;
  font-weight: bold;
  border: none;
  transition: all 0.4s ease;
}

.hover-btn:hover {
  background-color: #dbf0fa;
  color: #333;
  font-weight: bold;
  border: none;
  box-shadow: 0px 0px 5px #ddd;
}
</style>