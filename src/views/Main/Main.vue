<template>
  <div class="wrap" @click="handleHide">
    <div class="main">
      <div class="main-left">
        <left-header></left-header>
        <left-search></left-search>
        <left-tab></left-tab>
        <left-chat-list></left-chat-list>
      </div>
      <div class="main-right">
        <keep-alive>
          <component :is="currentRight"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import LeftHeader from "./Left/LeftHeader";
import LeftSearch from "./Left/LeftSearch";
import LeftTab from "./Left/LeftChatList/LeftTab";

import Chat from "./Right/Chat/Chat";
import LinkmanInfo from "./Right/LinkmanInfo/LinkmanInfo";
import LeftChatList from "./Left/LeftChatList";

export default {
  name: "Main",
  components: {
    LeftHeader,
    LeftSearch,
    LeftTab,
    // LeftChatList,
    Chat,
    LinkmanInfo
  },
  data() {
    return {
      tabs: [Chat, LinkmanInfo]
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
}

.main {
  max-width: 1400px;
  min-width: 800px;
  height: 95%;
  border-radius: 0px;
  margin: 0 auto;
  display: flex;
}

.main-left {
  width: 280px;
  height: 100%;
  background-color: rgb(191, 203, 217);
}

.main-right {
  background-color: #eee;
  flex-grow: 1;
}
</style>
