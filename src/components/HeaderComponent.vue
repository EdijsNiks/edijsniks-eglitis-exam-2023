<template>
    <div id="main-header" class="active">
      <div class="wrapper-logo">
        <img src="@/assets/logo.svg" alt="logo" />
        <h2>KRAKEN.FM</h2>
      </div>
      <div class="wrapper-profile">
        <div class="section-user">
          <span class="avatar"></span>
          <h3 id="txt-full-name">{{ userName }} {{ userSurname }}</h3>
        </div>
        <button id="btn-logout" @click="handleLogout">LOGOUT</button>
      </div>
    </div>
  </template>
  
 <script>
 /* import { useAuthStore } from '../stores/auth.js';
  
  export default {
    setup() {
      const userName = useAuthStore.user.name;
      const userSurname = useAuthStore.user.surname;
      
  
     const handleLogout = () => {
      useAuthStore.logout(); 
    };

      return {
        userName,
        userSurname,
        handleLogout,
      };
    },
  };*/
  </script>

