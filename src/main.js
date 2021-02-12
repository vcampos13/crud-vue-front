import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n';
import interceptorsSetup from './helpers/interceptors'


Vue.config.productionTip = false;

const token = localStorage.getItem('userApiToken');

if (token) {
    axios.defaults.headers.common['Authorization'] = token
}

interceptorsSetup();

new Vue({
  store,
  router,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app');
