<template>
  <div class="chat-wrap">
    <right-header></right-header>
    <right-goods></right-goods>
    <right-content></right-content>
    <right-footer></right-footer>
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
