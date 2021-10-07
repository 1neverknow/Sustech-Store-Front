<template>
<!--  <div>-->
<!--    Do the main design here !-->
<!--    <br>-->
<!--    Use sub dir to create page for project/announcement ...-->
<!--    <br>-->
<!--    Hi, {{this.$store.state.role.username}}-->
<!--    <br>-->
<!--    Your roleType is {{this.$store.state.role.roleType}}-->
<!--  </div>-->
  <el-container>
    <el-aside width="auto">
      <left-bar/>
    </el-aside>
<!--    <el-aside style="width: 0">-->
<!--    </el-aside>-->
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LeftBar from '../components/SideBar'
import Header from '../components/Header'
export default {
  name: 'MainPage',
  components: {
     Header,LeftBar
  }
}
</script>

<style scoped>
.el-footer,.el-header{
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
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
  line-height: 320px;
}
</style>
