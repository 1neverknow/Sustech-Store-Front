<!--收藏夹页面-->
<template>
  <div class="collection">
<!--    a static page for my favourite module-->
    <div class="collect-header">
      <div class="collect-title">
        My Collections
        <i class="el-icon-star-on" style="color: gold"></i>
      </div>
    </div>
    <div class="content">
<!--      有收藏物品-->
      <div class="goods-list" v-if="collectList.length > 0">
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
      collectList: [{
        goodsId: 11111111,
        picture: '',
        title: 'Mana Stone',
        introduce: 'Help you grow stronger',
        price: 100000,
      }]
    }
  },
  activated() {
    // 获取收藏夹数据
    this.$axios.get("http://localhost:8081/collection/" + userId, {
      userID: this.$store.getters.getUser.userID
    })
    .then(res => {
      if (res.data.code === 200) {
        this.collectList = res.data.collectList
      }
    })
  }
}
</script>


<style scoped>
.collection {
  background-color: #f5f5f5;
}
.collection .collect-header {
  height: 64px;
  background-color: lightskyblue;
  /*border-bottom: 5px solid deepskyblue;*/
}
.collection .collect-header .collect-title {
  width: 1225px;
  margin: 0 auto;
  height: 64px;
  line-height: 58px;
  font-size: 28px;
  font-weight: bold;
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