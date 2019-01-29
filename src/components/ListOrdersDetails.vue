<template>
<v-container>
  <v-layout row wrap>
    <v-flex pa-1 xs12 sm5>
      <print-job v-bind:order="order"></print-job>
    </v-flex>
    <v-flex pa-1 xs12 sm4>
      <shipping-address v-bind:order="order"></shipping-address>
    </v-flex>
    <v-flex pa-1 xs12 sm3>
      <order-client v-bind:order="order"></order-client>
    </v-flex>

  </v-layout>
</v-container>
</template>


<script>
import ShippingAddress from './Details/ShippingAddress'
import OrderClient from './Details/OrderClient'
import PrintJob from './Details/PrintJob'

export default {
  name: 'ListOrdersDetails',
   components: {
    ShippingAddress,
    OrderClient,
    PrintJob
  },
  props: ['order']
}
</script>
