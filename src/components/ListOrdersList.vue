<template>
  <v-card>
    <v-card-title class="display-3">
      {{ tableTitle }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :search="search"
      :items="items"
      select-all
      item-key="id"
      class="elevation-1"
    >
      <template
        slot="items"
        slot-scope="props"
      >
      <tr @click="props.expanded = !props.expanded">
      <td>
        <v-checkbox
          v-model="props.selected"
          primary
          hide-details
        ></v-checkbox>
      </td>
      <td>{{ props.item.id }}</td>
      <td class="text-xs">{{ props.item.title }}</td>
      <td class="text-xs">{{ props.item.order.date | date }}</td>
      <td class="text-xs">{{ props.item.order.priority | date }}</td>
      <td class="text-xs">{{ props.item.count }}</td>
      <td v-if="props.item.status" class="text-xs">{{ props.item.status.type }}</td>
      <td v-else class="text-xs">New Order</td>
      <td v-if="props.item.status" class="text-xs"><span><v-icon color="green darken-2" v-if="props.item.status.signalSent">mail_outline</v-icon><v-icon color="red darken-2" v-else>unsubscribe</v-icon> {{  props.item.status.datetime | date}}</span></td>
      <td v-else class="text-xs">-</td>
      <td class="justify-center layout px-0">
          <v-icon color="blue darken-2" @click.stop="nextStep(props.item , props.item.status ? props.item.status.type : 'newOrder')">skip_next</v-icon>
          <v-icon color="orange darken-2" @click.stop="nextStep(props.item, 'ItemError')">error</v-icon>
          <v-icon color="red darken-2" @click.stop="nextStep(props.item, 'ItemCanceled')">cancel</v-icon>
        </td>
      </tr>
    </template>
          <template slot="expand" slot-scope="props">
        <v-card flat>
          <list-orders-details v-bind:order="props.item"></list-orders-details>
        </v-card>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
  </v-data-table>

   <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <p class="headline light-blue--text text--darken-4">Confirm to Cloud Printer</p>
          </v-card-title>
          <v-card-text>
            <p class="title"> OrderItem # : {{ signal.id }}</p>
            <v-container grid-list-md>
              <v-layout align-center>
                <v-flex xs12 sm6 md4>
                  <span class="subheading">{{ signal.status ? signal.status.type : 'new Order'  }}</span>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-progress-linear height="20" :indeterminate="true"></v-progress-linear>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <span class="subheading">{{signal.nextAction}}</span>
                </v-flex>
              </v-layout>
               <v-layout align-center v-if="signal.nextAction === 'ItemShipped'">
                <v-flex xs12 sm6 md4>
                  <v-text-field label="tracking code" v-model="signal.tracking" class="subheading"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="shipping_option" v-model="signal.shipping_option" class="subheading"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import ListOrdersDetails from './ListOrdersDetails'

export default {
  components: {
    ListOrdersDetails
  },
  name: 'ListOrdersList',
  data () {
    return {
      tableTitle: '',
      signal: {
        'id': '',
        'status': {
          'type': '',
        },
        nextAction: ''
      },
      dialog: false,
      steps: ['ItemRegistered', 'ItemProduce', 'ItemProduced', 'ItemPacked', 'ItemShipped'],
      expand: false,
      search: '',
      selected: [],
       headers: [
          {
            text: 'ItemOrder #',
            align: 'left',
            sortable: false,
            value: 'id'
          },
          { text: 'Title', align: 'left', value: 'order.title' },
          { text: 'Received', align: 'left', value: 'order.date' },
          { text: 'Due date', align: 'left', value: 'order.priority' },
          { text: 'Qty', align: 'left', value: 'count' },
          { text: 'Status', align: 'left', value: 'status.type' },
          { text: 'last activity', align: 'left', value: 'status.datetime' },
          { text: 'Action', align: 'left', value: 'Action', sortable: false }
        ],
    }
  },
  watch: {
      dialog (val) {
        val || this.close()
      }
    },
  computed: {
    items () {
      console.log(this.$route.params.liste)
      if (this.$route.params.liste === 'currentOrders')  {
        this.tableTitle = 'Current Orders'
        return this.$store.getters['Orders/getOrders']}
      else if (this.$route.params.liste === 'newOrders'){
        this.tableTitle = 'New Orders'
        return this.$store.getters['Orders/getNewOrders']
      } else this.$router.push('/404')
    }
  },
  methods: {
    nextStep (item, step) {
      if (step ==='ItemCanceled' || step ==='ItemError') {
        console.log('cacnel or erro')
        item.nextAction = step
      } else if(step === 'newOrder') {
        console.log('neworder')
        item.nextAction = 'ItemRegistered'
      } else if (item.status.type === 'ItemShipped') {
        console.log('resend signal')
      }  else {
        console.log('workflow')
        item.nextAction = this.steps[this.steps.findIndex(k => k===step)+1]
      }
        this.signal = item
        this.dialog = true
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          // this.editedItem = Object.assign({}, this.defaultItem)
          // this.editedIndex = -1
        }, 300)
      },

      save () {
        // if (this.editedIndex > -1) {
        //   Object.assign(this.desserts[this.editedIndex], this.editedItem)
        // } else {
        //   this.desserts.push(this.editedItem)
        // }
        this.close()
      }
    }
}
</script>
<style lang="stylus">


</style>
