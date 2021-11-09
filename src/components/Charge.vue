<template>
  <el-card class="box-card">
    <ul class="msg-box">
      <li style="margin-top: -50px">
        <h2>Charge</h2>
      </li>
      <li>
        <h4 style="margin-bottom: 15px;">Amount</h4>
        <el-radio-group v-model="amount" @change="amountChange">
          <el-radio border :label="''+ 500">￥500</el-radio>
          <el-radio border :label="''+ 1000">￥1000</el-radio>
          <el-radio border :label="''+ 5000">￥5000</el-radio>
          <el-radio border :label="''">Customize</el-radio>
        </el-radio-group>
      </li>
      <li>
        <!--        <h4 style="margin-bottom: 15px;"></h4>-->
        <el-input :disabled="disabled" clearable v-model="rechargeParams.totalAmt" placeholder="Charging Amount" style="width: 200px;"></el-input>
      </li>
      <li>
        <h4 style="margin-bottom: 15px;">Payment Method</h4>
        <el-radio-group v-model="rechargeParams.paymentType" @change="paymentTypeChange">
          <el-radio border :label="''+ 0">Wechat Pay</el-radio>
          <el-radio border :label="''+ 1">Ali-Pay</el-radio>
        </el-radio-group>
      </li>
    </ul>
    <div style="text-align: center; margin-top: 30px;">
      <el-button type="primary" @click="surePay">Confirm</el-button>
    </div>
  </el-card>
</template>

<script>
import Element from 'element-ui'
export default {
  data() {
    return {
      amount: '',
      disabled: false,
      //充值参数
      rechargeParams: {
        totalAmt: 0, //金额
        paymentType: 0, //支付方式[0:微信,1:支付宝,2:余额,3:活动]
        transType: 0, //交易类型[0:充值,1:消费]
      }
    }
  },
  methods: {
    //充值金额
    amountChange(val) {
      this.rechargeParams.totalAmt = val;
      this.disabled = val !== '';
    },
    //支付方式
    paymentTypeChange(val) {
      this.rechargeParams.paymentType = val
    },
    //确认支付
    surePay() {
      if (this.rechargeParams.totalAmt === '') {
        Element.Message({
          message: 'Please input a price!',
          type: 'error',
        })
        return;
      }
      this.$axios({
        method: 'put',
        url: 'http://localhost:8081/user/charge'
            + '?money=' + this.rechargeParams.totalAmt
      }).then(res => {
        Element.Message({
          message: 'Success!',
          type: 'success',
        })
        // if (res.data.code === 200) {
        //   if (this.rechargeParams.paymentType === '0') {
        //     Element.Message({
        //       message: '微信支付',
        //       type: 'success',
        //     })
        //     this.wechatPay(result);
        //   } else if (this.rechargeParams.paymentType === '1') {
        //     Element.Message({
        //       message: '支付宝支付',
        //       type: 'success',
        //     })
        //     const payDiv = document.getElementById('payDiv');
        //     if (payDiv) {
        //       document.body.removeChild(payDiv);
        //     }
        //     const div = document.createElement('div');
        //     div.id = 'payDiv';
        //     div.innerHTML = result;
        //     document.body.appendChild(div);
        //     document.getElementById('payDiv').getElementsByTagName('form')[0].submit();
        //   } else if (this.rechargeParams.paymentType === '2') {
        //     Element.Message({
        //       message: '余额支付成功',
        //       type: 'success',
        //     })
        //     // this.$router.push({
        //     //   name: 'order'
        //     // })
        //   } else {
        //     Element.Message({
        //       message: '活动支付',
        //       type: 'success',
        //     })
        //   }
        // }
      })
      this.closeDialog()
    },
    //微信支付
    wechatPay(result) {
      if (result) {
        const orderParams = JSON.parse(result);
        sessionStorage.qrurl = orderParams.qrurl;
        sessionStorage.amt = orderParams.amt;
        sessionStorage.returnUrl = orderParams.returnUrl;
        sessionStorage.order_id = orderParams.order_id;
        this.$router.push({
          name: 'wechatPay'
        })
      }
    },
    closeDialog() {
      this.$emit('changeVisible', false)
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