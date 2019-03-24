<template>
 <v-form 
  @submit.prevent
  ref="form"
  class="white"
  >
  <v-container>
    <h4>Status</h4>
    <v-divider class="red darken-2"></v-divider>
    <v-layout row wrap  align-center justify-start>
      <v-flex xs12 sm4 md3>
      <v-select
        :items="status"
        v-model="orderItem.itemStatus.type"
        outline
        label="Status"
      ></v-select>
      </v-flex>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="orderItem.itemStatus.datetime"
        outline
        label="Date"
      ></v-text-field>
      </v-flex>
          <v-flex xs12 sm3 md2>
      <v-checkbox
        v-model="orderItem.itemStatus.signalSent"
        outline
        label="Signal Sent"
      ></v-checkbox>
        </v-flex>
    </v-layout>
    <v-divider class="green darken-2"></v-divider>
    <v-layout  v-if="orderItem.itemStatus.type === 'ItemShipped'" row wrap  align-center justify-start>
      <v-flex xs12 sm5 md4>
      <v-text-field
        v-model="orderItem.itemStatus.tracking"
        outline
        label="Tracking"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm5 md4>
      <v-text-field
        v-model="orderItem.itemStatus.shipping_option"
        outline
        label="Shipping Option"
      ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout  v-if="orderItem.itemStatus.type === 'ItemError'" row wrap  align-center justify-start>
      <v-flex xs12 sm5 md4>
      <v-text-field
        v-model="orderItem.itemStatus.cause"
        outline
        label="Cause"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm5 md4>
      <v-text-field
        v-model="orderItem.itemStatus.delay"
        outline
        label="Delay in hours"
      ></v-text-field>
      </v-flex>
    </v-layout>
        <v-layout  v-if="orderItem.itemStatus.type === 'ItemCanceled'" row wrap  align-center justify-start>
      <v-flex xs12 sm5 md4>
      <v-select
        :items="cancelations"
        v-model="orderItem.itemStatus.cause"
        outline
        item-text='desc'
        item-value='name'
        label="Cancelation cause"
      ></v-select>
      </v-flex>
      <v-flex xs12 sm5 md4>
      <v-text-field
        v-model="orderItem.itemStatus.message"
        outline
        label="Message"
      ></v-text-field>
      </v-flex>
    </v-layout>
    <h4>Order</h4>
    <v-divider class="red darken-2"></v-divider>
    <v-layout row wrap  align-center justify-start>
      <v-flex xs12 sm5 md4>
      <v-text-field
        v-model="order.apikey"
        label="Apikey"
        outline
        required
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="order.orderId"
        label="Id"
        outline
        required
      ></v-text-field>
      </v-flex>
          <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="order.orderDate"
        label="Date"
        outline
        required
      ></v-text-field>
        </v-flex>
        <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="order.priority"
        label="Priority"
        outline
        required
      ></v-text-field>
      </v-flex>
    </v-layout>
    <h4>Creator</h4>
    <v-divider class="red darken-2"></v-divider>
    <v-layout row wrap align-center justify-start>
      <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="order.creatorId"
        outline
        label="Id"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="order.creatorName"
        outline
        label="Name"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="order.creatorVersion"
        outline
        label="Version"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="order.creatorDate"
        outline
        label="Date"
      ></v-text-field>
      </v-flex>
    </v-layout>
    <h4>Client</h4>
    <v-divider class="red darken-2"></v-divider>
    <v-layout row wrap align-center justify-start>
      <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="order.clientId"
        outline
        label="Id"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="order.clientName"
        outline
        label="Name"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="order.clientDate"
        outline
        label="Date"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm5 md4>
      <v-text-field
        v-model="order.clientReference"
        outline
        label="Reference"
      ></v-text-field>
      </v-flex>
    </v-layout>
    <h4>Addresses</h4>
    <v-divider class="red darken-2"></v-divider>
    <v-container v-for="(address, index) in order.addresses" :key="address.zip">
      <h4>Address {{ index + 1 }} :</h4>
      <v-layout row wrap align-center justify-start>
      <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="address.type"
        outline
        label="Type"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="address.company"
        outline
        label="Company"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="address.name"
        outline
        label="Name"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm5 md4>
      <v-text-field
        v-model="address.street1"
        outline
        label="Street"
      ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-center justify-start>
      <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="address.zip"
        outline
        label="Zip"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="address.city"
        outline
        label="City"
      ></v-text-field>
      </v-flex>
      <v-flex xs6 sm3 md2>
      <v-text-field
        v-model="address.country"
        outline
        label="Country"
      ></v-text-field>
      </v-flex>
      <v-flex xs6 sm3 md2>
      <v-text-field
        v-model="address.state"
        outline
        label="State"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm5 md4>
      <v-text-field
        v-model="address.email"
        outline
        label="Email"
      ></v-text-field>
      </v-flex>
    </v-layout>
    </v-container>
    <h4>Shipping</h4>
    <v-divider class="red darken-2"></v-divider>
    <v-layout row wrap align-center justify-start>
      <v-flex xs12 sm5 md4>
      <v-text-field
        v-model="order.shippingMethod"
        outline
        label="shipping method"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm5 md4>
      <v-text-field
        v-model="order.shippingConsignor"
        outline
        label="Consignor"
      ></v-text-field>
      </v-flex>
    </v-layout>
    <h4>Item</h4>
    <v-divider class="red darken-2"></v-divider>
    <v-layout row wrap align-center justify-start>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="orderItem.itemId"
        outline
        label="Item Id"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="orderItem.itemCount"
        outline
        label="Number of copies"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md5>
      <v-text-field
        v-model="orderItem.itemTitle"
        outline
        label="Title"
      ></v-text-field>
      </v-flex>

    </v-layout>
     <v-layout row wrap align-center justify-start>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="orderItem.itemProduct"
        outline
        label="Product"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md5>
      <v-text-field
        v-model="orderItem.itemDesc"
        outline
        label="Item description"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="orderItem.itemPages"
        outline
        label="Pages"
      ></v-text-field>
      </v-flex>
    </v-layout>
   <h4>Files</h4>
    <v-divider class="red darken-2"></v-divider>
    <v-container v-for="(file, index) in orderItem.itemFiles" :key="index">
      <h4>File {{ index + 1 }} :</h4>
      <v-layout row wrap align-center justify-start>
      <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="file.type"
        outline
        label="Type"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="file.format"
        outline
        label="Format"
      ></v-text-field>
      </v-flex>
       <v-flex xs6 sm3 md2>
      <v-text-field
        v-model="orderItem.itemOptions[index].count"
        outline
        label="Count"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm7 md6>
      <v-text-field
        v-model="file.gcpUrl"
        outline
        label="File on GCP"
      ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-center justify-start>
      <v-flex xs12 sm3 md2>
      <v-text-field
        v-model="orderItem.itemOptions[index].option"
        outline
        label="Option"
      ></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md3>
      <v-text-field
        v-model="orderItem.itemOptions[index].desc"
        outline
        label="Description"
      ></v-text-field>
      </v-flex>

      <v-flex xs12 sm7 md6>
      <v-text-field
        v-model="file.url"
        outline
        label="File on Cloud Printer"
      ></v-text-field>
      </v-flex>
    </v-layout>
    </v-container>

    <v-divider class="red darken-2"></v-divider>
     <v-layout row wrap align-center justify-start v-if="orderItem.itemReorderCause">
    <h4>Re-order</h4>
      <v-flex xs12 sm4 md3>
    <v-text-field
      label="Re-order Cause"
      v-model="orderItem.itemReorderCause"
        outline
    ></v-text-field>
    </v-flex>
    <v-flex xs12 sm4 md3>
    <v-text-field
      label="Re-order Description"
      v-model="orderItem.itemReorderDesc"
        outline
    ></v-text-field>
    </v-flex>
        <v-flex xs12 sm4 md3>
      <v-text-field
        label="reference to previous Item"
        v-model="orderItem.itemReorderItemReference"
        outline
      ></v-text-field>
    </v-flex>
    </v-layout>
  </v-container>
  <v-btn dark color="blue darken-2" @click="submit">submit</v-btn>
  </v-form>
</template>
<script>
import cancellationCauses from '../utilities/cancellationCauses.json'
import { updateItem } from '../utilities/fetchData.js'
export default {
  name: 'EditOrderItem',
  components: {
  },
  props: ['itemChild'],
  data() {
    return {
      dialog: false,
      status: ['ItemRegistered', 'ItemShipped', 'ItemError', 'ItemPacked', 'ItemProduced', 'ItemProduce', 'ItemCanceled'],
      order: {
        apikey: this.itemChild.order.apikey,
        orderId: this.itemChild.order.id,
        orderDate: this.itemChild.order.date,
        priority: this.itemChild.order.priority,
        creatorId: this.itemChild.order.creator.id,
        creatorName: this.itemChild.order.creator.name,
        creatorVersion: this.itemChild.order.creator.version,
        creatorDate: this.itemChild.order.creator.date,
        clientId: this.itemChild.order.client.id,
        clientName: this.itemChild.order.client.name,
        clientReference: this.itemChild.order.client.reference,
        clientDate: this.itemChild.order.client.date,
        addresses: this.itemChild.order.addresses,
        shippingMethod: this.itemChild.order.shipping.method,
        shippingConsignor: this.itemChild.order.shipping.consignor
      },
      orderItem: {
        itemId: this.itemChild.id,
        itemFiles: this.itemChild.files,
        itemOptions: this.itemChild.options,
        itemCount: this.itemChild.count,
        itemTitle: this.itemChild.title,
        itemProduct: this.itemChild.product,
        itemDesc: this.itemChild.desc,
        itemPages: this.itemChild.pages,
        itemReorderCause: this.itemChild.reorder_cause,
        itemReorderDesc: this.itemChild.reorder_desc,
        itemReorderItemReference: this.itemChild.reorder_item_reference,
        itemStatus: this.itemChild.status
      }
    }
  },
  
  computed: {
    cancelations () {
      return cancellationCauses.causes
    }
  },
  methods: {
         submit () {
           const formContent = {
            order_id: this.itemChild.order._id,
            item_id: this.itemChild._id,
            order: this.order,
            item: this.orderItem, 
            }
           console.log(formContent)
      },
      clear () {
        this.$refs.form.reset()

      }
  },
  
}
 
</script>
<style lang="stylus" scoped>
.v-btn {
  position: relative
  bottom: -48px
  left: 120px
}
</style>

