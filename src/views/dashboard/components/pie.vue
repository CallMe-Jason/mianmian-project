<template>
  <div id="pie" style="width: 219px;height:160px;"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'Pie',
  mounted () {
    this.initEcharts()
  },
  methods: {
    initEcharts () {
      var myChart = echarts.init(document.getElementById('pie'))
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        calculable: true,
        series: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 50],
            center: ['50%', '50%'],
            data: [
              { value: 320, name: 'Industries' },
              { value: 240, name: 'Technology' },
              { value: 149, name: 'Forex' },
              { value: 100, name: 'Gold' },
              { value: 59, name: 'Forecasts' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style lang='less' scoped>

</style>
