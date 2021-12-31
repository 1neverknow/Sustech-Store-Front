<template>
  <div>
    <el-table :data="manageList" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="Time" prop="time"></el-table-column>
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
                width="70%"
            >
              <DealDetail
                  v-if="detailVisible"
                  v-bind:dealId="queryDealId"
              ></DealDetail>
            </el-dialog>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ManageList",
  props: ['queryInfo'],
  data() {
    return {
      manageList: [],
      queryDealId: -1,
      detailVisible: false,
    }
  },
  methods: {
    activate() {

    },
    getAppealingDeal() {
      this.$axios.get('http://localhost:8081/admin/appealing/deal')
        .then((res) => {
          const orders = res.data.data
          this.total = orders.length
          for (let i in orders) {
            const item = orders[i]
            this.manageList.push({
              id: item.dealId,
              stage: item.stage,
            })
          }
        })
    },
    setQueryDealId(value) {
      this.queryDealId = value
    },
    changeDetailVisible(value) {
      this.detailVisible = value
    },
  }
}
</script>

<style scoped>

</style>