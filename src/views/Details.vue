<template>
  <div id="details">
<!--    header-->
    <div class="page-header">
      <div class="title">
        <p>{{productDetails.productName}}</p>
        <div class="list">
          <ul>
            <li><router-link to="">Contact us </router-link></li>
            <li><router-link to="">About us</router-link></li>
<!--        投诉/举报-->
            <li><router-link to="">Complaint</router-link></li>
          </ul>
        </div>
      </div>
    </div>

<!--    main-->
    <div class="main">
      <!--商品轮播图-->
      <div class="block">
<!--        注意：这里和源代码不一样，如果有错需要修改-->
        <el-carousel height="560px">
          <el-carousel-item v-for="item in productPictures" :key="item.id">
            <img style="height: 560px"
                 :src="$target + item.display"
                 :alt="item.intro" />
          </el-carousel-item>
        </el-carousel>
      </div>
<!--      右侧内容区-->
      <div class="content">
        <h1 class="name">{{productDetails.productName}}</h1>
        <p class="intro">{{productDetails.intro}}</p>
        <p class="owner">
          <router-link to="">{{productDetails.owner}}</router-link>
        </p>
        <div class="price">
          <span>￥{{productDetails.price}}</span>
        </div>
        <div class="pro-list">
          <span class="pro-name">{{productDetails.productName}}</span>
          <span class="pro-price">
          <span>￥{{productDetails.price}}</span>
        </span>
        </div>
        <!--      内容区底部按钮-->
        <div class="button">
          <el-button class="shop-cart" :disabled="dis" @click="addShoppingCart">Add to Shopping Cart</el-button>
          <el-button class="like" @click="addCollect">Add to Collection</el-button>
        </div>
        <!--      后续可以考虑显示：1包邮/邮费 2优质卖家（信誉极好） 3-->
      </div>
    </div>
  </div>

</template>



<script>
import {mapActions} from "vuex"
import Element from "element-ui";

export default {
  name: "Details",
  data() {
    return {
      dis: false, // 是否可以加入购物车
      productID: '11111111',  // 商品id
      productDetails: { // 商品详情
        productName: 'Mana Stone',
        intro: 'you would be stronger after eating it',
        owner: 'Snow/White',
        price: '100000',
      },
      pictureItem: {
        id: '22222222',
        display: '',
        intro: 'AAAAA'
      },
      productPictures: [], // 商品展示图（轮播图）=> 数组
    }
  },
  // 通过路由获取商品id
  activated() {
    if (this.$route.query.productID) {
      this.productID = this.$route.query.productID
    }
  },
  watch: {
    // 监听商品id变化，请求后端获取商品数据
    productID: function (val) {
      this.getDetails(val)
      this.getDetialsPicture(val)
    }
  },
  methods: {
    // 购物车相关设置
    // ...mapActions(['unshiftShoppingCart', 'addShoppingCartNum']),

    // 获取商品详情
    getDetails(val) {
      this.$axios.post("http://localhost:8081/product/details", {
        productID: val
      })
      .then(res => {
        // this.productDetials = res.data.Product[0]
        this.productDetials = res.data.data
      })
      // 已经设置了全局拦截，这里应该不需要了?
      // .catch(err => {
      //   return Promise.reject(err);
      // })
    },
    // 获取商品图片
    getDetailsPicture(val) {
      this.$axios.post("http://localhost:8081/product/pictures", {
        productID: val
      })
      .then(res => {
        // this.productPicture = res.data.ProductPicture
        this.productPicture = res.data.data
      })
    },
    // 添加到购物车
    addShoppingCart() {
      // 需要先验证用户是否已经登陆
      if (!this.$store.getters.getUser) {
        Element.Message({
          showClose: true,
          message: 'Please login first',
          type: 'error',
        })
        return
        // 加入购物车
      }
    },
    // 添加到收藏夹 // 收藏夹功能待定
    addCollect() {
    }
  }
}
</script>




<style scoped>
#details .page-header {
  height: 64px;
  margin-top: -20px;
  z-index: 4;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  -webkit-box-shadow: 0 5px 5px rgba(0, 0, 0, 0.07);
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.07);
}
#details .page-header .title {
  width: 1225px;
  height: 64px;
  line-height: 64px;
  font-size: 18px;
  font-weight: 400;
  color: #212121;
  margin: 0 auto;
}
#details .page-header .title p {
  float: left;
}
#details .page-header .title .list {
  height: 64px;
  float: right;
}
#details .page-header .title .list li {
  float: left;
  margin-left: 20px;
}
#details .page-header .title .list li a {
  font-size: 14px;
  color: #616161;
}
#details .page-header .title .list li a:hover {
  font-size: 14px;
  color: #ff6700;
}
/* 头部CSS END */

/* 主要内容CSS */
#details .main {
  width: 1225px;
  height: 560px;
  padding-top: 30px;
  margin: 0 auto;
}
#details .main .block {
  float: left;
  margin-left: -100px;
  width: 560px;
  height: 560px;
}
#details .el-carousel .el-carousel__indicator .el-carousel__button {
  background-color: rgba(163, 163, 163, 0.8);
}
#details .main .content {
  float: right;
  margin-right: -50px;
  margin-left: 25px;
  width: 640px;
}
#details .main .content .name {
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  font-weight: normal;
  color: #212121;
}
#details .main .content .intro {
  color: #b0b0b0;
  padding-top: 10px;
}
#details .main .content .store {
  color: #ff6700;
  padding-top: 10px;
}
#details .main .content .price {
  display: block;
  font-size: 18px;
  color: #ff6700;
  border-bottom: 1px solid #e0e0e0;
  padding: 25px 0 25px;
}
#details .main .content .price .del {
  font-size: 14px;
  margin-left: 10px;
  color: #b0b0b0;
  text-decoration: line-through;
}
#details .main .content .pro-list {
  background: #f9f9fa;
  padding: 30px 60px;
  margin: 50px 0 50px;
}
#details .main .content .pro-list span {
  line-height: 30px;
  color: #616161;
}
#details .main .content .pro-list .pro-price {
  float: right;
}
#details .main .content .pro-list .pro-price .pro-del {
  margin-left: 10px;
  text-decoration: line-through;
}
#details .main .content .pro-list .price-sum {
  color: #ff6700;
  font-size: 24px;
  padding-top: 20px;
}
#details .main .content .button {
  height: 55px;
  margin: 10px 0 20px 0;
}
#details .main .content .button .el-button {
  float: left;
  height: 55px;
  font-size: 16px;
  color: #fff;
  border: none;
  text-align: center;
}
#details .main .content .button .shop-cart {
  width: 340px;
  background-color: lightskyblue;
}
#details .main .content .button .shop-cart:hover {
  background-color: deepskyblue;
}

#details .main .content .button .like {
  width: 260px;
  margin-left: 40px;
  background-color: lightgrey;
}
#details .main .content .button .like:hover {
  background-color: grey;
}
#details .main .content .pro-policy li {
  float: left;
  margin-right: 20px;
  color: #b0b0b0;
}
</style>