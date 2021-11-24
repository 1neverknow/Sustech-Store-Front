<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6" style="text-align: center;margin:0 0 10px 10px">
          <i class="el-icon-wallet"> Money</i> {{ this.$store.getters.getBasic_Info.money }}
        </el-col>
        <el-col :span="6" style="background-color:#f0f9eb;text-align: center;margin:0 0 10px 10px">
          <i class="el-icon-back"> Outcome</i> {{ this.consume_money }}
        </el-col>
        <el-col :span="6" style="background-color:oldlace;text-align: center;margin:0 0 10px 10px">
          <i class="el-icon-right"> Income</i> {{ this.charge_money }}
        </el-col>

        <el-col :span="4">
          <el-button @click="charge_display()" type="primary" icon="el-icon-collection-tag" circle style="margin-top: -10px;margin-left: 20px">
            Charge
          </el-button>
        </el-col>


      </el-row>
    </el-card>
    <el-breadcrumb separator="/" style="margin-top: 10px">
      <el-breadcrumb-item>
        <i class="el-icon-money"></i> Payment Record
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-table :data="tableData" border class="table" ref="multipleTable" style="margin-top: 10px"
                header-cell-style="background-color: lightsteelblue;" :row-class-name="tableRowClassName" width="1050">
        <el-table-column width="50" type="selection" prop="delete"></el-table-column>

        <!--          <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>-->

        <el-table-column align="center" prop="inout" label="Consume or Charge" width="200"></el-table-column>
        <el-table-column align="center" prop="recordTime" sortable label="RecordTime" width="200"></el-table-column>
        <el-table-column align="center" prop="money" sortable label="Money" width="200"></el-table-column>
        <el-table-column align="center" prop="address" label="Address" width="200"></el-table-column>
        <el-table-column align="center" label="If Valid" width="400">
          <template #default="scope">
            <el-tag :type="
                                scope.row.isTrue === 'Yes'
                                    ? 'success'
                                    : 'failed'

                            "> {{ scope.row.isTrue }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    &lt;!&ndash;<div>-->
    <el-pagination style="margin: 20px 0;text-align: right;"
                   background layout="total, prev, pager, next" :current-page="1"
                   v-bind:total="tableData.length"></el-pagination>

    <!--    </div>&ndash;&gt;-->

    <el-dialog  :visible.sync="chargeVisible" append-to-body>
      <Charge
          v-if="chargeVisible"
          @changeVisible="changeChargeVisible"
          @chargeConfirm="chargeConfirm"
          v-bind:dealId="dealId"
      ></Charge>
    </el-dialog>
  </div>



</template>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-table .refund-row {
  background: #c5cbf5;
}

.el-table .sell-row {
  background: #fac0e2;
}

</style>

<script>
//  import router from '../router'
import Charge from "@/components/Charge";
import Element from "element-ui";

export default {
  name: 'AccountList',
  components: {Charge},
  mounted() {
    this.$axios({
      method: 'get',
      url: 'http://localhost:8081/user/charge/history',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (res.data.code === 2000) {
        this.pagetotal += res.data.data.length
        res.data.data.forEach((item) => {
          if (item.ipAddress === '-1') {
            console.log("refund")
            let onerecord = {
              money: item.money,
              inout: 'Refund',
              recordTime: item.chargeDate,
              address: '',
              isTrue: 'Yes'
            }
            this.tableData.push(onerecord)
          }else if (item.ipAddress === '-2') {
            let onerecord = {
              money: item.money,
              inout: 'Sell Money',
              recordTime: item.chargeDate,
              address: '',
              isTrue: 'Yes'
            }
            this.tableData.push(onerecord)
          }
            else {
            let onerecord = {
              money: item.money,
              inout: 'Charge',
              recordTime: item.chargeDate,
              address: item.ipAddress,
              isTrue: 'Yes'
            }
            this.tableData.push(onerecord)
          }
          this.charge_money += item.money

        })
      }
    })

    this.$axios({
      method: 'get',
      url: 'http://localhost:8081/user/consume/history',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (res.data.code === 2000) {
        this.pagetotal += res.data.data.length
        res.data.data.forEach((item) => {
          let onerecord = {
            money: item.money,
            inout: 'Consume',
            recordTime: item.consumeDate,
            address: item.ipAddress,
            isTrue: 'Yes'
          }
          this.tableData.push(onerecord)
          this.consume_money += item.money

        })
      }
    })
  },

  data() {
    return {
      chargeVisible:false,
      tableData: [],
      charge_money: 0,
      consume_money: 0,
      dealId :1,
    }
  },
  methods: {
    charge_display(){
      this.chargeVisible = !this.chargeVisible
    },
    tableRowClassName({row, rowIndex}) {
      if (row.inout === 'Charge') {
        return 'warning-row';
      } else if(row.inout === 'Refund'){
        return 'refund-row';
      }else if(row.inout === 'Sell Money'){
        return 'sell-row';
      }
      else {
        return 'success-row';
      }
    },
    changeChargeVisible(value) {
      this.chargeVisible = value
    },
    chargeConfirm(value) {
      const chargeId = value
      console.log(value)
      Element.MessageBox.confirm(
          'Have you finished charge?',
          'Warning',
          {
            confirmButtonText: 'YES',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      )
          .then(() => {
            this.$axios.get('http://localhost:8081/user/charge/' + chargeId)
                .then(res => {
                  Element.Message({
                    type: 'success',
                    message: 'Charge Success',
                  })
                })
          })
          .catch(() => {
            Element.Message({
              type: 'info',
              message: 'Charge canceled',
            })
          })
    },
  }
}
</script>
