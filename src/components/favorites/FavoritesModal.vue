<template>
    <v-dialog v-model="dialog" persistent max-width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
                <v-icon>mdi-heart</v-icon>
                <span class="ml-2">Favoris</span>
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="headline">Favoris</v-card-title>
            <v-card-text v-if="favorites.length">
                <ul class="favorites-list">
                    <li v-for="favorite in favorites" :key="favorite">{{ song(favorite) }}</li>
                </ul>
            </v-card-text>
            <v-card-text v-else>Vous n'avez aucune musique dans vos favoris.</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                >
                    Fermer
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import DataService from '../../services/data.service';

    export default {
        data () {
            return {
                dialog: false,
                favorites: this.$store.state.favorites,
                dataService: null
            }
        },
        created() {
            this.dataService = new DataService();
        },
        methods: {
            song(id) {
                let song = this.dataService.getSong(id);
                return song.title + ' (' + this.dataService.getArtist(song.artist).name +  ')';
            }
        }
    }
</script>