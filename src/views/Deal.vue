<!--交易页面-->
<template>
  <div class="confirmOrder">
    <div class="confirmOrder-header">
      <div class="header-content">
        <p><i class="el-icon-s-order>"></i></p>
        <p>Confirm</p>
        <!--      点击支付之后直接返回成功提示，跳转到？-->
        <router-link to></router-link>
      </div>
    </div>

    <div class="content">
<!--      选择地址-->
      <div class="section-address">
        <p class="title">Address</p>
        <div class="address-body">
          <ul>
            <li
              :class="item.id === this.confirmAddress ? 'in-section' : ''"
              v-for="item in this.addresses"
              :key="item.id">
              <h2>{{item.name}}</h2>
              <p class="phone">{{item.phone}}</p>
              <p class="address">{{item.address}}</p>
            </li>
            <li class="add-address">
              <i class="el-icon-circle-plus-outline" @click="addAddress"></i>
              <p>Add New Address</p>
            </li>
          </ul>
        </div>
      </div>

<!--      购买的商品-->
      <div class="section-goods">
        <p class="title">Goods</p>
        <div class="goods-list">
          <ul>
            <img :src="'http://localhost:8081/'+goodsPicture" />
            <span class="pro-name">{{this.goodsName}}</span>
            <span class="pro-price">￥{{this.price}} x {{this.number}}</span>
<!--            <span class="pro-status"></span>-->
            <span class="pro-total">{{this.price * this.number}}</span>
          </ul>
        </div>
      </div>

      <div class="section-shipment">
        <p class="title">Shipment</p>
        <p class="shipment">{{this.shipment}}</p>
      </div>

<!--      结算列表-->
      <div class="section-count">
        <div class="money-box">
          <ul>
            <li>
              <span class="title">Number: </span>
              <span class="value">{{this.number}}</span>
            </li>
            <li>
              <span class="title">Delivery Fee: </span>
              <span class="value"></span>
            </li>
            <li>
              <span class="title">Total: </span>
              <span class="value">
                <span class="total-price">{{getTotalPrice}}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

<!--      结算导航-->
      <div class="section-bar">
        <div class="btn">
          <router-link to="'/collections/'+this.$store.getters.getUser.userId"
           class="btn-base btn-primary">Cancel</router-link>
          <a href="javascript:void(0);" @click="addOrder" class="btn-base btn-primary">Pay</a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Deal",
  date() {
    return {
      buyId: 11111,  //买家id
      goodsId: 111111, // 商品id,
      goodsName: 'Mana Stone',
      sellerId: 22222, // 卖家id
      stage: '',    // 订单状态
      shipment: 10, // 邮费 or 包邮
      addresses: [
        {
          id: 1,
          name: 'Mithra',
          phone: '11111111',
          address: '魔法舍',
        },
        {
          id: 2,
          name: 'Mithra',
          phone: '11111111',
          address: '死之湖',
        },
      ],  // 可选地址
      confirmAddress: 1, // 选中的地址
      goodsPicture: '',
      price: 111111,
      number: 1111,
    }
  },
  methods: {
    addOrder() {
      this.$axios({
        method: 'post',
        url: 'http://localhost:8081/deal/addDeal'
            + "?buyId=" + this.buyId
            + "&goodsId=" + this.goodsId
            + "&sellerId=" + this.sellerId
            + "&confirmAddress=" + this.confirmAdrress
            + "&total=" + this.getTotalPrice,
        data: {
        },
        transformRequest: [function (data) {  // 将{username:111,password:111} 转成 username=111&password=111
          var ret = '';
          for (var it in data) {
            // 如果要发送中文 编码
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret.substring(0,ret.length-1)
        }],
      }).then(res => {
          if (res.data.code === 200) {
              // 提示结算结果
              Element.Message({
                showClose: true,
                message: 'Buying Successfully!',
                type: 'success',
              })
              // 跳转我的订单页面
              this.$router.push({ path: "/order" });
          }
        })
    },
    getTotalPrice () {
      return this.data.price * this.data.number + this.data.shipment;
    },
    addAddress() {
      alert('待续')
    }
  },
}
</script>

<style scoped>
.confirmOrder {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
.confirmOrder .confirmOrder-header {
  background-color: #fff;
  border-bottom: 2px solid #ff6700;
  margin-bottom: 20px;
}
.confirmOrder .confirmOrder-header .header-content {
  width: 1225px;
  margin: 0 auto;
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
  color: #ff6700;
  line-height: 80px;
}
.confirmOrder .content {
  width: 1225px;
  margin: 0 auto;
  padding: 48px 0 0;
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
  margin-bottom: 20px;
}
.confirmOrder .content .address-body li {
  float: left;
  color: #333;
  width: 220px;
  height: 178px;
  border: 1px solid #e0e0e0;
  padding: 15px 24px 0;
  margin-right: 17px;
  margin-bottom: 24px;
}
.confirmOrder .content .address-body .in-section {
  border: 1px solid #ff6700;
}
.confirmOrder .content .address-body li h2 {
  font-size: 18px;
  font-weight: normal;
  line-height: 30px;
  margin-bottom: 10px;
}
.confirmOrder .content .address-body li p {
  font-size: 14px;
  color: #757575;
}
.confirmOrder .content .address-body li .address {
  padding: 10px 0;
  max-width: 180px;
  max-height: 88px;
  line-height: 22px;
  overflow: hidden;
}
.confirmOrder .content .address-body .add-address {
  text-align: center;
  line-height: 30px;
}
.confirmOrder .content .address-body .add-address i {
  font-size: 30px;
  padding-top: 50px;
  text-align: center;
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
  color: #424242;
  overflow: hidden;
}
.confirmOrder .content .section-goods .goods-list li img {
  float: left;
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.confirmOrder .content .section-goods .goods-list li .pro-name {
  float: left;
  width: 650px;
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
  float: left;
  width: 190px;
  text-align: center;
  color: #ff6700;
  line-height: 30px;
}
.confirmOrder .content .section-shipment {
  margin: 0 48px;
  padding: 25px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
}
.confirmOrder .content .section-shipment .title {
  float: left;
  width: 150px;
  color: #333;
  font-size: 18px;
  line-height: 38px;
}
.confirmOrder .content .section-shipment .shipment {
  float: left;
  line-height: 38px;
  font-size: 14px;
  color: #ff6700;
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
  margin: 0 48px;
  padding: 20px 0;
  overflow: hidden;
}
.confirmOrder .content .section-count .money-box {
  float: right;
  text-align: right;
}
.confirmOrder .content .section-count .money-box .title {
  float: left;
  width: 126px;
  height: 30px;
  display: block;
  line-height: 30px;
  color: #757575;
}
.confirmOrder .content .section-count .money-box .value {
  float: left;
  min-width: 105px;
  height: 30px;
  display: block;
  line-height: 30px;
  color: #ff6700;
}
.confirmOrder .content .section-count .money-box .total .title {
  padding-top: 15px;
}
.confirmOrder .content .section-count .money-box .total .value {
  padding-top: 10px;
}
.confirmOrder .content .section-count .money-box .total-price {
  font-size: 30px;
}
.confirmOrder .content .section-bar {
  padding: 20px 48px;
  border-top: 2px solid #f5f5f5;
  overflow: hidden;
}
.confirmOrder .content .section-bar .btn {
  float: right;
}
.confirmOrder .content .section-bar .btn .btn-base {
  float: left;
  margin-left: 30px;
  width: 158px;
  height: 38px;
  border: 1px solid #b0b0b0;
  font-size: 14px;
  line-height: 38px;
  text-align: center;
}
.confirmOrder .content .section-bar .btn .btn-return {
  color: rgba(0, 0, 0, 0.27);
  border-color: rgba(0, 0, 0, 0.27);
}
.confirmOrder .content .section-bar .btn .btn-primary {
  background: #ff6700;
  border-color: #ff6700;
  color: #fff;
}
</style>