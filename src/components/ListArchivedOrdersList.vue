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
      :headers="headers"
      :search="search"
      :items="items"
      item-key="_id"
      class="elevation-1"
    >
      <template
        slot="items"
        slot-scope="props"
      >
      <tr @click="props.expanded = !props.expanded">
      <td class="px-2">{{ props.item.id }}</td>
      <td class="text-xs px-2">{{ props.item.title }}</td>
      <td class="text-xs px-2">{{ props.item.order.date | date }}</td>
      <td class="text-xs px-2">{{ props.item.order.dueDate | date }}</td>
      <td class="text-xs px-2">{{ props.item.count }}</td>
      <td v-if="props.item.status" class="text-xs px-2">{{ props.item.status.type }}</td>
      <td v-else class="text-xs px-2">New Order</td>
      <td v-if="props.item.status" class="text-xs px-2"><span><v-icon color="green darken-2" v-if="props.item.status.signalSent">mail_outline</v-icon><v-icon @click.stop="sendSignal(props.item)" color="red darken-2" v-else>unsubscribe</v-icon> {{  props.item.status.datetime | date}}</span></td>
      <td v-else class="text-xs px-2">-</td>
      <td class="align-center px-0">
          <v-icon slot="activator" color="blue darken-2" @click.stop="editOrder(props.item)">edit</v-icon>
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
  </v-card>
</template>

<script>
import ListOrdersDetails from './ListOrdersDetails'
import { getArchivedOrders } from '../utilities/fetchData.js'

export default {
  components: {
    ListOrdersDetails
  },
  name: 'ListArchivedOrdersList',
  data () {
    return {
      tableTitle: 'Archived and Cancelled orders',
      signal: {
        'id': '',
        'status': {
          'type': '',
        },
      },
      expand: false,
      search: '',
       headers: [
          { text: 'ItemOrder #', align: 'left', sortable: false, value: 'id' },
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
    mounted: () => {
    getArchivedOrders()
  },
  computed: {
    items () {
        return this.$store.getters['Orders/getArchivedOrders']
    },
  },
  methods: {
    sendSignal(item) {
      alert('send signal')
    },
    editOrder (item) {
      alert('edit order')
      },
    }
}
</script>
<style lang="stylus">
th {
  padding: 8px !important 
}
</style>
