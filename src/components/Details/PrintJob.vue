<template>
  <v-flex >
      <v-card class="mt-2" v-for="(file, index) in order.files" :key="index" primary-title>
      <v-card-title class="headline pa-1">{{ file.type }} {{ order.options[index].count}} pages</v-card-title>
      <v-card-text class="pa-1">
        <v-layout class="row">
          <v-tooltip top>
            <v-icon  slot="activator" large color="blue darken-4"
              @click="download(file.gcpUrl)"
            >cloud_download</v-icon>
            <span>Download from GCP</span>
          </v-tooltip>
          <v-spacer></v-spacer>        
          <v-tooltip top>
            <v-icon slot="activator" large color="blue"
              @click="download(file.url)"
            >cloud_download</v-icon>
            <span>Download from Cloud Printer</span>
          </v-tooltip>
        </v-layout>
         
        <p> format : {{ file.format}}, size : {{ file.size}} bytes</p>
        <p> {{ order.options[index].option}}</p>
        <p> {{ order.options[index].desc}}</p>
      </v-card-text>
    </v-card>  
  </v-flex>

</template>

<script>
  export default {
    name: 'PrintJob',
    props: ['order'],
    methods: {
      download (url) {
        window.open(url)
      }
    }
  }
</script>

