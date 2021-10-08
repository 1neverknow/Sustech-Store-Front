import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Forgot from "@/views/Forgot";
import Reset from "@/views/Reset";
import User from "@/views/User";
import Details from "@/views/Details";
import Collection from "@/views/Collection";
import Activate from "@/views/Activate"
import Contact from "@/views/Contact";

import MainPage from "@/views/MainPage";
import Account from "@/views/Account";
import HomePage from "@/views/HomePage";
import Message from '@/views/Message'
import PI from "@/views/Modify/PersonInformation";

// import Chat from '../components/chat/chat'
// import Address from '../components/address/address'
// import AddressDetail from '../components/address/address-detail/address-detail'
// import Chatroom from '../components/chatroom/chatroom'
// import ChatroomUser from '../components/chatroom/chatroom-user/chatroom-user'
// import AddressMore from '../components/address/address-detail/address-more/address-more'

Vue.use(VueRouter)
// router: 路由 - 页面跳转管理

const routes = [
  {
    path: '/',
    name: 'mainPage',
    component: MainPage,
    children :[
      {
        path: 'account',
        name: 'Account',
        component: Account
      },
      {
        path: '/',
        name: 'HomePage',
        component: HomePage
      },
      {
        path: 'message',
        name: 'Message',
        component: Message
      },
      {
        path: 'pi_modify',
        name: 'PI',
        component: PI
      }
    ]
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
    path: '/user/activate',
    name: 'Activate',
    component: Activate
  },
  {
    path: '/user',
    name: 'User',
    meta: {
      // 登录后才能访问的受限资源，后面路由权限拦截时候会用到
      requireAuth: true
    },
    component: User
  },
  {
    path: '/goods/:goodsId/details',
    name: 'Details',
    component: Details
  },
  {
    path: '/user/:userId/collection',
    name: 'Collection',
    // meta: {
    //   requireAuth: true
    // },
    component: Collection
  },
  {
    path: '/product/contact',
    name: 'Contact',
    meta: {
      requireAuth: true
    },
    component: Contact
  },
  // {
  //   path: '/chat',  // 第一栏：微信
  //   component: Chat
  // },
  // {
  //   path: '/address',  // 第二栏：通讯录
  //   component: Address,
  //   children: [
  //     {
  //       path: ':id', // 传入不同的id,就可以跳转到不同的子路由
  //       component: AddressDetail,
  //       children: [
  //         {
  //           path: 'more',
  //           component: AddressMore
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: '/chatroom',  // 聊天打字界面
  //   component: Chatroom,
  //   children: [
  //     {
  //       path: 'user',
  //       component: ChatroomUser
  //     }
  //   ]
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
