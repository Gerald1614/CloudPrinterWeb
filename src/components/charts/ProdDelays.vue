

<script>
import { Line, mixins } from 'vue-chartjs'

export default {
  name: 'ProdDelays',
  extends: Line,
  mixins:[mixins.reactiveData],
  data () {
    return {
    gradient: null,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      showLines: true,
      legend: { display: false },
      scales: {
          yAxes: [{
              ticks: {
                  min: 0,
              } 
          }]
      }
    }
  }
  },
  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(450, 0, 0, 0)
    this.gradient.addColorStop(0, 'green');
    this.gradient.addColorStop(0.4, 'yellow');
    this.gradient.addColorStop(1, 'red');
    this.renderChart(this.dataProdDelays, this.options)
  },
  computed: {
    dataProdDelays() {
       return {
      labels: ['>-10 days', '-10 < due <-5', ' 5 < due <-2', ' -2< due <-1', ' -1< due <1', ' 1< due <5',  '5 < due <10', '>10 days'],
      datasets: [
        {
          pointBackgroundColor: 'black',
          pointBorderColor: 'black',
          backgroundColor: this.gradient,
          data: this.$store.getters['Orders/statsOrdersProdTime']
        },  
      ],
    }
  }
  }
}
</script>

