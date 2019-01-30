<template>
   <v-dialog v-model="dialog" max-width="500px">
     <v-form class="form" @submit.prevent="submit">
        <v-card>
          <v-card-title>
            <p class="headline light-blue--text text--darken-4">Confirm to Cloud Printer</p>
          </v-card-title>
          <v-card-text>
            <p class="title"> OrderItem # : {{ item.id }}</p>
            <v-container grid-list-md>
              <v-layout align-center>
                <v-flex xs12 sm6 md4>
                  <span class="subheading">{{ item.status ? item.status.type : 'new Order'  }}</span>
                </v-flex>
                <v-layout xs12 sm6 md4 row>
                  <v-icon large color="blue darken-3">label</v-icon>
                  <v-progress-linear height="20" :indeterminate="true"></v-progress-linear>
                  <v-icon large color="blue darken-3">label</v-icon>
                </v-layout>
                <v-flex xs12 sm6 md4>
                  <span class="subheading">{{item.nextAction}}</span>
                </v-flex>
              </v-layout>
              <v-layout align-center justify-space-around>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    label="tracking" 
                    v-model="item.tracking" 
                    :error-messages="causeErrors"
                    required
                    @input="$v.item.tracking.$touch()"
                    @blur="$v.item.tracking.$touch()"
                    class="subheading">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    label="shipping_option" 
                    v-model="item.shipping_option"
                    :error-messages="delayErrors"
                    required
                    @input="$v.item.shipping_option.$touch()"
                    @blur="$v.item.shipping_option.$touch()"
                    class="subheading">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="submit">Submit</v-btn>
          </v-card-actions>
        </v-card>
        </v-form>
      </v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'DialogShipping',
  props: ['item'],
  mixins: [validationMixin],
  validations: {
    item: {
    tracking:  {required, minLength: minLength(8)},
    shipping_option:  {required, minLength: minLength(20)},
    }
  },
  data () {
    return {
      dialog: false,
    }
  },
  watch: {
    'item.dialogShipping': function (newState, oldState) {
      if (newState === true) {
      this.dialog=true 
      }
    }
  },
  computed: {

    causeErrors () {
      const errors = []
      if (!this.$v.item.tracking.$dirty) return errors
      !this.$v.item.tracking.minLength && errors.push('tracking must be at most 8 characters long')
      !this.$v.item.tracking.required && errors.push('tracking is required.')
      return errors
    },
    delayErrors () {
      const errors = []
      if (!this.$v.item.shipping_option.$dirty) return errors
      !this.$v.item.shipping_option.minLength && errors.push('shipping_option must be at most 10 characters long')
      !this.$v.item.shipping_option.required && errors.push('shipping_option is required.')
      return errors
    }
  },
  methods: {
      close () {
        this.dialog = false
        setTimeout(() => {
          this.$v.$reset()
          this.item.tracking = ''
          this.item.shipping_option = ''
        }, 300)
      },
      async submit () {
        this.$v.$touch()
        if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
        console.log('error')
      } else {
        try {
          let formContent = { id: this.$route.params.id, profile: {telephone: this.membre.coordonnees.telephone, }}
          let result = await editProfile(formContent)
          getProfile({id: this.$route.params.id, token: localStorage.token})
          this.$router.push('/')
        }
        catch(error) {
            console.log(error)
        }
        this.close()
      }
      }
    }
}
</script>
