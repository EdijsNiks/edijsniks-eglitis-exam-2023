import {createRouter, createWebHistory} from 'vue-router'
import { useAuthStore } from '@/stores/auth.js';
import Login from '@/views/Login.vue';
import Songs from '@/views/Songs.vue';
import Albums from '@/views/Album.vue';
import About from '@/views/About.vue';

const router = createRouter({
    history: createWebHistory(),
    routes : [
        {
            path: '/',
            component: Songs,
          },
          {
            path: '/login',
            component: Login,
          },
          {
            path: '/albums',
            component: Albums,
          },
          {
            path: '/about',
            component: About,
          },
    ]
})

// LV
// Tiek izveidots middleware / starpprogrammatūra kura katru reizi veiks pārbaudi pirms tiks nomainīta rūtera adrese
// arguments to glabā adresi uz kurieni gribam iet
// arguments from glabā adresi no kurienes mēs nākam

// ENG
// Middleware is a function that is executed before the route is changed
// argument "to" stores the address where we want to navigate/go
// argument "from" stores the address from where we're coming from

router.beforeEach((to, from, next) => {
    const isAuthenticated = useAuthStore().isAuthenticated;
  
    if (isAuthenticated && to.path === '/login') {
      next('/');
      return;
    }
    if (!isAuthenticated && to.path !== '/login') {
      if (useAuthStore().authenticate()) {
        next();
      } else {
        next('/login');
      }
      return;
    }
    next();
  });

export default router
