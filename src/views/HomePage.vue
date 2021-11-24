<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img :src="imageUrl" class="user-avator" alt/>
            <div class="user-info-cont">
              <div class="user-info-name">{{ this.$store.getters.getBasic_Info.userName }}</div>
            </div>
          </div>
          <div class="user-info-list">
            {{ this.$store.getters.getBasic_Info.sign }}
          </div>
        </el-card>
        <el-card style="height: 390px">
          <div v-show="!judge" class="cat-all-img">
            <a target="_blank" href="https://mp.weixin.qq.com/s/0S6C-zduKXrWrzNheqe0fA">
              <img src="../assets/cat/all.png">
            </a>
            <el-alert center @click.native="displayCat()"
                      title="Click to see our school cat!!"
                      type="warning">
            </el-alert>
          </div>

          <div v-show="judge">
            <el-carousel indicator-position="outside" autoplay interval="2000" v-show="tabPosition==='majiang'">
              <el-carousel-item>
                <div class="cat-img">
                  <img src="../assets/cat/majiang/1.png">
                </div>
              </el-carousel-item>
              <el-carousel-item>
                <div class="cat-img">
                  <img src="../assets/cat/majiang/2.png">
                </div>
              </el-carousel-item>
              <el-carousel-item>
                <div class="cat-img">
                  <img src="../assets/cat/majiang/4.png">
                </div>
              </el-carousel-item>
            </el-carousel>

            <el-carousel indicator-position="outside" autoplay interval="2000" v-show="tabPosition==='guopi'">
              <el-carousel-item>
                <div class="cat-img">
                  <img src="../assets/cat/guopi/1.png">
                </div>
              </el-carousel-item>
              <el-carousel-item>
                <div class="cat-img">
                  <img src="../assets/cat/guopi/2.png">
                </div>
              </el-carousel-item>
              <el-carousel-item>
                <div class="cat-img">
                  <img src="../assets/cat/guopi/3.png">
                </div>
              </el-carousel-item>
            </el-carousel>

            <el-carousel indicator-position="outside" autoplay interval="2000" v-show="tabPosition==='hanhan'">
              <el-carousel-item>
                <div class="cat-img">
                  <img src="../assets/cat/hanhan/1.png">
                </div>
              </el-carousel-item>
              <el-carousel-item>
                <div class="cat-img">
                  <img src="../assets/cat/hanhan/2.png">
                </div>
              </el-carousel-item>
              <el-carousel-item>
                <div class="cat-img">
                  <img src="../assets/cat/hanhan/3.png">
                </div>
              </el-carousel-item>
            </el-carousel>

            <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;margin-left: 130px">
              <el-radio-button label="majiang">majiang</el-radio-button>
              <el-radio-button label="hanhan">hanhan</el-radio-button>
              <el-radio-button label="guopi">guopi</el-radio-button>
            </el-radio-group>
          </div>
        </el-card>


      </el-col>
      <!---->
      <el-col :span="12">
        <div style="height: 100%">
          <el-calendar class="el-calendar" style="margin-left: 0; margin-right: 0">
            <template
                slot="dateCell"
                slot-scope="{date, data}" class="calItem">
              <div class="dayItem" @click="dialogVisible = true;calClick(data)">
                {{ data.day.split('-')[2] }}
              </div>
              <div v-for="(item,index) in calendarData" :key="index">
                <div v-if="(item.years).indexOf(data.day.split('-').slice(0)[0])!==-1
              && (item.months).indexOf(data.day.split('-').slice(1)[0])!==-1 && (item.days).indexOf(data.day.split('-').slice(2).join('-'))!==-1">
                  <el-tooltip :content="item.things" placement="left-start">
                    <div class="mark">
                      {{ item.things }}
                    </div>
                  </el-tooltip>
                </div>
                <div v-else></div>
              </div>
            </template>
          </el-calendar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      judge : false,
      imageUrl: '',
      value: new Date(),
      items: [
        "../assets/cat/majiang/1.png",
        '../assets/cat/majiang/2.png',
        '../assets/cat/majiang/3.png',
        '../assets/cat/majiang/4.png'
      ],
      tabPosition: 'majiang',


      eachDay: {
        years: '',
        months: '',
        days: '',
        id: 0,
        things: ''
      },
      calendarData: []
    }
  },
  mounted() {
    this.imageUrl = this.$store.getters.getBasic_Info.picturePath
    const _this = this
    _this.$axios.get("http://120.24.4.97:8081/calender").then(res => {
      console.log(res)
      console.log("!!!!!!!")
      _this.result = res.data.data
      for (let item of _this.result) {
        _this.eachDay.years = item.date.substr(0, 4)
        _this.eachDay.months = item.date.substr(-5, 2)
        _this.eachDay.days = item.date.substr(-2)
        _this.eachDay.things = item.description
        _this.id = item.id
        _this.calendarData.push(_this.eachDay)
        _this.eachDay = {}
      }
    })

  },
  methods: {
    displayCat(){
      console.log(123)
      this.judge = !this.judge
    }
  }
}
</script>

<style scoped>
.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.mgb20 {
  margin-bottom: 20px;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.cat-img img {
  width: 570px;
  height: 300px;
}

.cat-all-img img {
  margin-left: 30px;
  width: 480px;
  height: 320px;
}

</style>
