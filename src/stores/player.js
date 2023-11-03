import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
    state: () => ({
        playlist   : [],
        now_playing: {}, // SONG OBJECT
    }),
    getters: {
        getNextSong(){
            const index = playlistData.findIndex(song => song.id === nowPlaying.id);
            const songIndex = index;
            return playlistData[songIndex + 1] || null;
        },
        getPreviousSong() {
            const index = playlistData.findIndex(song => song.id === nowPlaying.id);
            const songIndex = index;
            return songIndex > 0 ? playlistData[index - 1] : false;
        },
        getNowPlayingSongId() {
            return this.now_playing?.id;
        },
        getNowPlaying() {
            return this.now_playing;

        },
        getNowPlayingAlbumID() {
            return this.now_playing?.album?.id ?? null;
        },
        getNowPlayingSongName() {
            return this.now_playing?.name ?? '';
        },
        getNowPlayingSongImage() {
            return this.now_playing?.album?.images[1].url ?? '';
        },
        getNowPlayingArtists() {
            return this.now_playing?.artists?.map(artist => artist.name).join(', ');
        },
        getNowPlayingSongPreview() {
            return this.now_playing?.preview_url;
        }
    },
    actions: {
        setPlaylist(songs) {
            this.playlist = songs;

        },
        setNowPlaying(song) {
            this.now_playing = song;

        },
        resetNowPlaying() {
            this.now_playing = {};
        },
    }
})
