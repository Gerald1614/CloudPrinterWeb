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
import { sendSignal } from '../../utilities/fetchData.js'

export default {
  name: 'DialogDefault',
  props: ['item'],
  data () {
    return {
      dialog: false,
      loading: false,
    }
  },
  watch: {
    'item.dialogDefault' : function (newState, oldState) {
      if (newState === true) {
      this.dialog=true 
      }
    }
  },
  methods: {
      close () {
        this.dialog = false
      },
      async submit () {
        try {
          this.loading = true
          let formContent = { id: this.item._id, signal: this.item.nextAction}
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
<style lang="stylus" scoped>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
