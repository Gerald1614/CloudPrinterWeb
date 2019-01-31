<template>
      <v-card>
        <v-card-title >
          <div>
            <v-badge color="red" right>
            <span slot="badge">{{ order.order.addresses.length}}</span>
            <div class="title">Delivery address(es)</div>
            </v-badge>
            <p>{{ order.order.shipping.method }}</p>
            <span>consignor : {{ order.order.shipping.consignor }}</span>
          </div>
          <v-spacer></v-spacer>
          <v-btn small color="green darken-1" icon @click="show = !show">
            <v-icon color="white" >{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text  v-show="show" v-for="address in order.order.addresses" :key="address.zip" primary-title>
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
         <v-flex xs12>
          <v-text-field
            label="ZIP"
            readonly
            :value="address.zip"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="city"
            readonly
            :value="address.city"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="state"
            readonly
            :value="address.state"
          ></v-text-field>
        </v-flex>
        <v-divider color="red"></v-divider>
        </v-card-text>
      </v-card>
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
