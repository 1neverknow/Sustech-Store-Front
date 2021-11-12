<template>
  <div class="order">
    <div class="order-header">
      <div class="header-content">
        <p>
          <i class="el-icon-goods" style="color: deepskyblue"></i>
        </p>
        <p>My Orders</p>
        <router-link to></router-link>
      </div>
    </div>
    <el-tabs type="card" @tab-click="handleClick">
      <el-tab-pane label="all"></el-tab-pane>
      <el-tab-pane label="unpaid"></el-tab-pane>
      <el-tab-pane label="unshipped"></el-tab-pane>
      <el-tab-pane label="unreceived"></el-tab-pane>
      <el-tab-pane label="uncommented"></el-tab-pane>
      <el-tab-pane label="complete"></el-tab-pane>
      <el-tab-pane label="refunding"></el-tab-pane>
      <el-tab-pane label="appealing"></el-tab-pane>
      <el-tab-pane label="appealed"></el-tab-pane>
      <el-tab-pane label="closed"></el-tab-pane>
    </el-tabs>
    <OrderList
      v-bind:orderList="orderList"
      v-bind:total="total"
      v-bind:stage="this.queryInfo.queryStage"
    ></OrderList>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
    >
    </el-pagination>
    <!-- 展示物流进度的对话框 -->
    <el-dialog title="Shipment Progress" :visible.sync="progressVisible" width="50%">
      <!-- 内容主体区域 时间线 -->
      <el-timeline>
        <el-timeline-item
            v-for="(activity, index) in progressInfo"
            :key="index"
            :timestamp="activity.time"
        >
          {{ activity.context }}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import OrderList from "@/components/OrderList"
export default {
  name: 'Order',
  components: {OrderList},
  data() {
    return {
      queryInfo: {
        queryStage: -1,
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      orderList: [],
      progressVisible: false,
      progressInfo: [],
      detailVisible: false,
      commentVisible: false,
      commentForm: {
        content: '',
        rate: '',
      },
      commentFormRules: {
        content: [
          { required: true, message: 'Content is needed', trigger: 'blur' }
        ],
        rate: [
          { required: true, message: 'Rate the deal', trigger: 'blur' }
        ],
      },
    }
  },
  methods: {
    activate() {
      this.getOrderList()
    },
    handleClick(tab) {
      console.log(tab.label)
      let stageId = -1
      switch (tab.label) {
        case 'unpaid':
          stageId = 0
          break
        case 'unshipped':
          stageId = 1
          break
        case 'unreceived':
          stageId = 2
          break
        case 'uncommented':
          stageId = 3
          break
        case 'complete':
          stageId = 4
          break
        case 'closed':
          stageId = 5
          break
        case 'refunding':
          stageId = 6
          break
        case 'appealing':
          stageId = 7
          break
        case 'appealed':
          stageId = 8
          break
        default:
          break
      }
      this.setQueryStage(stageId)
      this.getOrderList(stageId)
    },
    setQueryStage(value) {
      this.queryInfo.queryStage = value
    },
    getOrderList(stageId) {
      this.orderList = []
      if (stageId !== -1) {
        this.getStageOrder(stageId)
      } else {
        this.getAllOrder()
      }
    },
    getAllOrder() {
      this.$axios({
        method: 'get',
        url: 'http://localhost:8081/user/buyDeal',
      }).then(res => {
        const orders = res.data.data
        this.total = orders.length
        for (let i in orders) {
          const item = orders[i]
          this.orderList.push({
            dealId: item.dealId,
            time: item.orderTime,
            goodsPhoto: item.goodsAbbreviation.picturePath,
            goodsTitle: item.goodsAbbreviation.title,
            price: item.goodsAbbreviation.price + item.goodsAbbreviation.postage,
            stage: item.stage,
          })
        }
      })
    },
    getStageOrder(stage) {
      console.log(stage)
      this.$axios({
        method: 'get',
        url: 'http://localhost:8081/user/buyDeal/' + stage
      }).then(res => {
        const orders = res.data.data
        this.total = orders.length
        for (let i in orders) {
          const item = orders[i]
          this.orderList.push({
            dealId: item.dealId,
            goodsPhoto: item.goodsAbbreviation.picturePath,
            goodsTitle: item.goodsAbbreviation.title,
            price: item.goodsAbbreviation.price + item.goodsAbbreviation.postage,
            stage: item.stage,
          })
        }
      })
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrderList()
    },
    changeDetailVisible(value) {
      this.detailVisible = value
    },
    showProgressBox() {
      this.progressVisible = true
      console.log(this.progressInfo)
    },
    // 希望退货
    refund(dealId) {
      this.$axios.get('http://localhost:8081/deal/refund/' + dealId)
          .then(res => {
          })
    },
    confirmGet(dealId) {
      this.$axios.get('http://localhost:8081/deal/confirm/' + dealId)
          .then(res => {
          })
    },
    commentDeal(dealId) {
      let isGood = true
      if (this.commentForm.rate< 3 ) {
        isGood = false
      }
      this.$axios.get('http://localhost:8081/deal/comment/' + dealId)
          .then(res => {

          })
    },
    showCommentBox() {
      this.commentVisible = true
    },
    updateQueryInfo(value) {
      this.queryInfo = value
    }
  },
}
</script>

<style scoped>
.order {
  background-color: #f5f5f5;
  margin: 0 auto;
  /*height: 800px;*/
}
.order .order-header {
  background-color: #fff;
  border-bottom: 2px solid deepskyblue;
  margin-bottom: 50px;
  margin-top: -50px;
  width: 100%;
}
.order .order-header .header-content {
  width: 1225px;
  margin: 30px auto;
  height: 80px;
}
.order .order-header .header-content p {
  float: left;
  font-size: 28px;
  line-height: 80px;
  color: #424242;
  margin-right: 20px;
}
.order .order-header .header-content p i {
  font-size: 45px;
  color: deepskyblue;
  line-height: 80px;
}
.order .content {
  padding: 20px 0;
  /*width: 1225px;*/
  width: 90%;
  /*height: 500px;*/
  margin: auto;
}
.order .content .search {
  margin-bottom: 20px;
}

.order .content .goods-list {
  margin-left: -13.7px;
  overflow: hidden;
}

.order .order-empty {
  width: 1225px;
  margin: 0 auto;
}
.order .order-empty .empty {
  height: 300px;
  padding: 0 0 130px 558px;
  margin: 65px 0 0;
  background: url(../assets/imgs/liuhan.gif) no-repeat 124px 0;
  color: #b0b0b0;
  overflow: hidden;
}
.order .order-empty .empty h2 {
  margin: 130px -100px 0;
  font-size: 36px;
}
.order .order-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}
</style>