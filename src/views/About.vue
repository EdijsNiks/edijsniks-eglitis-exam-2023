<template>
  <div id="about-view">
    <div class="wrapper-header">
      <h1>ABOUT ME</h1>
      <div class="settings">
        <button
          id="btn-edit"
          @click="toggleEditMode"
          :class="{ active: editMode }"
        >
          {{ editMode ? "Cancel" : "Edit Form" }}
        </button>
        <button id="btn-save" @click="saveUserData" v-if="editMode">
          Save Form
        </button>
      </div>
    </div>
    <form>
      <div class="wrapper-input">
        <label>NAME</label>
        <input id="input-name" v-if="editMode" v-model="user.name" />
        <p id="txt-name" v-else>{{ user.name }}</p>
      </div>
      <div class="wrapper-input">
        <label>SURNAME</label>
        <input
          id="input-surname"
          v-if="editMode"
          v-model="user.surname"
         
        />
        <p id="txt-surname" v-else>{{ user.surname }}</p>
      </div>
      <div class="wrapper-input">
        <label>STUDENT CODE</label>
        <input
          id="input-code"
          v-if="editMode"
          v-model="user.code"
         
        />
        <p id="txt-code" v-else>{{ user.code }}</p>
      </div>
      <div class="wrapper-songs">
        <label>FAVORITE SONGS</label>
        <ul v-if="user.favoriteSongs.length > 0">
          <li v-for="song in user.favoriteSongs" :key="song.id">
            <img id="img-album" :src="song.album.coverImageUrl" />
            <div class="song-info">
              <p id="txt-song" class="song-name">{{ song.name }}</p>
              <p id="txt-artist" class="song-artists">
                {{ song.artists.join(", ") }}
              </p>
            </div>
          </li>
        </ul>
        <div id="txt-empty" class="empty" v-else>NO SONGS FOUND</div>
      </div>
    </form>
  </div>
</template>

<script>

import { useAuthStore } from "../stores/auth";


export default {
  data() {
    return {
      user: {
        name: "John",
        surname: "Smith",
        code: "IT1234",
        favoriteSongs: [
          {
            id: 1,
            name: "DEEP (feat. Nonô)",
            artists: ["Example", "Bou", "Nonô"],
            album: {
              coverImageUrl:
                "https://i.scdn.co/image/ab67616d00001e02980c9d288a180838cd12ad24",
            },
          },
        ],
      },
      editMode: false,
    };
  },
  methods: {
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    saveUserData() {
      
      this.editMode = false; 
    },
  },
};
</script>
