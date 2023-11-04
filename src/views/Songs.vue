<template>
    <div id="songs-view" @scroll="handleScroll">
      <div class="wrapper-header">
        <h1>SONGS</h1>
        <div class="wrapper-search">
          <input id="input-search" v-model="searchText" placeholder="Search by title..." />
        </div>
        <div class="wrapper-settings">
          <button
            id="btn-show-favorites"
            @click="toggleShowFavorites"
            :class="{ active: showFavorites }"
          >
            Show Favorites
          </button>
        </div>
      </div>
      <div class="wrapper-songs">
        <table cellspacing="0" cellpadding="0">
          <tr ref="header">
            <th id="th-id">#</th>
            <th
              id="th-title"
              @click="sortBy('title')"
              :class="{ active: sortByColumn === 'title' }"
            >
              Title
              <IconCaretUp
                :class="{ 'flip-vertical': sortDirection === 'desc' && sortByColumn === 'title' }"
              />
            </th>
            <th id="th-artist">Artist</th>
            <th id="th-album">Album</th>
            <th
              id="th-duration"
              @click="sortBy('duration_ms')"
              :class="{ active: sortByColumn === 'duration_ms' }"
            >
              Duration
              <IconCaretUp
                :class="{ 'flip-vertical': sortDirection === 'desc' && sortByColumn === 'duration_ms' }"
              />
            </th>
          </tr>
          <!-- Loop through songs -->
          <tr
            class="song"
            v-for="(song, index) in filteredSongs"
            :key="song.id"
            @click="selectSong(song)"
            :class="{ active: currentlyPlaying === song.id }"
          >
            <td id="td-index">
              <IconPlay v-if="currentlyPlaying === song.id" />
              <span id="txt-index">{{ index + 1 }}</span>
            </td>
            <td id="td-title">
              <img :src="song.album.images[0].url" />
              {{ song.name }}
            </td>
            <td id="td-artist">{{ song.artists.join(', ') }}</td>
            <td id="td-album">{{ song.album.name }}</td>
            <td id="td-duration">{{ getTime(song.duration_ms) }}</td>
            <td
              id="td-heart"
              @click="toggleFavorite(song)"
              :class="{ active: isFavorite(song) }"
            >
              <IconHeart />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import IconCaretUp from "@/components/icons/IconCaretUp.vue";
  import IconPlay from "@/components/icons/IconPlay.vue";
  import IconHeart from "@/components/icons/IconHeart.vue";
  import songs from "../data/songs";
  import { usePlayerStore } from "@/stores/player";
  import { useAuthStore } from "../stores/auth";
  
  export default {
    data() {
      return {
        searchText: "",
        showFavorites: false,
        sortByColumn: "",
        sortDirection: "asc",
        allSongs: songs, 
      };
    },
    methods: {
      handleScroll(event) {
        this.$refs.header.classList.value = event.target.scrollTop > 100 ? "scrolled" : "";
      },
      toggleShowFavorites() {
        this.showFavorites = !this.showFavorites;
      },
      sortBy(column) {
        if (this.sortByColumn === column) {
          this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
        } else {
          this.sortByColumn = column;
          this.sortDirection = "asc";
        }
      },
      selectSong(song) {
        usePlayerStore().setNowPlaying(song);
      },
      toggleFavorite(song) {
        useAuthStore().toggleFavorite(song.id);
      },
      isFavorite(song) {
        return useAuthStore().getFavoriteSongs.includes(song.id);
      },
      getTime(durationMs) {
        const minutes = Math.floor(durationMs / 60000);
        const seconds = ((durationMs % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      },
    },
    computed: {
      filteredSongs() {
        let filtered = [...this.allSongs];
  
        if (this.searchText) {
          const searchLower = this.searchText.toLowerCase();
          filtered = filtered.filter((song) => song.name.toLowerCase().includes(searchLower));
        }
  
        if (this.showFavorites) {
          filtered = filtered.filter((song) => this.isFavorite(song));
        }
  
       
        if (this.sortByColumn === "title") {
          filtered.sort((a, b) => {
            const order = this.sortDirection === "asc" ? 1 : -1;
            return order * a.name.localeCompare(b.name);
          });
        } else if (this.sortByColumn === "duration_ms") {
          filtered.sort((a, b) => {
            const order = this.sortDirection === "asc" ? 1 : -1;
            return order * (a.duration_ms - b.duration_ms);
          });
        }
  
        return filtered;
      },
      currentlyPlaying() {
        return usePlayerStore().getNowPlayingSongId;
      },
    },
  };
  </script>
  