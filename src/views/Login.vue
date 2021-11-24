<!--用户登陆界面-->

<template>
  <div class="login-wrap">
    <el-card class="ms-login">
      <el-container>
        <el-header class="header" style="height: 100px">
          <!--          <router-link to="/user">-->
          <el-avatar
              :size="90"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              style="margin: 5px auto; overflow: hidden; border-radius: 50%; box-shadow: 0 4px 8px rgba(0,0,0,.05); position: relative;"
          ></el-avatar>
          <!--          </router-link>-->
        </el-header>
        <el-main class="ms-content">
          <el-form
              ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
              :invisible="invisible"
              :label-position="labelPosition"
              :hide-required-asterisk="true"
          >
            <el-form-item label="E-Mail Address" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>

            <el-form-item v-if="this.invisible" label="Password">
              <el-input type="password" v-model="ruleForm.password" style="width: 420px"></el-input>
              <el-button type="primary" @click="changePass('show')" style="width: 100px; float: right">Show</el-button>
            </el-form-item>
            <el-form-item v-else label="Password">
              <el-input type="text" v-model="ruleForm.password" style="width: 420px"></el-input>
              <el-button type="default" @click="changePass('hide')" style="width: 100px; float: right">Hide</el-button>
            </el-form-item>

            <!--            验证码-->
            <el-form-item label="Verify code" style="margin-bottom: 50px">
              <el-input type="text" v-model="verify.verifycode" style="width: 420px;"></el-input>
              <template v-if="verify.verifyImg">
                <img @click="getVerifyImg" :src="verify.verifyImg" style="float: right">
              </template>
              <template v-else>
                <el-button @click="getVerifyImg" type="primary" style="width: 100px; float: right">Get</el-button>
              </template>
            </el-form-item>

            <el-form-item label="" prop="remember" style="margin-top: -40px">
              <el-checkbox v-model="rememberMe" label="Remember Me"></el-checkbox>
              <router-link to="/login/forgot">
                <el-link type="primary" style="float: right; height: 15px; margin-top: 15px">Forgot Password?</el-link>
              </router-link>
            </el-form-item>

            <el-form-item class="login-btn" style="margin-top: 30px">
              <el-button
                  type="primary"
                  @click="submitForm('ruleForm')"
              >Login</el-button>
            </el-form-item>

            <el-form-item style="margin-top: -30px; font-size: 14px; float: right">
              <!--      跳转到创建账号-->
              Don't have an account?
              <router-link to="/user/register">
                <el-link type="primary" style="height: 15px; margin-top: -5px">Create One</el-link>
              </router-link>
            </el-form-item>

          </el-form>
        </el-main>
      </el-container>
    </el-card>
    <div id="app1" class="special-effect">
      <vue-particles
          color="#857"
          :particleOpacity="0.7"
          :particlesNumber="60"
          shapeType="circle"
          :particleSize="4"
          linesColor="#573"
          :linesWidth="1"
          :lineLinked="true"
          :lineOpacity="0.4"
          :linesDistance="150"
          :moveSpeed="10"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="true"
          clickMode="push"
          class="lizi"
      >
      </vue-particles>
    </div>
  </div>
</template>


<script>
import Element from "element-ui"
import axios from 'axios'
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
  name: "Login",
  // 校验规则
  data() {
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input an email address'));
      } else {
        if (value !== '') {
          var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if (!reg.test(value)) {
            callback(new Error('Email is invalid'));
          }
        }
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Password is required'));
      } else if (value.length < 6) {
        callback(new Error('Length must be more than 6'));
      } else {
        callback();
      }
    };
    return {
      rememberMe: false,
      labelPosition: 'top',
      ruleForm: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          {
            validator: validateEmail,
            trigger: 'blur',
          },
        ],
        password: [
          {
            validator: validatePass,
            trigger: 'blur',
          },
        ],
      },
      invisible: true,
      verify: {
        verifyImg: '',
        verifycode: '',
      },
    }
  },
  methods: {
    activate() {
      const loginInfo = this.$store.getters.getLoginInfo
      if (loginInfo === null) {
        return
      }
      this.rememberMe = loginInfo.rememberMe
      this.ruleForm.email = loginInfo.email
      this.ruleForm.password = loginInfo.password
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.verify.verifycode !== '') {
          // 更改为调用全局this -> 可以用来获取store里的信息
          if(this.rememberMe) {
            const loginInfo = {
              email: this.ruleForm.email,
              password: this.ruleForm.password,
              rememberMe: this.rememberMe,
            }
            this.$store.commit("SET_LOGININFO", loginInfo)
          } else {
            this.$store.commit('removeLoginInfo')
          }
          const _this = this
          const newRequests = axios.create()
          newRequests.defaults.withCredentials = true;
          // this.$axios.defaults.withCredentials = true;
          newRequests.post('http://localhost:8081/login?checkCode=' + this.verify.verifycode, this.ruleForm)
              .then((res)=> {
            console.log(res)
            if (res.data.code === 2000) {
              // 接受后端返回的数据
              // 希望全局都可以访问到jwt的内容 -> 使用 /store/index.js
              // header中authorization字段即为用户登录后的权限验证
              const jwt = res.headers['authorization']
              const userInfo = res.data.data

              // 将jwt和userInfo共享给整个vue项目
              _this.$store.commit("SET_TOKEN",jwt)
              _this.$store.commit("SET_USERINFO", userInfo)

              Element.Message({
                showClose: true,
                message: 'Login success!',
                type: 'success',
              })
              // 验证成功后，跳转到home page
              this.getBasicInfo()
            } else {
              Element.Message({
                message: res.data.message,
                type: 'error',
              })
            }
          })
          // 认证不通过的情况 -> 全局axios拦截
        } else {
          Element.Message({
            message: 'Please check your input',
            type: 'error',
          })
          return false
        }
      })
    },
    getBasicInfo() {
      this.$axios({
        method: 'get',
        url: 'http://localhost:8081/admin/appealing/allDeal',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => {
        if(res.data.code === 2000){
          this.$store.commit('SET_ROLE','管理员')
        }
      })

      this.$axios({
        method: 'get',
        url: 'http://localhost:8081/user/me',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => {
        if (res.data.code === 2000) {
          console.log("test6")
          this.$store.commit("SET_Basic_Info",res.data.data)
          console.log(this.$store.getters.getBasic_Info)
          this.$router.push('/sh')
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    changePass(value) {
      this.invisible = !(value === 'show');
    },    //判断渲染，true:暗文显示，false:明文显示
    getVerifyImg() {
      const newRequests = axios.create()
      newRequests.defaults.withCredentials = true;
      newRequests({
        method: 'get',
        url: 'http://localhost:8081/code/image',
        responseType: "blob"
      }).then(res => {
        const {data, headers} = res
        const blob = new Blob([data], {type: headers['content-type']})
        this.verify.verifyImg = window.URL.createObjectURL(blob)
      })
    },
    initialInfo() {
      const user = this.$store.getters.getUser
      if (user) {
        this.ruleForm.email = user.email
        this.ruleForm.password = user.password
      }
    }
  },
  mounted() {

    this.activate()
  }
}
</script>

<style scoped>
.login-wrap {
  background-image: url("../assets/imgs/starmaker.jpg");
  position: fixed;
  background-size: 105%;
  width: 100%;
  height: 100%;
}

.login-wrap .ms-login {
  /*background-color: lightgrey;*/
  margin: 3% auto auto;
  width: 600px;
  height: 600px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);
  overflow: hidden;
  /*overflow: hidden;*/
}

.login-wrap .ms-login .header {
  /*margin-top: 40px;*/
  background-color: skyblue;
  text-align: center;
  line-height: 100px;
  width: 100%;
}
.login-wrap .ms-login .ms-content {
  margin-top: 20px;
}

.el-form-item {
  margin-top: -25px;
}

.login-btn {
  margin-top: 5px;
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 45px;
  margin-bottom: 10px;
}
.login-wrap .special-effect {
  margin-top: -50%;
}
</style>
