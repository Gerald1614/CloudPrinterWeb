<template>
  <v-flex>
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
  <div v-for="(file, index) in order.order.files" :key="index" >
  <v-flex xs12>
    <v-text-field
      label="file.url"
      readonly
      :value="file"
    ></v-text-field>
  </v-flex>
  </div>
  </v-flex>


</template>

<script>
  export default {
    name: 'OrderClient',
    props: ['order'],
  }
</script>

