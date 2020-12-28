import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/globcss.less'
import './plugins/element.js'
import './utils/dayjs'
import i18n from './lang'

import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor)
import './utils/day'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
