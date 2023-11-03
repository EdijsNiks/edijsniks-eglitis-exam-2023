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
        <button id="btn-submit" type="submit" :disabled="isSubmitDisabled">LOGIN</button>
      </form>
    </div>
  </template>
  
  <script>
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
      submitForm() {
        if (!this.isSubmitDisabled) {
          useAuthStore.verifyUser(this.email, this.password);
        }
      },
      validateForm() {
      },
    },
  };
  </script>
  