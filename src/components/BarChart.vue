<script>
import VueCharts from 'vue-chartjs'
export default {
  name: 'BarChart',
  extends: VueCharts.Bar,
  props: ['title', 'data'],
  methods: {
    getLotsOfRandomColors (length) {
      var colors = []
      for (var i = 0; i < length; i++) {
        colors.push(this.getRandomColor())
      }
      return colors
    },
    getRandomColor () {
      var letters = '0123456789ABCDEF'.split('')
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }
  },
  mounted () {
    this.renderChart({
      labels: this.data.map(x => x.label),
      datasets: [
        {
          backgroundColor: this.getLotsOfRandomColors(this.data.length),
          data: this.data.map(x => x.statistic.toFixed(2))
        }
      ],
      options: {

      }
    },
    {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true,
          ticks: {
            autoSkip: false
          }
        }],
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true,
            steps: 10,
            stepValue: 5,
            max: (Math.max(...this.data.map(x => x.statistic)) === 100 ? 100 : Math.max(...this.data.map(x => x.statistic)))
          }
        }]
      },
      tooltips: {
        mode: 'label',
        callbacks: {
          label: function (tooltipItem, data) {
            return data['datasets'][0]['data'][tooltipItem['index']] + '%'
          }
        }
      }
    })
  }
}
</script>
