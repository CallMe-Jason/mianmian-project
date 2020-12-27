import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/globcss.less'
import './plugins/element.js'
import './utils/dayjs'
import i18n from './lang'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
