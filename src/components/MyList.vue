<!--列表组件，用于首页、全部商品页面的商品列表-->

<template>
  <div id="list" class="myList">
    <ul style="list-style: none">
<!--      productID是商品编号！-->
      <li v-for="item in list" :key="item.goodsId">
        <el-popover placement="top">
          <p>Delete it?</p>
          <div style="text-align: right; margin: 10px 0 0">
            <el-button type="primary" size="mini" @click="deleteProduct(item.productID)">
              YES
            </el-button>
          </div>
          <i class="el-icon-close delete" slot="reference" v-show="isDelete"></i>
        </el-popover>
<!--        点击后跳转至商品详情-->
        <router-link :to="{path:'/goods/', parameter: item.goodsId}" class="router-link-active">
          <img :src="'http://localhost:8081/'+ item.picture" alt/>
          <h2>{{item.title}}</h2>
          <h3>{{item.introduce}}</h3>
          <p>
            <span>￥{{item.price}}</span>
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>


<script>
import Element from "element-ui";

export default {
  name: "MyList",
  // list为父组件传来的商品列表
  // isMore为是否显示“浏览更多”
  props: ['list', 'isMore', 'isDelete'],
  data() {
    return{}
  },
  methods: {
    deleteProduct(goodsId) {
      this.$axios.put('http://localhost:8081/collections/' + userId, {
        userId: this.$store.getters.getUser.userID,
        goodsId: goodsId
      })
      .then(res => {
        if (res.data.code === '200') {
          for (let i=0; i<this.list.length; i++) {
            if (this.list[i].productID === productID) {
              this.list.splice(i, 1)
            }
          }
          Element.Message({
            showClose: true,
            message: 'Delete the product from collection successfully',
            type: 'success',
          })
        }
      })
    }
  }
}
</script>


<style scoped>
.myList ul li {
  z-index: 1;
  float: left;
  width: 234px;
  height: 280px;
  padding: 10px 0;
  margin: 0 0 14.5px 50px;
  background-color: white;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  position: relative;
}
.myList ul li:hover {
  z-index: 2;
  -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.myList ul li img {
  display: block;
  width: 160px;
  height: 160px;
  background: url(../assets/imgs/failed.jpg) no-repeat 50%;
  margin: 0 auto;
}
.myList ul li h2 {
  margin: 25px 10px 0;
  font-size: 14px;
  font-weight: 400;
  color: #333;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.myList ul li h3 {
  margin: 5px 10px;
  height: 18px;
  font-size: 12px;
  font-weight: 400;
  color: #b0b0b0;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.myList ul li p {
  margin: 10px 10px 10px;
  text-align: center;
  color: #ff6700;
}
.myList ul li p .del {
  margin-left: 0.5em;
  color: #b0b0b0;
  text-decoration: line-through;
}
.myList #more {
  text-align: center;
  line-height: 280px;
}
.myList #more a {
  font-size: 18px;
  color: #333;
}
.myList #more a:hover {
  color: #ff6700;
}
.myList ul li .delete {
  position: absolute;
  top: 10px;
  right: 10px;
  display: none;
}
.myList ul li:hover .delete {
  display: block
}
.myList ul li .delete:hover {
  color: #ff6700;
}
.router-link-active {
  text-decoration: none;
}
</style>