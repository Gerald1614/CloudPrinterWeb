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
      :items="orderItems"
      item-key="_id"
      class="elevation-1"
      :expand="expand"
    >
      <template v-slot:items="props">
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
        </tr>
    </template>
      <template v-slot:expand="props">
        <v-card flat>
          <list-orders-details v-bind:order="props.item"></list-orders-details>
        </v-card>
         <v-btn
          @click.stop="showDialog()"
          color="red darken-2"
          fixed
          dark
          small
          bottom
          right
          fab
        >
        <v-icon>edit</v-icon>
        </v-btn>
        <v-dialog v-model="editOrder" persistent>
            <edit-order-item ref="clearEdit" v-bind:itemChild="props.item"></edit-order-item>
            <v-btn class="cancel" dark color="red darken-2" @click="cancelEdit()">cancel</v-btn>
        </v-dialog>
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
import EditOrderItem from './EditOrderItem'

export default {
  components: {
    ListOrdersDetails,
    EditOrderItem,
  },
  name: 'ListArchivedOrdersList',
  data () {
    return {
      // refreshKey: 0,
      editOrder: false,
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
          { text: 'last activity', align: 'left', value: 'status.datetime' }
        ],
    }
  },
  mounted: () => {
    getArchivedOrders()
  },
  computed: {
    orderItems () {
        return this.$store.getters['Orders/getArchivedOrders']
    },
  },
  methods: {
    sendSignal(item) {
      alert('send signal')
    },
    showDialog() {
      this.editOrder=true;
    //   this.forceRerender();
    // },
    // forceRerender() {
    //   this.refreshKey +=1;
    },
    cancelEdit() {
      this.editOrder=false
      this.$refs.clearEdit.clear()
    }
  },
}
</script>
<style lang="stylus">
th {
  padding: 8px !important 
}
.cancel {
  position: relative
  left: 20px
}
</style>
