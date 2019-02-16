<template>
<v-container>
  <h1>dashboard</h1>
  <stages-chart 
    :chart-data="datacollection"
    ></stages-chart>

</v-container>

</template>

<script>
import stagesChart from './charts/Stages'

export default {
  name: 'Dashboard',
  components: {
    stagesChart
  },
  computed: {
    datacollection() {
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
  },
}
</script>

<style lang="stylus">

</style>
