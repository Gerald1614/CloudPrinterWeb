<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      :items="items"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      row
      wrap
    >
      <v-flex
        slot="item"
        slot-scope="props"
        xs12
        sm6
        md4
        lg3
      >
        <v-card color="blue-grey darken-2" >
          <v-card-title><h4 class="orange--text">{{ props.item.id }}</h4><span class="white--text caption">{{ props.item.product }}</span></v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>received</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.order.date | date }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Resquested for:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ dueDate(props.item.order.date, props.item.order.priority)| date }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Quantities</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.count }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile  v-if="props.item.status">
              <v-list-tile-content> <span>{{ props.item.status.type }}<v-icon color="green darken-2" v-if="props.item.status.signalSent">mail_outline</v-icon><v-icon color="red darken-2" v-else>unsubscribe</v-icon></span></v-list-tile-content>
                <v-list-tile-content  class="align-end"> {{  props.item.status.datetime | date}} </v-list-tile-content>
            </v-list-tile>
            <v-list-tile  v-else >
              <v-list-tile-content>New Order</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Order #</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.order.id }}</v-list-tile-content>
            </v-list-tile>
            <list-orders-detail v-bind:order="props.item"></list-orders-detail>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ListOrdersDetail from './ListOrdersDetail'

export default {
  components: {
    ListOrdersDetail
  },
  name: 'ListOrdersCards',
  data () {
    return {
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
    }
  },
  computed: {
    items () {
    return this.$store.getters['Orders/getOrders']
    }
    
  },
  methods: {
    dueDate: (orderDate, duration) => {
      const date = new Date(orderDate)
      return date.setDate(date.getDate() + parseInt(duration));
    }
  }
}
</script>
