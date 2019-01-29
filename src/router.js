import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';
import Logout from './components/Logout.vue';
import ListOrdersCards from './components/ListOrdersCards.vue';
import ListOrdersList from './components/ListOrdersList.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
    },
    {
      path: '/ordersCard',
      name: 'ordersCard',
      component: ListOrdersCards,
    },
    {
      path: '/ordersList/:liste',
      name: 'ordersList',
      component: ListOrdersList,
    },
    {
      path: '/404',
      component: () => import('./views/404'),
    },
    {
      path: '*',
      component: () => import('./views/404'),
    },
  ],
});
