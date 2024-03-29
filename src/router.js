import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';
import Logout from './components/Logout.vue';
import ListOrdersList from './components/ListOrdersList.vue';
import ListArchivedOrdersList from './components/ListArchivedOrdersList.vue';
import { getOrders } from './utilities/fetchData.js'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/signup', name: 'signup', component: Signup },
    { path: '/logout', name: 'logout', component: Logout },
    { path: '/ordersList/:liste', name: 'ordersList', component: ListOrdersList },
    { path: '/archivedOrdersList', name: 'archivedOrdersList', component: ListArchivedOrdersList },
    { path: '/404', component: () => import('./views/404') },
    { path: '*', redirect: '/' },
  ],
});
