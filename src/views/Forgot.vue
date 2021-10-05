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
            <el-button type="primary" @click="resetForm('ruleForm')">Send</el-button>
          </el-form-item>
<!--          <div class="send-btn">-->
<!--            <el-button type="primary" @click="resetForm('ruleForm')">Send</el-button>-->
<!--          </div>-->

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
    return {
      labelPosition: 'top',
      ruleForm: {
        email: '',
        varifycode: '',
      },
      rules: {
        email: [
          {validator: validateEmail, trigger: 'blur',},
        ],
        varifycode: {trigger: 'blur',}
      },
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
          this.$axios.post('http://localhost:8081/login/forgot', this.ruleForm).then(res => {
            // 接收到来自后端的消息
            console.log(res.headers)
            console.log(res)
            const jwt = res.headers['authorization']
            _this.$store.commit("SET_TOKEN",jwt)
            // 验证成功后，跳转到reset页面
            _this.$router.push("/login/reset")
          })
        } else {
          console.log('error submit!!')
          alert('Please check your input')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].validateField("email", error => {
        if (!error) {
          Element.Message({
            showClose: true,
            message: 'Input the verification code within 5 min',
            type: 'success',
          })

          const _this = this
          this.$axios.post('http://localhost:8081/login/forgot', this.ruleForm.email).then(res => {
            console.log(res.headers)
            console.log(res)
            const jwt = res.headers['authorization']
            _this.$store.commit("SET_TOKEN", jwt)
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