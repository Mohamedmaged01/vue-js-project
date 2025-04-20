<template>
  <div class="w-100">
    <div class="position-relative banner-container">
      <div class="banner-text text-white text-center">
        <h1 class="display-4 fw-bold">Contact Us</h1>
        <p class="lead">We’d love to hear from you!</p>
      </div>
    </div>
    <div class="container py-5">
      <div class="row g-5">
        <div class="col-lg-6">
          <div class="p-4 contact-form shadow-sm rounded bg-white">
            <h2 class="mb-4 text-info">Send us a Message !</h2>
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label class="form-label">Your Name</label>
                <input
                  v-model="name"
                  type="text"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Email Address</label>
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Your Message</label>
                <textarea
                  v-model="message"
                  rows="5"
                  class="form-control"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                class="btn btn-info px-4 text-white"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? "Sending..." : "Send" }}
              </button>
              <p v-if="success" class="text-success mt-3">
                Message sent successfully!
              </p>
            </form>
          </div>
        </div>

        <div class="col-lg-6 d-flex align-items-center">
          <div class="contact-info text-secondary px-3">
            <h2 class="mb-4 text-info">Get in Touch</h2>
            <p class="mb-4">
              We’re here to help. Whether you have a question or just want to
              say hello, feel free to reach out.
            </p>
            <ul class="list-unstyled fs-6">
              <li class="mb-3">
                <i class="bi bi-geo-alt-fill text-info me-2"></i>
                ITI
              </li>
              <li class="mb-3">
                <i class="bi bi-envelope-fill text-info me-2"></i>
                ITI@vue-ecom.com
              </li>
              <li class="mb-3">
                <i class="bi bi-telephone-fill text-info me-2"></i>
                +1 (555) 123-4567
              </li>
              <li class="mb-3">
                <i class="bi bi-clock-fill text-info me-2"></i>
                Mon – Fri: 9 AM – 6 PM
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");
const email = ref("");
const message = ref("");
const isSubmitting = ref(false);
const success = ref(false);

const submitForm = async () => {
  isSubmitting.value = true;
  success.value = false;

  const payload = {
    name: name.value,
    email: email.value,
    message: message.value,
    timestamp: new Date().toISOString(),
  };

  try {
    const res = await fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to submit");

    name.value = "";
    email.value = "";
    message.value = "";
    success.value = true;
  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.banner-container {
  max-height: 400px;
  overflow: hidden;
}

.banner-image {
  object-fit: cover;
  height: 100%;
}

.banner-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.contact-form {
  background: #ffffff;
  border-left: 5px solid #0dcaf0;
}

.contact-info i {
  font-size: 1.2rem;
}
</style>
