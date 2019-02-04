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
  <div v-if="order.reorder_cause">
 <v-divider></v-divider>
      <v-flex xs12>
    <v-text-field
      error
      label="Re-order Cause"
      readonly
      :value="order.reorder_cause"
    ></v-text-field>
    </v-flex>
    <v-flex xs12>
    <v-text-field
      error
      label="Re-order Description"
      readonly
      :value="order.reorder_desc"
    ></v-text-field>
  </v-flex>
      <v-flex xs12>
    <v-text-field
      error
      label="reference to previous Item"
      readonly
      :value="order.reorder_item_reference"
    ></v-text-field>
  </v-flex>
  </div>
 
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

