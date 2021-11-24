<template>
  <el-container>
    <el-header class="main_header">
      <div class="header_left">
        <div class="user-image">
          <img src="@/assets/pic.png"/>
        </div>
        <p style="margin-left: 10px">Sustech Store</p>
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
            <router-link to="/" style="text-decoration: none">
              <img :src=" this.$store.getters.getBasic_Info.picturePath"/>
            </router-link>

          </div>
          <el-button type="primary" plain style="margin-left: 10px" @click=logout()>LogOut</el-button>
        </div>
      </div>
    </el-header>

    <el-main class="sh_mail">
      <div class="bs-sysMsg">
        <i class="el-alert__icon el-icon-warning"></i>
        <div class="msg__content">
          <el-carousel height="20px" indicator-position="none" :autoplay="true">
            <el-carousel-item v-for="item in systemMsg" :key="item.id">
              {{ item.title }}
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

<!--      <el-collapse v-model="judge" @click="judge===['1']?judge=true:judge=['1']">-->
<!--        <el-collapse-item name="1">-->
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
<!--        </el-collapse-item>-->
<!--      </el-collapse>-->


<!--      <div class ="bottom">-->
      <el-card style="opacity: 0.8">
        <div class="search_all" style="margin-top: 10px">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="ruleForm"
                   :rules="rules">

            <el-form-item label="Search Type">
              <el-select v-model="formInline.region" placeholder="Search Users or Goods">
                <el-option label="Users" value="users"></el-option>
                <el-option label="Goods" value="goods"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-input v-model="formInline.content" placeholder="Please input the search content"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onsubmit('ruleForm')">Search</el-button>
            </el-form-item>
          </el-form>

        </div>

        <div class="goods" v-show="type">


          <el-col>
            <el-row>
              <div id="DailyRecom">
                <!--     每日推荐 -->
                <div v-for="item in list">
                  <div>
                    <img class="img_sc" :src="item.picture_path" alt="">
                    <p class="p_sc">
                      {{ item.name }}
                    </p>
                    <p class="price_sc">
                      {{ item.price }}
                    </p>
                    <p class="p_sc">
                      <!--                    <el-button type="text" class="button" icon="el-icon-star-off" @click="addCollection()">添加收藏-->
                      <!--                    </el-button>-->
                      <el-button style="float: inside" type="text" class="button" icon="el-icon-goods"
                                 @click="queryGoods(item.goods_id)">Check The Details
                      </el-button>
                    </p>
                  </div>
                </div>
              </div>
            </el-row>

            <el-row>
              <div class="pagination" style="float: bottom"
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

        <div class="user" v-show="!type">
          <div v-for="item in user_list" style="margin: 10px">
            <el-card style="opacity: 0.8">
              <el-container>
                <el-aside width="200px">
                  <div class="search_user_image">
                    <router-link :to="'/user/'+item.id">
                      <img :src="item.picturePath">
                    </router-link>
                  </div>
                </el-aside>
                <el-container>
                  <el-header>
                    <el-descriptions class="margin-top" :column="3" border>
                      <!--                <template slot="extra">-->
                      <!--                  <router-link to="/pi_modify">-->
                      <!--                    <el-button type="primary" size="medium">See details</el-button>-->
                      <!--                  </router-link>-->
                      <!--                </template>-->

                      <el-descriptions-item label-style="width:15%" content-style="width:15%">
                        <template slot="label">
                          <i class="el-icon-user"></i>
                          User Name
                        </template>
                        {{ item.userName }}
                      </el-descriptions-item>

                      <el-descriptions-item label-style="width:15%" content-style="width:15%">
                        <template slot="label">
                          <i class="el-icon-message"></i>
                          Email
                        </template>
                        {{ item.email }}
                      </el-descriptions-item>

                      <el-descriptions-item label-style="width:15%" content-style="width:15%">
                        <template slot="label">
                          <i class="el-icon-cherry"></i>
                          Credit
                        </template>
                        {{ item.credit }}
                      </el-descriptions-item>

                    </el-descriptions>
                  </el-header>

                  <el-main>
                    <el-row class="good_item">
                      <div v-for="good in item.display_list">
                        <el-col :span="180" class="im">
                          <img :src="good.picturePath" @click="toGoods(good.goodsId)">
                        </el-col>
                      </div>
                    </el-row>
                  </el-main>

                </el-container>
              </el-container>
            </el-card>

          </div>
        </div>
      </el-card>
<!--      </div>-->

    </el-main>
  </el-container>
</template>

<script>

import Element from "element-ui";

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
    console.log(this.$store.getters.getGood_list)
    if(this.$store.getters.getToken === null) {
      this.$axios({
        method: 'get',
        url: 'http://120.24.4.97:8081/goods/random',
      }).then(res => {
        if (res.data.code === 2000) {
          res.data.data.forEach(item => {
            this.list.push({
              goods_id: item.goodsId,
              picture_path: item.picturePath,
              price: '¥' + item.price,
              name: item.title
            })
          })
        }
      })
    }else if (this.$store.getters.getGood_list === null || this.$store.getters.getGood_list.length === 0) {
      this.$axios({
        method: 'get',
        url: 'http://120.24.4.97:8081/goods/recommend',
      }).then(res => {
        if (res.data.code === 2000) {
          res.data.data.forEach(item => {
            if(item!==null){
              this.list.push({
                goods_id: item.goodsId,
                picture_path: item.picturePath,
                price: '¥' + item.price,
                name: item.title
              })
            }
          })
        }
      })
    } else {
      this.formInline = {
        content: this.$store.getters.getContent,
        region: 'goods'
      }
      this.$store.getters.getGood_list.forEach(item => {
        this.list.push(item)
      })
      this.$store.commit('SET_Good_List', [])
      console.log(this.list)
    }
    this.$axios({
      method: 'get',
      url: 'http://120.24.4.97:8081/carousel',
    }).then(res => {
      if (res.data.code === 2000) {
        res.data.data.forEach(item => {
          this.carousels.push(item)
        })
      }
    })

  },
  name: "SHP",
  data() {
    return {
      goodsPage: 0,
      type: true,
      state: false,
      judge: ['1'],
      user_list: [],
      carousels: [],
      systemMsg: [
        {id: 1, title: '本周ooad要中期答辩！！'},
        {id: 2, title: '不要忘记体测！！'},
      ],
      list: [
        // {
        //   goods_id: 1,
        //   picture_path: "../assets/img.jpg",
        //   price: '¥132.0',
        //   name: "防晒口罩护颈防紫外线薄款女冰丝遮阳脸罩透气夏季男全脸遮脸面罩"
        // },
        // {
        //   goods_id: 2,
        //   picture_path: "failed.jpg",
        //   price: '¥132.0',
        //   name: "fuck everything"
        // },
        // {
        //   goods_id: 3,
        //   picture_path: "failed.jpg",
        //   price: '¥132.0',
        //   name: "fuck everything"
        // }
      ],
      formInline: {
        content: '',
        region: ''
      },

    }
  },
  methods: {
    handleGoodsCurrentChange(val) {
      this.state = true
      this.list = []
      console.log(this.list.length)
      this.$axios({
        method: 'get',
        url: 'http://120.24.4.97:8081/searchGoods/' + this.formInline.content + '/' + val,
      }).then(res => {
        if (res.data.code === 2000) {
          console.log(res.data.data)
          res.data.data.forEach(item => {
            this.list.push({
              goods_id: item.goodsId,
              picture_path: item.picturePath,
              price: '¥' + item.price,
              name: item.title
            })
          })
        }
      })
    },
    logout() {
      this.$confirm('Are you sure to Log out?', 'Tips', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$store.commit('logout')
        this.$message({
          type: 'success',
          message: 'You have successfully log out'
        });
        this.$router.push("/login")
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'You have Cancel the operation'
        });
      });
    },
    queryGoods(id) {
      if (this.state) {
        this.$store.commit('SET_Good_List', this.list)
        this.$store.commit('SET_SEARCH_CONTENT', this.formInline.content)

      }
      this.$router.push('/goods/' + id)
    },
    addCollection() {
      // 需要先验证用户是否已经登陆
      if (!this.$store.getters.getUser) {
        Element.Message({
          message: 'Please login first',
          type: 'error',
        })
        return
      }
      this.$axios.put("http://120.24.4.97:8081/user/collection?goodsId="
          + this.goodsId).then(res => {
        Element.Message({
          message: 'Add product to collection successfully',
          type: 'success',
        })
        this.inCollection = true
      })

    },
    onsubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          if (this.formInline.region === 'goods') {
            this.type = true
            this.$axios({
              method: 'get',
              url: 'http://120.24.4.97:8081/searchGoods/' + this.formInline.content,
            }).then(res => {
              if (res.data.code === 2000) {
                this.goodsPage = Math.ceil(res.data.data / 10)
              }
            })

            this.state = true
            this.list = []
            console.log(this.list.length)
            this.$axios({
              method: 'get',
              url: 'http://120.24.4.97:8081/searchGoods/' + this.formInline.content + '/1',
            }).then(res => {
              if (res.data.code === 2000) {
                console.log(res.data.data)
                res.data.data.forEach(item => {
                  this.list.push({
                    goods_id: item.goodsId,
                    picture_path: item.picturePath,
                    price: '¥' + item.price,
                    name: item.title
                  })
                })
              }
            })
          } else if (this.formInline.region === 'users') {
            this.state = false
            this.type = false
            this.user_list = []
            this.$axios({
              method: 'get',
              url: 'http://120.24.4.97:8081/searchUser/' + this.formInline.content + '/1',
            }).then(res => {
              if (res.data.code === 2000) {
                let goods = []
                let displayGoods = []
                res.data.data.forEach(item => {
                  this.$axios({
                    method: 'get',
                    url: 'http://120.24.4.97:8081/user/announceGoods/' + item.userId + '/2',
                  }).then(res => {
                    if (res.data.code === 2000) {
                      res.data.data.forEach(good => {
                        if (displayGoods.length < 7) displayGoods.push(good)
                        goods.push(good)
                      })
                    }
                  })

                  let search_user = {
                    userName: item.userName,
                    picturePath: item.picturePath,
                    email: item.email,
                    credit: item.credit,
                    id: item.userId,
                    good_list: goods,
                    display_list: displayGoods
                  }

                  this.user_list.push(search_user)
                  console.log(this.user_list)
                })
              }
            })
          }

        } else {
          console.log('error submit!!')
          alert('Please check your input')
          return false
        }
      })

    },
    toGoods(id) {
      this.$router.push('/goods/' + id)
    }
  }
}
</script>

<style scoped>
.main_header {
  background-color: #e2f4e5;
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
  width: 100%;
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
  margin-left: 10%;
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
.bottom{
  background-image: url(../assets/background1.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
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

.search_user_image img {
  display: block;
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

.good_item img {
  display: block;
  width: 150px;
  height: 150px;
  border: 1px red;
}

.im img {
  cursor: pointer;
  transition: all 0.5s;
}

.im img:hover {
  border: 1px solid #ff0000;
  transform: translate(0, -10px);
}

.bs-sysMsg {
  position: relative;
  display: flex;
  width: 100%;
  padding: 8px 12px;
  margin-bottom: 10px;
  border-radius: 2px;
  color: #e6a23c;
  background-color: #fdf6ec;
  overflow: hidden;
  opacity: 1;
  align-items: center;
  transition: opacity .2s;
}

.bs-sysMsg .msg__content {
  display: table-cell;
  padding: 0 8px;
  width: 100%;
}

.bs-sysMsg .msg__content a.item {
  color: #e6a23c;
  font-size: 14px;
  opacity: 0.75;
}

.bs-sysMsg .msg__content a.item:hover {
  text-decoration: underline;
}

</style>
