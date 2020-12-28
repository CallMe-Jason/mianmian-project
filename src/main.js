import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './utils/dayjs'
import i18n from './lang'

import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor)
import './styles/globcss.less'
// 加载dayjs初始化配置
// 导入副文本编译器

Vue.config.productionTip = false
// 将副文本编译器注册为全局可用的组件
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
