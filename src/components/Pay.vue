<template>
  <el-card class="box-card">
    <ul class="msg-box">
      <li style="margin-top: -50px">
        <h2>Pay</h2>
      </li>
      <li>
        <el-radio-group v-model="rechargeParams.paymentType" @change="paymentTypeChange">
          <el-radio :label="''+ 0">Wechat Pay</el-radio>
          <el-radio :label="''+ 1">Ali-Pay</el-radio>
          <el-radio :label="''+ 2">Account Balance</el-radio>
        </el-radio-group>
      </li>
    </ul>
    <div style="text-align: left; margin-top: 30px; margin-left: 8%">
      <el-button type="primary" @click="getPay" style="width: 140px">Confirm</el-button>
      <el-button @click="closeDialog" style="width: 140px">Cancel</el-button>
    </div>
    <div style="margin-top: -30px; font-size: 14px; float: right">
      <!--      跳转到创建账号-->
      Don't have money?
      <el-button
          @click="changeChargeVisible(true)"
          style="height: 15px; margin-top: -5px; text-decoration: underline"
          type="text"
      >Charge</el-button>
      <el-dialog  :visible.sync="chargeVisible" append-to-body>
        <Charge
            v-if="chargeVisible"
            @changeVisible="changeChargeVisible"
            v-bind:dealId="dealId"
        ></Charge>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import Charge from "@/components/Charge"
import Element from 'element-ui'
export default {
  props: ['dealId'],
  components: {Charge},
  data() {
    return {
      rechargeParams: {
        "totalAmt": '', //金额
        "paymentType": "0", //支付方式[0:微信,1:支付宝,2:余额,3:活动]
        "transType": "0" //交易类型[0:充值,1:消费]
      },
      chargeVisible: false,
    }
  },
  methods: {
    //支付方式
    paymentTypeChange(val) {
      this.rechargeParams.paymentType = val
    },
    //确认支付
    getPay() {
      if (this.rechargeParams.paymentType !== '2') {
        Element.Message({
          message: 'You can only pay by account balance...',
          type: 'error',
        })
        return
      }
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
    changeChargeVisible(value) {
      this.chargeVisible = value
    },
    closeDialog() {
      this.$emit('changePayVisible', false)
    },
  }
}
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
/* 信息列表样式 */
.msg-box > li {
  list-style: none;
  border-bottom: 1px solid #c5c5c5;
  padding: 20px 10px;
}
</style>