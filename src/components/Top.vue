<template>
    <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
            <v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2"
                    contain
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                    transition="scale-transition"
                    width="40"
            />
        </div>

        <v-spacer></v-spacer>

        <FavoritesModal />
    </v-app-bar>
</template>

<script>
    import FavoritesModal from './favorites/FavoritesModal';

    export default {
        name: "Top",
        components: {
            FavoritesModal
        }
    }
</script>