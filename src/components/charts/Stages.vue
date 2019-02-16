

<script>
import { Bar, mixins } from 'vue-chartjs'

export default {
  name: 'StagesChart',
  extends: Bar,
  mixins:[mixins.reactiveProp],
  data () {
    return {
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          yAxes: [{
              ticks: {
                  min: 0,
              } 
          }],
      }
    }
  }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style lang="stylus">

</style>
