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
              <v-layout row>
                  <v-select
                    v-model="select"
                    :items="causes"
                    item-text='desc'
                    item-value='name'
                    outline
                    :error-messages="causeErrors"
                    required
                    @change="$v.select.$touch()"
                    @blur="$v.select.$touch()"
                    class="body-2">
                  </v-select>
                </v-layout>
                <v-layout row>
                  <v-text-field
                    label="message" 
                    v-model="message"
                    :error-messages="messageErrors"
                    required
                    @input="$v.message.$touch()"
                    @blur="$v.message.$touch()"
                    class="subheading">
                  </v-text-field>
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
import cancellationCauses from '../../utilities/cancellationCauses.json'

export default {
  name: 'DialogCancel',
  props: ['item'],
  mixins: [validationMixin],
  validations: {
    select: { required },
    message: { required, minLength: minLength(10) }
  },
  data () {
    return {
      dialog: false,
      loading: false,
      select: null,
      message: ''
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
    causes () {
      return cancellationCauses.causes
    },
    causeErrors () {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('cause is required.')
      return errors
    },
    messageErrors () {
      const errors = []
      if (!this.$v.message.$dirty) return errors
      !this.$v.message.minLength && errors.push('minimum 10 characters long')
      !this.$v.message.required && errors.push('message is required.')
      return errors
    }
  },
  methods: {
      close () {
        this.dialog = false
        setTimeout(() => {
          this.$v.$reset()
          this.select = null
          this.message = ''
        }, 300)
      },
      async submit () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          try {
            this.loading = true
            let formContent = { id: this.item._id, signal: this.item.nextAction, cause: this.select, message: this.message }
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
}
</script>
