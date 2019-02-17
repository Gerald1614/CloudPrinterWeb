<template>
<v-container>
  <v-layout row wrap>
    <v-flex>
  <stages-chart 
    :chart-data="dataStages"
    ></stages-chart>
    </v-flex>
  </v-layout>
  <v-layout row wrap align-center justify-center>
    <v-flex  text-xs-center xs12 sm6>
      <h2>Current month</h2>
      <current-month :chart-data="dataCurrentMonth" />
  </v-flex>
    <v-flex text-xs-center xs12 sm6>
      <h2>Due Dates</h2>
      <prod-delays/>
    </v-flex>
  </v-layout>
</v-container>

</template>

<script>
import StagesChart from './charts/Stages'
import CurrentMonth from './charts/CurrentMonth'
import ProdDelays from './charts/ProdDelays'

export default {
  name: 'Dashboard',
  components: {
    StagesChart,
    CurrentMonth,
    ProdDelays
  },
  computed: {
    dataStages() {
    return {
      labels: ['new Order', 'Item Registered', 'Item Produce', 'Item Produced', 'Item Packed', 'Item Shipped'],
      datasets: [
        {
          label: 'order stages',
          backgroundColor: '#f87979',
          data: this.$store.getters['Orders/statsOrderStages']
        },  
      ],
    }
    },
    dataCurrentMonth() {
      return {
      labels: ['new Order', 'Item Shipped', 'Item Canceled', 'Item Error', 'Item Reordered'],
      datasets: [
        {
          backgroundColor: [ '#1e9978', '#4286f4', '#e8b21e', '#f87979', '#bf3a1c'],
          data: this.$store.getters['Orders/statsOrdersCurrentMonth']
        },  
      ],
    }
    },
},
}
</script>

<style lang="stylus">

</style>
