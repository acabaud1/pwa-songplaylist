<template>
    <div class="playlist">
        <h1>Playlist</h1>
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
                        <span class="font-weight-thin">&bull; {{ song.artist }}</span>
                    </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    <v-btn icon>
                        <v-icon color="grey lighten-1">mdi-heart</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "Playlist",
        data: function () {
            return {
                songs: this.$store.state.playlist
            }
        },
        methods: {
            play(id) {
                console.log('Playing song id ' + id);
                this.$root.$emit('play');
            }
        }
    }
</script>