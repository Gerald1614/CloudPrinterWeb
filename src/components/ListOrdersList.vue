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
      <td class="px-2">
        <v-checkbox
          v-model="props.selected"
          primary
          hide-details
        ></v-checkbox>
      </td>
      <td class="px-2">{{ props.item.id }}</td>
      <td class="text-xs px-2">{{ props.item.title }}</td>
      <td class="text-xs px-2">{{ props.item.order.date | date }}</td>
      <td class="text-xs px-2">{{ props.item.order.priority | date }}</td>
      <td class="text-xs px-2">{{ props.item.count }}</td>
      <td v-if="props.item.status" class="text-xs px-2">{{ props.item.status.type }}</td>
      <td v-else class="text-xs px-2">New Order</td>
      <td v-if="props.item.status" class="text-xs px-2"><span><v-icon color="green darken-2" v-if="props.item.status.signalSent">mail_outline</v-icon><v-icon @click.stop="sendSignal(props.item)" color="red darken-2" v-else>unsubscribe</v-icon> {{  props.item.status.datetime | date}}</span></td>
      <td v-else class="text-xs px-2">-</td>
      <td class="align-center px-0">
        <v-tooltip left>
          <v-icon slot="activator" color="blue darken-2" @click.stop="nextStep(props.item , props.item.status ? props.item.status.type : 'newOrder')">skip_next</v-icon>
          <span>Notify Cloud Printer > Next Action</span>
        </v-tooltip>
        <v-tooltip left>
          <v-icon slot="activator" color="orange darken-2" @click.stop="nextStep(props.item, 'ItemError')">error</v-icon>
           <span>Signal an error to Cloud Printer</span>
        </v-tooltip>
        <v-tooltip left>
          <v-icon slot="activator" color="red darken-2" @click.stop="nextStep(props.item, 'ItemCanceled')">cancel</v-icon>
          <span>Cancel the Order</span>
        </v-tooltip>
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
  <dialog-error v-bind:item="signal" v-show="dialogError"></dialog-error>
  <dialog-cancel v-bind:item="signal" v-show="dialogCancel"></dialog-cancel>
  <dialog-shipping v-bind:item="signal" v-show="dialogShipping"></dialog-shipping>
  <dialog-default v-bind:item="signal" v-show="dialogDefault"></dialog-default>
  </v-card>
</template>

<script>
import ListOrdersDetails from './ListOrdersDetails'
import DialogError from './DialogBox/DialogError'
import DialogCancel from './DialogBox/DialogCancel'
import DialogShipping from './DialogBox/DialogShipping'
import DialogDefault from './DialogBox/DialogDefault'

export default {
  components: {
    ListOrdersDetails,
    DialogError,
    DialogCancel,
    DialogShipping,
    DialogDefault
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
      },
      dialogError: false,
      dialogCancel: false,
      dialogShipping: false,
      dialogDefault: false,
      steps: ['ItemRegistered', 'ItemProduce', 'ItemProduced', 'ItemPacked', 'ItemShipped'],
      expand: false,
      search: '',
      selected: [],
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
  computed: {
    items () {
      if (this.$route.params.liste === 'currentOrders')  {
        this.tableTitle = 'Current Orders'
        return this.$store.getters['Orders/getOrders']}
      else if (this.$route.params.liste === 'newOrders'){
        this.tableTitle = 'New Orders'
        return this.$store.getters['Orders/getNewOrders']
      } else this.$router.push('/404')
    },
  },
  methods: {
    sendSignal(item) {
      alert('send signal')
    },
    nextStep (item, step) {
      if (step ==='ItemCanceled') {
        item.dialogCancel = true
        item.nextAction = step
      } else if(step === 'ItemError') {
        item.dialogError = true
        item.nextAction = step
      }  else if (!item.hasOwnProperty('status')) {
        item.nextAction = 'ItemRegistered'
        item.dialogDefault = true
      } else if (item.status.type === 'ItemPacked') {
        item.dialogShipping = true
        item.nextAction = this.steps[this.steps.findIndex(k => k===step)+1]
      }  else if (item.status.type === 'ItemShipped') {
        this.sendSignal()
      }else {
        item.nextAction = this.steps[this.steps.findIndex(k => k===step)+1]
        item.dialogDefault = true
      }
      this.signal = Object.assign({}, item)
        setTimeout(() => {
          item.dialogError = false
          item.dialogCancel = false
          item.dialogShipping = false
          item.dialogDefault = false
          this.signal = Object.assign({}, item)
        }, 3000)
      },
    }
}
</script>
<style lang="stylus">
th {
  padding: 8px !important 
}

</style>
