import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';
import Logout from './components/Logout.vue';
import ListOrdersCards from './components/ListOrdersCards.vue';
import ListOrdersList from './components/ListOrdersList.vue';
import ListNewOrdersList from './components/ListNewOrdersList.vue';

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
      path: '/newOrdersList',
      name: 'newOrdersList',
      component: ListNewOrdersList,
    },
    {
      path: '/ordersList',
      name: 'ordersList',
      component: ListOrdersList,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
