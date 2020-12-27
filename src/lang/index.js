import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEn from 'element-ui/lib/locale/lang/en'
import elementZh from 'element-ui/lib/locale/lang/zh-CN'
import en from './en'
import zh from './zh'
import store from '@/store'

Vue.use(VueI18n)

const messages = {
  en: {
    ...en,
    ...elementEn
  },
  zh: {
    ...zh,
    ...elementZh
  }
}

const i18n = new VueI18n({
  locale: store.state.lang,
  messages
})

export default i18n
