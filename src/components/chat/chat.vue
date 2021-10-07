<template>
  <div class="chat">
    <scroll class="chat-wrapper" :data="chatList">
      <div>
        <ul>
          <router-link
            to='/chatroom'
            tag="li"
            v-for="addinfo in this.addList"
            :key="addinfo.id"
            class="item"
          >
            <div class="item-cell" @click="">
              <img class="item-img" :src="addinfo.imgurl" height="40" width="40" />
              <h2 class="dissname" v-html="addinfo.dissname"></h2>
              <p class="summary">点击发送消息</p>
              <span class="item-time">刚刚</span>
            </div>
          </router-link>
        </ul>
        <ul>
          <router-link
            to='/chatroom'
            tag="li"
            v-for="info in chatList"
            :key="info.id"
            class="item"
          >
            <div class="item-cell" @click="gotoChatroom(info)">
              <div class="img-unread">
                <img class="item-img" :src="info.imgurl" height="40" width="40" /><span v-html="info.unread" v-show="info.unread"></span>
              </div>
              <h2 class="dissname" v-html="info.dissname"></h2>
              <p class="summary" v-html="info.summary"></p>
              <span class="item-time" v-html="info.time"></span>
            </div>
          </router-link>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../base/scroll/scroll'
  import {mapMutations, mapGetters} from 'vuex'

  export default {
    components: {
      Scroll
    },
    // updated () {
    //   console.log('测试：测试：')
    //   console.log(this.addList)
    // },
    computed: {
      ...mapGetters([ // 拿到info的状态
        'info',
        'addList'
      ])
    },
    methods: {
      enterMessage () {
        console.log(12)
      },
      gotoChatroom (info) {
        info.unread = ''  // 点击后使未读消息的提示消失
        info.summary = '点击发送消息' // 点击后使未读消息的提示消失
        info.time = '刚刚'
        this.setAddress(info)
      },
      ...mapMutations({
        setAddress: 'SET_INFO'
      })
    },
    data () {
      return {
        chatList: [
          {
            dissname: '任艺伟',
            dissid: 'renyiwei',
            phone: '18312345678',
            // imgurl: 'https://i.postimg.cc/m2Sv4VML/ge.png',
            imgurl: 'https://i.postimg.cc/FR4yF5Jq/ryw.jpg',
            location: '山东济宁',
            album: 'http://src.zhigame.com/news/20130123/2013012310413268.jpg',
            source: '通过搜索手机号添加',
            summary: '点击发送消息',
            unread: '',
            time: '08:25'
          },
          {
            dissname: 'Adidas',
            dissid: 'Adidas',
            phone: '12345678901',
            imgurl: 'https://i.postimg.cc/ZKM6Byd6/adidas.jpg',
            location: '',
            album: '',
            source: '',
            summary: '有2个未读消息',
            unread: 2,
            time: '12:36'
          },
          {
            dissname: '何宛凝',
            dissid: 'hewannning',
            phone: '222222222222',
            imgurl: 'https://i.postimg.cc/nrqNjtdD/hwn.jpg',
            location: '广东深圳',
            album: '',
            source: '通过扫一扫添加',
            summary: '有3个未读消息',
            unread: 3,
            time: '昨天'
          },
          {
            dissname: 'SUSTech客服',
            dissid: 'sustech',
            phone: '1111111111111',
            imgurl: 'https://i.postimg.cc/RZS2FywW/sustech.jpg',
            location: '广东深圳',
            album: 'http://src.zhigame.com/news/20130123/2013012310413268.jpg',
            source: '通过扫一扫添加',
            summary: '有1个未读消息',
            unread: 1,
            time: '8月18日'
          }
        ],
        moreList: []
      }
    }
  }
</script>

<style scoped>
  .chat{
    position: fixed;
    /*border: 1px solid red;*/
    /*width: 100%;*/
    top: 50px;
    bottom: 50px;
    left: 0;
    right: 0;
  }
  .item{
    width: 100%;
    margin-left: 0;
  }
  .chat-wrapper{
    height: 100%;
    overflow: hidden;
  }
  .item-cell{
    position: relative;
    border-bottom: 1px solid rgba(153,153,153,0.4);
    height: 60px;
  }
  .img-unread{
    position: relative;
  }
  .img-unread span{
    position: absolute;
    top: 0;
    left: 44px;
    font-size: 10px;
    line-height: 14px;
    color: #fff;
    height: 14px;
    width: 14px;
    text-align: center;
    vertical-align: middle;
    background-color: red;
    border: 1px solid red;
    border-radius: 50%;
  }
  .item-img{
    float: left;
    margin:10px 10px 10px 10px;
  }
  .dissname{
    /*border: 1px solid red;*/
    font-size: 14px;
    font-weight: bold;
    padding-top: 10px;
    padding-left: 70px;
  }
  .summary{
    font-size: 14px;
    padding-top: 10px;
    padding-left: 70px;
    color: rgba(153,153,153,0.8);
    font-style: italic;
  }
  .item-time{
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 12px;
    color: rgba(153,153,153,0.8);
  }

</style>
