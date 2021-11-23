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
            v-bind:type="'announcement'"
            v-bind:showList="showList"
            @refresh="refresh"
        ></MyList>
      </div>
      <!--      收藏列表为空-->
      <div v-else class="collect-empty">
        <div class="empty">
          <h2>You have not announced! 😢</h2>
        </div>
      </div>
    </el-card>
    <el-footer class="footer">
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
      this.queryInfo.total = 0
      this.getAnnounceList()
    },
    getAnnounceList() {
      this.onList = []
      this.offList = []
      this.showList = []
      this.queryInfo.total = 0
      console.log('get announcement onlist')
      this.$axios.get('http://localhost:8081/user/announceGoods/0')
          .then(res => {
            const announcement_data = res.data.data
            console.log('onList', announcement_data)
            this.queryInfo.total += announcement_data.length
            for (let i in announcement_data) {
              const item = announcement_data[i]
              this.onList.push({
                goodsId: item.goodsId,
                picture: item.picturePath,
                title: item.title,
                price: item.price,
                isSell: item.isSell
              })
            }
            console.log('get announcement offlist')
            this.$axios.get('http://localhost:8081/user/announceGoods/1')
                .then(res => {
                  const announcement_data = res.data.data
                  console.log('offList', announcement_data)
                  this.queryInfo.total += announcement_data.length
                  for (let i in announcement_data) {
                    const item = announcement_data[i]
                    this.offList.push({
                      goodsId: item.goodsId,
                      picture: item.picturePath,
                      title: item.title,
                      price: item.price,
                    })
                  }

                  let fromIdx = (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize
                  let toIdx = fromIdx + this.queryInfo.pagesize
                  console.log('from', fromIdx, 'to', toIdx)
                  if (this.queryInfo.total < toIdx) {
                    toIdx = this.queryInfo.total
                  }
                  if (fromIdx < this.onList.length && toIdx <= this.onList.length) {
                    console.log('case 1')
                    for (let i = fromIdx; i < toIdx; i++) {
                      console.log(this.onList[i])
                      this.showList.push(this.onList[i])
                    }
                  } else if(fromIdx < this.onList.length && toIdx > this.onList.length) {
                    console.log('case 2')
                    for (let i = fromIdx; i < this.onList.length; i++) {
                      this.showList.push(this.onList[i])
                    }
                    for (let i = 0; i < toIdx - this.onList.length; i++) {
                      this.showList.push(this.offList[i])
                    }
                  } else {
                    console.log('case 3')
                    console.log('from ', fromIdx - this.onList.length, '; to ', toIdx - this.onList.length)
                    for (let i = fromIdx - this.onList.length; i < toIdx - this.onList.length; i++) {
                      this.showList.push(this.offList[i])
                    }
                  }
                })
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
      if (fromIdx < this.onList.length && toIdx <= this.onList.length) {
        console.log('case 1')
        for (let i = fromIdx; i < toIdx; i++) {
          console.log(this.onList[i])
          this.showList.push(this.onList[i])
        }
      } else if(fromIdx < this.onList.length && toIdx > this.onList.length) {
        console.log('case 2')
        for (let i = fromIdx; i < this.onList.length; i++) {
          this.showList.push(this.onList[i])
        }
        for (let i = 0; i < toIdx - this.onList.length; i++) {
          this.showList.push(this.offList[i])
        }
      } else {
        console.log('case 3')
        console.log('from ', fromIdx - this.onList.length, '; to ', toIdx - this.onList.length)
        for (let i = fromIdx - this.onList.length; i < toIdx - this.onList.length; i++) {
          this.showList.push(this.offList[i])
        }
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
      this.getAnnounceList()
    },
  },
  mounted() {
    this.activate()
  },
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
  margin-left: 15%;
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
.announcement .footer {
  margin-top: 50px;
  margin-right: 50px;
  margin-bottom: 50px;
  text-align: right;
  /*float: right;*/
}
</style>