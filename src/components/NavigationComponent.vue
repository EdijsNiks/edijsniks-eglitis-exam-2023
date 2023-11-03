<template>
    <nav id="nav-main" class="wrapper-navigation">
      <ol>
        <li v-for="link in navigationLinks" :key="link.id">
          <router-link :to="link.url">{{ link.text }}</router-link>
        </li>
      </ol>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        navigationLinks: [
          { id: 1, text: "SONGS", url: "/" },
          { id: 2, text: "ALBUMS", url: "/albums" },
          { id: 3, text: "ABOUT", url: "/about" }
        ]
      };
    }
  };
  </script>