<template>
  <div id="album-view">
    <div class="wrapper-header">
      <h1>ALBUMS</h1>
      <div class="settings">
        <button
          id="btn-grid"
          @click="toggleLayout('grid')"
          :class="{ active: isGrid }"
        >
          <IconGrid />
        </button>
        <button
          id="btn-list"
          @click="toggleLayout('list')"
          :class="{ active: !isGrid }"
        >
          <IconList />
        </button>
      </div>
    </div>
    <ul id="list-albums" :class="{ grid: isGrid }">
      <li
        class="album"
        v-for="album in albums"
        :key="album.id"
        @click="selectAlbum(album)"
        :class="{ active: album.id === currentAlbumId }"
      >
        <img id="img-album" :src="album.images?.[0]?.url" />
        <div class="album-info">
          <h4 id="txt-album-name">{{ album.name }}</h4>
          <p id="txt-album-artists">{{ album.artists.join(", ") }}</p>
          <div class="album-year">
            <p id="txt-album-year">{{ getYear(album) }}</p>
            <p id="txt-album-tracks">{{ getTrackCount(album) }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import IconGrid from "@/components/icons/IconGrid.vue";
import IconList from "../components/icons/IconList.vue";
import songsAPI from "../data/songs.js"; 

export default {
  data() {
    return {
      isGrid: true,
      currentAlbumId: null,
      albums: [], 
    };
  },
  created() {
    this.loadAlbums(); 
  },
  methods: {
    loadAlbums() {
      this.albums = this.groupAlbums(songsAPI);
    },
    toggleLayout(layout) {
      this.isGrid = layout === "grid";
    },
    selectAlbum(album) {
      this.currentAlbumId = album.id;
    },
    getYear(album) {
      return album.release_date.split("-")[0];
    },
    getTrackCount(album) {
      return `${album.tracks.length} song${album.tracks.length > 1 ? "s" : ""}`;
    },
    groupAlbums(songs) {
      const albums = {};

      songs.forEach((song) => {
        if (!albums[song.album.id]) {
          const { id, name, images, artists, release_date } = song.album;
          albums[song.album.id] = {
            id,
            name,
            images,
            artists: artists.map((artist) => artist.name),
            release_date,
            tracks: [song],
          };
        } else {
          albums[song.album.id].tracks.push(song);
        }
      });

      return Object.values(albums);
    },
  },
};
</script>
