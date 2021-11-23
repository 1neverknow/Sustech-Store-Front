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
import Deal from "@/views/Deal"
import Publish from "@/views/Publish"
import Order from "@/views/Order"
import None from "@/views/None"
import EditGoods from "@/views/EditGoods"
import AdminAppealing from "@/views/AdminAppealing"
import AdminComplainGoods from "@/views/AdminComplainGoods"
import AdminComplainUser from "@/views/AdminComplainUser"
import AppealingDealAll from "@/views/AppealingDealAll";
import ComplainGoodsAll from "@/views/ComplainGoodsAll";
import ComplainUserAll from "@/views/ComplainUserAll";
import Event from "@/views/Event";
import Announced from "@/views/Announced"
import MainPage from "@/views/MainPage";
import Account from "@/views/Account";
import HomePage from "@/views/HomePage";
import Message from '@/views/Message'
import PI from "@/views/Modify/PersonInformation";
import AI from "@/views/Modify/AddressInformation";
import Search from "@/views/Search"
import Main from "@/views/Main/Main";
import ST from "@/views/test"
import SHP from '@/views/SearchHomePage'


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
        component: Main
      },
      {
        path: 'pi_modify',
        name: 'PI',
        component: PI
      },
      {
        path: 'ai_modify',
        name: 'AI',
        component: AI
      },
      {
        path: '/user/collection',
        name: 'Collection',
        meta: {
          requireAuth: true
        },
        component: Collection
      },
      {
        path: 'search',
        name: 'Search',
        component: Search
      },
      {
        path: '/user/order',
        name: 'Order',
        meta: {
          requireAuth: true
        },
        component: Order
      },
      {
        path: '/user/announced',
        name: 'Announced',
        meta: {
          requireAuth: true
        },
        component: Announced
      },
      {
        path: '/publish',
        name: 'Publish',
        meta: {
          requireAuth: true
        },
        component: Publish
      },
      {
        path: '/goods/:goodsId/edit',
        name: 'EditGoods',
        meta: {
          requireAuth: true
        },
        component: EditGoods
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/s',
    name: 'Search',
    component: ST
  },
  {
    path: '/sh',
    name: 'SHP',
    component: SHP
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
    path: '/user/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/user/activate',
    name: 'Activate',
    component: Activate
  },
  {
    path: '/goods/:goodsId',
    name: 'Details',
    component: Details
  },
  {
    path: '/product/contact',
    name: 'Contact',
    meta: {
      requireAuth: true
    },
    component: Contact
  },
  {
    path: '/deal/:goodsId',
    name: 'Deal',
    meta: {
      requireAuth: true
    },
    component: Deal
  },

  {
    path: '/none',
    name: 'None',
    component: None
  },
  {
    path: '/adminAppealing',
    name: 'AdminAppealing',
    meta: {
      requireAuth: true
    },
    component: AdminAppealing
  },
  {
    path: '/adminComplainUser',
    name: 'AdminComplainUser',
    meta: {
      requireAuth: true
    },
    component: AdminComplainUser
  },
  {
    path: '/adminComplainGoods',
    name: 'AdminComplainGoods',
    meta: {
      requireAuth: true
    },
    component: AdminComplainGoods
  },
  {
    path: '/complainGoodsAll',
    name: 'ComplainGoodsAll',
    meta: {
      requireAuth: true
    },
    component: ComplainGoodsAll

  },{
    path: '/complainUserAll',
    name: 'ComplainUserAll',
    meta: {
      requireAuth: true
    },
    component: ComplainUserAll

  },{
    path: '/appealingDealAll',
    name: 'AppealingDealAll',
    meta: {
      requireAuth: true
    },
    component: AppealingDealAll

  },{
    path: '/event',
    name: 'Event',
    meta: {
      requireAuth: true
    },
    component: Event
  },

  // {
  //   path: '/user/collection',
  //   name: 'Collection',
  //   meta: {
  //     requireAuth: true
  //   },
  //   component: Collection
  // },
  {
    path: '/user/:userId',
    name: 'User',
    meta: {
      requireAuth: true
    },
    component: User
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
