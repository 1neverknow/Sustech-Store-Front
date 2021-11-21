<template>
  <div>
    <AdminHeader></AdminHeader>
    <div class="block">
      <el-table class="el-table"
                stripe
                border
                highlight-current-row
                :data="tableData"
                style="width: 100%">
        <el-table-column
            prop="recordId"
            label="recordId"
            width="180">
        </el-table-column>
        <el-table-column
            prop="dealId"
            label="dealId"
            width="180">
        </el-table-column>
        <el-table-column
            prop="picture"
            label="picture">
          <template   slot-scope="scope">
            <img :src="scope.row.picturePath"  min-width="70" height="70" />
          </template>
        </el-table-column>
        <el-table-column
            prop="content"
            label="content">
        </el-table-column>
        <el-table-column
            prop="isProcess"
            label="isProcess"
            :formatter="formatBoolean">
        </el-table-column>
        <el-table-column label="operation" align="center" min-width="100">
          　　　　<template slot-scope="scope">
          　　　　　　<el-button type="success" @click="Accept(scope.row.recordId)" plain>Accept</el-button>
          <el-button type="danger" @click="Reject(scope.row.recordId)" plain>Reject</el-button>
          　　　　</template>
          　　</el-table-column>
      </el-table>



      <el-pagination class="mpage"
                     background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[5, 10, 20, 40]"
                     :page-size="pageSize"
                     layout="total,sizes,prev, pager, next"
                     :total="allData.length"
                     prev-text="previous"
                     next-text="next">
      </el-pagination>

    </div>

  </div>
</template>

<script>
import AdminHeader from "@/components/AdminHeader";
export default {
  name: "Adminappealing",
  components:{AdminHeader},
  data() {
    return {
      allData: [],
      tableData : [],
      currentPage: 1,
      total: 0,
      pageSize: 5
    }
  },
  methods: {
    handleCurrentChange(currentPage) {
      const _this = this
      _this.currentPage=currentPage
      _this.tableData=_this.allData.slice(_this.pageSize*(currentPage-1),_this.pageSize*(currentPage))

    },
    handleSizeChange(size){
      const _this = this
      _this.handleCurrentChange(_this.currentPage)
      _this.pageSize=size
    },
    Accept(id){
      const _this= this
      _this.$axios.put("http://localhost:8081/admin/operate/deal?canRefund="+true+"&recordId="+id).then(res => {
        console.log(res)
        _this.$axios.get("/admin/appealing/deal/not").then(res => {
          console.log(res)
          _this.allData = res.data.data.sort()
          _this.total = res.data.data.length
          _this.tableData=_this.allData.slice(_this.pageSize*(_this.currentPage-1),_this.pageSize*(_this.currentPage))
        })
      })
    },
    Reject(id){
      const _this= this
      _this.$axios.put("http://localhost:8081/admin/operate/deal?canRefund"+false+"&recordId="+id).then(res => {
        console.log(res)
        _this.$axios.get("/admin/appealing/deal/not").then(res => {
          console.log(res)
          _this.allData = res.data.data
          _this.total = res.data.data.length
          _this.tableData=_this.allData.slice(_this.pageSize*(_this.currentPage-1),_this.pageSize*(_this.currentPage))
        })
      })
    },
    formatBoolean: function (row, column, cellValue) {
      var ret = ''
      if (cellValue) {
        ret = "Yes"
      } else {
        ret = "No"
      }
      return ret}

  },
  created() {
    const _this = this
    _this.handleCurrentChange(1)
    _this.$axios.get("/admin/appealing/deal/not").then(res => {
      console.log(res)
      _this.allData = res.data.data
      _this.total = res.data.data.length
      _this.tableData=_this.allData.slice(_this.pageSize*(_this.currentPage-1),_this.pageSize*(_this.currentPage))
    })

  }
}
</script>

<style scoped>
.block{
  margin-top: 20px;
  margin-left: 500px;
  margin-right: 500px;
}

.el-table el-table-column{
  color: #ffffff;
  font-size: 16px;
  background-color: transparent;
  border: 10px;
  height: 30px;
  line-height: 30px;
}

</style>