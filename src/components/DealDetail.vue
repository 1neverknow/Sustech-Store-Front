<template>
  <div class="deal-detail">
    <el-descriptions
        class="margin-top"
        title="Deal Information"
        :column="2"
        border
    >
      <el-descriptions-item label="ID">
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
        class="margin-top"
        title="Goods Information"
        :column="2"
    >
      <el-descriptions-item label="goodsId">
        {{goodsInfo.goodsId}}
      </el-descriptions-item>
      <el-descriptions-item label="Name">
        {{goodsInfo.goodsName}}
      </el-descriptions-item>
      <el-descriptions-item label="Seller">
        {{sellerInfo.name}}
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions
        class="margin-top"
        title="Address Information"
        :column="3"
        border
    >
      <el-descriptions-item label="Receipient">
        {{addressInfo.recipientName}}
      </el-descriptions-item>
      <el-descriptions-item label="Phone">
        {{addressInfo.phone}}
      </el-descriptions-item>
      <el-descriptions-item label="Address">
        {{addressInfo.addressName}}
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
      addressInfo: {
        recipientName: '',
        phone: '',
        addressName: ''
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
        this.getAddressInfo(info.shippingAddress)
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
      this.goodsInfo.goodsPicture = goodsAbbreviation.picturePath[0].path
      this.goodsInfo.price = goodsAbbreviation.price
      this.dealInfo.postage = goodsAbbreviation.postage
    },
    getSellerInfo(seller) {
      this.sellerInfo.sellerId = seller.userId
      this.sellerInfo.credit = seller.credit
    },
    getAddressInfo(confirmAddress) {
      this.addressInfo.addressName = confirmAddress.addressName
      this.addressInfo.recipientName = confirmAddress.recipientName
      this.addressInfo.phone = confirmAddress.phone
    }
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

.deal-detail .component {
}
</style>