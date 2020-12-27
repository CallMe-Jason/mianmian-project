import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

Vue.filter('relativeTime', value => {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
})
// console.log(dayjs().format('YYYY-MM-DD'))
// console.log(dayjs().to(dayjs('2019'))) // 2 年以前
