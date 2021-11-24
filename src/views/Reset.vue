<!--密码重设界面-->

<template>
  <div class="reset-wrap">
    <el-card class="ms-reset">
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
import Element from "element-ui";

export default {
  name: "Reset",
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Password is required'));
      } else{
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
          const commitForm = {
            type: 0,
            content: this.ruleForm.password,
            checkCode: null,
          }
          this.$axios.post('http://localhost:8081/user/security', commitForm)
              .then(res => {
                Element.Message({
                  message: 'Reset Success!',
                  type: 'success',
                })
                this.$router.push("/login")
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
.reset-wrap {
  background-image: url("../assets/imgs/rhythm-link.jpg");
  position: fixed;
  background-size: 105%;
  width: 100%;
  height: 100%;
}
.el-header {
  margin-top: -90px;
  background-color: skyblue;
  text-align: center;
  line-height: 100px;
  height: 100px;
}

.ms-content {
  /*padding: 30px 30px;*/
}

.ms-reset {
  margin: 70px auto auto;
  width: 600px;
  height: 500px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);
  overflow: hidden;
}

.submit-btn {
  margin-top: 50px;
  text-align: center;
}
.submit-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.reset-wrap .special-effect {
  margin-top: -50%;
}
</style>