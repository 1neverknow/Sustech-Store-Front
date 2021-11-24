<template>
  <el-popconfirm
      confirm-button-text="Yes"
      cancel-button-text="No, Thanks"
      icon-color="red"
      title="Are you sure to cancel the order?"
      @confirm="confirmEvent"
      @cancel="cancelEvent"
  >
    <template #reference>
      <el-button
          icon="el-icon-close"
          size="mini"
          type="danger"
          plain
      >Refund</el-button>
    </template>
  </el-popconfirm>
</template>

<script>
import Element from 'element-ui'
export default {
  name: "Refund",
  props: ['dealId'],
  methods: {
    confirmEvent() {
      console.log('confirm!')
      this.refund()
    },
    cancelEvent() {
      console.log('cancel')
    },
    refund() {
      console.log(this.dealId)
      this.$axios.put('http://120.24.4.97:8081/deal/refund/' + this.dealId)
        .then(res => {
          Element.Message({
            message: 'Success!',
            type: 'success',
          })
          this.$emit('refresh')
        })
    },
  }
}
</script>

<style scoped>

</style>