<!--用户注册后激活的页面-->
<template>
  <div>
    <template v-if="success">
     <h1>Activate account successfully! You can close this page</h1>
    </template>
    <template v-else>
      <h1>Wait for activating your account...</h1>
    </template>
  </div>
</template>

<script>
export default {
  name: "Activate",
  data() {
    return {
      activateCode: '',
      success: false,
    }
  },
  methods: {
    get() {
      this.activateCode = this.$route.query.activateCode
      console.log('get activate code: ' + this.activateCode)
    },
    send() {
      // 获取收藏夹数据
      this.$axios.post("http://localhost:8081/user/activate/" + this.activateCode)
        .then(res => {
          if (res.data.code === '200') {
            this.success = true
          }
      })
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