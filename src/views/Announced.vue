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
      <div v-if="announceList.length > 0">
        <el-row class="goods-list">
          <MyList
              v-bind:type="'announcement'"
              v-bind:list="announceList"
          ></MyList>
        </el-row>
        <el-row>
          <!-- 分页区域 -->
          <el-pagination
              class="pagination"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.pagenum"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="queryInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="queryInfo.total"
              style="float:right;"
              background
          >
          </el-pagination>
        </el-row>
      </div>
      <!--      收藏列表为空-->
      <div v-else class="collect-empty">
        <div class="empty">
          <h2>You have not announced! 😢</h2>
        </div>
      </div>
    </el-card>
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
      announceList: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10,
        total: 0,
      },
    }
  },
  methods: {
    activate() {
      this.getannounceList()
    },
    getannounceList() {
      console.log('get announcement list')
      this.$axios.get('http://localhost:8081/user/announceGoods')
          .then(res => {
            const announcement_data = res.data.data
            this.queryInfo.total = announcement_data.length
            // let size = this.queryInfo.pagesize < this.queryInfo.total ? this.queryInfo.pagesize : this.queryInfo.total
            for (let i in announcement_data) {
              const item = announcement_data[i]
              this.announceList.push({
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
  margin: auto auto auto -200px;
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
.announcement .content .pagination {
  float: bottom;
  margin: auto;
}

.announcement .content .goods-list {
  margin-left: -13.7px;
  overflow: hidden;
  height: 700px;
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