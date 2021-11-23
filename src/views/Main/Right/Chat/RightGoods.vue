<template>
  <div class="right-goods-wrap">
    <info-block
        :visible="isShowChatterInfo"
        :memberInfo="chatterInfo"
        :infoPosition="infoPosition"
    ></info-block>
    <div  v-if="isNoChat">
    </div>
    <div class="goods-detail" v-else>
      <el-row class="font">
        <el-col :span="7" ><div >
          <img
              class="avatar-img"
              :src="goodsPicture"
              style="width: 102.4px;height:76.8px"
              @click="jumpGoods"
          />
        </div></el-col>
        <el-col :span="8"><div >
          Price: {{goodsPrice}}
        </div></el-col>
        <el-col :span="9"><div >
          <div class="button">
            <el-button
                class="confirm-to-buy"
                @click="handleClick"
            >Confirm to buy!</el-button>
          </div>
        </div></el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
import Vue from "vue";
import InfoBlock from "@/components/InfoBlock";
import Element from "element-ui";
export default {
  name: "RightFoods",
  data() {
    return {
      isHidden: false,
      memberInfoIndex: -1,
      infoPosition: {
        left: -1,
        top: -1
      },
      // memberInfoIndex: -1
    };
  },
  computed:{
    isNoChat() {
      return this.$store.state.currentChatId === -1;
    },
    // ,
    // isShowDeal(){
    //   return this.$store.state.isShowMembers;
    // }
    goodsPicture(){
      return this.$store.state.goods.avatar;
    },
    goodsPrice(){
      return this.$store.state.goods.price;
    }
  },
  methods: {
    jumpGoods(){
      const goodsId = this.$store.state.chats[this.$store.state.currentChatId]
      this.$router.push('/goods/' + goodsId)
    },
    handleClick() {
      const goodsId = this.$store.state.goods.id
      this.$router.push('/deal/' + goodsId)
    }
    // // 通过路由获取商品id
    // activate() {
    //   console.log(this.$route.params.goodsId)
    //   if (this.$route.params.goodsId) {
    //     this.goodsId = this.$route.params.goodsId
    //     this.getDetails(this.goodsId)
    //   }
    // },
    // 获取商品详情
    // getDetails(val) {
    //   const _this = this
    //   this.$axios({
    //     method: 'get',
    //     url: 'http://localhost:8081/goods/' + val,
    //     data: {
    //       goodsId: val
    //     },
    //   })
    //       .then(res => {
    //         const productDetails = res.data.data
    //         _this.price = productDetails.price
    //         _this.title = productDetails.title
    //         _this.picturePath = productDetails.picturePath
    //         // _this.labels = productDetails.labels
    //         _this.introduce = productDetails.introduce
    //         _this.announcer = productDetails.announcer
    //         _this.comments = JSON.parse(productDetails.comments)
    //         _this.want = productDetails.want
    //         _this.announceTime = productDetails.announceTime
    //       })
    // },
    // buyGoods() {
    //   // 需要先验证用户是否已经登陆
    //   if (!this.$store.getters.getUser) {
    //     Element.Message({
    //       showClose: true,
    //       message: 'Please login first',
    //       type: 'error',
    //     })
    //     return
    //   }
    //   this.$axios.post("http://localhost:8081/product/user/addCollect", {
    //     userID: this.$store.getters.getUser.userID,
    //     productID: this.productID
    //   })
    //       .then(res => {
    //         if (res.data.code === "200") { // 状态码为200 -> 添加成功
    //           Element.Message({
    //             showClose: true,
    //             message: 'Add product to collection successfully',
    //             type: 'success',
    //           })
    //         }
    //       })
    // },
// 提交评论
  }
}
</script>

<style scoped>
.right-goods-wrap {
  height: 51px;
}
.goods-detail {
  height: 30px;
  line-height: 30px;
  padding: 10px 0;
  margin: 0 15px;
  /*border-bottom: 1px solid #d6d6d6;*/
  text-align: center;
  /*font-size: 14px;*/
  border:1px solid rgb(191, 203, 217);
  border-radius: 4px
}
/*border-radius: 4px*/
.el-row {
  margin-bottom: 20px;
  /*&:last-child {*/
  /*   margin-bottom: 0;*/
  /* }*/
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.confirm-to-buy{
  height: 30px;
  width: 150px;
  line-height: 5px;
  background-color: rgb(48, 65, 86);
  border-radius: 4px;
  color: rgb(191, 203, 217)
}
.font{
  font-size: 15px;
}
</style>