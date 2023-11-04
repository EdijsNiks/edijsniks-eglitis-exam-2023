<template>
    <div id="login-view">
      <form class="login-form" @submit.prevent="submitForm">
        <div class="wrapper-logo">
          <img src="@/assets/logo.svg" />
          <div>KRAKEN.FM</div>
        </div>
        <input
          id="input-email"
          placeholder="E-mail"
          v-model="email"
          @input="validateForm"
        />
        <input
          id="input-password"
          type="password"
          placeholder="Password"
          v-model="password"
          @input="validateForm"
        />
        <button id="btn-submit" type="submit" :disabled="isSubmitDisabled" @click="validateForm">LOGIN</button>
      </form>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '../stores/auth.js';

  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    computed: {
      isSubmitDisabled() {
        return !this.email || !this.password || this.password.length < 6;
      },
    },
    methods: {
      validateForm() {
        const authStore = useAuthStore()
        authStore.authenticate(this.email, this.password)
      },
    },
  };
  </script>
  