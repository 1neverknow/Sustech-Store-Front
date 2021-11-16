<template>
  <el-card class="box-card">
    <ul class="msg-box">
      <li style="margin-top: -50px">
        <h2>Pay</h2>
      </li>
      <li>
        <h4 style="margin-bottom: 15px;">Payment Method</h4>
        <el-radio-group v-model="rechargeParams.paymentType" @change="paymentTypeChange">
          <el-radio border :label="''+ 0">Wechat Pay</el-radio>
          <el-radio border :label="''+ 1">Ali-Pay</el-radio>
          <el-radio border :label="''+ 2">Account Balance</el-radio>
        </el-radio-group>
      </li>
    </ul>
    <div style="text-align: center; margin-top: 30px;">
      <el-button type="primary" @click="getPay">Confirm</el-button>
    </div>
  </el-card>
</template>

<script>
import Element from 'element-ui'
export default {
  props: ['dealId'],
  data() {
    return {
      rechargeParams: {
        "totalAmt": '', //金额
        "paymentType": "0", //支付方式[0:微信,1:支付宝,2:余额,3:活动]
        "transType": "0" //交易类型[0:充值,1:消费]
      }
    }
  },
  methods: {
    //支付方式
    paymentTypeChange(val) {
      this.rechargeParams.paymentType = val
    },
    //确认支付
    getPay() {
      this.$axios({
        method: 'put',
        url: 'http://localhost:8081/deal/pay/' + this.dealId
      }).then(res => {
        Element.Message({
          message: 'Pay Success!',
          type: 'success',
        })
        this.$emit('refresh')
        this.closeDialog()
      })
    },
    closeDialog() {
      this.$emit('changePayVisible', false)
    },
  }
}
</script>

<style scoped>
/* 信息列表样式 */
.msg-box > li {
  list-style: none;
  border-bottom: 1px solid #c5c5c5;
  padding: 20px 10px;
}
</style>