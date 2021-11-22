<template>
  <div class="announcement">
    <div class="announcement-header">
      <div class="header-content">
        <p>
          <i class="el-icon-share" style="color: darkorange; margin-right: 20px"></i>
        </p>
        <p>My Announcements</p>
        <router-link to></router-link>
      </div>
    </div>
    <el-card class="content">
      <div v-if="onList.length > 0 || offList.length > 0">
        <MyList
            v-bind:total="total"
            v-bind:type="'announcement'"
            v-bind:list="onList"
            v-bind:offlist="offList"
        ></MyList>
      </div>
      <!--      收藏列表为空-->
      <div v-else class="collect-empty">
        <div class="empty">
          <h2>You have not announced! 😢</h2>
        </div>
      </div>
    </el-card>
    <el-footer></el-footer>
  </div>
</template>

<script>
import MyList from "@/components/MyList"
export default {
  name: "Announced",
  components: {MyList},
  data() {
    return {
      goodsState: '0',
      onList: [],
      offList: [],
      total: 0,
    }
  },
  methods: {
    activate() {
      this.total = 0
      this.getOnList()
      this.getOffList()
    },
    getOnList() {
      console.log('get announcement onlist')
      this.$axios.get('http://localhost:8081/user/announceGoods/0')
          .then(res => {
            const announcement_data = res.data.data
            console.log('onList', announcement_data)
            this.total += announcement_data.length
            for (let i in announcement_data) {
              const item = announcement_data[i]
              this.onList.push({
                goodsId: item.goodsId,
                picture: item.picturePath,
                title: item.title,
                price: item.price,
              })
            }
          })
    },
    getOffList() {
      console.log('get announcement offlist')
      this.$axios.get('http://localhost:8081/user/announceGoods/1')
          .then(res => {
            const announcement_data = res.data.data
            console.log('offList', announcement_data)
            this.total += announcement_data.length
            for (let i in announcement_data) {
              const item = announcement_data[i]
              this.offList.push({
                goodsId: item.goodsId,
                picture: item.picturePath,
                title: item.title,
                price: item.price,
              })
            }
          })
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getannounceList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getannounceList()
    },
  },
  mounted() {
    this.activate()
  }
}
</script>

<style scoped>
.announcement {
  background-color: #f5f5f5;
  margin: auto auto auto -10%;
}
.announcement .announcement-header {
  background-color: #fff;
  border-bottom: 2px solid deepskyblue;
  margin-top: -100px;
  width: 100%;
}
.announcement .announcement-header .header-content {
  width: 1225px;
  margin: 30px auto;
  height: 80px;
}
.announcement .announcement-header .header-content p {
  float: left;
  font-size: 28px;
  line-height: 80px;
  color: #424242;
  /*margin-right: 20px;*/
}
.announcement .announcement-header .header-content p i {
  font-size: 45px;
  color: deepskyblue;
  line-height: 80px;
}
.announcement .content {
  padding: 20px 0;
  margin-top: 50px;
  margin-left: 18%;
  /*margin-left: 400px;*/
  /*text-align: center;*/
  width: 1225px;
}
/* 收藏列表为空的时候显示的内容CSS */
.announcement .collect-empty {
  width: 1225px;
  margin: 0 auto;
}
.announcement .collect-empty .empty {
  height: 300px;
  padding: 0 0 130px 558px;
  margin: 65px 0 0;
  background: url(../assets/imgs/liuhan.gif) no-repeat 124px 0;
  color: #b0b0b0;
  overflow: hidden;
}
.announcement .collect-empty .empty h2 {
  margin: 130px -100px 0;
  font-size: 36px;
}
.announcement .collect-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}
</style>