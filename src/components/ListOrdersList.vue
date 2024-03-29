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
      :expand="expand"
    >
      <template v-slot:items="props">
      <tr @click="props.expanded = !props.expanded">
      <td class="px-2" v-bind:style="{ color: props.item.reorder_cause ? 'red' : 'black'}">
        {{ props.item.id }}
        <v-chip v-if="props.item.reorder_cause || props.item.error_download" outline small color="red">
          <v-icon left>report_problem</v-icon>
          <span v-if="props.item.reorder_cause">REORDER</span>
          <span v-if="props.item.error_download">Received errors</span>
        </v-chip>
      </td>
      <td class="text-xs px-2">{{ props.item.title }}</td>
      <td class="text-xs px-2">{{ props.item.order.date | date }}</td>
      <td class="text-xs px-2">{{ props.item.order.dueDate | date }}</td>
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

  <dialog-error v-bind:item="signal" v-show="dialogError"></dialog-error>
  <dialog-cancel v-bind:item="signal" v-show="dialogCancel"></dialog-cancel>
  <dialog-shipping v-bind:item="signal" v-show="dialogShipping"></dialog-shipping>
  <dialog-default v-bind:item="signal" v-show="dialogDefault"></dialog-default>
  </v-card>
</template>

<script>
import ListOrdersDetails from './ListOrdersDetails'
import { getOrders } from '../utilities/fetchData.js'
import DialogError from './DialogBox/DialogError'
import DialogCancel from './DialogBox/DialogCancel'
import DialogShipping from './DialogBox/DialogShipping'
import DialogDefault from './DialogBox/DialogDefault'
import EditOrderItem from './EditOrderItem'

export default {
  components: {
    ListOrdersDetails,
    EditOrderItem,
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
      editOrder: false,
      dialogError: false,
      dialogCancel: false,
      dialogShipping: false,
      dialogDefault: false,
      steps: ['ItemRegistered', 'ItemProduce', 'ItemProduced', 'ItemPacked', 'ItemShipped'],
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
  beforeRouteUpdate (to, from, next) {
      getOrders();

    next();
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
      this.$refs.clearEdit.clear()
      this.editOrder=false
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
.cancel {
  position: relative
  left: 20px
}

</style>
