<script>
import VueCharts from 'vue-chartjs'
export default {
  name: 'PieChart',
  extends: VueCharts.Pie,
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
      ]
    },
    {
      responsive: true,
      maintainAspectRatio: false,
      legend:
      {
        position: 'bottom'
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
