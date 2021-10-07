<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Not Read" name="first">this is not read message</el-tab-pane>
      <el-tab-pane label="Have Read" name="second">this is have read message</el-tab-pane>
      <el-tab-pane label="Recycle" name="third">this is recycle</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {}
  }
}
</script>

<style scoped>
.message-title {
  cursor: pointer;
}

.handle-row {
  margin-top: 30px;
}
</style>
