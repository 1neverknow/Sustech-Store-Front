<!--密码重设界面-->

<template>
  <div class="ms-reset">
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
          <el-form-item label="New Password" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="Input Your Password Again" prop="confirm">
            <el-input type="password" v-model="ruleForm.confirm"></el-input>
          </el-form-item>

          <div class="submit-btn">
            <el-button type="primary" style="margin-top: 30px" @click="submitForm('ruleForm')">Submit</el-button>
          </div>

        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Element from "element-ui";

export default {
  name: "Reset",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Password is required'));
      } else if(value.length < 6){
        callback(new Error('Length must be more than 6'));
      }else{
        callback();
      }
    };
    var validateConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input your password again'));
      } else if(value !== this.ruleForm.password) {
        callback(new Error('Password should be same'));
      } else {
        callback();
      }
    };
    return {
      labelPosition: 'top',
      ruleForm: {
        password: '',
        confirm: '',
      },
      rules: {
        password: [
          {
            validator: validatePass,
            trigger: 'blur',
          },
        ],
        confirm: [
          {
            validator: validateConfirm,
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
          Element.Message({
            showClose: true,
            message: 'Congrats, this is a success message.',
            type: 'success',
          })
          // 更改为调用全局this -> 可以用来获取store里的信息
          const _this = this

          this.$axios.post('http://localhost:8081/login/reset', this.ruleForm).then(res => {
            const jwt = res.headers['authorization']
            _this.$store.commit("SET_TOKEN",jwt)
            // 验证成功后，跳转到login页面
            _this.$router.push("/login")
          })
          // 认证不通过的情况 -> 全局axios拦截
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

.ms-reset {
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

.submit-btn {
  text-align: center;
}
.submit-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
</style>