<template>
<v-container>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8>
      <v-card class=" ma-2 pa-5">
      <form class="form" @submit.prevent="submit">
        <v-layout row wrap justify-space-between>
          <v-flex d-flex xs12 sm5>
            <v-text-field
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
              v-model.trim="email"
              :error-messages="emailErrors"
              label="Email"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row wrap justify-space-between>
          <v-flex d-flex xs12 sm5>
            <v-text-field
              v-model="password"
              :error-messages="passwordErrors"
              :append-icon="e1 ?  'visibility_off' : 'visibility'"
              @click:append="e1 = !e1"
              :type="e1 ? 'password' : 'text'"
              label="Password"
              required
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
              :counter="6"
            ></v-text-field>
          </v-flex>
          <v-flex d-flex xs12 sm5>
            <v-text-field
              v-model="passwordCheck"
              :error-messages="passwordCheckErrors"
              :append-icon="e2 ? 'visibility_off' : 'visibility'"
              @click:append="e2 = !e2"
              :type="e2 ? 'password' : 'text'"
              label="Validate password"
              required
              @input="$v.passwordCheck.$touch()"
              @blur="$v.passwordCheck.$touch()"
              :counter="6"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn color="success" type="submit">submit</v-btn>
        <v-btn  color="warning" @click="clear">cancel</v-btn>
        <v-alert v-model="alert" type="error" color="error" icon="new_releases">{{ alertMsg }}</v-alert>
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
      email: { required, email },
      password: { required, minLength: minLength(6) },
      passwordCheck: { required, sameAs: sameAs('password') },
    },

  data () {
    return {
        email: '',
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
        !this.$v.name.minLength && errors.push('3 characters minimum')
        !this.$v.name.required && errors.push('mandatory field')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('6 characters minimum')
        !this.$v.password.required && errors.push('password is required')
        return errors
      },
      passwordCheckErrors () {
        const errors = []
        if (!this.$v.passwordCheck.$dirty) return errors
        !this.$v.passwordCheck.sameAs && errors.push('Passwords do not match')
        !this.$v.passwordCheck.required && errors.push('password is required')
        return errors
      },
    },
  methods: {
    async submit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        try {
          let formContent = { email: this.email, password: this.password, name: this.name }
          let result = await signUp(formContent)
          if (result === 'signUp failed') {
            this.alert=true
            this.alertMsg="Signup failed, please try again later"
            return
          }
          let logData = { email: result.email, password: this.password}
          let logRes = await logIn(logData)
          if (logRes === 'login failed') {
            this.alert=true
            this.alertMsg="your profil has been created, please login"
            setTimeout(() => this.alert=false, 4000)
            return
          }
          localStorage.token = logRes.token
          localStorage.email = logRes.email
          this.$store.dispatch('Auth/LOGIN', { token: logRes.token, email: logRes.email })
          this.$router.push('/')
        }
        catch(error) {
            console.log(error)
        }
      }
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
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