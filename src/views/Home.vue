<template>
<v-container>
  <dash-board v-if="this.$store.getters['Auth/isAuthenticated']"/>
  <v-container v-else>
  <h3>Welcome to Cloud Printer application</h3>
  <p>Please login to get access</p>
  </v-container>
</v-container>

</template>

<script>
  import DashBoard from '../components/DashBoard.vue'

  export default {
    components: {
      DashBoard
    }
  }
</script>
