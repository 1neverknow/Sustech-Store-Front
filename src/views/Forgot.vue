<!--忘记密码 - 输入邮箱 - 邮箱验证-->

<template>
  <div class="forgot-wrap">
    <el-card class="ms-forgot">
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
              :label-position="labelPosition"
              label-width="0px"
              class="ms-content"
          >
            <el-form-item label="E-Mail Address" prop="email">
              <el-input v-model="ruleForm.email" style="width: 420px;"></el-input>
<!--              <el-button-->
<!--                  type="primary"-->
<!--                  :disabled="verify.disable"-->
<!--                  @click="sendCode('ruleForm')"-->
<!--                  style="width: 100px;"-->
<!--              >{{verify.getCode}}</el-button>-->
              <el-button
                  type="primary"
                  :disabled="disable"
                  :class="{ codeGetting:isGeting }"
                  @click="sendCode('ruleForm')"
                  style="width: 100px;"
              >{{getCode}}</el-button>
            </el-form-item>

            <el-form-item label="Varify Code" prop="varifycode">
              <el-input v-model="ruleForm.varifycode"></el-input>
            </el-form-item>

            <el-form-item label="" style="margin-top: -15px">
              <router-link to="/login">
                <el-link type="primary" style="float: left; height: 15px; margin-top: 15px">< Back to login</el-link>
              </router-link>
            </el-form-item>

            <div class="reset-btn">
              <el-button type="primary" style="margin-top: -5px" @click="submitForm('ruleForm')">Reset</el-button>
            </div>

          </el-form>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import Element from "element-ui";

export default {
  name: "Forgot",

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
    return {
      labelPosition: 'top',
      ruleForm: {
        email: 'c001hewanning@qq.com',
        varifycode: '',
      },
      rules: {
        email: [
          {validator: validateEmail, trigger: 'blur',},
        ],
        varifycode: {trigger: 'blur',}
      },
      getCode: 'Send',
      isGeting: false,
      count: 30,
      disable: false
    }
  },
  methods: {
    // 提交请求重设密码的表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'get',
            url: 'http://localhost:8081/user/checkEmail?'
                + "checkCode=" + this.ruleForm.varifycode
                + "&email=" + this.ruleForm.email,
          }).then(res => {
            Element.Message({
              message: 'Verify Success!',
              type: 'success',
            })
            const jwt = res.headers['authorization']
            this.$store.commit("SET_TOKEN",jwt)
            // 验证成功后，跳转到reset页面
            this.$router.push("/login/reset")
          })
        } else {
          console.log('error submit!!')
          Element.Message({
            message: 'Please check your code',
            type: 'error',
          })
          return false
        }
      })
    },
    // 提交获取验证码的表单（未填写验证码）
    sendCode(formName) {
      this.$refs[formName].validateField("email", error => {
        if (!error) {
          this.$axios({
            method: 'get',
            url: 'http://localhost:8081/user/sendCode?email=' + this.ruleForm.email,
          }).then(res => {
            var countDown = setInterval(() => {
              if (this.count < 1) {
                this.isGeting = false
                this.disable = false
                this.getCode = 'Send'
                this.count = 6
                clearInterval(countDown)
              } else {
                this.isGeting = true
                this.disable = true
                this.getCode = this.count-- + 's'
              }
            }, 1000)
          })
        } else {
          Element.Message({
            message: 'Please check your email',
            type: 'error',
          })
          return false
        }
      })
    },
  },
}
</script>

<style scoped>
.forgot-wrap {
  background-image: url("../assets/imgs/new-dimension.jpg");
  position: fixed;
  background-size: 105%;
  width: 100%;
  height: 100%;
}
.ms-forgot {
  margin: 70px auto auto;
  width: 600px;
  height: 500px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);
  overflow: hidden;
}
.el-header {
  margin-top: -90px;
  background-color: skyblue;
  /*color: var(--el-text-color-primary);*/
  text-align: center;
  line-height: 100px;
  height: 100px;
}
.ms-content {
  /*padding: 30px 30px;*/
}
.reset-btn {
  text-align: center;
  margin-top: 50px;
}
.reset-btn button {
  width: 100%;
  height: 36px;
}
.codeGetting{
  background: #cdcdcd;
  border-color: #cdcdcd;
}
</style>