<template>
  <el-container>
    <el-header>
      <div class="header_left">
        <div class="user-image">
          <img src="@/assets/pic.png"/>
        </div>
        <p style="margin-left: 10px">Sustech XianYu</p>
      </div>
      <div class="header-right" style="float: right;padding-right: 50px">
        <div class="not-login" v-if="this.$store.getters.getToken===null">
          <router-link to="/login" style="text-decoration: none">
            <el-button type="primary" plain>Login</el-button>
          </router-link>

          <router-link to="/user/register" style="text-decoration: none">
            <el-button type="primary" plain style="margin-left: 20px">Register</el-button>
          </router-link>

        </div>
        <div class="have-login" v-if="this.$store.getters.getToken!==null">
          <div class="user-image">
            <img src="@/assets/photo.png"/>
          </div>
          <el-button type="primary" plain style="margin-left: 10px">LogOut</el-button>
        </div>
      </div>
    </el-header>

    <el-main class="sh_mail">
      <el-collapse v-model="judge" @click="judge===['1']?judge=true:judge=['1']">
        <el-collapse-item name="1" title="Collapse this" >
          <div style="margin-top: 10px">
            <el-carousel indicator-position="outside" height="500px" autoplay interval="2000">
              <el-carousel-item v-for="carousel in carousels" :key="carousels">
                <a target="_blank" :href="carousel.link">
                  <!--              <p>asdasd</p>-->
                  <img class="ca_img" :src="carousel.picturePath"/>
                </a>
              </el-carousel-item>

            </el-carousel>
          </div>
        </el-collapse-item>
      </el-collapse>


      <div class="search_all" style="margin-top: 10px">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-form-item label="Search Type">
            <el-select v-model="formInline.region" placeholder="Search Users or Goods">
              <el-option label="Users" value="users"></el-option>
              <el-option label="Goods" value="goods"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-input v-model="formInline.user" placeholder="Please input the search content"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">Search</el-button>
          </el-form-item>
        </el-form>

      </div>

      <el-alert
          right
          type="info"
          :closable="false">
        <template #default="title">
          <p>asd</p>
        </template>
      </el-alert>

      <div id="DailyRecom" @click="dispalyGoods()">
        <!--     每日推荐 -->
        <div v-for="item in list">
          <div>
            <img class="img_sc" src="../assets/img.jpg" alt="">
            <p class="p_sc">
              {{ item.name }}
            </p>
            <p class="price_sc">
              {{ item.price}}
            </p>
            <p class="p_sc">
              <el-button type="text" class="button" icon="el-icon-star-off" @click="addCollection()">添加收藏</el-button>
              <el-button type="text" class="button" icon="el-icon-goods">加购物车</el-button>
            </p>
          </div>
        </div>

      </div>


    </el-main>
  </el-container>
</template>

<script>

export default {
  beforeRouteEnter(to, from, next) {
    // 添加背景色 margin:0;padding:0是为了解决vue四周有白边的问题
    document.querySelector('body').setAttribute('style', 'margin:0;padding:0')
    next()
  },
  beforeRouteLeave(to, from, next) {
    // 去除背景色
    document.querySelector('body').setAttribute('style', '')
    next()
  },
  mounted() {
    this.$axios({
      method: 'get',
      url: 'http://localhost:8081/carousel',
    }).then(res => {
      if (res.data.code === 2000) {
        res.data.data.forEach(item => {
          this.carousels.push(item)
        })
      }
    })
    this.$axios({
      method: 'get',
      url: 'http://localhost:8081/goods/random',
    }).then(res => {
      if (res.data.code === 2000) {
        console.log(res.data.data)
        // res.data.data.forEach(item => {
        //   console.log(item.link)
        //   this.carousels.push(item)
        // })
      }
    })
  },
  name: "SHP",
  data() {
    return {
      judge: ['1'],
      carousels: [],
      list: [
        {
          picture_path: "../assets/img.jpg",
          price : '¥132.0',
          name: "防晒口罩护颈防紫外线薄款女冰丝遮阳脸罩透气夏季男全脸遮脸面罩"
        },
        {
          picture_path: "failed.jpg",
          price : '¥132.0',
          name: "fuck everything"
        },
        {
          picture_path: "failed.jpg",
          price : '¥132.0',
          name: "fuck everything"
        }
      ],
      formInline: {
        user: '',
        region: ''
      },
      GoodList: [
        {
          goodsId: 1,
          picture: '',
          title: 'Mana Stone',
          introduce: 'Help you grow stronger',
          price: 100000,
        },
        {
          goodsId: 2,
          picture: '',
          title: 'KFC',
          introduce: '写饿了',
          price: 30,
        }
      ]

    }
  },
  methods:{
    dispalyGoods(){
      this.$message({
        type: 'info',
        message: 'You have Cancel the operation'
      });
    },
    addCollection(){
      this.$message({
        type: 'error',
        message: 'You have Cancel the operation'
      });
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #a0e7fc;
  color: #333;
  text-align: center;
  line-height: 60px;
  margin: 0;
}

.sh_mail {
  margin-top: 10px;
  padding: 0;
  text-align: center;
  height: 95%;
  background-image: url(../assets/background1.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.user-image {
  margin-top: 10px;
}

.user-image img {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-top: -10px
}

.have-login {
  display: flex;
  height: 70px;
  align-items: center;
  /*padding: 10px;*/
}

.header_left {
  float: left;
  padding-right: 50px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  height: 60%;
}


#DailyRecom {
  box-sizing: border-box;
  margin-left: 50px;
  padding: 0;
}

#DailyRecom > div {
  float: left;
  width: 200px;
  height: 320px;
  margin: 10px 10px 13px 12px;
  padding: 8px;
  border: 1px solid #919191;
  transition: all 0.5s;
}

#DailyRecom > div:hover {
  /*border: 2px solid #ff0000;*/
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
.price_sc {
  width: 180px;
  font-size: 15px;
  text-align: right;
  /* text-indent: 2rem; */
}

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

.el-button:hover {
  color: #1cce66;
}

.ca_img {
  height: 500px;
  width: 1000px;
}
</style>
