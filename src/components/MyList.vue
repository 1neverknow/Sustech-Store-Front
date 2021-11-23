<!--列表组件，用于首页、全部商品页面的商品列表-->

<template>
  <div id="list" class="myList">
    <el-row class="goods-list">
      <ul style="list-style: none">
        <!--      productID是商品编号！-->
        <li
            v-for="(item,index) in showList"
            :key="index">
          <template v-if="item.isSell">
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
            <div>
              <router-link
                  :to="{path: '/goods/'+ item.goodsId}"
                  class="router-link-active">
                <img
                    style="width: 120px; height: 120px; text-align: center"
                    :src="item.picture"
                >
                <h2>{{item.title}}</h2>
                <h4></h4>
                <p>
                  <span>￥{{item.price}}</span>
                </p>
              </router-link>
              <template
                  v-if="type==='announcement'"
              >
                <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="small"
                    style="margin-left: 10%; margin-top: 5%; width: 80%"
                    @click="handleEdit(item.goodsId)"
                    plain
                    round
                >Edit</el-button>
              </template>
            </div>
          </template>
          <template v-else
          class="offGoods">
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
            <div>
              <router-link
                  :to="{path: '/goods/'+ item.goodsId}"
                  class="router-link-active">
                <img
                    style="width: 120px; height: 120px; text-align: center"
                    :src="item.picture"
                >
                <h2>{{item.title}}</h2>
                <h4></h4>
                <p>
                  <span>￥{{item.price}}</span>
                </p>
              </router-link>
              <template>
                <el-alert
                    title="off shelves"
                    type="error"
                    center show-icon
                    :closable="false"
                ></el-alert>
                <!--                <el-button-->
<!--                    type="primary"-->
<!--                    icon="el-icon-edit"-->
<!--                    size="small"-->
<!--                    style="margin-left: 10%; margin-top: 5%; width: 80%"-->
<!--                    plain-->
<!--                    round-->
<!--                >Edit</el-button>-->
              </template>
            </div>
          </template>
        </li>
      </ul>
    </el-row>

    <el-row class="pagination">
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
    </el-row>

  </div>
</template>


<script>
import Element from "element-ui";

export default {
  name: "MyList",
  // list为父组件传来的列表
  props: ['type', 'list', 'offlist', 'total'],
  data() {
    return{
      showList: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 8,
        total: 0,
      },
      editVisible: false,
      editGoodsId: 0,
    }
  },
  methods: {
    loadShowList() {
      this.showList = []
      let fromIdx = (this.queryInfo.pagenum - 1) * this.queryInfo.pagesize
      let toIdx = fromIdx + this.queryInfo.pagesize
      console.log('from', fromIdx, 'to', toIdx)
      if (this.total < toIdx) {
         toIdx = this.total
      }
      if (toIdx <= this.list.length) {
        for (let i = fromIdx; i < toIdx; i++) {
          console.log(this.list[i])
          this.showList.push(this.list[i])
        }
      } else {
        for (let i = fromIdx; i < this.list.length; i++) {
          this.showList.push(this.list[i])
        }
        for (let i = 0; i < toIdx - this.list.length; i++) {
          this.showList.push(this.offlist[i])
        }
      }
    },
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
      this.refresh()
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.loadShowList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.loadShowList()
    },
    handleEdit(goodsId) {
      this.editGoodsId = goodsId
      this.$router.push('/goods/' + goodsId + '/edit')
    },
    changeEditVisible(value) {
      this.editVisible = value
    },
    refresh() {
      this.$emit('refresh')
    }
  },
  mounted() {
    this.queryInfo.total = this.total
    console.log('mounted show list')
    this.loadShowList()
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
.myList .list-item {
  width: 200px;
  height: 200px;
}

.myList .pagination {
  float: bottom;
  margin: auto;
}

.myList .goods-list {
  margin-left: -4%;
  overflow: hidden;
  /*height: 700px;*/
}
.myList .goods-list .offGoods {
  background-color: darkgrey;
}

</style>