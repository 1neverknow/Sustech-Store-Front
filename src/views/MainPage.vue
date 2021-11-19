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
  beforeRouteEnter(to, from, next) {
    // 添加背景色 margin:0;padding:0是为了解决vue四周有白边的问题
    document.querySelector('body').setAttribute('style', 'margin:0;padding:0')
    next()
  },
  beforeRouteLeave(to, from, next) {
    // 去除背景色
    document.querySelector('body').setAttribute('style', '')
    next()
  },
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
