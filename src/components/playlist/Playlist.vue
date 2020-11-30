<template>
    <div class="playlist">
        <div class="text-center mb-3">
            <h1>Ma playlist</h1>
            <small v-if="songs">{{ songs.length }} morceau(x)</small>
            <small v-else>Aucun morceau</small>
        </div>
        <v-card class="song-list" tile elevation="0">
            <v-list-item v-for="(song, index) in songs" :key="index">
                <v-list-item-icon>
                    <v-btn icon @click="play(song.id)">
                        <v-icon>mdi-play</v-icon>
                    </v-btn>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>
                        {{ song.title }}
                        <span class="font-weight-thin">&bull; {{ artist(song.artist) }}</span>
                    </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    <v-btn v-if="isFavorite(song.id)" icon @click="removeFavorite(song.id)">
                        <v-icon color="grey lighten-1">mdi-heart</v-icon>
                    </v-btn>
                    <v-btn v-else icon @click="addFavorite(song.id)">
                        <v-icon color="grey lighten-1">mdi-heart-outline</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-card>
    </div>
</template>

<script>
    import DataService from '../../services/data.service';

    export default {
        name: "Playlist",
        data: function () {
            return {
                songs: this.$store.state.playlist,
                dataService: null,
                favorites: this.$store.state.favorites
            }
        },
        methods: {
            play(id) {
                console.log('Playing song id ' + id);
                this.$root.$emit('play');
            },
            artist(id) {
                return this.dataService.getArtist(id).name;
            },
            addFavorite(id) {
                this.$store.commit('addFavorite', id);
            },
            removeFavorite(id) {
                this.$store.commit('removeFavorite', id);
            },
            isFavorite(id) {
                return this.favorites.some(song => song === id);
            }
        },
        created() {
            this.dataService = new DataService();
        }
    }
</script>