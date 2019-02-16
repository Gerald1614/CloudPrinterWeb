<template>
  <v-app>
    <v-navigation-drawer app
    :mini-variant.sync="mini"
    v-model="drawer"
    hide-overlay
    stateless
    >
    <v-toolbar flat class="transparent">
        <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="../public/img/icons/icon-192x192.png">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Cloud Printer</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn
              icon
              @click.stop="mini = !mini"
            >
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list dense>
              <v-list-tile
          to='/home'
        >
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      <v-list-group>
        <v-list-tile slot="activator">
          <v-list-tile-action>
            <v-icon>face</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ user.email ? user.email : 'Login/Signup' }}</v-list-tile-title>
          </v-list-tile>
        <v-list-tile
          to='/login'
          v-if="!this.$store.getters['Auth/isAuthenticated']"
          >
          <v-list-tile-action>
            <v-icon>lock</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          to='/logout'
          v-if="this.$store.getters['Auth/isAuthenticated']"
        >
          <v-list-tile-action>
            <v-icon>lock_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          to='/signup'
          v-if="!this.$store.getters['Auth/isAuthenticated']"
        >
          <v-list-tile-action>
            <v-icon>library_books</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Signup</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
     </v-list-group>
        <v-list-group
          no-action
          sub-group
          value="true"
          v-if="this.$store.getters['Auth/isAuthenticated']"
        >
          <v-list-tile slot="activator">
            <v-list-tile-action>
            <v-icon>payment</v-icon>
          </v-list-tile-action>
            <v-list-tile-title>Orders</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            v-for="(order, i) in orders"
            :key="i"
            :to="order[2]"
          >
            <v-list-tile-action>
              <v-icon v-text="order[1]"></v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="order[0]"></v-list-tile-title>

          </v-list-tile>
        </v-list-group>
    </v-list>
  </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer class="pa-3">
      <v-spacer></v-spacer>
          <div class="white--text ml-3">
            Made by
            <a class="white--text" href="https://gegeraptor.com" target="_blank">gegeRaptor</a> &copy; 2019 
          </div>
    </v-footer>
  </v-app>
</template>

<script>
import { getOrders } from './utilities/fetchData.js'
import store from '../src/store/index'
import { mapGetters } from 'vuex'
import DashBoard from './components/DashBoard'

export default {
  name: 'App',
  components: {
    DashBoard
  },
  // beforeCreate: function() {
  //   if ('serviceWorker' in navigator) {
  //     window.addEventListener('load', () => {
  //       navigator.serviceWorker.register('/sw.js').then(registration => {
  //         console.log('SW registered: ', registration)
  //       }).catch(registrationError => {
  //         console.log(registrationError)
  //       })
  //   })
  // }
  // },
  mounted: () => {
    getOrders()
  },
  computed: {
    ...mapGetters({
    user: 'Auth/getLoggedUser'
    })
  },
  data () {
    return {
      drawer: true,
      mini: false,
      right: null,
      orders: [
        ['New Orders', 'input', '/ordersList/newOrders'],
        ['Order List', 'list', '/ordersList/currentOrders'],
        ['Completed or Canceled', 'done_all', '/archivedOrdersList']
      ],
    }
  }
}
</script>
