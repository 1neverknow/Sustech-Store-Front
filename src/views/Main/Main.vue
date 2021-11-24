<template>
  <!--  <el-container @click="handleHide">-->
  <!--    <el-aside width="">-->
  <!--      <left-header></left-header>-->
  <!--      &lt;!&ndash;      <left-search></left-search>&ndash;&gt;-->
  <!--      <left-tab></left-tab>-->
  <!--      <left-chat-list></left-chat-list>-->
  <!--    </el-aside>-->
  <!--    <el-container>-->
  <!--      <el-main>-->
  <!--        <keep-alive>-->
  <!--          <component :is="currentRight"></component>-->
  <!--        </keep-alive>-->
  <!--      </el-main>-->
  <!--    </el-container>-->
  <!--  </el-container>-->
  <!--  <div class="background">-->
  <!--    <img :src="Orange" width="100%" height="100%" alt="">-->
  <!--  <div id="background">-->

  <div class="wrap" @click="handleHide">
    <div class="backmain">
      <div class="main-left">
        <left-header></left-header>
        <left-search></left-search>
        <left-tab></left-tab>
        <left-chat-list ></left-chat-list>
      </div>
      <div class="main-right">
        <keep-alive>
          <component :is="currentRight"></component>
        </keep-alive>
      </div>
    </div>
  </div>
  <!--  </div>-->

  <!--  </div>-->
</template>

<script>
import LeftHeader from "./Left/LeftHeader";
import LeftSearch from "./Left/LeftSearch";
import LeftTab from "./Left/LeftChatList/LeftTab";
import Chat from "./Right/Chat/Chat";
// import LinkmanInfo from "./Right/LinkmanInfo/LinkmanInfo";
import LeftChatList from "./Left/LeftChatList";
// import Orange from "./assets/orange.jpeg"
export default {
  name: "Main",
  components: {
    LeftHeader,
    LeftSearch,
    LeftTab,
    // LeftChatList,
    Chat
  },
  data() {
    return {
      tabs: [Chat],
      Orange:require('../../assets/Orange.jpg')
    };
  },
  computed: {
    currentRight() {
      return this.tabs[this.$store.state.currentRight];
    }
  },
  methods: {
    handleHide() {
      this.$store.commit("hideAll");
    }
  }
};
</script>

<style scoped>
.wrap {
  height: 100vh;
  overflow: hidden;
  margin: -20px;
  /*background-image: url(../../assets/Orange.jpg);*/
  /*background-repeat: no-repeat;*/
  /*background-size: 100% 100%;*/
}
.backmain {
  max-width: 1400px;
  min-width: 800px;
  height: 95%;
  border-radius: 0px;
  margin: 0 auto;
  display: flex;
  background-image: url(../../assets/Orange.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
#login {
  background: url("../../assets/Orange.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
.main-left {
  width: 280px;
  height: 100%;
  background-color: rgb(246, 233, 215);
}
.main-right {
  background-color: #fdfaf6;
  flex-grow: 1;
}
.el-footer,.el-header{
  background-color: white;
  color: #333;
  /*text-align: center;*/
  /*line-height: 10px;*/
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  /*text-align: center;*/
  /*line-height: 200px;*/
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 260px;
}
.background{
  width:100%;
  height:100%;  /**宽高100%是为了图片铺满屏幕 */
  z-index:-1;
  position: absolute;
}
</style>