<template>
  <div>
    <!-- 卡片视图区域 -->
    <div class="content">
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
            <template>
<!--              全部订单列表-->
              <el-button
                  icon="el-icon-info"
                  size="mini"
                  type="plain"
                  @click="setQueryDealId(scope.row.dealId); changeDetailVisible(true)"
                  plain
              >Details</el-button>
              <el-dialog
                  @changeDetailVisible="changeDetailVisible"
                  :visible.sync="detailVisible"
                  width="50%"
              >
                <DealDetail
                    v-if="detailVisible"
                    v-bind:dealId="queryDealId"
                ></DealDetail>
              </el-dialog>
            </template>

            <template v-if="stage===0 && dealType==='buy'">
              <!--未支付订单列表-->
              <el-button
                  icon="el-icon-check"
                  size="mini"
                  type="primary"
                  @click="setQueryDealId(scope.row.dealId); changePayVisible(true)"
                  plain
              >Pay</el-button>
              <el-dialog
                :visible.sync="payVisible"
                width="50%"
              >
                <Pay
                    @changePayVisible="changePayVisible"
                    @refresh="refresh"
                    v-if="payVisible"
                    v-bind:dealId="queryDealId"
                ></Pay>
              </el-dialog>
            </template>

            <template v-else-if="stage===1 && dealType==='buy'">
                <!--一键退款-->
                <Refund
                    @refresh="refresh"
                    v-bind:dealId="scope.row.dealId"
                ></Refund>
            </template>

            <template v-else-if="stage===1 && dealType==='sell'">
              <el-button
                  icon="el-icon-location"
                  size="mini"
                  type="primary"
                  @click="setQueryDealId(scope.row.dealId); changeDeliverVisible(true)"
                  plain
              >Deliver</el-button>
              <el-dialog title="Mailing Form"
                 :visible.sync="deliveryVisible"
                 width="50%"
              >
                <Deliver
                    @refresh="refresh"
                    @changeDeliverVisible="changeDeliverVisible"
                    v-bind:dealId="scope.row.dealId"
                ></Deliver>
              </el-dialog>
            </template>

            <template v-else-if="stage===2">
              <!-- 展示物流进度 -->
              <el-button
                  icon="el-icon-location"
                  size="mini"
                  type="warning"
                  @click="setQueryDealId(scope.row.dealId); changeShipmentVisible(true)"
                  plain
              >Shipment</el-button>
              <el-dialog title="Shipment Progress"
                         :visible.sync="shipmentVisible"
                         width="70%"
              >
                <Shipment
                    @refresh="refresh"
                    @changeShipmentVisible="changeShipmentVisible"
                    v-bind:dealId="queryDealId"
                    v-bind:queryType="dealType"
                ></Shipment>
              </el-dialog>
            </template>

            <template v-else-if="stage===2 && dealType==='buy'">
              <!--一键退款-->
              <Refund
                  @refresh="refresh"
                  v-bind:dealId="scope.row.dealId"
              ></Refund>
            </template>

            <template v-else-if="stage===3">
            <!--收货后可以评价-->
              <el-button
                  icon="el-icon-edit"
                  size="mini"
                  type="success"
                  @click="setQueryDealId(scope.row.dealId); changeCommentVisible(true)"
                  plain
              >Comment</el-button>
              <el-dialog title="Comment Deal"
                         :visible.sync="commentVisible"
                         width="70%"
              >
                <DealComment
                    @refresh="refresh"
                    @changeCommentVisible="changeCommentVisible"
                    v-bind:dealId="queryDealId"
                ></DealComment>
              </el-dialog>
            </template>

            <template v-else-if="stage===6 && dealType==='buy'">
              <!--取消退款-->
              <el-button
                  icon="el-icon-warning"
                  size="mini"
                  type="danger"
                  @click="cancelRefund(scope.row.dealId);"
                  plain
              >Cancel</el-button>
            </template>

            <template v-else-if="stage===6 && dealType==='sell'">
              <!--取消退款-->
              <el-button
                  icon="el-icon-warning"
                  size="mini"
                  type="danger"
                  @click="setQueryDealId(scope.row.dealId); changeHandleRefundVisible(true)"
                  plain
              >Handle</el-button>
              <el-dialog title="Are you agree to refund?"
                         :visible.sync="refundHandlerVisible"
                         width="30%"
              >
                <RefundAgree
                    @refresh="refresh"
                    @changeHandleRefundVisible="changeHandleRefundVisible"
                    v-bind:dealId="scope.row.dealId"
                ></RefundAgree>
              </el-dialog>
            </template>

            <template v-else-if="stage===7 && dealType==='buy'">
              <!--取消退款-->
              <el-button
                  icon="el-icon-edit"
                  size="mini"
                  type="danger"
                  @click="setQueryDealId(scope.row.dealId); changeAppealVisible(true)"
                  plain
              >Appeal</el-button>
              <el-dialog title="Appeal Form"
                         :visible.sync="appealVisible"
                         width="70%"
              >
                <AppealForm
                    @changeAppealVisible="changeAppealVisible"
                    @refresh="refresh"
                    v-bind:dealId="queryDealId"
                ></AppealForm>
              </el-dialog>
            </template>

          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import DealDetail from "@/components/DealDetail"
import Pay from "@/components/Pay"
import Refund from "@/components/Refund"
import Shipment from "@/components/Shipment"
import DealComment from "@/components/DealComment"
import AppealForm from "@/components/AppealForm"
import Deliver from "@/components/Deliver"
import RefundAgree from "@/components/RefundAgree"
import Element from "element-ui"
export default {
  components: {DealDetail, Pay, Refund, Shipment, DealComment, AppealForm, Deliver, RefundAgree},
  props: ['orderList', 'total', 'stage', 'dealType'],
  data() {
    return {
      queryDealId: -1,
      detailVisible: false,
      payVisible: false,
      shipmentVisible: false,
      commentVisible: false,
      appealVisible: false,
      deliveryVisible: false,
      refundHandlerVisible: false,
    }
  },
  methods: {
    setQueryDealId(value) {
      this.queryDealId = value
    },
    changeDetailVisible(value) {
      this.detailVisible = value
    },
    changePayVisible(value) {
      this.payVisible = value
    },
    changeShipmentVisible(value) {
      this.shipmentVisible = value
    },
    changeCommentVisible(value) {
      this.commentVisible = value
    },
    cancelRefund(dealId) {
      this.$axios.put('http://localhost:8081/deal/cancelRefund/' + dealId)
        .then((res)=>{
        Element.Message({
          message: 'Success!',
          type: 'success',
        })
        this.refresh()
      })
    },
    changeHandleRefundVisible(value) {
      this.refundHandlerVisible = value
    },
    changeAppealVisible(value) {
      this.appealVisible = value
    },
    changeDeliverVisible(value) {
      this.deliveryVisible = value
    },
    refresh() {
      this.$emit('refresh')
    }
  },
}
</script>

<style scoped>
.content {
  margin-top: -32px;
}
</style>