 <template>
  <div>
    <AdminHeader></AdminHeader>
    <el-calendar class="el-calendar">
      <template
          slot="dateCell"
          slot-scope="{date, data}" class="calItem">
        <div class="dayItem" @click="dialogVisible = true;calClick(data)">
          {{ data.day.split('-').slice(1).join('-') }}
        </div>
        <div v-for="(item,index) in calendarData" :key="index">
          <div v-if="(item.years).indexOf(data.day.split('-').slice(0)[0])!==-1
              && (item.months).indexOf(data.day.split('-').slice(1)[0])!==-1 && (item.days).indexOf(data.day.split('-').slice(2).join('-'))!==-1">
            <el-tooltip :content="item.things" placement="left-start">
              <div class="mark">
                {{item.things}}
                <i class="el-icon-delete" @click="deleteEvent(item.id,index)"></i>
              </div>

            </el-tooltip>
          </div>
          <div v-else></div>
        </div>
      </template>
    </el-calendar>
    <el-dialog
        :title="formData.data"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-form @submit.native.prevent>
        <el-form-item label="event">
          <el-input v-model="formData.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false;add()">add</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
import AdminHeader from "@/components/AdminHeader";
export default {
  name: "Event",
  components:{AdminHeader},
  data(){
    return {
      formData:{
        data:'',
        content: ''
      },
      dialogVisible: false,
      result:[],
      eachDay:{
        years:'',
        months:'',
        days:'',
        id:0,
        things:''
      },
      calendarData: [
      ],
      value: new Date()
    }
  },
  methods: {
    calClick(item){
      const _this=this
      _this.formData.data = item.day
      console.log(_this.formData.data)

    },
    handleClose(done){
      done()
    },
    add(){
      const _this=this
      _this.$axios.put("http://localhost:8081/admin/calendar",{
        date:_this.formData.data,description:_this.formData.content}).then(res=>{
        let date = _this.formData.data.split('-')
        let a =  {
          years: [date[0]],
          months: [date[1]],
          days: [date[2]],
          things: _this.formData.content,
          id: res.data.data
        }
        _this.calendarData.push(a)
      })
    },
    deleteEvent(id,index){
      const _this=this
      console.log("zxyzxy:"+id)
      _this.$axios.delete("http://localhost:8081/admin/calendar?eventId="+id)
      _this.calendarData.splice(index,1)

  },
  mounted() {
    const _this = this
    _this.$axios.get("http://localhost:8081/calender").then(res => {
      console.log(res)
      console.log("!!!!!!!")
      _this.result = res.data.data
      for (let item of _this.result){
        _this.eachDay.years=item.date.substr(0,4)
        _this.eachDay.months=item.date.substr(-5,2)
        _this.eachDay.days=item.date.substr(-2)
        _this.eachDay.things=item.description
        _this.id=item.id
        _this.calendarData.push(_this.eachDay)
        _this.eachDay= {}
      }
    })

  }
}
}
</script>


 <style>
 .dayItem{
   font-size: 20px;
 }
 .current .dayItem{
   color: #1e2b39;
   opacity: 1000;
 }
 .el-calendar{
   margin-left: 100px;
   margin-right: 100px;
 }
 </style>
