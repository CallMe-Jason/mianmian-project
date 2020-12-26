<template>
  <div id="line1" style="width: 755px;height:300px;"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'Line1',
  mounted () {
    this.initEcharts()
  },
  methods: {
    initEcharts () {
      var myChart = echarts.init(document.getElementById('line1'))
      var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style lang='less' scoped>

</style>
