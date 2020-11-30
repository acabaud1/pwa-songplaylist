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
            <v-card-text>Vous n'avez aucune musique dans vos favoris.</v-card-text>
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
    export default {
        data () {
            return {
                dialog: false,
            }
        },
    }
</script>