<template>
  <div>
    <el-header class="page_header">
      <div class="title">
        <p style="margin-left: 5%">{{title}}</p>
        <div class="list">
          <ul>
            <li><router-link to="/sh">Homepage</router-link></li>
            <li><router-link to="/">User Page</router-link></li>
            <li><el-button
                type="text"
                class="route-btn"
                @click="changeComplainVisible(true)"
            >Complain this User
            </el-button></li>
          </ul>
        </div>
      </div>
    </el-header>

    <el-dialog
        title="Complain"
        :visible.sync="complainVisible"
        width="50%"
    >
      <ComplainUser
          @changeVisible="changeComplainVisible"
          v-bind:id="userId"
      ></ComplainUser>
    </el-dialog>


    <el-card style="margin-top: 10px">
      <el-container>
        <el-aside width="200px">
          <div class="search_user_image">
            <img :src = "this.picture">
          </div>
        </el-aside>

        <el-container>
          <el-main >
            <el-descriptions class="margin-top" :column="3" border>

              <el-descriptions-item label-style="width:15%" content-style="width:15%">
                <template slot="label">
                  <i class="el-icon-user"></i>
                  User Name
                </template>
                {{ user_name }}
              </el-descriptions-item>

              <el-descriptions-item label-style="width:15%" content-style="width:15%">
                <template slot="label">
                  <i class="el-icon-male"></i>
                  gender
                </template>
                {{ gender }}
              </el-descriptions-item>

              <el-descriptions-item label-style="width:15%" content-style="width:15%">
                <template slot="label">
                  <i class="el-icon-message"></i>
                  Email
                </template>
                {{ email }}
              </el-descriptions-item>


              <el-descriptions-item label-style="width:15%" content-style="width:15%">
                <template slot="label">
                  <i class="el-icon-date"></i>
                  Birthday
                </template>
                {{ birthday }}
              </el-descriptions-item>

              <el-descriptions-item label-style="width:15%" content-style="width:15%">
                <template slot="label">
                  <i class="el-icon-cherry"></i>
                  Credit
                </template>
                {{ credit }}
              </el-descriptions-item>

              <el-descriptions-item label-style="width:15%" content-style="width:15%">
                <template slot="label">
                  <i class="el-icon-mobile-phone"></i>
                  Telephone Number
                </template>
                {{ phone }}
              </el-descriptions-item>

              <el-descriptions-item label-style="width:15%" content-style="width:15%">
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  Personality signature
                </template>
                <!--      <el-tag size="small">学校</el-tag>-->
                {{ PersonalitySignature }}
              </el-descriptions-item>

            </el-descriptions>
          </el-main>
        </el-container>
      </el-container>
    </el-card>

    <h3>
      发布的商品
    </h3>
    <el-col>
      <el-row>
        <div id="DailyRecom" >
          <!--     每日推荐 -->
          <div v-for="item in display_goods" @click="queryGoods(item.goodsId)">
            <div>
              <img class="img_sc" :src="item.picturePath" alt="">
              <p class="p_sc">
                ¥{{ item.price }}   {{ item.title }}
              </p>
            </div>
          </div>
        </div>
      </el-row>

      <el-row>
        <div class="pagination" style="float: right"
        >
          <el-pagination
              background
              layout="prev, pager, next"
              :page-count="goodsPage"
              @current-change="handleGoodsCurrentChange">
          </el-pagination>
        </div>
      </el-row>
    </el-col>
  </div>

</template>

<script>
import Element from "element-ui";
import Complain from "@/components/ComplaintForm";
import ComplainUserAll from "@/views/ComplainUserAll";
import ComplainUser from "@/components/ComplainUser";
export default {
  components: {ComplainUserAll, Complain,ComplainUser},
  mounted() {
    this.activate()
  },
  name: "User",
  data() {
    return {
      complainVisible:false,
      userId: '',
      user_name: '',
      phone: '',
      picture: '',
      email: '',
      gender: '',
      birthday: '',
      credit: '',
      money: '',
      id_card: '',
      PersonalitySignature: '',
      goods: [],
      display_goods :[],
      goodsPage:0
    }
  },
  methods: {
    handleGoodsCurrentChange(val){
      this.display_goods = []
      this.goods.forEach((item,index)=>{
        if((val-1)*12<=index&& index<val*12){
          this.display_goods.push(item)
        }
      })
    },
    activate() {
      this.display_goods=[]
      this.goods =[]
      const userId = this.$route.params.userId
      if (!userId) {
        Element.Message({
          message: 'Goods ID not exist!',
          type: 'error',
        })
        this.$router.push('/none')
        return
      }
      this.userId = userId
      this.getDetails()
    },
    getDetails() {
      this.$axios({
        method: 'get',
        url: 'http://120.24.4.97:8081/user/information/'
            + this.userId,
      }).then(res => {
        if (res.data.code === 2002) {
          this.$router.push('/')
        } else if (res.data.code === 2001) {
          console.log(1)
          const data = res.data.data
          this.user_name = data.userName
          this.phone = data.phone
          this.picture = data.picturePath
          this.email = data.email
          this.gender = data.gender===0?'Man':data.gender===1?'Woman':'Secret'
          this.birthday = data.birthday
          this.credit = data.credit
          this.PersonalitySignature = data.sign
        } else {
          this.$alert(res.data.message, 'Tip', {
            confirmButtonText: 'OK'
          })
        }
      })

      this.$axios({
        method: 'get',
        url: 'http://120.24.4.97:8081/user/announceGoods/' + this.userId + '/2',
      }).then(res => {
        if (res.data.code === 2000) {
          console.log(res.data.data)
          res.data.data.forEach(good => {
            this.goods.push(good)
            if(this.display_goods.length<12){
              this.display_goods.push(good)
              console.log(good)
            }
          })
          this.goodsPage = Math.ceil(this.goods.length/12)
        }
      })

    },
    queryGoods(id) {
      if (this.state) {
        this.$store.commit('SET_Good_List', this.list)
        this.$store.commit('SET_SEARCH_CONTENT', this.formInline.content)

      }
      this.$router.push('/goods/' + id)
    },
    changeComplainVisible(val){
      this.complainVisible = val
    }
  }
}
</script>

<style scoped>
.search_user_image img {
  display: block;
  width: 180px;
  height: 180px;
  border-radius: 50%;
}

#DailyRecom {
  box-sizing: border-box;
  margin-left: 2%;
  padding: 0;
}

#DailyRecom > div {
  float: left;
  width: 190px;
  height: 190px;
  margin: 10px 10px 13px 12px;
  padding: 8px;
  border: 1px solid #919191;
  transition: all 0.5s;
}

#DailyRecom > div:hover {
  border: 1px solid #ff0000;
  transform: translate(0, -10px);
}

#DailyRecom > div > img, .img_sc {
  width: 180px;
  height: 165px;
}

#DailyRecom > div > p, .p_sc {
  width: 180px;
  font-size: 15px;
  text-align: justify;
  /* text-indent: 2rem; */
}

/*.price_sc {*/
/*  width: 180px;*/
/*  font-size: 15px;*/
/*  text-align: right;*/
/*  !* text-indent: 2rem; *!*/
/*}*/

#DailyRecom > div > p:nth-of-type(1), .p_sc:nth-of-type(1) {
  overflow: hidden;
  width: 180px;
  height: 60px;
  margin-top: 5px;
}

#DailyRecom > div > p:nth-of-type(2), .p_sc:nth-of-type(2) {
  position: absolute;
  margin-top: 2px;
  text-align: center;
}
.title {
  color: #fff;
  font-size: 13px;
  display: flex;
  align-items: center;
}
.list {
  margin-right: -20%;
  height: 64px;
  float: right;
}

.page_header {
  height: 300px;
  width: 105%;
  margin-left: -2%;
  /*margin-top: -20px;*/
  z-index: 4;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  -webkit-box-shadow: 0 5px 5px rgba(0, 0, 0, 0.07);
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.07);
}
 .page_header .title {
  margin-top: -30px;
  width: 1225px;
  height: 30px;
  line-height: 64px;
  font-size: 25px;
  font-weight: 400;
  color: #212121;
}
 .page_header .title p {
  float: left;
}
 .page_header .title .list {
  margin-right: -20%;
  height: 64px;
  float: right;
}

 .page_header .title .list li {
  float: left;
  margin-left: 50px;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
 .page_header .title .list li a {
  font-size: 14px;
  color: #616161;
}
 .page_header .title .list li a:hover {
  font-size: 14px;
  color: #ff6700;
}

 .page_header .title .list li .route-btn {
  font-size: 14px;
  color: #616161;
  text-decoration: underline
}
 .page_header .title .list .li .route-btn:hover {
  font-size: 14px;
  color: #ff6700;
  text-decoration: underline
}
</style>
