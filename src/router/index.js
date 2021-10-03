import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Forgot from "@/views/Forgot";
import Reset from "@/views/Reset";
import User from "@/views/User";

Vue.use(VueRouter)
// router: 路由 - 页面跳转管理

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/login/forgot',
    name: 'Forgot',
    component: Forgot
  },
  {
    path: '/login/reset',
    name: 'Reset',
    component: Reset
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/user',
    name: 'User',
    meta: {
      // 登录后才能访问的受限资源，后面路由权限拦截时候会用到
      requireAuth: true
    },
    component: User
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
