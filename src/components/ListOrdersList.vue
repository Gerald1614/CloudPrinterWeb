<template>
  <v-card>
    <v-card-title>
      Current Orders
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
      <td class="text-xs">{{ props.item.order.date | date }}</td>
      <td class="text-xs">{{ props.item.order.priority | date }}</td>
      <td class="text-xs">{{ props.item.count }}</td>
      <td v-if="props.item.status" class="text-xs">{{ props.item.status.type }}</td>
      <td v-else class="text-xs">New Order</td>
      <td v-if="props.item.status" class="text-xs"><span><v-icon color="green darken-2" v-if="props.item.status.signalSent">mail_outline</v-icon><v-icon color="red darken-2" v-else>unsubscribe</v-icon> {{  props.item.status.datetime | date}}</span></td>
      <td v-else class="text-xs">-</td>
      <td class="justify-center layout px-0">
          <v-icon color="blue darken-2" @click.stop="nextStep(props.item, props.item.status.type)">skip_next</v-icon>
          <v-icon color="orange darken-2" @click.stop="nextStep(props.item, 'ItemError')">error</v-icon>
          <v-icon color="red darken-2" @click.stop="nextStep(props.item, 'ItemCanceled')">cancel</v-icon>
        </td>
      </tr>
    </template>
          <template slot="expand" slot-scope="props">
        <v-card flat>
          <v-card-text>{{ props.item.id}}</v-card-text>
        </v-card>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
  </v-data-table>

   <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <p class="headline">Confirm to Cloud Printer</p>
          </v-card-title>
          <v-card-text>
            <p class="title"> OrderItem # : {{ signal.id }}</p>
            <v-container grid-list-md>
              <v-layout align-center>
                <v-flex xs12 sm6 md4>
                  <span class="subheading">{{ signal.status.type }}</span>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-progress-linear height="20" :indeterminate="true"></v-progress-linear>
                  <!-- <v-icon large color="green darken-4">label</v-icon> -->
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <span class="subheading">{{nextAction(signal.status.type)}}</span>
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
import ListOrdersDetail from './ListOrdersDetail'

export default {
  components: {
    ListOrdersDetail
  },
  name: 'ListOrdersList',
  data () {
    return {
      signal: {
        'id': '',
        'status': {
          'type': '',
        },
      },
      dialog: false,
      steps: ['ItemRegistered', 'ItemProduce', 'ItemProduced', 'ItemPacked', 'ItemShipped'],
      expand: false,
      search: '',
      selected: [],
       headers: [
          {
            text: 'ItemOrder #',
            align: 'center',
            sortable: false,
            value: 'id'
          },
          { text: 'Received', value: 'order.date' },
          { text: 'Due date', value: 'order.priority' },
          { text: 'Qty', value: 'count' },
          { text: 'Status', value: 'status.type' },
          { text: 'last activity', value: 'status.datetime' },
          { text: 'Action', value: 'Action', sortable: false }
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
    return this.$store.getters['Orders/getOrders']
    }
    
  },
  methods: {
    nextAction(currentStatus){
      return this.steps[this.steps.findIndex(k => k===currentStatus)+1]
    },

    nextStep (item, step) {
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
