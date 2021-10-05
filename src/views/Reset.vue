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
          <el-form-item label="Input Your Password Again" prop="password">
            <el-input type="password" v-model="ruleForm.confirm"></el-input>
          </el-form-item>

          <div class="submit-btn">
            <el-button type="primary" style="margin-top: 30px" @click="submitForm()">Submit</el-button>
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
    getPwd() {
      return this.ruleForm.password
    }
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