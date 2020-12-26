<template>
  <div id="line2" style="width: 755px;height:300px;">1</div>
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
      var myChart = echarts.init(document.getElementById('line2'))
      var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [1290, 1330, 1320, 820, 932, 901, 934],
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
