<!--列表组件，用于首页、全部商品页面的商品列表-->

<template>
  <div id="list" class="myList">
    <ul style="list-style: none">
<!--      productID是商品编号！-->
      <li v-for="(item,index) in list" :key="index">
        <el-popconfirm
            confirm-button-text="OK"
            cancel-button-text="No, Thanks"
            icon="el-icon-question"
            icon-color="red"
            title="Are you sure to remove this goods?"
            @confirm="confirmEvent(index)"
        >
          <i class="el-icon-close delete" slot="reference" v-show="true"></i>
        </el-popconfirm>
<!--        点击后跳转至商品详情-->
        <router-link :to="{path: '/goods/'+ item.goodsId}" class="router-link-active">
          <img :src="'http://localhost:8081/'+ item.picture"/>
          <h2>{{item.title}}</h2>
          <h3></h3>
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
  // list为父组件传来的列表
  props: ['type', 'list'],
  data() {
    return{}
  },
  methods: {
    confirmEvent(index) {
      const goodsId = this.list[index].goodsId
      if (this.type === 'collection') {
        this.$axios.delete("http://localhost:8081/user/collection?goodsId=" + goodsId)
            .then(res => {
              Element.Message({
                message: 'Remove successfully',
                type: 'success',
              })
              this.list.splice(index, 1)
            })
      } else if (this.type === 'announcement') {
        this.$axios.delete("http://localhost:8081/goods/delete?goodsId=" + goodsId)
            .then(res => {
              Element.Message({
                message: 'Remove successfully',
                type: 'success',
              })
              this.list.splice(index, 1)
            })
      }

    },

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