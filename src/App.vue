<template>
    <!--  HEADER  -->
    <Header v-if="isAuthenticated"></Header>
    <!--  HEADER END  -->
  
    <!--  BODY  -->
    <div id="section-body">
      <NavigationComponent v-if="isAuthenticated" />
      <router-view class="section-router"></router-view>
    </div>
    <!--  BODY END  -->
  
    <!--  PLAYER  -->
    <AudioPlayer v-if="isAuthenticated" />
    <!--  PLAYER END  -->
  </template>
  
  <script>
  import NavigationComponent from '@/components/NavigationComponent.vue';
  import { useAuthStore } from '@/stores/auth.js';
  export default {
      components: {
          NavigationComponent,
      },
      computed: {
            isAuthenticated() {
            const authStore = useAuthStore();
            return authStore.isAuthenticated;
            }
        }
  };
  </script>
