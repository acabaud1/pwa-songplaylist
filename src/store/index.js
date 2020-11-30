import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        artists: null,
        playlist: null,
        favorites: []
    },
    mutations: {
        initializeStore(state) {
            if(localStorage.getItem('favorites')) {
                state.favorites = JSON.parse(localStorage.getItem('favorites'));
            }
        },
        loadArtists(state, artists) {
            state.artists = artists;
        },
        loadPlaylist(state, playlist) {
            state.playlist = playlist;
        },
        addFavorite(state, song) {
            state.favorites.push(song);
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        removeFavorite(state, song) {
            state.favorites.splice(state.favorites.indexOf(song), 1);
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        }
    }
});