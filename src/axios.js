import axios from "axios";
import Element from "element-ui";
import store from '@/store'
import router from "@/router";

// 为交互请求添加域名信息（默认IP。端口号）
axios.defaults.baseURL='http://localhost:8081'

// var axios = require('axios')
// // 设置cross跨域，并设置访问权限，允许跨域
// axios.defaults.withCredentials = true
// axios.defaults.crossDomain = true
// // 设置post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
// // 设置put请求头
// axios.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8'
// // 请求超时响应
// axios.defaults.timeout = 60000
// // 请求响应格式
// axios.defaults.responseType = 'json'
// // 设置csrf请求头
// axios.defaults.xsrfCookieName = 'XSRF-TOKEN'
// axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN'
// // 全局注册，之后可在其他组件中通过 this.$axios 发送数据
// Vue.prototype.$axios = axios


// 配置axios全局拦截 (发起请求时的配置)
// 前置拦截
axios.interceptors.request.use(config => {
    config.headers = {
        'Content-Type': 'application/json' // 设置很关键
    }
    return config
})

// 后置拦截: 接收到后端发来的消息时处理
// e.g. 出现异常时弹窗提示 -> 不需要一一alert
axios.interceptors.response.use(response => {
    let res = response.data

    // console.log(res)
    if (res.code === 200) {
        // 请求成功
        return response
    } else {
        // element-ui 错误弹窗
        Element.Message({
            showClose: true,
            message: response.data.message,
            type: 'error',
        })
        // 阻止进入后续逻辑
        return Promise.reject(response.data.message)
    }
},
    error => {
        console.log(error)

        if (error.response.data) {
            error.message = error.response.data.message
        }

        if (error.response.status === 401) {
            // 清空全局参数 -> store/index.js -> REMOVE_INFO方法
            store.commit("REMOVE_INFO")
            router.push("/login")
        }
        // 错误提示（弹窗）
        Element.Message({
            showClose: true,
            message: error.message,
            type: 'error',
        })
        // 阻止进入后续逻辑
        return Promise.reject(error)
    }

)

