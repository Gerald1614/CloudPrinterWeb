<template>
 <v-form 
  class="white"
  >
  <v-container>
    <h4>Status</h4>
    <v-divider class="red darken-2"></v-divider>
    <v-layout row wrap  align-center justify-space-around>
      <v-flex xs12 sm5 md4>
      <v-select
        :items="status"
        v-model="item.status.type"
        label="Status"
      ></v-select>
      </v-flex>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="item.status.datetime"
        label="Date"
      ></v-text-field>
      </v-flex>
          <v-flex xs12 sm4 md3>
      <v-checkbox
        v-model="item.status.signalSent"
        label="Signal Sent"
      ></v-checkbox>
        </v-flex>
    </v-layout>
    <v-divider class="green darken-2"></v-divider>
    <v-layout  v-if="item.status.type === 'ItemShipped'" row wrap  align-center justify-space-around>
      <v-flex xs12 sm5 md4>
      <v-text-field
        v-model="item.status.tracking"
        label="Tracking"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="item.status.shipping_option"
        label="Shipping Option"
      ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout  v-if="item.status.type === 'ItemError'" row wrap  align-center justify-space-around>
      <v-flex xs12 sm5 md4>
      <v-text-field
        v-model="item.status.cause"
        label="Cause"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="item.status.delay"
        label="Delay in hours"
      ></v-text-field>
      </v-flex>
    </v-layout>
        <v-layout  v-if="item.status.type === 'ItemCanceled'" row wrap  align-center justify-space-around>
      <v-flex xs12 sm5 md4>
      <v-select
        :items="cancelations"
        v-model="item.status.cause"
        item-text='desc'
        item-value='name'
        label="Cancelation cause"
      ></v-select>
      </v-flex>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="item.status.message"
        label="Message"
      ></v-text-field>
      </v-flex>
    </v-layout>
    <h4>Order</h4>
    <v-divider class="red darken-2"></v-divider>
    <v-layout row wrap  align-center justify-space-around>
      <v-flex xs12 sm5 md4>
      <v-text-field
        v-model="apikey"
        label="Apikey"
        required
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="orderId"
        label="Id"
        required
      ></v-text-field>
      </v-flex>
          <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="orderDate"
        label="Date"
        required
      ></v-text-field>
        </v-flex>
        <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="priority"
        label="Priority"
        required
      ></v-text-field>
      </v-flex>
    </v-layout>
    <h4>Creator</h4>
    <v-divider class="red darken-2"></v-divider>
    <v-layout row wrap align-center justify-space-around>
      <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="creatorId"
        label="Id"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="creatorName"
        label="Name"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="creatorVersion"
        label="Version"
      ></v-text-field>
      </v-flex>
          <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="creatorDate"
        label="Date"
      ></v-text-field>
      </v-flex>
    </v-layout>
    <h4>Client</h4>
    <v-divider class="red darken-2"></v-divider>
    <v-layout row wrap align-center justify-space-around>
      <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="clientId"
        label="Id"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="clientName"
        label="Name"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="clientDate"
        label="Date"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm5 md4>
      <v-text-field
        v-model="clientReference"
        label="Reference"
      ></v-text-field>
      </v-flex>
    </v-layout>
    <h4>Addresses</h4>
    <v-divider class="red darken-2"></v-divider>
    <v-container v-for="(address, index) in item.order.addresses" :key="address.zip">
      <h4>Address {{ index + 1 }} :</h4>
      <v-layout row wrap align-center justify-space-around>
      <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="address.type"
        label="Type"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="address.company"
        label="Company"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="address.name"
        label="Name"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm5 md4>
      <v-text-field
        v-model="address.street1"
        label="Street"
      ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-center justify-space-around>
      <v-flex xs12 sm2 md1>
      <v-text-field
        v-model="address.zip"
        label="Zip"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="address.city"
        label="City"
      ></v-text-field>
      </v-flex>
      <v-flex xs6 sm2 md1>
      <v-text-field
        v-model="address.country"
        label="Country"
      ></v-text-field>
      </v-flex>
      <v-flex xs6 sm2 md1>
      <v-text-field
        v-model="address.state"
        label="State"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm5 md4>
      <v-text-field
        v-model="address.email"
        label="Email"
      ></v-text-field>
      </v-flex>
    </v-layout>
    </v-container>
    <h4>Shipping</h4>
    <v-divider class="red darken-2"></v-divider>
    <v-layout row wrap align-center justify-space-around>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="item.order.shipping.method"
        label="shipping method"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="item.order.shipping.consignor"
        label="Consignor"
      ></v-text-field>
      </v-flex>
    </v-layout>
    <h4>Item</h4>
    <v-divider class="red darken-2"></v-divider>
    <v-layout row wrap align-center justify-space-around>
      <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="item.id"
        label="Item Id"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="item.count"
        label="Number of copies"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm5 md4>
      <v-text-field
        v-model="item.title"
        label="Title"
      ></v-text-field>
      </v-flex>
          <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="item.product"
        label="Product"
      ></v-text-field>
      </v-flex>
    </v-layout>
     <v-layout row wrap align-center justify-space-around>
      <v-flex xs12 sm6 md5>
      <v-text-field
        v-model="item.desc"
        label="Item description"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="item.pages"
        label="Pages"
      ></v-text-field>
      </v-flex>
    </v-layout>
   <h4>Files</h4>
    <v-divider class="red darken-2"></v-divider>
    <v-container v-for="(file, index) in item.files" :key="index">
      <h4>File {{ index + 1 }} :</h4>
      <v-layout row wrap align-center justify-space-around>
      <v-flex xs12 sm2 md1>
      <v-text-field
        v-model="file.type"
        label="Type"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm2 md1>
      <v-text-field
        v-model="file.format"
        label="Format"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm5 md4>
      <v-text-field
        v-model="file.url"
        label="File on Cloud Printer"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm5 md4>
      <v-text-field
        v-model="file.gcpUrl"
        label="File on GCP"
      ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-center justify-space-around>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="item.options[index].option"
        label="Option"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="item.options[index].desc"
        label="Description"
      ></v-text-field>
      </v-flex>
      <v-flex xs6 sm2 md1>
      <v-text-field
        v-model="item.options[index].count"
        label="Count"
      ></v-text-field>
      </v-flex>
    </v-layout>
    </v-container>

    <v-divider class="red darken-2"></v-divider>
     <v-layout row wrap align-center justify-space-around v-if="item.reorder_cause">
    <h4>Re-order</h4>
      <v-flex xs12 sm4 md3>
    <v-text-field
      label="Re-order Cause"
      v-model="item.reorder_cause"
    ></v-text-field>
    </v-flex>
    <v-flex xs12 sm4 md3>
    <v-text-field
      label="Re-order Description"
      v-model="item.reorder_desc"
    ></v-text-field>
  </v-flex>
      <v-flex xs12 sm4 md3>
    <v-text-field
      label="reference to previous Item"
      v-model="item.reorder_item_reference"
    ></v-text-field>
  </v-flex>
     </v-layout>
   
    <v-btn absolute right class="mr-3" dark color="blue darken-2" @click="submit">submit</v-btn>

  </v-container>
  </v-form>
</template>
<script>
import cancellationCauses from '../utilities/cancellationCauses.json'

export default {
  name: 'EditOrderItem',
  components: {  
  },
  props: ['item'],

  data() {
    return {
      dialog: false,
      status: ['ItemRegistered', 'ItemShipped', 'ItemError', 'ItemPacked', 'ItemProduced', 'ItemProduce', 'ItemCanceled'],
      apikey: this.item.order.apikey,
      orderId: this.item.order.id,
      orderDate: this.item.order.date,
      priority: this.item.order.priority,
      creatorId: this.item.order.creator.id,
      creatorName: this.item.order.creator.name,
      creatorVersion: this.item.order.creator.version,
      creatorDate: this.item.order.creator.date,
      clientId: this.item.order.client.id,
      clientName: this.item.order.client.name,
      clientReference: this.item.order.client.reference,
      clientDate: this.item.order.client.date,
      
    }
  },
  computed: {
    cancelations () {
      return cancellationCauses.causes
    }
  },
  methods: {
         submit () {
      },
      clear () {
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = false
      }
  }
}
</script>
