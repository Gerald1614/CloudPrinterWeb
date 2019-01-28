import Vue from 'vue';
import Vuex from 'vuex';

import Auth from './auth';
import Orders from './orders';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Auth,
    Orders,
  },
});

export default store;
