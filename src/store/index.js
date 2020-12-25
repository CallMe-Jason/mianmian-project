import Vue from 'vue'
import Vuex from 'vuex'
import {
  setItem,
  getItem
} from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('TOKEN-KEY')
  },
  mutations: {
    getUser (state, data) {
      state.user = data

      setItem('TOKEN-KEY', state.user)
    }
  },
  actions: {},
  modules: {}
})
