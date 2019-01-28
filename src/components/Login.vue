<template>
<v-container>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8>
      <v-card class=" ma-2 pa-5">
      <form class="form" @submit.prevent="submit">
          <v-flex d-flex xs10 sm6>
            <v-text-field
              v-model.trim="email"
              label="Courriel"
            ></v-text-field>
          </v-flex>
          <v-flex d-flex xs10 sm6>
            <v-text-field
              @click:append="e1 = !e1"
              v-model="password"
              :append-icon="e1 ? 'visibility_off' : 'visibility' "
              :type="e1 ? 'password' : 'text'"
              label="Password"
            ></v-text-field>
          </v-flex>
        <v-btn  color="success" type="submit">submit</v-btn>
        <v-btn  color="warning" @click="clear">cancel</v-btn>
        <v-alert v-model="alert" type="error" color="error" icon="new_releases">{{ alertMsg }}</v-alert>
      </form>
      </v-card>
    </v-flex>
  </v-layout> 
</v-container>
</template>

<script>
import {logIn, getProfile} from '../utilities/fetchData.js'
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      email: '',
      password: '',
      alertMsg: '',
      alert: false,
      e1: true
    }
  },

  methods: {
    async submit () {
      let data = {email: this.email, password: this.password}
      let result = await logIn(data)
      if (result === 'login failed') {
        this.alert = true
        this.alertMsg = "Incorrect email or password"
        setTimeout(() => this.alert=false, 4000)
        return
      }
      localStorage.token = result.token
      localStorage.email = result.email
      this.$store.dispatch('Auth/LOGIN', {token: result.token, email: result.email})
      this.$router.push('/')
    },
    clear () {
      this.email = ''
      this.password = ''
      this.$router.push('/')
    }
  }
}
</script>
