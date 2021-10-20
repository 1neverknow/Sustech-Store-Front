<!--收藏夹页面-->
<template>
  <div class="collection">
<!--    a static page for my favourite module-->
    <div class="collection-header">
      <div class="header-content">
        <p>
          <i class="el-icon-star-on" style="color: gold"></i>
        </p>
        <p>My Collections</p>
        <router-link to></router-link>
      </div>
    </div>

    <div class="content">
<!--      有收藏物品-->
      <div class="goods-list" v-if="collectList.length > 0">
<!--        <h1>有东西</h1>-->
        <MyList :list="collectList" :isDelete="true"></MyList>
      </div>
<!--      收藏列表为空-->
      <div v-else class="collect-empty">
        <div class="empty">
          <h2>Your Collection is Empty! 😢</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyList from "@/components/MyList";
export default {
  name: "Collection",
  components: {MyList},
  data() {
    return {
      collectList: [
          {
            goodsId: 1,
            picture: '',
            title: 'Mana Stone',
            introduce: 'Help you grow stronger',
            price: 100000,
          },
        {
          goodsId: 2,
          picture: '',
          title: 'KFC',
          introduce: '写饿了',
          price: 30,
        }
      ]
    }
  },
}
</script>


<style scoped>
.collection {
  background-color: #f5f5f5;
  margin: auto;
}
.collection .collection-header {
  background-color: #fff;
  border-bottom: 2px solid deepskyblue;
  margin-bottom: 50px;
  margin-top: -100px;
  width: 100%;
}
.collection .collection-header .header-content {
  width: 1225px;
  margin: 30px auto;
  height: 80px;
}
.collection .collection-header .header-content p {
  float: left;
  font-size: 28px;
  line-height: 80px;
  color: #424242;
  margin-right: 20px;
}
.collection .collection-header .header-content p i {
  font-size: 45px;
  color: deepskyblue;
  line-height: 80px;
}

.collection .content {
  padding: 20px 0;
  width: 1225px;
  margin: 0 auto;
}
.collection .content .goods-list {
  margin-left: -13.7px;
  overflow: hidden;
}
/* 收藏列表为空的时候显示的内容CSS */
.collection .collect-empty {
  width: 1225px;
  margin: 0 auto;
}
.collection .collect-empty .empty {
  height: 300px;
  padding: 0 0 130px 558px;
  margin: 65px 0 0;
  background: url(../assets/imgs/liuhan.gif) no-repeat 124px 0;
  color: #b0b0b0;
  overflow: hidden;
}
.collection .collect-empty .empty h2 {
  margin: 130px -100px 0;
  font-size: 36px;
}
.collection .collect-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}
/* 收藏列表为空的时候显示的内容CSS END */
</style>
