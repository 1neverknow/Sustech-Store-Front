import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 数据状态管理 - 多个组件的数据交流
// store的内容更新之后，会通知到每个组件。这样就可以达到多个组件数据同步的效果

export default new Vuex.Store({
  state: {
    token: '',
    userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
  },
  mutations: {

  },
  actions: {
  },
  modules: {
  }
})
