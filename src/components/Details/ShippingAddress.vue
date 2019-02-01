<template>
<v-flex>
  <v-card class="mt-2" v-for="address in order.order.addresses" :key="address.zip">
    <v-card-text class="pa-1" primary-title>
      <v-flex xs12>
      <v-text-field
        label="Company"
        readonly
        :value="address.company"
      ></v-text-field>
      </v-flex>
      <v-flex xs12>
      <v-text-field
        label="email"
        readonly
        :value="address.email"
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        label="Street"
        readonly
        :value="address.street1"
      ></v-text-field>
    </v-flex>
    <v-layout justify-space-between row>
    <v-flex xs12 sm5>
      <v-text-field
        label="ZIP"
        readonly
        :value="address.zip"
      ></v-text-field>
    </v-flex>
    <v-flex xs12 sm5>
      <v-text-field
        label="city"
        readonly
        :value="address.city"
      ></v-text-field>
    </v-flex>
    </v-layout>
    <v-layout justify-space-between row>
    <v-flex xs12 sm5>
      <v-text-field
        label="state"
        readonly
        :value="address.state"
      ></v-text-field>
    </v-flex>
    <v-flex xs12 sm5>
      <v-text-field
        label="country"
        readonly
        :value="address.country"
      ></v-text-field>
    </v-flex>
    </v-layout>
    </v-card-text>
  </v-card>
</v-flex>
      
</template>

<script>
  export default {
    name: 'ShippingAddress',
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
</style>
