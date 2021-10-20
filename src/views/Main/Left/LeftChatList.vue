<template>
  <div>
<!--    <a v-for="(item) in chatList">-->
      <div  v-if="isNoChat"  >
        <div>111</div>
<!--        <div class="img-unread">-->
<!--          <img class="item-img" :src="info.imgurl" height="40" width="40" /><span v-html="info.unread" v-show="info.unread"></span>-->
<!--        </div>-->
<!--        <h2 class="dissname" v-html="info.dissname"></h2>-->
<!--        <p class="summary" v-html="info.summary"></p>-->
<!--        <span class="item-time" v-html="info.time"></span>-->
      </div>
<!--    </a>-->
  </div>
<!--  v-for="info in chatList"-->
<!--  :key="info.id"-->
<!--  <el-row>-->
<!--    <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">-->
<!--      <el-card :body-style="{ padding: '0px' }">-->
<!--        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">-->
<!--        <div style="padding: 14px;">-->
<!--          <span>好吃的汉堡</span>-->
<!--          <div class="bottom clearfix">-->
<!--            <time class="time">{{ currentDate }}</time>-->
<!--            <el-button type="text" class="button">操作按钮</el-button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-card>-->
<!--    </el-col>-->
<!--  </el-row>-->
</template>

<script>
export default {
  name: "LeftChatList",
  data() {
    return {
      // currentDate: new Date()
      chatList: [
        {
          chatId: 0,
          linkmanIndex: 1,
          // isMute: false,
          // isOnTop: false,
          messages: [
            {
              avatar,
              ctn: "你好",
              nickname: "用户一",
              sender: "p1",
              time: new Date("2011-01-11 11:11:11"),
              type: "chat"
            }
          ]
        }
      ]
    };
  },
    method: {
      computed:{
        isNoChat() {
          return this.$store.state.currentChatId === -1;
        }
        // ,
        // isShowDeal(){
        //   return this.$store.state.isShowMembers;
        // }
      },
      // gotoChatroom(info) {
      //   // item.unread = ''  // 点击后使未读消息的提示消失
      //   // info.summary = '点击发送消息' // 点击后使未读消息的提示消失
      //   // info.time = '刚刚'
      //   this.setAddress(info)
      // },
    }
}
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>