<template>
<v-container>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8>
      <v-card light class=" ma-2 pa-5">
      <form light class="form" @submit.prevent="submit">
        <v-layout row wrap justify-space-between>
          <v-flex d-flex xs12 sm5>
            <v-text-field
              @click="alertSwitch"
              light
              v-model.trim="name"
              :error-messages="nameErrors"
              :counter="3"
              label="Name"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>
          </v-flex>
          <v-flex d-flex xs12 sm5>
            <v-text-field
              @click="alertSwitch"
              light
              v-model.trim="username"
              :error-messages="usernameErrors"
              label="Email/username"
              required
              @input="$v.username.$touch()"
              @blur="$v.username.$touch()"
            ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row wrap justify-space-between>
          <v-flex d-flex xs12 sm5>
            <v-text-field
              @click="alertSwitch"
              light
              v-model="password"
              :error-messages="passwordErrors"
              :append-icon="e1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'"
              label="Mot de Passe"
              required
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
              :counter="6"
            ></v-text-field>
          </v-flex>
          <v-flex d-flex xs12 sm5>
            <v-text-field
              light
              v-model="passwordCheck"
              :error-messages="passwordCheckErrors"
              :append-icon="e2 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e2 = !e2)"
              :type="e2 ? 'password' : 'text'"
              label="Verification du mot de Passe"
              required
              @input="$v.passwordCheck.$touch()"
              @blur="$v.passwordCheck.$touch()"
              :counter="6"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn light type="submit">submit</v-btn>
        <v-btn light @click="clear">cancel</v-btn>
        <v-alert light v-model="alert" type="error" color="error" icon="new_releases">{{ alertMsg }}</v-alert>
      </form>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, sameAs, email } from 'vuelidate/lib/validators'
import { signUp, logIn } from '../utilities/fetchData.js'

export default {

  mixins: [validationMixin],
  validations: {
      name: { required, minLength: minLength(4)},
      username: { required, email },
      password: { required, minLength: minLength(6) },
      passwordCheck: { required, sameAs: sameAs('password') },
    },

  data () {
    return {
        username: '',
        password: '',
        passwordCheck: '',
        e1: true,
        e2: true,
        name: '',
        alert: false,
        alertMsg: ''
      }
    },
  computed: {

      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.minLength && errors.push('Le nom doit faire au moins 3 caracteres')
        !this.$v.name.required && errors.push('Le nom est obligatoire')
        return errors
      },
      usernameErrors () {
        const errors = []
        if (!this.$v.username.$dirty) return errors
        !this.$v.username.email && errors.push('Must be valid e-mail')
        !this.$v.username.required && errors.push('E-mail is required')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('Le Mot de Passe doit faire au moins 6 caracteres')
        !this.$v.password.required && errors.push('Le mot de passe est obligatoire')
        return errors
      },
      passwordCheckErrors () {
        const errors = []
        if (!this.$v.passwordCheck.$dirty) return errors
        !this.$v.passwordCheck.sameAs && errors.push('les deux mots de passe sont différents')
        !this.$v.passwordCheck.required && errors.push('Le mot de passe est obligatoire')
        return errors
      },
    },
  methods: {
        alertSwitch () {
      this.alert=false
    },
    async submit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        try {
          let formContent = { username: this.username, password: this.password, name: this.name }
          let result = await signUp(formContent)
          if (result === 'signUp failed') {
            this.alert=true
            this.alertMsg="la procedure a échouée, merci de recommencer plus tard"
            return
          }
          let logData = {formContent: { username: result.email, password: result.password }, that: this}
          let logRes = await logIn(logData)
          if (result === 'login failed') {
            this.alert=true
            this.alertMsg="votre profil a été crée, merci de vous connectez"
            return
          }
          store.dispatch('Auth/LOGIN', {id: result._id, token: result.token, username: result.email, name: result.name})
        }
        catch(error) {
            console.log(error)
        }
      }
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.username = ''
      this.password = ''
      this.passwordCheck = ''
      this.$router.push('/')
    }
  }
}
</script>
<style>
.input-group label {
  white-space: normal;
  overflow: visible
}

</style>