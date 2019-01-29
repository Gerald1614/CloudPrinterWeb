<template>
      <v-card>
        <v-card-title >
          <div>
            <div class="title">{{ order.order.id }}</div>
            <p class="grey--text">Order Number</p>
            <span>consignor : {{ order.order.shipping.consignor }}</span>
          </div>
          <v-spacer></v-spacer>
          <v-btn small color="green darken-1" icon @click="show = !show">
            <v-icon color="white">{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text  v-show="show" primary-title>
          <v-flex xs12>
          <v-text-field
            label="Client Name"
            readonly
            :value="order.order.client.name"
          ></v-text-field>
          </v-flex>
          <v-flex xs12>
          <v-text-field
            label="Client Reference"
            readonly
            :value="order.order.client.reference"
          ></v-text-field>
        </v-flex>
        <div v-for="file, index in order.order.files" :key="index" >
        <v-flex xs12>
          <v-text-field
            label="file.url"
            readonly
            :value="file"
          ></v-text-field>
        </v-flex>
        </div>
        </v-card-text>
      </v-card>
</template>

<script>
  export default {
    name: 'OrderClient',
    props: ['order'],
    data: () => ({
      show: false
    })
  }
</script>
