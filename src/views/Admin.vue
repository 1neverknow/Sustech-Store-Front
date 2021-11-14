<template>
  <div class="admin">
    <div class="admin-header">
      <div class="header-content">
        <p>
          <i class="el-icon-setting" style="color: orange"></i>
        </p>
        <p>Management</p>
        <router-link to></router-link>
      </div>
    </div>
    <div class="content">
      <el-menu
          :default-active="activeIndex2"
          class="menu"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
        <el-menu-item index="1">Appealing</el-menu-item>
        <el-submenu index="2">
          <template slot="title">Complain</template>
          <el-menu-item index="2-1">Goods</el-menu-item>
          <el-menu-item index="2-2">User</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">Operations</template>
          <el-menu-item index="3-1">Goods</el-menu-item>
          <el-menu-item index="3-2">User</el-menu-item>
          <el-menu-item index="3-3">Deal</el-menu-item>
        </el-submenu>
<!--        <el-menu-item index="3" disabled>消息中心</el-menu-item>-->
<!--        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
      </el-menu>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: "Admin",
  setup() {
    const activeIndex = ref('1')
    const activeIndex2 = ref('1')
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return {
      activeIndex,
      activeIndex2,
      handleSelect,
    }
  },
}
</script>

<style scoped>
.admin {
  /*background-color: #f5f5f5;*/
  background-color: lightgrey;
  margin: 0 auto;
  /*height: 800px;*/
}
.admin .admin-header {
  background-color: grey;
  border-bottom: 10px solid darkorange;
  /*margin-bottom: 50px;*/
  margin-top: -50px;
  width: 100%;
}
.admin .admin-header .header-content {
  width: 1225px;
  margin: 30px auto 30px 5px;
  height: 80px;
}
.admin .admin-header .header-content p {
  float: left;
  font-size: 28px;
  line-height: 80px;
  color: whitesmoke;
  margin-right: 20px;
}
.admin .admin-header .header-content p i {
  font-size: 45px;
  color: deepskyblue;
  line-height: 80px;
}
.admin .content {
  background-color: darkgrey;
}
.admin .content .menu {
}
</style>