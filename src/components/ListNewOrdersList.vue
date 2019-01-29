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
      <td class="text-xs">{{ dueDate(props.item.order.date, props.item.order.priority)| date }}</td>
      <td class="text-xs">{{ props.item.count }}</td>
      <td v-if="props.item.status" class="text-xs">{{ props.item.status.type }}</td>
      <td v-else class="text-xs">New Order</td>
      <td v-if="props.item.status" class="text-xs"><span><v-icon color="green darken-2" v-if="props.item.status.signalSent">mail_outline</v-icon><v-icon color="red darken-2" v-else>unsubscribe</v-icon> {{  props.item.status.datetime | date}}</span></td>
      <td v-else class="text-xs">-</td>
      <td class="justify-center layout px-0">
          <v-icon color="blue darken-2" @click="nextStep(props.item)">skip_next</v-icon>
          <v-icon color="orange darken-2" @click="notifyError(props.item)">error</v-icon>
          <v-icon color="red darken-2" @click="cancelOrder(props.item)">cancel</v-icon>
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
      
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import ListOrdersDetail from './ListOrdersDetail'

export default {
  components: {
    ListOrdersDetail
  },
  name: 'ListNewOrdersList',
  data () {
    return {
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
          { text: 'Due date', value: 'dueDate(props.item.order.date, props.item.order.priority)' },
          { text: 'Qty', value: 'count' },
          { text: 'Status', value: 'status.type' },
          { text: 'last activity', value: 'status.datetime' },
          { text: 'Action', value: 'Action', sortable: false }
        ],
    }
  },
  computed: {
    items () {
    return this.$store.getters['Orders/getNewOrders']
    }
    
  },
  methods: {
    dueDate: (orderDate, duration) => {
      const date = new Date(orderDate)
      return date.setDate(date.getDate() + parseInt(duration));
    },
    nextStep(order) {},
    notifyError(order) {},
    cancelOrder(order) {}
  }
}
</script>
