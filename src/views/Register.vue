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
          <el-form-item label="Password" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="" prop="agree" style="margin-top: -20px">
            <el-checkbox v-model="ruleForm.remember" label="I agree to"></el-checkbox>
            <el-link href="http://cn.bing.com" type="primary">Terms and Conditions</el-link>
          </el-form-item>

          <div class="register-btn">
            <el-button type="primary" @click="submitForm()">Register</el-button>
          </div>

          <el-form-item>
            <!--      跳转到创建账号-->
            Already have an account?
            <router-link to="/login">
              <el-link type="primary">Login</el-link>
            </router-link>
          </el-form-item>

        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
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
      }else{
        callback();
      }
    };
    return {
      labelPosition: 'top',
      ruleForm: {
        name:'',
        email: '',
        password: '',
        accept: false,
      },
      rules: {
        name:[
          {required: true, message: 'Please input a name', trigger: 'blur'},
          {min: 3, max: 12, message: 'The length must be 3 to 12 characters', trigger: 'blur'}
        ],
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
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('Submit')
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

.register-btn {
  text-align: center;
}
.register-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
</style>