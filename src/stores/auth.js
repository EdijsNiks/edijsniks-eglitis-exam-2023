import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      name: 'NAME',
      surname: 'SURNAME',
      code: 'IT1234',
      favorite_songs: [],
    },
    authenticated: false,
  }),
  actions: {
    setUserData(name, surname, code) {
      this.user.name = name;
      this.user.surname = surname;
      this.user.code = code;
    },
    authenticate(email, password) {
      if (email === 'edijs@test.com' && password === '123456') {
        localStorage.setItem('is_authenticated', 'true');
        this.authenticated = true;
      
        this.$router.push('/');
      }
    },
    logout() {
      localStorage.clear();
      this.authenticated = false;

      this.$router.push('/login');
    },
    toggleFavorite(songID) {
      if (!this.user.favorite_songs.includes(songID)) {
        this.user.favorite_songs.push(songID);
      } else {
        this.user.favorite_songs = this.user.favorite_songs.filter(id => id !== songID);
      }
      localStorage.setItem('favorite_songs', JSON.stringify(this.user.favorite_songs));
    },
  },
  getters: {
    getFavoriteSongs() {
      return this.user.favorite_songs;
    },
    isAuthenticated() {
      return localStorage.getItem('is_authenticated') || this.authenticated;
    },
  },
});
