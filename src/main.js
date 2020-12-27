import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './styles/globcss.less'
// 加载dayjs初始化配置
import './utils/dayjs'
// 导入副文本编译器
import VueQuillEditor from 'vue-quill-editor'
// 导入编译器的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.config.productionTip = false
// 将副文本编译器注册为全局可用的组件
Vue.use(VueQuillEditor)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
