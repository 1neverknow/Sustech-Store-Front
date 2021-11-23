<template>
<!--  <el-container>-->
<!--    <el-aside width="auto">-->
<!--      <left-bar/>-->
<!--    </el-aside>-->
    <!--    <el-aside style="width: 0">-->
    <!--    </el-aside>-->
<!--    <el-container>-->
<!--      <el-header>-->
<!--        <right-header></right-header>-->
<!--&lt;!&ndash;        <Header/>&ndash;&gt;-->
<!--      </el-header>-->
<!--      <el-main>-->
<!--        <right-goods></right-goods>-->
<!--&lt;!&ndash;        <right-content></right-content>&ndash;&gt;-->
<!--&lt;!&ndash;        <router-view/>&ndash;&gt;-->
<!--      </el-main>-->
<!--      <el-footer>-->
<!--        <right-footer></right-footer>-->
<!--      </el-footer>-->
<!--    </el-container>-->
<!--  </el-container>-->
  <div class="chat-wrap">
<!--    <el-container>-->
    <right-header></right-header>
    <right-goods></right-goods>
    <right-content></right-content>
    <right-footer></right-footer>
<!--    </el-container>-->
  </div>
</template>

<script>
import RightHeader from "./RightHeader";
import RightContent from "./RightContent";
import RightFooter from "./RightFooter";
import RightGoods from "./RightGoods";
import WebSocket from "../../../../util/websocket.js"

export default {
  name: "Chat",
  components: {
    RightHeader,
    RightGoods,
    RightContent,
    RightFooter
  },

};
</script>

<style scoped>
.chat-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
