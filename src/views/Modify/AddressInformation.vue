<!-- 问题 default是假的>-->
<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <i class="el-icon-location-information"></i> Address List
      </el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class='card'>
      <div class="handle-box">

        <el-button type="primary" icon="el-icon-plus" @click="handleAdd" round style="width:10%">Add</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="handleDS" round style="width:12%">DeleteMore
        </el-button>
        <!--        <div style="alignment: right">-->
        <el-button v-if="save_disable" type="success" icon="el-icon-check" @click="handleSave" round
                   style="width:10%;margin-left: 55%" align="center">Save
        </el-button>
        <el-button v-if="save_disable" type="info" icon="el-icon-close" @click="handleCancel" round style="width:10%"
                   align="center">Cancel
        </el-button>
        <!--        </div>-->

      </div>

      <div class="container">
        <el-table :data="tableData" border class="table" ref="multipleTable" style="margin-top: 20px"
                  header-cell-style="background-color: lightsteelblue;" @selection-change="selsChange"
                  :row-style="rowStyle" >

          <el-table-column width="50" type="selection" prop="delete"></el-table-column>

          <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
          <!--          居中问题-->
          <el-table-column label="Receiver" style="width:20%" align="center">
            <template slot-scope="scope">
              <el-input style="text-align: center" v-model="scope.row.receiver" :disabled="!scope.row.edit_ornot"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="type" align="center" width="100">
            <template #default="scope">
              <el-tag @click="change(scope.$index)" :type="
                                scope.row.type === 'Default'
                                    ? 'danger'
                                    : 'success'

                            ">{{ scope.row.type }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="Telephone" style="width:20%" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.telephone" :disabled="!scope.row.edit_ornot"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="Address" style="width:20%" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.address" :disabled="!scope.row.edit_ornot"></el-input>
            </template>
          </el-table-column>


          <el-table-column label="Operation" style="width: 20%" align="center">
            <template #default="scope">
              <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row,scope.$index)">
                Edit
              </el-button>
              <el-button type="text" icon="el-icon-delete" style="color: red"
                         @click="deleteRow(scope.$index)">Delete
              </el-button>

            </template>
          </el-table-column>

        </el-table>
      </div>

      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="1" v-bind:total="tableData.length"></el-pagination>
      </div>
    </el-card>
  </div>

</template>


<script>
export default {
  name: "AI",
  mounted() {
    this.initial();
  },
  data() {
    return {
      save_disable: false,
      current_type: '',
      edit_list:[],
      add_ornot: false,
      test: [
        {
          type: ''
        }
      ],
      sels: [],//选中显示的值
      oldData: [

      ],
      tableData: [
        // {
        //   database_id: '',
        //   id: 1,
        //   receiver: 'user1',
        //   telephone: '17796370472',
        //   address: '荔园八栋收发室',
        //   edit_ornot: false,
        //   type:'Default'
        // },
        // {
        //   database_id: '',
        //   id: 2,
        //   receiver: 'user1',
        //   telephone: '17796370472',
        //   address: '二期宿舍13栋收发室',
        //   edit_ornot: false,
        //   type:'normal'
        // },
        // {
        //   database_id: '',
        //   id: 3,
        //   receiver: 'user1',
        //   telephone: '17796370472',
        //   address: '湖畔5栋收发室',
        //   edit_ornot: false,
        //   type:'normal'
        // }
      ]
    }
  },
  methods: {
    selsChange(sels) {
      this.sels = []
      sels.forEach((item) => {
        this.sels.push(this.tableData.indexOf(item))
      })
    },

    rowStyle({row, rowIndex}) {
      // return {"  text-align: center;"}
      if (this.sels.includes(rowIndex)) {
        console.log(row.address)
        return {"background-color": "lightskyblue","text-align":"center"}
      }
    },

    handleEdit(row,rowIndex) {
      console.log(rowIndex)
      let oldOne = {
        receiver: this.tableData[rowIndex].receiver,
        telephone: this.tableData[rowIndex].telephone,
        address: this.tableData[rowIndex].address,
        type:this.tableData[rowIndex].type
      }
      this.oldData.push(oldOne)
      this.save_disable = true
      this.current_type = 'edit'
      row.edit_ornot = true
      this.edit_list.push(rowIndex)
    },

    handleAdd() {
      if(this.add_ornot){
        this.$message({
          type: 'error',
          message: 'You should save or cancel add operation'
        });
      }else {
        this.save_disable = true
        this.current_type = 'add'
        var newOne = {
          database_id: '',
          id: this.tableData.length + 1,
          receiver: '',
          telephone: '',
          address: '',
          edit_ornot: true,
          type:'Normal'
        }
        this.tableData.push(newOne)
        this.add_ornot = true
      }
    },

    handleCancel() {
      if(this.current_type ==='edit'){
        let index= 0
        this.edit_list.forEach((item) => {
          console.log(item)
          console.log(index)
          this.tableData[item].edit_ornot = false
          this.tableData[item].address = this.oldData[index].address
          this.tableData[item].telephone = this.oldData[index].telephone
          this.tableData[item].receiver= this.oldData[index].receiver
          this.tableData[item].type = this.oldData[index].type
          index++
        })
        this.edit_list=[]
        this.oldData = []
      }else {
        this.tableData.pop()
        this.add_ornot = false
      }

      this.save_disable = false
      this.current_type = ''
    },

    change(index){
      if(this.current_type!==''){
        if(this.tableData[index].type==='Normal'){
          this.tableData[index].type='Default'
        }else {
          this.tableData[index].type='Normal'
        }
      }
    },

    // "addressId": 1,
    // "belongToUserId": null,
    // "recipientName": "user1",
    // "addressName": "荔园",
    // "phone": 17796370472,
    // "isDefault": null
    initial(){
      this.$axios({
        method: 'get',
        url: 'http://localhost:8081/user/address',
        headers : {
          'Content-Type': 'application/json',
          'authorization' :this.$store.getters.getToken
        },
        transformRequest: [function (data) {  // 将{username:111,password:111} 转成 username=111&password=111
          var ret = '';
          for (var it in data) {
            // 如果要发送中文 编码
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret.substring(0,ret.length-1)
        }]
      }).then(res => {
        if (res.data.code === 2000) {
          const data = res.data.data
          console.log("test 1")
          let de_index = 0
          data.forEach((item)=> {
            let address_info = {
              database_id: item.addressId,
              id: this.tableData.length+1,
              receiver: item.recipientName,
              telephone: item.phone,
              address: item.addressName,
              edit_ornot: false,
              type:de_index === 0?'Default':'Normal',
            }
            if(de_index===0) {
              this.$store.commit("SET_Default_Address",address_info)
              de_index=1
            }
            this.tableData.push(address_info)
          })
        } else {
          this.$alert(res.data.message, 'Tip', {
            confirmButtonText: 'OK'
          })
        }
      })
    },

    handleSave(){
      if(this.current_type==='edit'){
        let index = 0
        this.edit_list.forEach((item) => {
          this.editRequest(item,index)
          index++
        })
      }else {
        this.addRequest(this.tableData.length-1)
      }

    },

    editRequest(item,index){
      let address = {
        addressId : this.tableData[item].database_id,
        addressName :this.tableData[item].address,
        phone:this.tableData[item].telephone,
        recipientName :this.tableData[item].receiver,
        belongToUserId : 0
      }

      this.$axios({
        method: 'put',
        url: 'http://localhost:8081/user/address',
        headers : {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(address),
      }).then(res => {
        if (res.data.code === 2000) {
          this.$message({
            type: 'success',
            message: 'You have successfully edit address'
          });
          this.edit_list.splice(index,1)
          this.oldData.splice(index,1)
          this.tableData[item].edit_ornot = false
        } else {
          this.$message({
            type: 'info',
            message: 'You have failed with the'+ index+' address update'
          });
        }
      })
    },
    // 返回一个id 用于后续修改
    addRequest(position){
      let address = {
        addressId : 0,
        addressName :this.tableData[position].address,
        phone:this.tableData[position].telephone,
        recipientName :this.tableData[position].receiver,
        belongToUserId : 0
      }
      this.$axios({
        method: 'post',
        headers : {
          'Content-Type': 'application/json',
        },
        url: 'http://localhost:8081/user/address',
        data:JSON.stringify(address),
        // transformRequest: [function (data) {  // 将{username:111,password:111} 转成 username=111&password=111
        //   var ret = '';
        //   for (var it in data) {
        //     // 如果要发送中文 编码
        //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        //   }
        //   return ret.substring(0,ret.length-1)
        // }],
      }).then(res => {
        if (res.data.code === 2000) {
          // this.tableData[position].database_id = data.addressID
          this.tableData[position].edit_ornot = false
          this.$message({
            type: 'success',
            message: 'You have successfully add one address'
          });
          this.add_ornot = false
          this.save_disable = false
        } else {
          // this.handleCancel()
          this.$message({
            type: 'info',
            message: 'Please check your new address'
          });
          this.save_disable = false
        }
      })
    },

    deleteRow(index) {
      console.log(index)
      this.$confirm('Are you sure to delete?', 'Tips', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.deleteRequest(index)
        this.tableData.splice(index, 1);
        for (let i = index; i < this.tableData.length; i++) {
          this.tableData[i].id -= 1
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'You have Cancel the operation'
        });
      });
    },

    deleteRequest(index){
      this.$axios({
        method: 'delete',
        url: 'http://localhost:8081/user/address?addressId='+ this.tableData[index].database_id,
        headers : {
          'Content-Type': 'application/json',
        },
        data:{addressId:this.tableData[index].database_id},
        transformRequest: [function (data) {  // 将{username:111,password:111} 转成 username=111&password=111
          var ret = '';
          for (var it in data) {
            // 如果要发送中文 编码
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret.substring(0,ret.length-1)
        }]
      }).then(res => {
        if (res.data.code === 2000) {
          this.$message({
            type: 'success',
            message: 'You have successfully delete this address'
          });
        } else {
          this.handleCancel()
          this.$alert(res.data.message, 'Tip', {
            confirmButtonText: 'OK'
          })
        }
      })
    }

  }

}
</script>

<style scoped>
.crumbs {
  margin: 10px 0;
}

.card {
  margin-top: 10px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.table {
  width: 100%;
  font-size: 14px;
}

.table-header {
  background-color: lightskyblue;
}

.pagination {
  margin: 20px 0;
  text-align: right;
}


.container>>>.is-disabled .el-input__inner  {
  opacity: 1;
  font-weight: 900;
  border:0;
  background-color:white;
  color: #2bbfdb;
}

/deep/.el-table th > .cell {
  text-align: center;
}

/deep/.el-table .cell {
  text-align: center;
}

</style>
