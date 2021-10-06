<!--用户登陆界面-->

<template>
<!--  <div class="login-wrap">-->
    <div class="ms-login">
      <el-container>
        <div style="margin: 50px"></div>
        <el-header style="height: 100px">
          <router-link to="/user">
            <el-avatar
                :size="90"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                style="margin: 5px auto; overflow: hidden; border-radius: 50%; box-shadow: 0 4px 8px rgba(0,0,0,.05); position: relative;"
            ></el-avatar>
          </router-link>
        </el-header>
        <el-main>
          <el-form
              ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
              :invisible="invisible"
              :label-position="labelPosition"
              :hide-required-asterisk="true"
              class="ms-content"
          >
            <el-form-item label="E-Mail Address" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item v-if="this.invisible" label="Password">
              <el-input type="password" v-model="ruleForm.password" style="width: 320px"></el-input>
              <el-button type="primary" @click="changePass('show')" style="width: 80px">Show</el-button>
            </el-form-item>
            <el-form-item v-else label="Password">
              <el-input type="text" v-model="ruleForm.password" style="width: 320px"></el-input>
              <el-button type="default" @click="changePass('hide')" style="width: 80px">Hide</el-button>
            </el-form-item>
            <el-form-item label="" prop="remember">
              <el-checkbox v-model="ruleForm.remember" label="Remember Me"></el-checkbox>
            </el-form-item>

            <div style="margin-top: -55px; margin-bottom: 50px; margin-left: 280px">
              <router-link to="/login/forgot">
                <!--                <el-link type="primary" style="margin-left: 280px; margin-top: -330px">Forgot Password?</el-link>-->
                <el-link type="primary" style="height: 15px">Forgot Password?</el-link>
              </router-link>
            </div>

            <div class="login-btn" style="margin-top: -20px">
              <el-button type="primary" @click="submitForm('ruleForm')">Login</el-button>
            </div>

            <div style="font-size: 14px">
              <!--      跳转到创建账号-->
              Don't have an account?
              <router-link to="/register">
                <el-link type="primary" style="height: 15px; margin-top: -5px">Create One</el-link>
              </router-link>
            </div>

          </el-form>
        </el-main>
      </el-container>
    </div>
<!--  </div>-->
</template>


<script>
import Element from "element-ui";
export default {
  name: "Login",
  // 校验规则
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input an email address'));
      } else {
        if (value !== '') {
          var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if(!reg.test(value)){
            callback(new Error('Email is invalid'));
          }
        }
        callback();
      }
      // callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Password is required'));
      } else if(value.length < 6){
        callback(new Error('Length must be more than 6'));
      }else{
        callback();
      }
    };
    return {
      labelPosition: 'top',
      ruleForm: {
        email: '111111@qq.com',
        password: '111111',
        'remember-me': false,
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
      invisible: true
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Element.Message({
            showClose: true,
            message: 'Congrats, this is a success message.',
            type: 'success',
          })
          console.log(this)
          console.log(this.ruleForm)
          // 更改为调用全局this -> 可以用来获取store里的信息
          const _this = this

          this.$axios.post('http://localhost:8081/login', this.ruleForm).then(res => {
            // 接收到来自后端的消息
            console.log(res.headers)
            console.log(res)

            // 接受后端返回的数据
            // 希望全局都可以访问到jwt的内容 -> 使用 /store/index.js
            // header中authorization字段即为用户登录后的权限验证
            const jwt = res.headers['authorization']
            const userInfo = res.data.data

            console.log(userInfo)

            // 将jwt和userInfo共享给整个vue项目
            _this.$store.commit("SET_TOKEN",jwt)
            _this.$store.commit("SET_USERINFO", userInfo)

            // 验证 -> 获取userInfo
            console.log(this.$store.getters.getUser)

            // 验证成功后，跳转到user页面
            _this.$router.push("/user")
          })
          // 认证不通过的情况 -> 全局axios拦截
        } else {
          console.log('error submit!!')
          alert('Please check your input')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    changePass(value) {
      this.invisible = !(value === 'show');
    }    //判断渲染，true:暗文显示，false:明文显示
  },
}
</script>

<style scoped>
.el-header {
  background-color: skyblue;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 100px;
  margin-top: -50px;
  height: 100px;
}

/*.login-wrap {*/
/*  position: relative;*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  background-image: url(../assets/img/login-bg.jpg);*/
/*  background-size: 100%;*/
/*}*/

.ms-content {
  padding: 30px 30px;
}

.ms-login {
  position: absolute;
  left: 40%;
  top: 25%;
  width: 500px;
  height: 800px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.login-btn {
  /*margin-top: -70px;*/
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
</style>