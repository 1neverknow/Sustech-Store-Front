<template>
  <div id="details">
    <el-container>
      <el-header class="page-header">
        <div class="title">
          <p>{{title}}</p>
          <div class="list">
            <ul>
              <li><router-link to="/">Homepage</router-link></li>
              <li><el-button
                type="text"
                class="route-btn"
                @click="toUserpage($store.getters.getUser.userId)"
              >User Page
              </el-button></li>
              <li><el-button
                  type="text"
                  class="route-btn"
                  @click="changeComplainVisible(true)"
              >Complain this goods
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
        <ComplaintForm
            @changeVisible="changeComplainVisible"
            v-bind:type="'goods'"
            v-bind:id="goodsId"
        ></ComplaintForm>
      </el-dialog>
      <el-main class="main">
        <el-row>
          <!--左侧商品图-->
            <div class="block">
            <el-carousel height="560px" style="margin-left: 30px; ">
              <el-carousel-item v-for="item in picturePath" :key="item.id">
                <el-image
                    style="height: 500px; margin-top: 50px;"
                    :src="'http://localhost:8081/' + item"
                    fit="contain"
                ></el-image>
              </el-carousel-item>
            </el-carousel>

              <el-tag
                  v-for="item in labels"
                  :key="item.id"
                  :disable-transitions="false"
                  effect="dark"
                  type="success"
                  class="tags"
              >
                ● {{ item }}
              </el-tag>
          </div>

          <!--      右侧内容区-->
            <div class="content">
              <h1 class="name">{{title}}</h1>
              <p class="intro">{{introduce}}</p>
              <p class="announce">
                <span class="name">{{announcer.userName}}</span>
                <span class="time">
                  --
                Announced in {{announceTime}}
                </span>
              </p>
              <div class="price">
                <span>￥{{price}}</span>
              </div>
<!--              这一部分改成announcer信息-->
<!--              avatar，信誉分，性别，name，id-->
              <div class="announcer-info">
                <el-avatar class="announcer-avatar" :size="40" :src="'http://localhost:8081/' + announcer.avatar"></el-avatar>
                <span>
                  <router-link class="announcer-name" :to="{path: '/user/' + announcer.userId}">{{announcer.userName}}</router-link>
                </span>
                <span class="gender">
                  {{announcer.gender}}
                </span>
                <span class="UID">
                    <span>UID: {{announcer.userId}}</span>
                </span>
                <div class="credit">
                  Sustech信誉{{announcer.credits}}
                </div>
                <div class="sign">
                  " {{announcer.sign}} "
                </div>
              </div>
              <!--      内容区底部按钮-->
              <div class="button">
                <el-button
                    class="buy"
                    icon="el-icon-goods"
                    :disabled="state"
                    @click="wantIt"
                >I Want This
                </el-button>
                <template v-if="!inCollection">
                  <el-button
                      class="like"
                      icon="el-icon-star-off"
                      @click="addCollect"
                  >Add to Collection
                  </el-button>
                </template>
                <template v-else>
                  <el-button
                      class="like"
                      icon="el-icon-star-on"
                      @click="removeFromCollection"
                  >Remove from Collection
                  </el-button>
                </template>
              </div>
              <div class="pro-policy">
                <ul>
                  <li>
                    <i class="el-icon-circle-check"></i> {{want}} people want
                  </li>
                  <li>
                    <i class="el-icon-view"></i> {{view}} views
                  </li>
                </ul>
              </div>
            </div>
        </el-row>

        <el-collapse v-model="activeNames" class="collapse">
          <el-collapse-item name="1">
            <template #title>
              <h2 style="margin-right: 10px">Comments </h2>
              <i class="header-icon el-icon-info"></i>
            </template>
            <GoodsComment
                @refresh="refreshComment"
                v-bind:goodsId="goodsId"
                v-bind:comments="comments"
            ></GoodsComment>
          </el-collapse-item>

          <el-collapse-item name="2">
            <template #title>
              <h2 style="margin-right: 10px">More </h2>
              <i class="header-icon el-icon-search"></i>
            </template>
          </el-collapse-item>
        </el-collapse>
      </el-main>
    </el-container>
  </div>
</template>



<script>
import GoodsComment from "@/components/GoodsComment"
import ComplaintForm from "@/components/ComplaintForm"
import Element from "element-ui";

export default {
  name: "Details",
  components: {GoodsComment, ComplaintForm},
  data() {
    return {
      state: false, // 是否可以购买（售出后打上已售出标签，除非卖家撤下，商品详情依然存在）
      goodsId: '11111111',  // 商品id
      price: '100000',
      title: 'Mana Stone',
      picturePath: [], // 商品展示图（轮播图）=> 数组
      labels: [],
      introduce: 'you would be stronger after eating it',
      announcer: {},
      comments: [],
      want: '',  // “我想要”的人数,
      announceTime: '',
      view: '',
      stage: 0,
      activeNames: '1',
      inCollection: false,
      complainVisible: false,
    }
  },
  methods: {
    // 通过路由获取商品id
    activate() {
      const goodsId = this.$route.params.goodsId
      if (!goodsId) {
        Element.Message({
          message: 'Goods ID not exist!',
          type: 'error',
        })
        this.$router.push('/none')
        return
      }
      this.goodsId = goodsId
      this.getDetails()
    },
    // 获取商品详情
    getDetails() {
      // const _this = this
      this.$axios({
        method: 'get',
        url: 'http://localhost:8081/goods/' + this.goodsId,
      })
      .then(res => {
        const productDetails = res.data.data
        this.price = productDetails.price
        this.title = productDetails.title
        this.getPicture(productDetails.picturePath)
        this.getAnnouncer(productDetails.announcer.userId)
        this.labels = productDetails.labels
        this.introduce = productDetails.introduce
        this.view = productDetails.view
        this.want = productDetails.want
        this.announceTime = productDetails.announceTime
        this.getComments(this.goodsId)
        this.checkCollection(this.goodsId)
      })
    },
    getPicture(picturePaths) {
      for (let i in picturePaths) {
        this.picturePath.push(picturePaths[i].path)
      }
    },
    getAnnouncer(announcerId) {
      this.$axios({
        method: 'get',
        url: 'http://localhost:8081/user/information/'
            + announcerId,
        headers: {'authorization': this.$store.getters.getToken},
      }).then(res => {
        const announcer = res.data.data
        this.announcer.userName = announcer.userName
        this.announcer.sign = announcer.sign
        this.announcer.credits = announcer.credit
        this.announcer.avatar = announcer.picturePath
        this.announcer.userId = announcer.userId
        if (announcer.gender === 0) {
          this.announcer.gender = '♂'
        } else {
          this.announcer.gender = '♀'
        }
      })
    },
    getComments(goodsId) {
      console.log('get comments')
      this.$axios({
        method: 'get',
        url: 'http://localhost:8081/goods/comment/'
            + goodsId,
      }).then(res => {
        if (res.data.data !== null) {
          this.comments = res.data.data
        } else {
          this.comments = []
        }
      })
    },
    // 点击我想要联系卖家
    wantIt() {
      // 需要先验证用户是否已经登陆
      if (!this.$store.getters.getToken) {
        Element.Message({
          message: 'Please login',
          type: 'error',
        })
        return
      }
      if (this.$store.getters.getUser.userId === this.announcer.userId) {
        Element.Message({
          message: 'You cannot buy your own goods',
          type: 'error',
        })
        return
      }
      this.$axios.post('http://localhost:8081/chat/want?goodsId=' + this.goodsId)
          .then(res => {
            Element.Message({
              message: 'Success',
              type: 'success',
            })
      })
      this.$router.push('/message')
      // this.addDeal()
    },
    // 添加到收藏夹
    addCollect() {
      // 需要先验证用户是否已经登陆
      if (!this.$store.getters.getUser) {
        Element.Message({
          message: 'Please login first',
          type: 'error',
        })
        return
      }
      this.$axios.put("http://localhost:8081/user/collection?goodsId="
          + this.goodsId).then(res => {
        Element.Message({
          message: 'Add product to collection successfully',
          type: 'success',
        })
        this.inCollection = true
      })
    },
    removeFromCollection() {
      this.$axios.delete("http://localhost:8081/user/collection?goodsId=" + this.goodsId)
        .then(res => {
          Element.Message({
            message: 'Remove successfully',
            type: 'success',
          })
          this.inCollection = false
        })
    },
    checkCollection(goodsId) {
      if (!this.$store.getters.getUser) {
        return
      }
      this.$axios.put("http://localhost:8081/user/checkCollection?goodsId=" + goodsId)
          .then(res => {
            console.log('in collection?', res.data.data)
            this.inCollection = res.data.data
      })
    },
    refreshComment() {
        this.getComments(this.goodsId)
    },
    changeComplainVisible(value) {
        this.complainVisible = value
    },
    toUserpage(userId) {
      if (userId === null) {
        this.$router.push('/login')
      } else {
        this.$router.push('/user/' + userId)
      }
    },
  },
  mounted() {
    this.activate()
  },
}
</script>


<style scoped>
#details .page-header {
  height: 100px;
  /*margin-top: -20px;*/
  z-index: 4;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  -webkit-box-shadow: 0 5px 5px rgba(0, 0, 0, 0.07);
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.07);
}
#details .page-header .title {
  margin-top: -30px;
  width: 1225px;
  height: 64px;
  line-height: 64px;
  font-size: 25px;
  font-weight: 400;
  color: #212121;
}
#details .page-header .title p {
  float: left;
}
#details .page-header .title .list {
  margin-right: -20%;
  height: 64px;
  float: right;
}

#details .page-header .title .list li {
  float: left;
  margin-left: 50px;
}
#details .page-header .title .list li a {
  font-size: 14px;
  color: #616161;
}
#details .page-header .title .list li a:hover {
  font-size: 14px;
  color: #ff6700;
}

#details .page-header .title .list li .route-btn {
  font-size: 14px;
  color: #616161;
  text-decoration: underline
}
#details .page-header .title .list .li .route-btn:hover {
  font-size: 14px;
  color: #ff6700;
  text-decoration: underline
}

/* 头部CSS END */

/* 主要内容CSS */
#details .main {
  width: 100%;
  margin-top: -30px;
}
#details .main .block {
  float: left;
  margin-left: 150px;
  margin-top: 50px;
  width: 560px;
  height: 560px;
}

#details .main .block .tags {
  margin-top: 20px;
  margin-right: 20px;
  float: right;
  width: 100px;
  text-align: center;
}

#details .el-carousel .el-carousel__indicator .el-carousel__button {
  background-color: rgba(163, 163, 163, 0.8);
}

#details .main .content {
  float: right;
  margin-right: 150px;
  margin-top: 50px;
  width: 640px;
}
#details .main .content .name {
  height: 30px;
  line-height: 30px;
  font-size: 30px;
  font-weight: normal;
  color: #212121;
}
#details .main .content .intro {
  color: #b0b0b0;
  padding-top: 10px;
  margin: auto;
}
#details .main .content .announce {
  padding-top: 10px;
}
#details .main .content .announce .name {
  font-size: 17px;
  color: darkslategrey;
}
#details .main .content .announce .time {
  color: grey;
  font-size: 13px;
}
#details .main .content .price {
  display: block;
  font-size: 18px;
  color: #ff6700;
  border-bottom: 1px solid #e0e0e0;
  padding: 25px 0 25px;
}
#details .main .content .price .del {
  font-size: 14px;
  margin-left: 10px;
  color: #b0b0b0;
  text-decoration: line-through;
}
#details .main .content .announcer-info {
  background: #f9f9fa;
  padding: 30px 60px;
  margin: 50px 0 50px;
  width: 440px;
  height: 100px;
}
#details .main .content .announcer-info span {
  line-height: 30px;
  color: #616161;
}
#details .main .content .announcer-info .announcer-avatar {
  float: left;
  margin-top: 8px;
  margin-left: -40px;
  margin-right: 20px;
}
#details .main .content .announcer-info .announcer-name {
  margin-top: -100px;
}
#details .main .content .announcer-info .UID {
  float: right;
  font-size: 10px;
}
#details .main .content .announcer-info .gender {
  margin-left: 10px;
}
#details .main .content .announcer-info .credit {
  margin-left: 20px;
  margin-top: 5px;
  font-size: 13px;
  color: grey;
}
#details .main .content .announcer-info .sign {
  margin-top: 18px;
  line-height: 20px;
  color: grey;

}
#details .main .content .announcer-info .price-sum {
  color: #ff6700;
  font-size: 24px;
  padding-top: 20px;
}
#details .main .content .button {
  height: 55px;
  margin: 10px 0 20px 0;
}
#details .main .content .button .el-button {
  float: left;
  height: 55px;
  font-size: 16px;
  color: #fff;
  border: none;
  text-align: center;
}
#details .main .content .button .buy {
  width: 260px;
  background-color: lightskyblue;
}
#details .main .content .button .buy:hover {
  background-color: deepskyblue;
}

#details .main .content .button .like {
  width: 260px;
  margin-left: 40px;
  background-color: lightgrey;
}
#details .main .content .button .like:hover {
  background-color: grey;
}
#details .main .content .pro-policy li {
  float: left;
  margin-right: 50px;
  /*margin: auto;*/
  color: #b0b0b0;
}

#details .main .collapse {
  margin-top: 50px;
}
</style>