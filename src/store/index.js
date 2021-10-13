import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 数据状态管理 - 多个组件的数据交流
// store的内容更新之后，会通知到每个组件。这样就可以达到多个组件数据同步的效果
export default new Vuex.Store({
  state: {
    // token和userInfo具体指的是什么？
    token: localStorage.getItem('token'),
    // 后端发送过来的用户信息
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
    name : 'user1',
    message : 1,
    modify_pos :'#test'
  },
  mutations: {
    // setter
    // 通过mutation，可以对token，userInfo进行赋值
    SET_TOKEN: (state, token) => {
      state.token = token
      // 可以通过token继续获取userInfo的信息
      // localStorage.removeItem("token")
      localStorage.setItem("token", token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      // 登录之后，一次会话期间，保留登陆状态
      // localStorage.removeItem("userInfo")
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    SET_USERINFO_LOCAL: (state, userInfo) => {
      state.token = userInfo
      // 可以通过token继续获取userInfo的信息
      localStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    logout (state) {
      state.token = null
      state.userInfo = null
      localStorage.removeItem('token')
      sessionStorage.removeItem('userInfo')
    },


    REMOVE_INFO: () => {
      // 清除token和userInfo的值
      this.state.token = ''
      this.state.userInfo = {}
      localStorage.setItem('token', '')
      // sessionStorage.setItem('userInfo', JSON.stringify(''))
      sessionStorage.setItem('userInfo', JSON.stringify(''))
    },
  },
  getters: {
    // get
    // 获取token，userInfo的方法
    getUser: state => {
      return state.userInfo
    },
    getToken: state => {
      return state.token
    }
  },
  actions: {
  },
  modules: {
  }
})
