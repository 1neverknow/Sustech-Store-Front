<template>
  <div class="confirmOrder">
    <div class="confirmOrder-header">
      <div class="header-content">
        <p>
          <i class="el-icon-s-order"></i>
        </p>
        <p>Deal Confirm</p>
        <router-link to></router-link>
      </div>
    </div>

    <div class="content">
      <div class="section-address">
        <p class="title">Addresses</p>
        <div class="address-body">
          <ul>
            <li
                :class="item.addressId === dealInfo.confirmAddress ? 'in-section' : ''"
                v-for="item in userInfo.addresses"
                :key="item.addressId"
                @click="dealInfo.confirmAddress = item.addressId"
            >
              <h2>{{item.recipientName}}</h2>
              <p class="phone">{{item.phone}}</p>
              <p class="address">{{item.addressName}}</p>
            </li>
            <li class="add-address">
              <i class="el-icon-circle-plus-outline" @click="changeAddressVisible(true)"></i>
              <p>Add New Address</p>
            </li>
          </ul>
        </div>
        <!-- 修改修改地址的对话框 -->
        <el-dialog
            title="Add Address"
            :visible.sync="addressVisible"
            width="50%"
        >
          <AddressDialogue
              v-if="addressVisible"
              @refresh="refreshAddress"
              @changeAddressVisible="changeAddressVisible"
              v-bind:addressForm="addressForm"
          ></AddressDialogue>
        </el-dialog>
      </div>

      <div class="section-goods">
        <p class="title">Goods Info</p>
        <div class="goods-list">
          <li
              v-for="item in goodsList"
              :key="item.id"
          >
            <img :src="item.goodsPicture" />
            <span class="pro-name">{{item.goodsName}}</span>
            <span class="pro-total">￥ {{item.price}}</span>
          </li>
        </div>
      </div>
      <div class="section-shipment">
        <p class="title">Postage</p>
        <p class="shipment">￥{{this.dealInfo.postage}}</p>
      </div>

      <!--      结算列表-->
      <div class="section-count">
        <ul class="money-box">
          <li>
            <span class="title">Postage: </span>
            <span class="value">{{this.dealInfo.postage}}</span>
          </li>
          <li>
            <span class="total">Total:</span>
            <span class="value">
              <span class="total-price">{{getTotalPrice()}}</span>
            </span>
          </li>
        </ul>
      </div>

      <!--      结算导航-->
      <div class="section-bar">
        <div class="btn">
          <router-link
              :to="{path: '/goods/' + this.goodsList[0].goodsId}"
              class="btn-base btn-cancel"
          >Cancel</router-link>
          <a href="javascript:void(0);"
             @click="addDeal"
             class="btn-base btn-primary"
          >Pay</a>
          <el-dialog  :visible.sync="payVisible" append-to-body>
            <Pay
                @changePayVisible="changePayVisible"
                @refresh="dealSuccess"
                v-if="payVisible"
                v-bind:dealId="dealInfo.dealId"
            ></Pay>
          </el-dialog>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Element from "element-ui"
import store from "@/store"
import Pay from "@/components/Pay"
import Charge from "@/components/Charge"
import AddressDialogue from "@/components/AddressDialogue"
export default {
  name: "Deal",
  components: {Pay, Charge, AddressDialogue},
  data() {
    return {
      chargeVisible: false,
      payVisible: false,
      addressVisible: false,
      dealInfo: {
        dealId: '',
        stage: 0,    // 订单状态
        postage: 10, // 邮费 or 包邮
        confirmAddress: 1, // 选中的地址
        total: '',
      },
      userInfo: {
        buyId: 11111,  //买家id
        addresses: [
        ],  // 可选地址
      },
      goodsList: [
        {
          sellerId: 22222, // 卖家id
          goodsId: 111111, // 商品id,
          goodsName: 'Mana Stone',
          goodsPicture: '',
          price: 111111, // 商品单价
          number: 1111,  // 购买的商品数
        }
      ],
      addressForm: {
        recipientName: '',
        phone: '',
        addressName: ''
      },
    }
  },
  methods: {
    activate() {
      let buyId = store.getters.getUser.userId
      console.log(buyId)
      if (!buyId) {
        alert('Authorization time out')
        this.$router.push({ path: "/login" })
      }
      this.getDealInfo()
      this.getAddressInfo()
      this.userInfo.buyId = buyId
    },
    getDealInfo() {
      const goodsId = this.$route.params.goodsId
      if (!goodsId) {
        Element.Message({
          message: 'Goods ID not exist!',
          type: 'error',
        })
        this.$router.push('/none')
        return
      }
      this.$axios({
        method: 'get',
        url: 'http://localhost:8081/goods/' + goodsId,
      }).then(res => {
        const info = res.data.data
        console.log(info)
        this.getGoodsInfo(info)
      })
    },
    getGoodsInfo(goodsAbbreviation) {
      this.goodsList[0].goodsId = goodsAbbreviation.goodsId
      this.goodsList[0].goodsName = goodsAbbreviation.title
      this.goodsList[0].goodsPicture = goodsAbbreviation.picturePath[0].path
      this.goodsList[0].sellerId = goodsAbbreviation.announcer.userId
      this.goodsList[0].price = goodsAbbreviation.price
      this.goodsList[0].number = 1
      this.dealInfo.postage = goodsAbbreviation.postage
    },
    getAddressInfo() {
      this.$axios.get('http://localhost:8081/user/address/')
      .then(res => {
        // const addresses = res.data.data
        this.userInfo.addresses = res.data.data
      })
    },
    addDeal() {
      this.$axios({
        method: 'post',
        url: 'http://localhost:8081/deal/addDeal'
            + "?addressId=" + this.dealInfo.confirmAddress
            + "&goodsId=" + this.goodsList[0].goodsId
      }).then(res => {
        // 提示结算结果
        this.dealInfo.dealId = res.data.data
        this.payVisible = true
      })
    },
    getTotalPrice() {
      this.total = this.goodsList[0].number * this.goodsList[0].price + this.dealInfo.postage;
      return this.total
    },
    changeVisible(val) {
      this.chargeVisible = val
    },
    changeAddressVisible(val) {
      this.addressVisible = val
    },
    changePayVisible(val) {
      this.payVisible = val
    },
    refreshAddress() {
      this.getAddressInfo()
    },
    dealSuccess() {
      this.$router.push('/goods/' + this.goodsList[0].goodsId)
    }
  },
  mounted() {
    this.activate()
  }
}
</script>

<style scoped>
.confirmOrder {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
.confirmOrder .confirmOrder-header {
  background-color: #fff;
  border-bottom: 2px solid deepskyblue;
  margin-bottom: 20px;
  margin-top: -50px;
  width: 100%;
}
.confirmOrder .confirmOrder-header .header-content {
  width: 1225px;
  margin: 30px auto;
  height: 80px;
}
.confirmOrder .confirmOrder-header .header-content p {
  float: left;
  font-size: 28px;
  line-height: 80px;
  color: #424242;
  margin-right: 20px;
}
.confirmOrder .confirmOrder-header .header-content p i {
  font-size: 45px;
  color: deepskyblue;
  line-height: 80px;
}
.confirmOrder .content {
  width: 1225px;
  margin: 0 auto;
  padding: 30px 0 0;
  background-color: #fff;
}
.confirmOrder .content .section-address {
  margin: 0 48px;
  overflow: hidden;
}
.confirmOrder .content .section-address .title {
  color: #333;
  font-size: 18px;
  line-height: 20px;
}
.confirmOrder .content .address-body li {
  list-style: none;
  float: left;
  color: #333;
  width: 180px;
  height: 128px;
  border: 1px solid #e0e0e0;
  padding: 15px 24px 0;
  margin: 30px 30px 30px auto;
}
.confirmOrder .content .address-body .in-section {
  border: 1px solid deepskyblue;
  -moz-box-shadow:2px 2px 10px skyblue;
  -webkit-box-shadow:2px 2px 10px skyblue;
  box-shadow:2px 2px 10px skyblue;
}
.confirmOrder .content .address-body li h2 {
  font-size: 18px;
  font-weight: normal;
  /*line-height: 30px;*/
  margin-top: 2px;
  margin-bottom: 6px;
}
.confirmOrder .content .address-body li p {
  font-size: 14px;
  color: #757575;
}
.confirmOrder .content .address-body li .address {
  padding: 10px 0;
  max-width: 180px;
  max-height: 88px;
  overflow: hidden;
}
.confirmOrder .content .address-body .add-address {
  text-align: center;
  /*line-height: 30px;*/
}
.confirmOrder .content .address-body .add-address i {
  font-size: 30px;
  padding-top: 25px;
  text-align: center;
}
.confirmOrder .content .address-body .add-address i:hover {
  color: #ff6700;
}
.confirmOrder .content .section-goods {
  margin: 0 48px;
}
.confirmOrder .content .section-goods p.title {
  color: #333;
  font-size: 18px;
  line-height: 40px;
}
.confirmOrder .content .section-goods .goods-list {
  padding: 5px 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
.confirmOrder .content .section-goods .goods-list li {
  padding: 10px 0;
  margin-top: 10px;
  color: #424242;
  overflow: hidden;
  list-style: none;
}
.confirmOrder .content .section-goods .goods-list li img {
  float: left;
  width: 60px;
  height: 60px;
  margin-top: -10px;
  margin-right: 10px;
}
.confirmOrder .content .section-goods .goods-list li .pro-name {
  float: left;
  width: 500px;
  line-height: 30px;
}
.confirmOrder .content .section-goods .goods-list li .pro-price {
  float: left;
  width: 150px;
  text-align: center;
  line-height: 30px;
}
.confirmOrder .content .section-goods .goods-list li .pro-status {
  float: left;
  width: 99px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
.confirmOrder .content .section-goods .goods-list li .pro-total {
  float: right;
  width: 190px;
  color: #ff6700;
  line-height: 30px;
}
.confirmOrder .content .section-shipment {
  margin: 0 48px;
  padding: 25px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
  height: 50px;
}
.confirmOrder .content .section-shipment .title {
  float: left;
  width: 885px;
  color: #333;
  font-size: 18px;
  line-height: 20px;
}
.confirmOrder .content .section-shipment .shipment {
  float: right;
  width: 190px;
  color: #ff6700;
  line-height: 30px;
}
.confirmOrder .content .section-invoice {
  margin: 0 48px;
  padding: 25px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
}
.confirmOrder .content .section-invoice .title {
  float: left;
  width: 150px;
  color: #333;
  font-size: 18px;
  line-height: 38px;
}
.confirmOrder .content .section-invoice .invoice {
  float: left;
  line-height: 38px;
  font-size: 14px;
  margin-right: 20px;
  color: #ff6700;
}
.confirmOrder .content .section-count {
  margin: 0 150px;
  overflow: hidden;
}
.confirmOrder .content .section-count .money-box {
  float: right;
  text-align: right;
  margin-bottom: 20px;
  margin-left: 600px;
  list-style: none
}
.confirmOrder .content .section-count .money-box .title {
  float: left;
  width: 126px;
  height: 50px;
  display: block;
  line-height: 30px;
  color: #757575;
  margin-bottom: 20px;
  margin-left: -30%;
}
.confirmOrder .content .section-count .money-box .total {
  /*float: left;*/
  width: 126px;
  height: 50px;
  display: block;
  line-height: 30px;
  color: #757575;
  margin-left: -30%;
}
.confirmOrder .content .section-count .money-box .value {
  float: right;
  min-width: 105px;
  height: 30px;
  display: block;
  line-height: 30px;
  color: #ff6700;
  /*margin-right: -20%;*/
}
.confirmOrder .content .section-count .money-box .total .title {
  padding-top: 15px;
}
.confirmOrder .content .section-count .money-box .total .value {
  padding-top: 10px;
}
.confirmOrder .content .section-count .money-box .total-price {
  font-size: 30px;
  margin-left: 50px;
}
.confirmOrder .content .section-bar {
  padding: 20px 48px;
  border-top: 2px solid #f5f5f5;
  overflow: hidden;
  /*margin-left: -100px;*/
}
.confirmOrder .content .section-bar .btn {
  float: right
}
.confirmOrder .content .section-bar .btn .btn-base {
  float: left;
  margin-right: 100px;
  /*margin-left: 50px;*/
  width: 158px;
  height: 38px;
  border: 1px solid #b0b0b0;
  font-size: 14px;
  line-height: 38px;
  text-align: center;
}
.confirmOrder .content .section-bar .btn .btn-cancel {
  text-decoration-line: none;
  background: lightgrey;
  border-color: lightgrey;
  color: #fff;
  margin-right: 20px;
}
.confirmOrder .content .section-bar .btn .btn-cancel:hover {
  background-color: grey;
}
.confirmOrder .content .section-bar .btn .btn-primary {
  text-decoration-line: none;
  background: lightskyblue;
  border-color: lightskyblue;
  color: #fff;
}
.confirmOrder .content .section-bar .btn .btn-primary:hover {
  background: deepskyblue;
}
</style>