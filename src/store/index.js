import Vue from 'vue'
import Vuex from 'vuex'
import { cookieGet } from '@/common/cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储token
    token: cookieGet('token') ? cookieGet('token') : '',
    userInfo: cookieGet('userInfo') ? cookieGet('userInfo') : ''
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
