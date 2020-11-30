<template>
  <div class="app">
    <v-container>
      <v-row>
        <v-col cols="12">
          <Playlist />
        </v-col>
      </v-row>
    </v-container>
    <Player />
  </div>
</template>

<script>
import Player from './player/Player';
import Playlist from './playlist/Playlist';

export default {
    name: "Layout",
    components: {
        Player,
        Playlist
    },
    mounted() {
        if(this.$store.state.playlist.length < 1) {
            // Fixtures
            this.$store.commit('addSong', {
                id: 1,
                title: 'Petit Poney',
                artist: 'Jean',
                path: 'petit_poney.mp3',
                thumb: 'https://i.ytimg.com/vi/YxpmeQPk8Ig/hqdefault.jpg',
            });

            this.$store.commit('addSong', {
                id: 2,
                title: 'Petit Poney 2',
                artist: 'Roland Joule',
                path: 'petit_poney.mp3',
                thumb: 'https://i.ytimg.com/vi/YxpmeQPk8Ig/hqdefault.jpg',
            });

            this.$store.commit('addSong', {
                id: 3,
                title: 'Petit Poney 3',
                artist: 'Pier\'N\'Passi',
                path: 'petit_poney.mp3',
                thumb: 'https://i.ytimg.com/vi/YxpmeQPk8Ig/hqdefault.jpg',
            });
        }
    }
};
</script>