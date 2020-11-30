import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        playlist: []
    },
    mutations: {
        initializeStore(state) {
            if(localStorage.getItem('playlist')) {
                state.playlist = JSON.parse(localStorage.getItem('playlist'));
            }
        },
        addSong(state, song) {
            state.playlist.push(song);
            localStorage.setItem('playlist', JSON.stringify(state.playlist));
        }
    }
});