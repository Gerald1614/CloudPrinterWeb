import Vue from 'vue';
import Vuelidate from 'vuelidate';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(Vuelidate);

Vue.filter('date', (value) => {
  if (!value) return '';
  const d = new Date(value);
  const n = d.toLocaleDateString();
  return n;
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
