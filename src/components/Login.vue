<template>
<v-container>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8>
      <v-card light class=" ma-2 pa-5">
      <form light class="form" @submit.prevent="submit">
          <v-flex d-flex xs10 sm6>
            <v-text-field
              light
              @click="alertSwitch"
              v-model.trim="email"
              label="Courriel"
            ></v-text-field>
          </v-flex>
          <v-flex d-flex xs10 sm6>
            <v-text-field
              light
              @click="alertSwitch"
              v-model="password"
              :append-icon="e1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'"
              label="Mot de Passe"
            ></v-text-field>
          </v-flex>
        <v-btn light type="submit">soumettre</v-btn>
        <v-btn light @click="clear">annuler</v-btn>
        <v-alert light v-model="alert" type="error" color="error" icon="new_releases">{{ alertMsg }}</v-alert>
      </form>
      </v-card>
    </v-flex>
  </v-layout> 
</v-container>
</template>

<script>
import {logIn, getProfile} from '../utilities/fetchData.js'
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
    alertSwitch () {
      this.alert = false
    },
    async submit () {
      let data = {formContent: {username: this.email, password: this.password}, that: this}
      let result = await logIn(data)
      console.log(result)
      if (result === 'login failed') {
        this.alert = true
        this.alertMsg = "nom d'usager ou mot de passe éronné"
        return
      }
      store.dispatch('Auth/LOGIN', {id: result._id, token: result.token, username: result.email, name: result.name})
    },
    clear () {
      this.email = ''
      this.password = ''
      this.$router.push('/')
    }
  }
}
</script>
