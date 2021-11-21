<template>
  <div style="height: 100%; width: 100%">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!--          default-active=""需要设置默认选中项-->
      <el-menu :default-active="this.$route.name"
               class="el-menu-vertical-demo"
               id="left-bar-admin"
               background-color="#304156"
               text-color="#bfcbd9"
               active-text-color="#4392f9"
               :collapse="isCollapse" style="height: 100%"
               @open="handleOpen" @close="handleClose"
               @select="handleSelect"
      >
        <router-link to="/sh" style="text-decoration: none">
          <el-menu-item id="title" index="SS">
            <i style="margin-top: -10px">
              <img :src="logo" alt="logo" style="width: 40px; margin-left: -13px; padding-bottom: 6px"/>
            </i>
            <span slot="default" style="margin-left: 5px; font-size: 22px">Sustech Store</span>
          </el-menu-item>
        </router-link>


        <el-menu-item index="HomePage">
          <i class="el-icon-s-home"></i>
          <span slot="title">Home Page</span>
        </el-menu-item>

        <el-menu-item index="Account">
          <i class="el-icon-s-custom"></i>
          <span slot="title">Account</span>
        </el-menu-item>

        <el-menu-item index="Message">
          <i class="el-icon-message"></i>
          <span slot="title">Message</span>
        </el-menu-item>

        <el-submenu index="@3">
          <template slot="title">
            <i class="el-icon-connection"></i>
            <span v-if="!isCollapse" slot="title">Modify</span>
            <span v-if="isCollapse" slot="title"></span>
          </template>

          <el-menu-item index="PI">Personal information</el-menu-item>
          <el-menu-item index="AI">Address information</el-menu-item>
        </el-submenu>

        <el-menu-item index="Order" >
          <template slot = "title">
            <i class="el-icon-bell"></i>
            <span v-if="!isCollapse" slot="title">Order</span>
            <span v-if="isCollapse" slot="title"></span>
          </template>
        </el-menu-item>


        <el-menu-item index="StuEvent" >
          <i class="el-icon-date"></i>
          <span slot="title">Account security</span>
        </el-menu-item>


        <el-menu-item index="Collection" >
          <i class="el-icon-notebook-2"></i>
          <span slot="title">Favorites</span>
        </el-menu-item>


<!--        <el-menu-item index="Search">-->
<!--          <i class="el-icon-search"></i>-->
<!--          <span slot="title">Search</span>-->
<!--        </el-menu-item>-->

        <el-menu-item index="MR">
          <i class="el-icon-s-release"></i>
          <span slot="title">My release</span>
        </el-menu-item>

        <el-menu-item index="LO">
          <i class="el-icon-close"></i>
          <span slot="title">Log Out</span>
        </el-menu-item>

        <!--                <el-menu-item-group v-if="this.$store.state.proj.projId != null" id="proj-items">-->
        <!--                </el-menu-item-group>-->
        <!--        <div  style="padding-top: 10px">-->
        <!--          <el-menu-item index="ProjOverview">-->
        <!--            <i class="el-icon-s-promotion"></i>-->
        <!--            <span slot="title">Overview</span>-->
        <!--          </el-menu-item>-->

        <!--          <el-menu-item index="ResourcesStu">-->
        <!--            <i class="el-icon-folder-opened"></i>-->
        <!--            <span slot="title">Resources</span>-->
        <!--          </el-menu-item>-->
        <!--          <el-menu-item index="SubmissionStu">-->
        <!--            <i class="el-icon-document"></i>-->
        <!--            <span slot="title">Submissions</span>-->
        <!--          </el-menu-item>-->
        <!--          <el-menu-item index="Gradebook">-->
        <!--            <i class="el-icon-collection"></i>-->
        <!--            <span slot="title">Gradebook</span>-->
        <!--          </el-menu-item>-->
        <!--          <div style="height: 70px"></div>-->
        <!--        </div>-->

      </el-menu>
      <el-radio-group v-model="isCollapse">
        <el-button circle v-show="!isCollapse" class="el-icon-s-fold" @click="isCollapse=true"></el-button>
        <el-button circle v-show="isCollapse" class="el-icon-s-unfold" @click="isCollapse=false"></el-button>
      </el-radio-group>
    </el-scrollbar>
  </div>
</template>

<script>
import logo from '@/assets/pic.png'

export default {
  data () {
    return {
      isCollapse: false,
      show: false,
      logo,
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      if (key.indexOf("@") !== -1) {
        console.log('Not finished')
      } else if(key!=='LO'){
        this.$router.push({name: key})
      }else{
        this.$confirm('Are you sure to Log out?', 'Tips', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$store.commit('logout')
          this.$message({
            type: 'success',
            message: 'You have successfully log out'
          });
          this.$router.push("/login")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'You have Cancel the operation'
          });
        });
      }
    }
  }
}
</script>

<style scoped>
#left-bar-div {
  height: 100%;
}
#left-bar #left-bar-admin {
  text-align: left;
  /*background: blueviolet;*/
  height: 100%;
  background: #303f55;
}

.el-radio-group {
  position: absolute;
  right: 12px;
  bottom: 4%;
  line-height: 100%;
  color: #151d41;
}

.el-radio-group > .el-button {
  font-size: 16px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
  margin: 0;
  padding: 0;
  text-align: left;
}
#title #title-admin {
  background-color: #303f55;
  color: white;
  font-size: 20px;
  height: 60px;
}
#proj-title {
  font-size: 17px;
  padding: 10px 0 10px 0;
  background-color: #f8f8f8;
}
.img {
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  margin-right: 12px;
  cursor: default;
}

.el-scrollbar {
  height: 100%;
  background: #303f55;
  overflow-x: hidden;
}

.el-scrollbar >>> .el-scrollbar__wrap {
  overflow-x: hidden;
  height: 100%;
}
</style>


