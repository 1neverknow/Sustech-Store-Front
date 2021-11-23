<template>
  <div class="admin">
    <div class="admin-header">
      <div class="header-content">
        <p>
          <router-link :to="{path: '/user/' + this.$store.getters.getUser.userId}">
            <i class="el-icon-setting" style="color: orange"></i>
          </router-link>
        </p>
        <p>Admin</p>
        <router-link to></router-link>
      </div>
    </div>
    <div class="content">
      <el-menu
          :default-active="activeIndex"
          class="menu"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router>
        <el-menu-item index="AdminAppealing">
            Appealing
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">Complain</template>
          <el-menu-item index="AdminComplainGoods">
            Goods
          </el-menu-item>
          <el-menu-item index="AdminComplainUser">
            User
          </el-menu-item>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">All</template>
          <el-menu-item index="ComplainGoodsAll">
            Goods
          </el-menu-item>
          <el-menu-item index="ComplainUserAll">
            User
          </el-menu-item>
          <el-menu-item index="AppealingDealAll">
            Deal
          </el-menu-item>
        </el-submenu>

        <el-menu-item index="Event">
          Event
        </el-menu-item>


      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
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