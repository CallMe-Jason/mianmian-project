import Vue from 'vue'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

Vue.filter('formatTime', value => {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
})
