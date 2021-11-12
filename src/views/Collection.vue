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

    <el-card class="content">
<!--      有收藏物品-->
      <div v-if="collectList.length > 0">
        <el-row class="goods-list">
          <MyList :list="collectList" :isDelete="true"></MyList>
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
              background
          >
          </el-pagination>
        </el-row>
      </div>
<!--      收藏列表为空-->
      <div v-else class="collect-empty">
        <div class="empty">
          <h2>Your Collection is Empty! 😢</h2>
        </div>
      </div>
    </el-card>
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
            announcer: {
              userId: 1,
              username: 'faust',
            },
            price: 100000,
          },
        {
          goodsId: 2,
          picture: '',
          title: 'KFC',
          announcer: {
            userId: 1,
            username: 'faust',
          },
          price: 30,
        }
      ],
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
      this.getCollectList()
    },
    getCollectList() {
      console.log('get collection list')
      this.$axios.get('http://localhost:8081/user/collection')
          .then(res => {
            const collection_data = res.data.data
            this.queryInfo.total = collection_data.length
            let size = this.queryInfo.pagesize < this.queryInfo.total ? this.queryInfo.pagesize : this.queryInfo.total
            for (let i=0; i<size; i++) {
              const item = collection_data[i]
              this.collectList.push({
                goodsId: item.goodsId,
                picture: '',
                title: item.title,
                announcer: {
                  userId: item.announcer.userId,
                  username: item.announcer.userName,
                },
                price: item.price,
              })
            }
          })
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getCollectList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCollectList()
    },
  },
  mount() {
    this.activate()
  }
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
  /*height: 700px;*/
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
/* 收藏列表为空的时候显示的内容CSS END */
</style>
