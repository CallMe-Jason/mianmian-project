import Vue from 'vue'
import Vuex from 'vuex'
import {
  setItem,
  getItem
} from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: getItem('LANG') || 'zh',
    user: getItem('TOKEN-KEY'),
    pathState: getItem('PATH-STATE'),
    tags: ['面板'],
    tagList: getItem('tag') || [{
      name: 'dashboard',
      path: '/dashboard',
      title: '数据概览'
    }],
    nextItem: {}
  },
  mutations: {
    setPathState (state, data) {
      state.pathState = data

      setItem('PATH-STATE', state.pathState)
    },
    changeLang (state, lang) {
      state.lang = lang

      setItem('LANG', state.lang)
    },
    getUser (state, data) {
      state.user = data

      setItem('TOKEN-KEY', state.user)
    },
    // 添加标签
    addTag (state, tag) {
      // 去重
      const isResult = state.tagList.some(item => {
        return item.path === tag.path
      })
      if (isResult) return

      const newTagArr = {
        name: tag.name,
        path: tag.path,
        title: tag.meta.name
      }
      state.tagList.push(newTagArr)
      setItem('tag', state.tagList)
      // console.log('标签数组', state.tagList)
    },
    deleteTag (state, tag) {
      for (let i = 0; i <= state.tagList.length; i++) {
        if (state.tagList[i] === tag) {
          if (state.tagList[i].title === '数据概览') return
          // console.log(state.tagList.indexOf(tag), '索引')
          const index = state.tagList.indexOf(tag)
          // console.log(state.tagList[index - 1])
          const item = state.tagList[index - 1]
          state.nextItem = item
          state.tagList.splice(i, 1)
          setItem('tag', state.tagList)
          break
        }
      }
    }
  },
  actions: {},
  modules: {}
})
