

<script>
import { Doughnut, mixins } from 'vue-chartjs'

export default {
  name: 'CurrentMonth',
  extends: Doughnut,
  mixins:[mixins.reactiveProp],
  data () {
    return {
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
        },
    }
  }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>

