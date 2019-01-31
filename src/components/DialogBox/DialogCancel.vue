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
                    label="cause" 
                    v-model="item.cause" 
                    :error-messages="causeErrors"
                    required
                    @input="$v.item.cause.$touch()"
                    @blur="$v.item.cause.$touch()"
                    class="subheading">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    label="message" 
                    v-model="item.message"
                    :error-messages="delayErrors"
                    required
                    @input="$v.item.message.$touch()"
                    @blur="$v.item.message.$touch()"
                    class="subheading">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
              color="blue darken-1"
              flat
              @click="close"
            >Cancel</v-btn>
            <v-btn 
              color="blue darken-1"
              flat
              :loading="loading"
              :disabled="loading"
              @click="submit"
            >Submit</v-btn>
          </v-card-actions>
        </v-card>
        </v-form>
      </v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import { sendSignal } from '../../utilities/fetchData.js'

export default {
  name: 'DialogCancel',
  props: ['item'],
  mixins: [validationMixin],
  validations: {
    item: {
    cause:  {required, minLength: minLength(20)},
    message:  {required, minLength: minLength(10)},
    }
  },
  data () {
    return {
      dialog: false,
      loading: false
    }
  },
  watch: {
    'item.dialogCancel' : function (newState, oldState) {
      if (newState === true) {
      this.dialog=true 
      } 
    }
  },
  computed: {
    causeErrors () {
      const errors = []
      if (!this.$v.item.cause.$dirty) return errors
      !this.$v.item.cause.minLength && errors.push('cause must be at most 20 characters long')
      !this.$v.item.cause.required && errors.push('cause is required.')
      return errors
    },
    delayErrors () {
      const errors = []
      if (!this.$v.item.message.$dirty) return errors
      !this.$v.item.message.minLength && errors.push('message must be at most 10 characters long')
      !this.$v.item.message.required && errors.push('message is required.')
      return errors
    }
  },
  methods: {
      close () {
        this.dialog = false
        setTimeout(() => {
          this.$v.$reset()
          this.item.cause = ''
          this.item.message = ''
        }, 300)
      },
      async submit () {
        try {
          this.loading = true
          let formContent = { id: this.item._id, signal: this.item.nextAction, cause: this.item.cause, message: this.item.message }
          let result = await sendSignal(formContent)
          if (result) {
            this.loading=false
            this.close()
          }
        }
        catch(error) {
            console.log(error)
        }
      }
  }
}
</script>