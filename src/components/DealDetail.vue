<template>
  <div class="deal-detail">
    <div class="header">
      <img
          class="goods-photo"
          :src="this.goodsInfo.goodsPicture"
          @click="routeGoods"
      ></img>
    </div>
    <el-descriptions
        class="component"
        title="Deal Information"
        :column="2"
        border
    >
      <el-descriptions-item label="Deal ID">
        {{dealInfo.dealId}}
      </el-descriptions-item>
      <el-descriptions-item label="Stage">
        {{dealInfo.stage}}
      </el-descriptions-item>
      <el-descriptions-item label="Time">
        {{dealInfo.time}}
      </el-descriptions-item>
      <el-descriptions-item label="Total">
        {{dealInfo.total}}
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions
        class="component"
        title="Goods Information"
        :column="3"
    >
      <el-descriptions-item label="goodsId">
        {{goodsInfo.goodsId}}
      </el-descriptions-item>
      <el-descriptions-item label="Name">
        <router-link :to="{path: '/goods/' + goodsInfo.goodsId}">
          <el-link type="primary" style="height: 15px; margin-top: -5px"
          >{{goodsInfo.goodsName}}
          </el-link>
        </router-link>
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions
        class="component"
        title="Seller Information"
        :column="2"
        border
    >
      <el-descriptions-item label="User ID">
        {{sellerInfo.sellerId}}
      </el-descriptions-item>
      <el-descriptions-item label="Name">
        <router-link :to="{path: '/user/' + sellerInfo.sellerId}">
          <el-link type="primary" style="height: 15px; margin-top: -5px"
          >{{sellerInfo.name}}
          </el-link>
        </router-link>
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions
        class="component"
        title="Delivery Information"
        :column="2"
    >
      <el-descriptions-item label="Receipient">
        {{mailingInfo.recipientName}}
      </el-descriptions-item>
      <el-descriptions-item label="Phone">
        {{mailingInfo.phone}}
      </el-descriptions-item>
      <el-descriptions-item label="Address">
        {{mailingInfo.addressName}}
      </el-descriptions-item>
      <el-descriptions-item label="Mailing ID">
        {{mailingInfo.addressName}}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name:  "DealDetail",
  props: ['dealId'],
  data() {
    return {
      dealInfo: {
        dealId: this.dealId,
        stage: '',    // 订单状态
        time: '',
        total: '',
      },
      sellerInfo: {
        sellerId: '',  //卖家id
        name: '', // 卖家用户名
      },
      goodsInfo: {
        goodsId: '', // 商品id,
        goodsName: '',
        goodsPicture: '',
        price: '', // 商品单价
      },
      mailingInfo: {
        recipientName: '',
        phone: '',
        addressName: '',
        mailingNumber: '', // 邮递单号
      },
    }
  },
  methods: {
    activate() {
      console.log(this.dealId)
      if (!this.dealId) {
        return
      }
      this.$axios({
        method: 'get',
        url: 'http://localhost:8081/deal/' + this.dealId,
      }).then(res => {
        const info = res.data.data
        console.log(info)
        this.getDealInfo(info)
        this.getGoodsInfo(info.goodsAbbreviation)
        this.getSellerInfo(info.seller)
        this.getMailingInfo(info.shippingAddress)
      })
    },
    getDealInfo(info) {
      this.dealInfo.dealId = this.dealId
      this.dealInfo.time = info.orderTime
      this.dealInfo.stage = info.stage
      this.dealInfo.total = info.price
    },
    getGoodsInfo(goodsAbbreviation) {
      this.goodsInfo.goodsId = goodsAbbreviation.goodsId
      this.goodsInfo.goodsName = goodsAbbreviation.title
      this.goodsInfo.goodsPicture = goodsAbbreviation.picturePath
      this.goodsInfo.price = goodsAbbreviation.price
      this.dealInfo.postage = goodsAbbreviation.postage
    },
    getSellerInfo(seller) {
      this.sellerInfo.name = seller.userName
      this.sellerInfo.sellerId = seller.userId
    },
    getMailingInfo(confirmAddress) {
      this.mailingInfo.addressName = confirmAddress.addressName
      this.mailingInfo.recipientName = confirmAddress.recipientName
      this.mailingInfo.phone = confirmAddress.phone
    },
    routeGoods() {
      this.$router.push('/goods/'+this.goodsInfo.goodsId)
    },
  },
  mounted() {
    this.activate()
  }
}
</script>

<style scoped>
.deal-detail {
  margin-top: -20px;
}

.deal-detail .header {
  margin-left: 40%;
}

.deal-detail .header .goods-photo {
  width: 100px;
  height: 100px;
  border-radius:50%;
}

.deal-detail .component {
  margin-top: 20px;
}
</style>