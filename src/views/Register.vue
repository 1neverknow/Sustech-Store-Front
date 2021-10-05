<!--用户注册界面-->

<template>
  <div class="ms-register">
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
          <el-form-item label="Name" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
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


          <el-form-item label="" prop="agree" style="margin-top: -10px">
            <el-checkbox v-model="ruleForm.accept" label="I agree to"></el-checkbox>
            <el-link href="https://www.sustech.edu.cn/" type="primary" style="height: 15px; margin-top: -2px">Terms and Conditions</el-link>
          </el-form-item>

          <el-form-item class="register-btn" style="margin-top: -10px">
            <el-button type="primary" @click="submitForm('ruleForm')">Register</el-button>
          </el-form-item>

          <div style="font-size: 14px; margin-top: -10px">
            <!--      跳转到登录账号-->
            Already have an account?
            <router-link to="/login">
              <el-link type="primary" style="height: 15px; margin-top: -5px">Login</el-link>
            </router-link>
          </div>

        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Element from "element-ui";

export default {
  name: "Register",

  data() {
    var validateEmail = (rule, value, callback) => {
      console.log(this)
      console.log(value)

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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Password is required'));
      } else if(value.length < 6){
        callback(new Error('Length must be more than 6'));
      } else {
        callback();
      }
    };
    return {
      labelPosition: 'top',
      ruleForm: {
        name:'mithra',
        email: '1111111@qq.com',
        password: '11111111',
        accept: '',
      },
      rules: {
        name:[
          {required: true, message: 'Please input a name', trigger: 'blur'},
          {min: 3, max: 12, message: 'The length must be 3 to 12 characters', trigger: 'blur'}
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
        if (valid && this.ruleForm.accept) {
          Element.Message({
            showClose: true,
            message: 'Congrats, this is a success message.',
            type: 'success',
          })
          console.log(this)
          console.log(this.ruleForm)
          const _this = this

          this.$axios.post('http://localhost:8081/login', this.ruleForm).then(res => {
            console.log(res.headers)
            console.log(res)
            const jwt = res.headers['authorization']
            // 将jwt和userInfo共享给整个vue项目
            _this.$store.commit("SET_TOKEN",jwt)
            // 验证成功后，弹窗提示前往邮箱查看，并跳转到user页面
            Element.Message({
              showClose: true,
              message: 'Register success! Please check your email for activation message',
              type: 'success',
            })
            _this.$router.push("/login")
          })
          // 认证不通过的情况 -> 全局axios拦截
        } else if (!this.ruleForm.accept) {
          Element.Message({
            showClose: true,
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
.el-header {
  background-color: skyblue;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 100px;
  margin-top: -50px;
  margin-bottom: -30px;
  height: 100px;
}

.ms-content {
  padding: 30px 30px;
}

.ms-register {
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

.show-btn {
  width: 80px;
}

.register-btn {
  text-align: center;
}
.register-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
</style>