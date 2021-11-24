<!--用户注册后激活的页面-->
<template>
  <div>
    <h1>{{this.content}}</h1>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Activate",
  data() {
    return {
      activateCode: '',
      content: 'Wait for activating your account...'
    }
  },
  methods: {
    get() {
      this.activateCode = this.$route.query.activateCode
      console.log('get activate code: ' + this.activateCode)
    },
    send() {
      // 获取收藏夹数据
      const newRequest = axios.create({
        baseUrl: "http://120.24.4.97:8081"//请求地址
      });
      newRequest.put("http://120.24.4.97:8081/user/activate/" + this.activateCode)
        .then(res => {
          this.content = 'Activate account successfully! You can close this page'
      })
    },
    change() {
      this.success = true
    }
  },
  mounted() {
    this.get()
    this.send()
  },
}
</script>

<style scoped>

</style>