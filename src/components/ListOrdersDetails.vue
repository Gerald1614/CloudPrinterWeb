<template>
<v-flex @click="show = !show">
    <v-card>
      <v-layout row wrap>
        <v-flex pa-1 xs12 sm5>
          <div class="listHead">
            <div class="subheading">{{ order.product }}</div>
            <p>{{ order.desc }}</p>
            <span>{{ order.pages }} pages, Qty : {{ order.count}}</span>
          </div>
          <print-job v-show="show" v-bind:order="order"></print-job>
        </v-flex>
        <v-flex pa-1 xs12 sm4>
          <div class="listHead">
            <v-badge color="red" right>
            <span slot="badge">{{ order.order.addresses.length}}</span>
            <div class="subheading">Delivery address(es)</div>
            </v-badge>
            <p>{{ order.order.shipping.method }}</p>
            <span>consignor : {{ order.order.shipping.consignor }}</span>
          </div>

      <shipping-address v-show="show" v-bind:order="order"></shipping-address>
    </v-flex>
    <v-flex pa-1 xs12 sm3>
      <div class="listHead">
        <div class="subheading">{{ order.order.id }}</div>
        <p class="grey--text">Order Number</p>
        <span>consignor : {{ order.order.shipping.consignor }}</span>
      </div>
      <v-btn small color="green darken-1" icon @click.stop="show = !show">
        <v-icon color="white">{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
      </v-btn>
      <order-client v-show="show" v-bind:order="order"></order-client>
    </v-flex>
      </v-layout>
    </v-card>

</v-flex>
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
  props: ['order'],
  data: () => ({
      show: false
    })
}
</script>
<style lang="stylus" scoped>
.v-btn {
  position: absolute
  top : 0px;
  right: 0px;
}
.listHead {
  background-color : #BBDEFB;
  padding: 5px;
}
</style>