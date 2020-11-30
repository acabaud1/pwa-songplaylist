import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  beforeCreate() {
    this.$store.commit('initializeStore');
  },
  render: h => h(App)
}).$mount('#app');