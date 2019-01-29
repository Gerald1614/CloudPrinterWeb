<template>
      <v-list dense>
      <v-list-group>
        <v-list-tile slot="activator">

          <v-list-tile-title>{{ order.title }}</v-list-tile-title>
          </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>pages</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ order.pages}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>{{ order.desc }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>Shipping</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ order.order.shipping.method }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="address in order.order.addresses" :key="address.zip">
          <v-list-tile-content >Delivery</v-list-tile-content>
          <v-list-tile-content class="align-end">{{ address.city }}, {{ address.state }}, {{ address.country }}</v-list-tile-content>
        </v-list-tile>
     </v-list-group>
      </v-list>
</template>


<script>
export default {
  name: 'ListOrdersDetail',
  props: ['order']
}
</script>
