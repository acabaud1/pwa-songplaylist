import store from '../store';
import artists from '../data/artists.json';
import songs from '../data/songs.json';

class DataService {

    loadData() {
        store.commit('loadArtists', artists);
        store.commit('loadPlaylist', songs);
    }

    getArtist(id) {
        return artists.find((artist) => artist.id === id);
    }

    getSong(id) {
        return songs.find((song) => song.id === id);
    }

}

export default DataService;