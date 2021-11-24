<template>
  <div class="header">
    <div class="header-right">
      <div class="header-user-con">
        <div class="btn-bell">
          <el-tooltip effect="dark" :content="this.$store.state.message?`有${this.$store.state.message}条未读消息`:`消息中心`" placement="bottom">
            <router-link to="/message">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if=this.$store.state.message></span>
        </div>
        <div class="user-avator-header">
          <img v-bind:src="this.$store.getters.getBasic_Info.picturePath" />
        </div>
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{this.$store.getters.getBasic_Info.userName}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="user">
                <router-link to="/account" style="text-decoration: none">Account Page</router-link>
              </el-dropdown-item>
              <el-dropdown-item divided command="" @click.native="logout()">Log out</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>

</template>

<script>


export default {
  computed: {
    isFollow () {
      return this.$store.state.getBasic_Info; //需要监听的数据
    }
  },
  watch: {
    isFollow (newVal, oldVal) {
      //do something
      console.log("watch")
      this.imageUrl = this.$store.getters.getBasic_Info.picturePath
    }
  },
  name: "Header",
  mounted() {
    console.log("test3")
    console.log(this.$store.getters.getBasic_Info)
    this.imageUrl = this.$store.getters.getBasic_Info.picturePath
  },
  data () {
    return {
      imageUrl : ''
    }
  },
  methods :{
    logout() {
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
</script>

<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}

.btn-bell{
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  margin-bottom: 30px;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #418cec;
}
.user-name {
  margin-left: 20px;
}
.user-avator-header {
  margin-left: 20px;
}
.user-avator-header img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #156ee2;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
