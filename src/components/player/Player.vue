<template>
    <div class="player">
        <v-row class="pa-6">
            <v-col cols="4" class="d-flex">
                <div class="player-song-thumbnail">
                    <v-img
                        :src="audioPlayer ? playlist[currentPlaying].thumb : 'https://via.placeholder.com/65'"
                        aspect-ratio="1"
                        height="65"
                        width="65"
                        class="grey lighten-2"
                    />
                </div>
                <div class="player-song-infos ml-3">
                    <div v-if="audioPlayer">
                        <p class="player-song-title font-weight-medium mb-1 mt-1">{{ playlist[currentPlaying].title }}</p>
                        <p class="player-song-artist font-weight-light mb-0">{{ playlist[currentPlaying].artist }}</p>
                    </div>
                </div>
            </v-col>
            <v-col cols="4" class="text-center pt-1">
                <div class="player-controls mb-3">
                    <v-btn icon @click="skipPrevious()" class="mr-6">
                        <v-icon medium>mdi-skip-previous</v-icon>
                    </v-btn>
                    <v-btn icon @click="togglePlay()">
                        <v-icon x-large v-text="playerStatus()"></v-icon>
                    </v-btn>
                    <v-btn icon @click="skipNext()" class="ml-6">
                        <v-icon medium>mdi-skip-next</v-icon>
                    </v-btn>
                </div>
                <div class="player-progress">
                    <v-progress-linear
                        :value="currentSeek"
                        @change="updateCurrentSeek">
                    </v-progress-linear>
                    <v-row>
                        <v-col cols="6" class="text-left caption pt-1" v-text="showedSeek.current"></v-col>
                        <v-col cols="6" class="text-right caption pt-1" v-text="showedSeek.duration"></v-col>
                    </v-row>
                </div>
            </v-col>
            <v-col cols="4" class="text-right">
                <div class="player-volume ml-auto mt-3">
                    <v-slider
                        v-model="volumeSelector"
                        prepend-icon="mdi-volume-high"
                        max="10"
                        min="0"
                    ></v-slider>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import {Howl, Howler} from 'howler';

    export default {
        name: "Player",
        data: function() {
            return {
                audioPlayer: null,
                currentPlaying: 0,
                currentSeek: 0,
                volumeSelector: 5,
                playlist: this.$store.state.playlist,
                showedSeek: {
                    current: this.readableSeek(0),
                    duration: this.readableSeek(0)
                }
            }
        },
        created() {
            setInterval(() => {
                if(this.audioPlayer) {
                    this.updateCurrentSeek();
                    /*if(!this.audioPlayer.playing()) {
                        this.audioPlayer = null;
                    }*/
                }
            }, 1000);
        },
        mounted() {
            this.$root.$on('play', () => {
                this.togglePlay();
            });
        },
        methods: {
            togglePlay() {
                if(this.audioPlayer) {
                    if(this.audioPlayer.playing())
                        this.audioPlayer.pause();
                    else
                        this.audioPlayer.play();
                } else {
                    this.setSource(require('../../assets/music/' + this.playlist[this.currentPlaying].path));
                    this.togglePlay();
                }
            },
            skipPrevious() {
                let index = this.currentPlaying - 1;
                let previous = this.playlist[index];
                if(index < 0 || !previous)
                    return console.log('No previous sound in playlist');

                this.setSource(previous.path);
            },
            skipNext() {
                let index = this.currentPlaying + 1;
                let next = this.playlist[index];
                if(index > this.playlist.length || !next)
                    return console.log('No next sound in playlist');

                this.setSource(next.path);
            },
            setSource(sound) {
                this.audioPlayer = new Howl({
                    src: [sound]
                });
            },
            updateCurrentSeek(value) {
                if(this.audioPlayer) {
                    if(value) this.audioPlayer.seek(value * this.audioPlayer.duration() / 100);
                    this.currentSeek = 100 * this.audioPlayer.seek() / this.audioPlayer.duration();
                    this.showedSeek = {
                        current: this.readableSeek(this.audioPlayer.seek()),
                        duration: this.readableSeek(this.audioPlayer.duration())
                    };
                }
            },
            readableSeek(s) {
                let sec_num = parseInt(s, 10);
                let hours   = Math.floor(sec_num / 3600);
                let minutes = Math.floor(sec_num / 60) % 60;
                let seconds = sec_num % 60;

                return [hours, minutes, seconds]
                    .map(v => v < 10 ? "0" + v : v)
                    .filter((v,i) => v !== "00" || i > 0)
                    .join(":");
            },
            playerStatus() {
                if(this.audioPlayer) {
                    if(this.audioPlayer.state() === 'loading') return 'mdi-loading mdi-spin';
                    else if(this.audioPlayer.playing()) return 'mdi-pause';
                }
                return 'mdi-play';
            }
        },
        watch: {
            volumeSelector(oldVolume, newVolume) {
                Howler.volume(newVolume / 10);
            },
        },
    };
</script>

<style scoped>
    .player {
        position: fixed;
        bottom: 0;
        width: 100%;
    }

    .player-volume {
        max-width: 150px;
    }
</style>