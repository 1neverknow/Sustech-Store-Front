<template>
  <div class="left-chat-list-wrap">
    <div >
      <!--      <el-table-->
      <!--          :data="tab"-->
      <!--          style="width: 100%">-->
      <!--        <el-table-column-->
      <!--            prop="date"-->
      <!--&lt;!&ndash;            label="日期"&ndash;&gt;-->
      <!--            width="180">-->
      <!--        </el-table-column>-->
      <!--      </el-table>-->
      <a
          v-for="(nav, index) in navs"
          :key="'nav' + index"
          class="left-chat-list-tab-icon-wrap"
          :title="nav.title"
          @click="handleChangeTab(index)"
      >
        <!--        <i-->
        <!--            class="left-chat-list-tab-icon"-->
        <!--            :class="nav.icon + (index === currentNav ? '-selected' : '')"-->
        <!--        ></i>-->
      </a>
      <!--      <b :data="chats"></b>-->
    </div>
    <keep-alive>
      <component :is="navs[currentNav].tab"></component>
      <!--      <chat-list></chat-list>-->
    </keep-alive>
  </div>
</template>

<script>
import TabChat from "./Tabs/TabChat";
import TabLinkman from "./Tabs/TabLinkman";
import TabArticle from "./Tabs/TabArticle";
// import ChatList from "../LeftChatList";
import avatar from "../../../../assets/default.png";
import {toDate} from "element-ui/src/utils/date-util";

export default {
  mounted() {
    this.initial();
  },
  name: "LeftTab",
  components: {
    TabChat,
    TabLinkman,
    // TabArticle,
    // ChatList
  },
  data() {
    return {
      navs: [
        {
          // title: "聊天",
          // icon: "left-chat-list-tab-chat",
          tab: TabChat
        },
        // {
        //   title: "通讯录",
        //   icon: "left-chat-list-tab-linkman",
        //   tab: TabLinkman
        // },
        // {
        //   title: "文章",
        //   icon: "left-chat-list-tab-article",
        //   tab: TabArticle
        // }
      ],

    };
  },
  computed: {
    currentNav() {
      return this.$store.state.currentTabIndex;
    }
  },
  methods: {
    handleChangeTab(index) {
      this.$store.commit("setCurrentTab", index);
    },


    // initial() {
    //   console.log(this.$store.getters.getToken)
    //   this.$axios({
    //     method: 'get',
    //     url: 'http://localhost:8081/chat/list',
    //     headers: {'authorization': this.$store.getters.getToken},
    //     transformRequest: [function (data) {  // 将{username:111,password:111} 转成 username=111&password=111
    //       var ret = '';
    //       for (var it in data) {
    //         // 如果要发送中文 编码
    //         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    //       }
    //       return ret.substring(0, ret.length - 1)
    //     }]
    //   }).then(res => {
    //     if (res.data.code === 2000) {
    //       const data = res.data.data
    //       console.log(data)
    //       let list=[]
    //       // console.log(toDate(data))
    //       data.forEach((item) => {
    //         console.log(item.lastMessageDate)
    //         console.log( toDate(item.lastMessageDate))
    //         let chatList = {
    //           chatId: item.chatId,
    //           linkmanIndex: item.otherUserId,
    //           // isMute: false,
    //           // isOnTop: false,
    //           messages: [
    //             {
    //               avatar: item.otherUserPicturePath,
    //               nickname: item.otherUserName.toString(),
    //               ctn: item.lastMessageContent,
    //               time: toDate(item.lastMessageDate),
    //               type: "chat"
    //             }
    //           ],
    //           // address: item.addressName,
    //           // type:item.isDefault==='null'?'Normal':'Default'
    //         }
    //         console.log(chatList)
    //         list.push(chatList)
    //         // this.$store.commit("setChatId", item.dealId);
    //       })
    //       this.$store.commit("setInitialChatList", list);
    //
    //     } else {
    //       this.$alert(res.data.message, 'Tip', {
    //         confirmButtonText: 'OK'
    //       })
    //     }
    //   })
    // },
  },
};
</script>

<style scoped>
.left-chat-list-tab {
  height: 35px;
  display: flex;
  border-bottom: 1px solid rgb(48, 65, 86);
  padding-bottom: 6px;
}

.left-chat-list-tab-icon-wrap {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  cursor: pointer;
  position: relative;
}

.left-chat-list-tab-icon-wrap::after {
  content: " ";
  position: absolute;
  top: 7px;
  right: 0;
  width: 0;
  height: 20px;
  border-right: 1px solid rgb(191, 203, 217);
}

.left-chat-list-tab-icon {
  background: url(../../../../assets/opt-but.png) no-repeat;
  width: 35px;
  height: 35px;
}

.left-chat-list-tab-chat {
  background-position: -150px -96px;
  background-size: 487px 462px;
}

.left-chat-list-tab-chat-selected {
  background-position: -185px -96px;
  background-size: 487px 462px;
}

.left-chat-list-tab-linkman {
  background-position: -220px -96px;
  background-size: 487px 462px;
}

.left-chat-list-tab-linkman-selected {
  background-position: -304px -246px;
  background-size: 487px 462px;
}

.left-chat-list-tab-article {
  background-position: -376px -322px;
  background-size: 487px 462px;
}

.left-chat-list-tab-article-selected {
  background-position: -304px -281px;
  background-size: 487px 462px;
}

.left-chat-list-tab-wrap {
  min-height: 280px;
  height: calc(100vh - 156px);
  overflow: auto;
}

.left-chat-list-tab-wrap::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  /*background-color: #2e3238;*/
  background-color: #aaa;
  border-radius: 10px;
}

.left-chat-list-tab-wrap::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgb(48, 65, 86);
}
</style>
