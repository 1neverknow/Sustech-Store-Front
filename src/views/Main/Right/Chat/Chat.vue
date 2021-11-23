<template>
  <div class="chat-wrap">
    <right-header></right-header>
    <right-goods></right-goods>
    <right-content v-if="isReloadData"></right-content>
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
  data () {
    return {
      // 刷新标识
      isReloadData: true
    }
  },
  components: {
    RightHeader,
    RightGoods,
    RightContent,
    RightFooter
  },
  methods: {
    reload () {
      this.isReloadData = false;
      this.$nextTick(() => {
        this.isReloadData = true;
      })
    }
  }

};
</script>

<style scoped>
.chat-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
