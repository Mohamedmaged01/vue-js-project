<template>
  <div class="w-100">
    <div class="p-0">
      <div id="carouselExampleIndicators" class="carousel slide">
        <ol class="carousel-indicators">
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="indicator active list-unstyled"
            aria-current="true"
            aria-label="Slide 1"
          ></li>

          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            class="indicator list-unstyled"
            aria-label="Slide 2"
          ></li>

          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            class="indicator list-unstyled"
            aria-label="Slide 3"
          ></li>
        </ol>

        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://vue-ecom.vercel.app/img/jum1.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://vue-ecom.vercel.app/img/jum2.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://vue-ecom.vercel.app/img/jum3.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
        </div>
      </div>
    </div>
    <div class="w-100 p-4">
      <!-- comment -->
      <div class="row">
        <div class="col-md-6 col-sm-12 order-sm-last order-md-first">
          <div class="w-100">
            <img
              class="w-100"
              src="https://vue-ecom.vercel.app/img/new.jpg"
              alt=""
            />
          </div>
        </div>
        <div
          class="col-md-6 col-sm-12 text-sm-start text-md-start ml-sm-0 ml-md-5 ml-lg-5 ml-xl-5 text-lg-start order-sm-first order-md-last"
        >
          <h1>New minimalist</h1>
          <h2>– components</h2>
          <p>
            Gravity will force your feet to the ground. Don’t be afraid, your
            mind will find your freedom. You won’t miss a sunrise. You’ll rise
            with the sun. You’ll never run away from the storm. You will flow
            with the wind. Don’t hesitate to pause. Follow the flow of the
            moment. And then, take the first step towards the new you.
          </p>
        </div>
      </div>
    </div>
    <div class="w-100">
      <div class="row">
        <div class="col-md-6 col-sm-12 p-0">
          <img
            src="https://vue-ecom.vercel.app/img/33.jpg"
            class="img-fluid w-100 h-100 object-fit-cover me-5 pe-1"
            alt="Newsletter"
          />
        </div>

        <div
          class="col-md-6 col-sm-12 text-sm-left text-md-right ml-sm-0 ml-md-5 ml-lg-5 ml-xl-5 text-lg-right order-sm-first order-12 text-md-end text-sm-start"
          style="margin-right: -8%; z-index: 1"
        >
          <h1 class="">Save Space <br />more freedom</h1>

          <p class="text-muted">
            Gravity will force your feet to the ground. Don’t be afraid, your
            mind will find your freedom. You won’t miss a sunrise. You’ll rise
            with the sun. You’ll never run away from the storm. You will flow
            with the wind. Don’t hesitate to pause. Follow the flow of the
            moment. And then, take the first step towards the new you.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.carousel-indicators .indicator {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid #0dcaf0;
  background-color: white;
  opacity: 0.8;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin: 0 5px;
}

.carousel-indicators .indicator.active {
  background-color: #0dcaf0;
  transform: scale(1.2);
}
</style>