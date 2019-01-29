<template>
      <v-card>
        <v-card-title >
          <div>
            <div class="title">{{ order.product }}</div>
            <p>{{ order.desc }}</p>
            <span>{{ order.pages }} pages, Qty : {{ order.count}}</span>
          </div>
          <v-spacer></v-spacer>
          <v-btn small color="green darken-1" icon @click="show = !show">
            <v-icon color="white">{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text  v-show="show" v-for="file, index in order.files" :key="index" primary-title>
          <v-card>
            <v-card-title class="headline">{{ file.type }} {{ order.options[index].count}} pages</v-card-title>
            <v-card-text>
               <v-icon large color="blue darken-4"
                  @click="download(file.url)"
                >cloud_download</v-icon>
              <p> format : {{ file.format}}, size : {{ file.size}} bytes</p>
              <p> {{ order.options[index].option}}</p>
              <p> {{ order.options[index].desc}}</p>

            </v-card-text>
          </v-card>
          
        </v-card-text>
      </v-card>
</template>

<script>
  export default {
    name: 'PrintJob',
    props: ['order'],
    data: () => ({
      show: false
    }),
    methods: {
      download (url) {
        window.open(url)
      }
    }
  }
</script>
