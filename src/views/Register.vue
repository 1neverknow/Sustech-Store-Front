<!--用户注册界面-->

<template>
  <div class="register-wrap">
    <el-card class="ms-register">
      <el-container>
        <el-header class="header" style="height: 100px">
          <img src="@/assets/pic.png" style="width: 90px; margin-top: 4px"/>
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
            <el-form-item label="Name" prop="name">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="E-Mail Address" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>


            <el-form-item v-if="this.invisible" label="Password" prop="password">
              <el-input type="password" v-model="ruleForm.password" style="width: 420px"></el-input>
              <el-button type="primary" @click="changePass('show')" style="width: 100px; float: right">Show</el-button>
            </el-form-item>
            <el-form-item v-else label="Password" prop="password">
              <el-input type="text" v-model="ruleForm.password" style="width: 420px"></el-input>
              <el-button type="default" @click="changePass('hide')" style="width: 100px; float: right">Hide</el-button>
            </el-form-item>


            <el-form-item label="" prop="agree" style="margin-top: -10px">
              <el-checkbox v-model="accept" label="I agree to"></el-checkbox>
              <el-link href="https://www.sustech.edu.cn/" type="primary" style="height: 15px; margin-top: -2px">Terms and Conditions</el-link>
            </el-form-item>

            <el-form-item class="register-btn" style="margin-top: 30px">
              <el-button type="primary" @click="submitForm('ruleForm')">Register</el-button>
            </el-form-item>

            <div style="font-size: 14px; margin-top: -10px; float: right">
              <!--      跳转到登录账号-->
              Already have an account?
              <router-link to="/login">
                <el-link type="primary" style="height: 15px; margin-top: -5px">Login</el-link>
              </router-link>
            </div>

          </el-form>
        </el-main>
      </el-container>
    </el-card>

    <div id="app1" class="special-effect">
      <vue-particles
          color="#FFF"
          :particleOpacity="0.7"
          :particlesNumber="60"
          shapeType="circle"
          :particleSize="4"
          linesColor="#CCCCCC"
          :linesWidth="1"
          :lineLinked="true"
          :lineOpacity="0.4"
          :linesDistance="150"
          :moveSpeed="5"
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
  name: "Register",
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
      console.log('validate password', value)
      if (value === '') {
        callback(new Error('Password is required'));
      } else if (value.length < 6) {
        callback(new Error('Length must be more than 6'));
      } else {
        const regex="^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[0-9].*)(?=.*[~!@#$%^&*()_+|<>,\\.?\\/:;'\\[\\]\\{\\}\\\\].*).{8,16}$"
        if (!regex.test(value)) {
          callback(new Error('Password is too weak'));
        }
        callback();
      }
    };
    return {
      labelPosition: 'top',
      ruleForm: {
        username:'',
        email: '',
        password: '',
        gender: 2,
      },
      accept: '',
      rules: {
        username:[
          {required: true, message: 'Please input a name', trigger: 'blur'},
        ],
        email: [
          {validator: validateEmail, trigger: 'blur',},
        ],
        password: [
          {validator: validatePass, trigger: 'blur',},
        ],
      },
      invisible: true
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.accept) {
          console.log(this)
          console.log(this.ruleForm)
          const _this = this

          const newRequest = axios.create();
          newRequest.post('http://120.24.4.97:8081/user/register', this.ruleForm)
              .then((res)=>{
            // 验证成功后，弹窗提示前往邮箱查看，并跳转到register页面
            Element.Message({
              showClose: true,
              message: 'Please check your email for activation message',
              type: 'success',
            })
            _this.$router.push("/login")
          })
        } else if (!this.accept) {
          Element.Message({
            message: 'You must accept our terms and conditions',
            type: 'error',
          })
          return false
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
.register-wrap {
  background-image: url("../assets/imgs/cosmic.jpg");
  position: fixed;
  background-size: 105%;
  width: 100%;
  height: 100%;
}

.register-wrap .ms-register {
  /*background-color: lightgrey;*/
  margin: 70px auto auto;
  width: 600px;
  height: 600px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);
  overflow: hidden;
  /*overflow: hidden;*/
}

.register-wrap .ms-register .header {
  /*margin-top: 40px;*/
  background-color: skyblue;
  text-align: center;
  line-height: 100px;
  width: 100%;
}
.register-wrap .ms-register .ms-content {
  margin-top: 10px;
}

.el-form-item {
  margin-top: -20px;
}

.register-btn {
  margin-top: 5px;
  text-align: center;
}
.register-btn button {
  width: 100%;
  height: 45px;
  margin-bottom: 10px;
}
.register-wrap .special-effect {
  margin-top: -52%;
}
</style>