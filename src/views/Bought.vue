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
    <!-- 卡片视图区域 -->
    <el-card class="content">
      <el-row>
        <el-col :span="8" class="search">
          <el-input placeholder="Input ID/ keyword/ status">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 订单列表数据 -->

      <el-table :data="orderList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="Time" prop="time"></el-table-column>
        <el-table-column label="Goods" prop="goodsTitle"></el-table-column>
        <el-table-column label="Photo" prop="goodsPhoto">
          <template slot-scope="scope">
            <img :src="'http://localhost:8081/' + scope.row.goodsPhoto" alt="" style="width: 80px;height: 80px">
          </template>
        </el-table-column>
        <el-table-column label="Price" prop="price"></el-table-column>
        <el-table-column label="Stage" prop="stage"></el-table-column>

        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button
                icon="el-icon-info"
                size="mini"
                type="primary"
                @click="changeDetailVisible(true)"
                plain
            >Details</el-button>
            <el-dialog
                :visible.sync="detailVisible"
                width="50%"
            >
              <DealDetail
                  v-if="detailVisible"
                  v-bind:dealId="scope.row.dealId"
              ></DealDetail>
            </el-dialog>
          </template>

          <!--&lt;!&ndash;        运输中状态时可以查看当前运输情况&ndash;&gt;-->
          <!--            <el-button-->
          <!--                icon="el-icon-location"-->
          <!--                size="mini"-->
          <!--                type="info"-->
          <!--                @click="showProgressBox"-->
          <!--                plain-->
          <!--            >Shipment</el-button>-->
          <!--&lt;!&ndash;          一键退款&ndash;&gt;-->
          <!--            <el-button-->
          <!--                icon="el-icon-close"-->
          <!--                size="mini"-->
          <!--                type="danger"-->
          <!--                @click="refund"-->
          <!--                plain-->
          <!--            >Refund</el-button>-->
          <!--&lt;!&ndash;            确认收货&ndash;&gt;-->
          <!--            <el-button-->
          <!--                icon="el-icon-check"-->
          <!--                size="mini"-->
          <!--                type="success"-->
          <!--                @click="confirmGet"-->
          <!--                plain-->
          <!--            >Confirm</el-button>-->
          <!--&lt;!&ndash;            收货后可以评价&ndash;&gt;-->
          <!--            <el-button-->
          <!--                icon="el-icon-edit"-->
          <!--                size="mini"-->
          <!--                type="primary"-->
          <!--                @click="commentVisible = true"-->
          <!--                plain-->
          <!--            >Comment</el-button>-->

        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
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
    </el-card>
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

    <!--    <el-dialog-->
    <!--        title="Give your comments"-->
    <!--        :visible.sync="commentVisible"-->
    <!--    >-->
    <!--      &lt;!&ndash; 内容主体区域 &ndash;&gt;-->
    <!--      <el-form-->
    <!--          :model="commentForm"-->
    <!--          :rules="commentFormRules"-->
    <!--          label-position="top"-->
    <!--          ref="commentFormRef"-->
    <!--          label-width="100px"-->
    <!--      >-->
    <!--        <el-form-item label="Rate" prop="rate">-->
    <!--          <el-rate v-model="commentForm.rate" :colors="colors"> </el-rate>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="Content" prop="content">-->
    <!--          <el-input v-model="commentForm.content" type="textarea"></el-input>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--      &lt;!&ndash; 底部区域 &ndash;&gt;-->
    <!--      <span slot="footer" class="dialog-footer">-->
    <!--            <el-button @click="commentVisible = false">Cancel</el-button>-->
    <!--            <el-button type="primary" @click="addComment"-->
    <!--            >Submit</el-button>-->
    <!--          </span>-->
    <!--    </el-dialog>-->
  </div>
</template>

<script>
import DealDetail from "@/components/DealDetail"
export default {
  components: {DealDetail},
  data() {
    return {
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      queryInfo: {
        query: '',
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
    getOrderList() {
      this.$axios({
        method: 'get',
        url: 'http://localhost:8081/user/buyDeal/0?'
      }).then(res => {
        const orders = res.data.data
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
      this.$axios.post('http://localhost:8081/deal/comment/' + dealId)
          .then(res => {

          })
    },
    showCommentBox() {
      this.commentVisible = true
    },
  },
  mounted() {
    this.activate()
  }
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