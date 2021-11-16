<template>
  <div>
    <div style="text-align: left">
      <el-radio v-model="isAgree" label="1" border size="medium"
      >YES</el-radio
      >
      <el-radio v-model="isAgree" label="2" border size="medium"
      >NO</el-radio
      >
    </div>
    <div style="margin-top: 50px; text-align: right">
      <el-button type="primary" @click="submit"
      >Submit</el-button
      >
      <el-button @click="closeDialog">Cancel</el-button>
    </div>
  </div>
</template>

<script>
import Element from 'element-ui'
export default {
  name: "RefundAgree",
  props: ['dealId'],
  data() {
    return {
      isAgree: true,
    }
  },
  methods: {
    submit() {
      this.isAgree = this.isAgree === 1
      this.$axios.put('http://localhost:8081/deal/agreeRefund/'
        + this.dealId
        + '?agree=' + this.isAgree)
        .then((res) => {
          Element.Message({
            message: 'Success!',
            type: 'success',
          })
          this.refresh()
          this.closeDialog()
      })
    },
    closeDialog() {
      this.$emit('changeHandleRefundVisible', false)
    },
    refresh() {
      this.$emit('refresh')
    }
  }
}
</script>

<style scoped>

</style>