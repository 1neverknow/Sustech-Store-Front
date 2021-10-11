<template>
  <div id="details">
    <el-container>
      <el-header class="page-header">
        <div class="title">
          <p>{{title}}</p>
          <div class="list">
            <ul>
              <li><router-link to="">Contact us </router-link></li>
              <li><router-link to="">About us</router-link></li>
              <!--        投诉/举报-->
              <li><router-link to="">Complaint</router-link></li>
            </ul>
          </div>
        </div>
      </el-header>

      <el-main class="main">
        <el-row>
          <!--左侧商品图-->
            <div class="block">
            <el-carousel height="560px">
              <el-carousel-item v-for="item in picturePath" :key="item.id">
                <img style="height: 560px"
                     :src="'http://localhost:8081/' + item"/>
              </el-carousel-item>
            </el-carousel>
          </div>

          <!--      右侧内容区-->
            <div class="content">
              <h1 class="name">{{title}}</h1>
              <p class="intro">{{introduce}}</p>
              <p class="announce">
                <router-link to="">{{announcer}}</router-link>
                --
                Announced in {{announceTime}}
              </p>
              <div class="price">
                <span>￥{{price}}</span>
              </div>
              <div class="pro-list">
                <span class="pro-name">{{title}}</span>
                <span class="pro-price">
                    <span>￥{{price}}</span>
                </span>
              </div>
              <!--      内容区底部按钮-->
              <div class="button">
                <el-button class="buy" icon="el-icon-goods" :disabled="state" @click="wantIt">I Want This</el-button>
                <el-button class="like" icon="el-icon-star-off" @click="addCollect">Add to Collection</el-button>
              </div>
              <div class="pro-policy">
                <ul>
                  <li>
                    <i class="el-icon-circle-check"></i> {{want}} people want
                  </li>
                  <li>
                    <i class="el-icon-view"></i> {{looked}} views
                  </li>
                </ul>
              </div>
            </div>
        </el-row>


        <el-collapse v-model="activeNames" class="collapse">
          <el-collapse-item name="1">
            <template #title>
              <h2 style="margin-right: 10px">Content </h2>
              <i class="header-icon el-icon-info"></i>
            </template>

            <transition name="fade">
              <div class="input-wrapper">
                <el-input class="gray-bg-input"
                          v-model="inputComment"
                          type="textarea"
                          :rows="3"
                          autofocus
                          placeholder="Write down your comment...">
                </el-input>
                <div class="btn-control">
                  <el-button class="btn" type="success" round @click="commitComment">Submit</el-button>
                </div>
              </div>
            </transition>

            <div class="comment" v-for="(item, index) in comments">
              <div class="info">
                <el-avatar :size="50" fit="cover" :src="item.picturePath"></el-avatar>
                <div class="right">
                  <div class="username">{{item.username}}</div>
                  <div class="date">{{item.date}}</div>
                </div>
              </div>
              <div class="commentContent">{{item.content}}</div>
              <template v-if="canDelete(item.userId)">
                <el-button type="text" size="small" @click="handleDelete(index)">Delete</el-button>
              </template>
            </div>
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
import Element from "element-ui";
import MyList from "@/components/MyList"

export default {
  name: "Details",
  components: {MyList},
  data() {
    return {
      state: false, // 是否可以购买（售出后打上已售出标签，除非卖家撤下，商品详情依然存在）
      goodsId: '11111111',  // 商品id
      price: '100000',
      title: 'Mana Stone',
      picturePath: [], // 商品展示图（轮播图）=> 数组
      // labels: [],
      introduce: 'you would be stronger after eating it',
      announcer: 'Snow/White',
      comments: [
        {
          commentId: '',
          userId: 1111,
          username: 'Figaro',
          content: '很好用🌹',
          picturePath: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          date: '2021-10-20'
        },
        {
          commentId: '',
          userId: 2222,
          username: 'Mithra',
          content: '味道还行',
          picturePath: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          date: '2021-10-21'
        },
        {
          commentId: '',
          userId: 3333,
          username: 'Bradley',
          content: '拿来吧你',
          picturePath: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          date: '2021-10-22'
        }
      ],
      want: 1,  // “我想要”的人数,
      announceTime: '2021-10-10',
      looked: 10,

      activeNames: '1',
      inputComment: '',
    }
  },
  methods: {
    // 通过路由获取商品id
    activate() {
      console.log(this.$route.params.goodsId)
      if (this.$route.params.goodsId) {
        this.goodsId = this.$route.params.goodsId
        this.getDetails(this.goodsId)
      }
    },
    // 获取商品详情
    getDetails(val) {
      const _this = this
      this.$axios({
        method: 'get',
        url: 'http://localhost:8081/goods/' + val,
        data: {
          goodsId: val
        },
      })
      .then(res => {
        const productDetails = res.data.data
        _this.price = productDetails.price
        _this.title = productDetails.title
        _this.picturePath = productDetails.picturePath
        // _this.labels = productDetails.labels
        _this.introduce = productDetails.introduce
        _this.announcer = productDetails.announcer
        _this.comments = JSON.parse(productDetails.comments)
        _this.want = productDetails.want
        _this.announceTime = productDetails.announceTime
      })
    },
    // 点击我想要联系卖家
    wantIt() {
      // 需要先验证用户是否已经登陆
      if (!this.$store.getters.getUser) {
        Element.Message({
          showClose: true,
          message: 'Please login first',
          type: 'error',
        })
        return
      }
    },
    // 添加到收藏夹
    addCollect() {
      // 需要先验证用户是否已经登陆
      if (!this.$store.getters.getUser) {
        Element.Message({
          showClose: true,
          message: 'Please login first',
          type: 'error',
        })
        return
      }
      this.$axios.post("http://localhost:8081/product/user/addCollect", {
        userID: this.$store.getters.getUser.userID,
        productID: this.productID
      })
      .then(res => {
        if (res.data.code === 200) { // 状态码为200 -> 添加成功
          Element.Message({
            showClose: true,
            message: 'Add product to collection successfully',
            type: 'success',
          })
        }
      })
    },
    // 提交评论
    commitComment() {
      // 需要先验证用户是否已经登陆
      if (!this.$store.getters.getUser) {
        Element.Message({
          showClose: true,
          message: 'Please login first',
          type: 'error',
        })
        return
      }
      if (this.inputComment === '') {
        Element.Message({
          showClose: true,
          message: 'Your input cannot be null',
          type: 'error',
        })
        return
      }
      console.log(this.inputComment);
      this.comments.push({
        userId: '',
        username: 'Me',
        content: this.inputComment,
        picturePath: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        date: '2021-11-1'
      })
    },
    canDelete(id) {
      return (this.$store.getters.getUser && this.$store.getters.getUser.userId === id)
    },
    handleDelete(index) {
      this.comments.splice(index, 1)
    }
  },
  mounted() {
    this.activate()
  }
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
  margin-top: -20px;
  width: 1225px;
  height: 64px;
  line-height: 64px;
  font-size: 18px;
  font-weight: 400;
  color: #212121;
}
#details .page-header .title p {
  float: left;
}
#details .page-header .title .list {
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
/* 头部CSS END */

/* 主要内容CSS */
#details .main {
  width: 100%;
  /*width: 1225px;*/
  /*height: 560px;*/
  padding-top: 30px;
  margin: 0 auto;
}
#details .main .block {
  float: left;
  margin-left: 100px;
  /*margin-right: -100px;*/
  width: 560px;
  height: 560px;
}
#details .el-carousel .el-carousel__indicator .el-carousel__button {
  background-color: rgba(163, 163, 163, 0.8);
}

#details .main .content {
  float: right;
  margin-right: 50px;
  margin-top: 50px;
  width: 640px;
}
#details .main .content .name {
  height: 30px;
  line-height: 30px;
  font-size: 24px;
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
#details .main .content .pro-list {
  background: #f9f9fa;
  padding: 30px 60px;
  margin: 50px 0 50px;
  width: 440px;
}
#details .main .content .pro-list span {
  line-height: 30px;
  color: #616161;
}
#details .main .content .pro-list .pro-price {
  float: right;
}
#details .main .content .pro-list .pro-price .pro-del {
  margin-left: 10px;
  text-decoration: line-through;
}
#details .main .content .pro-list .price-sum {
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
#details .main .collapse .input-wrapper {
  padding: 10px;
  width: 60%;
}
#details .main .collapse .input-wrapper .gray-bg-input {
  background-color: lightgrey;
}
#details .main .collapse .input-wrapper .btn-control {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 10px;
}
#details .main .collapse .comment {
  /*padding: 0 10px;*/
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-top: 10px;
  /*border-bottom: 1px solid $border-fourth;*/
}
#details .main .collapse .comment .info {
  display: flex;
  align-items: center;
}
#details .main .collapse .comment .info .right {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-top: 10px;
}
#details .main .collapse .comment .info .right .username {
  font-size: 16px;
  color: black;
  margin-bottom: 5px;
  font-weight: 500;
}
#details .main .collapse .comment .info .right .date {
  font-size: 12px;
  color: grey;
}
#details .main .collapse .comment .commentContent {
  font-size: 16px;
  color: black;
  line-height: 20px;
  padding: 10px 0;
  margin-top: 10px;
  margin-left: 10px;
}
</style>