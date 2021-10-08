<!--忘记密码 - 输入邮箱 - 邮箱验证-->

<template>
  <div class="ms-forgot">
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
            <el-input v-model="ruleForm.email" style="width: 320px"></el-input>
<!--            倒计时按钮-->
            <el-button type="primary" :disabled="verify.disable" @click="resetForm('ruleForm')">{{verify.getCode}}</el-button>
<!--            <el-button type="primary" :disabled="verify.disable" @click="getVerifyCode">{{verify.getCode}}</el-button>-->
          </el-form-item>

          <el-form-item label="Varify Code" prop="varifycode">
            <el-input v-model="ruleForm.varifycode"></el-input>
          </el-form-item>

          <div class="reset-btn">
            <el-button type="primary" style="margin-top: 30px" @click="submitForm('ruleForm')">Reset</el-button>
          </div>

        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Element from "element-ui";

export default {
  name: "Forgot",

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
    };
    var countdown = setInterval(() => {
      if (this.count < 1) {
        this.isGeting = false
        this.disable = false
        this.getCode = 'Send'
        this.count = 60
        clearInterval(countDown)
      } else {
        this.isGeting = true
        this.disable = true
        this.getCode = this.count-- + 's'
      }
    }, 1000);
    return {
      labelPosition: 'top',
      ruleForm: {
        email: '111111@qq.com',
        varifycode: '',
      },
      rules: {
        email: [
          {validator: validateEmail, trigger: 'blur',},
        ],
        varifycode: {trigger: 'blur',}
      },
      verify: {
        isGeting: false,
        getCode: 'Send',
        disable: false,
        time_out: 0
      }
    }
  },
  methods: {
    // 提交请求重设密码的表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 更改为调用全局this -> 可以用来获取store里的信息
          const _this = this
          this.$axios({
            method: 'post',
            url: 'http://localhost:8081/login/reset'
                + "?email=" + this.ruleForm.email
                + "&verifycode=" + this.ruleForm.varifycode,
            data: {
              email: this.ruleForm.email,
              password: this.ruleForm.password,
            },
            transformRequest: [function (data) {  // 将{username:111,password:111} 转成 username=111&password=111
              var ret = '';
              for (var it in data) {
                // 如果要发送中文 编码
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret.substring(0,ret.length-1)
            }],
          }).then(res => {
            // 验证成功后，跳转到reset页面
            _this.$router.push("/login/reset")
          })
        } else {
          console.log('error submit!!')
          Element.Message({
            showClose: true,
            message: 'Please check your input',
            type: 'error',
          })
          return false
        }
      })
    },
    // 提交获取验证码的表单（未填写验证码）
    resetForm(formName) {
      this.$refs[formName].validateField("email", error => {
        if (!error) {
          this.$axios({
            method: 'post',
            url: 'http://localhost:8081/login/forgot'
                + "?email=" + this.ruleForm.email,
            data: {
              email: this.ruleForm.email,
            },
            transformRequest: [function (data) {  // 将{username:111,password:111} 转成 username=111&password=111
              var ret = '';
              for (var it in data) {
                // 如果要发送中文 编码
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret.substring(0,ret.length-1)
            }],
          }).then(res => {
            var countdown = setInterval(() => {
              if (this.verify.time_out < 1) {
                console.log("send verify code")
                this.verify.isGeting = false
                this.verify.disable = false
                this.verify.getCode = 'Send'
                this.verify.time_out = 6
                clearInterval(countdown)
              } else {
                console.log("sending")
                this.verify.isGeting = true
                this.verify.disable = true
                this.verify.getCode = --this.verify.time_out + 's'
              }
            }, 1000);
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>

<style scoped>
.el-header {
  background-color: skyblue;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 100px;
  /*margin-top: -50px;*/
  /*margin-bottom: -30px;*/
  height: 100px;
}

.ms-content {
  padding: 30px 30px;
}

.ms-forgot {
  position: absolute;
  left: 40%;
  top: 30%;
  width: 500px;
  height: 800px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.reset-btn {
  text-align: center;
  margin-top: -10px;
}
.reset-btn button {
  width: 100%;
  height: 36px;
}
</style>