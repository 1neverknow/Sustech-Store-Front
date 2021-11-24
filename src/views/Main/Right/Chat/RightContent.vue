<template>
  <div id="content" class="wrap list-wrap">
    <info-block
        :visible="isShowChatterInfo"
        :memberInfo="chatterInfo"
        :infoPosition="infoPosition"
    ></info-block>
    <div class="no-chat-wrap" v-if="isNoChat">
      <i class="icon icon-logo"></i>
      <el-empty description="Unselected Chat"></el-empty>
      <!--      <div class="no-chat-text">未选择聊天</div>-->
    </div>
    <div v-else>
      <div class="no-new-message" v-if="isNoMessage">There is no new information at the moment！</div>
      <div v-else>
        <div v-for="(msg, index) in messages" :key="key1">
          <p v-if="msg.type === 'notice'" class="msg-notice">{{ msg.ctn }}</p>
          <div v-if="msg.type === 'chat'" class="msg-chat">
            <p class="msg-notice msg-time" v-if="isShowTime(index)">
              {{ time(msg.time) }}
            </p>
            <div class="msg-main-right" v-if="isMyself(msg.sender)">
              <div class="msg-right-wrap">
                <pre
                    class="msg-ctn"
                    style="background-color: #e28353;"
                    v-html="msg.ctn"
                ></pre>
              </div>
              <img
                  :src="msg.avatar"
                  class="msg-avatar msg-avatar-right"
                  @click.stop="handleShowChatterInfo($event, index)"
              />
            </div>
            <div class="msg-main" v-else>
              <img
                  :src="msg.avatar"
                  class="msg-avatar"
                  @click.stop="handleShowChatterInfo($event, index)"
              />
              <div class="msg-right-wrap">
                <div class="msg-nickname">{{ msg.nickname }}</div>
                <pre class="msg-ctn"
                     style="background-color: #ffffff;"
                     v-html="msg.ctn"></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfoBlock from "@/components/InfoBlock";
import avatar from "@/assets/user.jpeg";
import SockJS from "sockjs-client";

// let stomp = null;
export default {
  name: "RightContent",
  components: {
    InfoBlock
  },
  data() {

    return {
      infoPosition: {
        left: -1,
        top: -1
      },
      chatterInfoIndex: -1
    };
  },
  computed: {
    isNoChat() {
      return this.$store.state.currentChatId === -1;
    },
    key1(){
      return this.$store.state.key1
    },
    isNoMessage() {
      const currentChatId = this.$store.state.currentChatId;
      for (let chat of this.$store.state.chats) {
        if (chat.chatId === currentChatId) {
          return chat.messages.length === 0;
        }
      }
    },
    messages() {

      const currentChatId = this.$store.state.currentChatId;
      for (let chat of this.$store.state.chats) {
        if (chat.chatId === currentChatId) {
          console.log(chat.messages)
          return chat.messages;
        }
      }
    },
    isShowChatterInfo() {
      return this.$store.state.isShowChatterInfo;
    },
    chatterInfo() {
      return {
        id: "p1",
        type: "A",
        nickname: "用户一",
        gender: "",
        alias: "",
        region: "这是地区",
        avatar
      };
    }
  },
  methods: {
    // initWebSocket() {
    //   let url = "http://120.24.4.97:8081/webSocket"
    //   let socket = new SockJS(url);
    //   stomp = Stomp.over(socket);
    //   stomp.connect(
    //       {"Authorization":this.$store.getters.getToken,
    //         "chatId":this.chatId}
    //       , function (frame) {
    //           //用户模式
    //           stomp.subscribe("/user/queue", function (res) {
    //               $("#userMsg").val(res.body);
    //           });
    //           stomp.subscribe("/app/subscribe/chat", function (res) {
    //               $("#subscribeMsg").val(res.body);
    //           });
    //           // setConnect(true);
    //       }
    //   );
    // },
    // disconnect() {
    //   if (stomp != null) {
    //     stomp.disconnect();
    //   }
    // },
    isShowTime(index) {
      const messages = this.messages;

      if (index === 0) {
        return true;
      }

      return messages[index].time - messages[index - 1].time >= 120000;
    },
    isMyself(sender) {
      return sender;
    },
    time(date) {
      const y = date.getFullYear();
      const m = date.getMonth()+1;
      const d = date.getDate();
      const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      const min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      return `${y}/${m}/${d} ${hour}:${min}`;
    },
    handleShowChatterInfo(event, index) {
      const { clientX: x, clientY: y } = event;
      this.infoPosition.top = y;
      this.infoPosition.left = x;
      this.chatterInfoIndex = index;
      this.$store.commit("setChatterInfo", true);
    }
  }
};
</script>

<style scoped>
.wrap {
  flex-grow: 1;
  padding: 0 19px;
  min-height: 369px;
  max-height: calc(100vh - 211px);
  overflow: auto;
}

.item {
  height: 80px;
  background-color: red;
}

.list-wrap {
  overflow: auto;
}

.list-wrap::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  /*background-color: #2e3238;*/
  background-color: #eee;
  border-radius: 10px;
}

.list-wrap::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #c3c3c3;
}

.no-chat-wrap {
  margin-top: 130px;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.icon {
  display: block;
  background: url("../../../../assets/opt-but.png") no-repeat;
  background-size: 487px 462px;
}

.icon-logo {
  width: 100px;
  height: 90px;
  background-position: -96px -150px;
}

.no-chat-text {
  height: 20px;
  color: #ccc;
  font-size: 13px;
}

.no-new-message {
  height: 20px;
  margin-top: 130px;
  color: #ccc;
  font-size: 13px;
  text-align: center;
}

.msg-notice {
  max-width: 50%;
  text-align: center;
  margin: 10px auto;
  line-height: 25px;
  color: #b2b2b2;
  font-size: 12px;
}

.msg-chat {
  margin-bottom: 16px;
}

.msg-main {
  display: flex;
}

.msg-main-right {
  display: flex;
  justify-content: flex-end;
}

.msg-time {
  padding-top: 16px;
}

.msg-avatar {
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 2px;
}

.msg-avatar-right {
  margin-right: 0;
  margin-left: 10px;
}

.msg-right-wrap {
  display: flex;
  flex-direction: column;
}

.msg-nickname {
  color: #4f4f4f;
  font-size: 12px;
  height: 22px;
  line-height: 22px;
}

.msg-ctn {
  max-width: 474px;
  background-color: #fff;
  padding: 9px 13px;
  border-radius: 3px;
  font-size: 14px;
  line-height: 22.4px;
  color: #000;
  word-break: normal;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  margin: 0;
}
</style>
