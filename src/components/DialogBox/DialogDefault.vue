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
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="submit">Submit</v-btn>
          </v-card-actions>
        </v-card>
        </v-form>
      </v-dialog>
</template>

<script>

export default {
  name: 'DialogDefault',
  props: ['item'],
  data () {
    return {
      dialog: false,
    }
  },
  watch: {
    'item.dialogDefault' : function (newState, oldState) {
      if (newState === true) {
      this.dialog=true 
      }
    }
  },
  computed: {

  },
  methods: {
      close () {
        this.dialog = false

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
