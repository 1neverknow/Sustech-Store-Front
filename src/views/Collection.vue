<!--收藏夹页面-->
<template>
  <div class="collection">
<!--    a static page for my favourite module-->
    <div class="collection-header">
      <div class="header-content">
        <p>
          <i class="el-icon-star-on" style="color: gold; margin-right: 20px"></i>
        </p>
        <p>My Collections</p>
        <router-link to></router-link>
      </div>
    </div>

    <el-card class="content">
<!--      有收藏物品-->
      <div v-if="collectList.length > 0">
        <MyList
            v-bind:type="'collection'"
            v-bind:showList="showList"
            @refresh="refresh"
        ></MyList>
      </div>
<!--      收藏列表为空-->
      <div v-else class="collect-empty">
        <div class="empty">
          <h2>Your Collection is Empty! 😢</h2>
        </div>
      </div>
    </el-card>
    <template v-if="showList.length <= 4">
      <el-footer class="footer0">

        <!-- 分页区域 -->
        <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[4, 8, 12, 16]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryInfo.total"
            style="float:right;"
            background
        >
        </el-pagination>
      </el-footer>
    </template>
    <template v-else>
      <el-footer class="footer1">

        <!-- 分页区域 -->
        <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[4, 8, 12, 16]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryInfo.total"
            style="float:right;"
            background
        >
        </el-pagination>
      </el-footer>
    </template>

  </div>
</template>

<script>
import MyList from "@/components/MyList";
export default {
  name: "Collection",
  components: {MyList},
  data() {
    return {
      collectList: [],
      showList: [],
      queryInfo: {
        pagenum: 1,
        pagesize: 8,
        total: 0,
      },
    }
  },
  methods: {
    activate() {
      this.getCollectList()
    },
    getCollectList() {
      this.collectList = []
      this.showList = []
      console.log('get collection list')
      this.$axios.get('http://localhost:8081/user/collection')
        .then(res => {
          const collection_data = res.data.data
          this.queryInfo.total = collection_data.length
          for (let i in collection_data) {
            const item = collection_data[i]
            this.collectList.push({
              goodsId: item.goodsId,
              picture: item.picturePath,
              title: item.title,
              announcer: {
                userId: item.announcer.userId,
                username: item.announcer.userName,
              },
              price: item.price,
              goodsState: item.goodsState
            })
          }
          this.showList = []
          let fromIdx = (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize
          let toIdx = fromIdx + this.queryInfo.pagesize
          console.log('from', fromIdx, 'to', toIdx)
          if (this.queryInfo.total < toIdx) {
            toIdx = this.queryInfo.total
          }
          for (let i = fromIdx; i < toIdx; i++) {
            // console.log(this.collectList[i])
            this.showList.push(this.collectList[i])
          }
        })
    },
    loadShowList() {
      this.showList = []
      let fromIdx = (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize
      let toIdx = fromIdx + this.queryInfo.pagesize
      console.log('from', fromIdx, 'to', toIdx)
      if (this.queryInfo.total < toIdx) {
        toIdx = this.queryInfo.total
      }
      for (let i = fromIdx; i < toIdx; i++) {
        console.log(this.collectList[i])
        this.showList.push(this.collectList[i])
      }
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.loadShowList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.loadShowList()
    },
    refresh() {
      this.getCollectList()
    }
  },
  mounted() {
    this.activate()
  },
}
</script>


<style scoped>
.collection {
  background-color: #f5f5f5;
  margin: auto auto auto -10%;
}
.collection .collection-header {
  background-color: #fff;
  border-bottom: 2px solid deepskyblue;
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
  /*margin-right: 20px;*/
}
.collection .collection-header .header-content p i {
  font-size: 45px;
  color: deepskyblue;
  line-height: 80px;
}
.collection .content {
  padding: 20px 0;
  margin-top: 50px;
  margin-left: 15%;
  /*margin-left: 400px;*/
  /*text-align: center;*/
  width: 1225px;
}
.collection .content .pagination {
  float: bottom;
  margin: auto;
}

.collection .content .goods-list {
  margin-left: -13.7px;
  overflow: hidden;
  height: 700px;
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
.collection .footer0 {
  margin-top: 190px;
  margin-right: 50px;
  text-align: right;
  background-color: whitesmoke;
  /*float: right;*/
}
.collection .footer1 {
  margin-top: 40px;
  margin-right: 50px;
  text-align: right;
  background-color: whitesmoke;
  /*float: right;*/
}
/* 收藏列表为空的时候显示的内容CSS END */
</style>
