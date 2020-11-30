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
import DataService from '../services/data.service';

export default {
    name: "Layout",
    components: {
        Player,
        Playlist
    },
    created() {
        new DataService().loadData();
    }
};
</script>