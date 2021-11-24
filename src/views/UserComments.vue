<template>
  <div>
    <h2 style="margin-left: 13px">
      My comments
    </h2>
    <div class="comment-body">
      <div class="comment-item" v-for="item in display_comments" >
        <el-card style="margin-bottom: 10px">
          <div class="info">
            <el-avatar :size="50" fit="cover" :src="item.picturePath"></el-avatar>
            <div class="right">
              <div class="username">{{ item.userName }}</div>
              <div class="date">{{ item.commentDate }}</div>
            </div>
          </div>
          <div class="content">
            {{ item.content }}
          </div>
        </el-card>

      </div>
    </div>

    <div class="pagination" style="float: right">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-count="goodsPage"
          @current-change="handleGoodsCurrentChange">
      </el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  mounted() {
    this.getComments()
  },
  name: "Comments",
  data() {
    return {
      display_comments:[],
      goodsPage:0,
      comments: [
      //     {
      //   content: '商品太好啦',
      //   commentDate: 'yyyy-MM-dd HH:mm:ss',
      //   userName :'ryw',
      //   userId: 1,
      //   picturePath: '../assets/photo.png',
      //   dealId: 1
      // },
      //   {
      //     content: '商品太好啦',
      //     commentDate: 'yyyy-MM-dd HH:mm:ss',
      //     userName :'ryw',
      //     userId: 1,
      //     picturePath: '../assets/photo.png',
      //     dealId: 1
      //   },
      //   {
      //     content: '商品太好啦',
      //     commentDate: 'yyyy-MM-dd HH:mm:ss',
      //     userName :'ryw',
      //     userId: 1,
      //     picturePath: '../assets/photo.png',
      //     dealId: 1
      //   },
      //   {
      //     content: '商品太好啦',
      //     commentDate: 'yyyy-MM-dd HH:mm:ss',
      //     userName :'ryw',
      //     userId: 1,
      //     picturePath: '../assets/photo.png',
      //     dealId: 1
      //   },
      //   {
      //     content: '商品太好啦',
      //     commentDate: 'yyyy-MM-dd HH:mm:ss',
      //     userName :'ryw',
      //     userId: 1,
      //     picturePath: '../assets/photo.png',
      //     dealId: 1
      //   }
        ]

    }
  },
  methods: {
    handleGoodsCurrentChange(val){
      this.display_comments = []
      this.comments.forEach((item,index)=>{
        if((val-1)*12<=index&& index<val*12){
          this.display_goods.push(item)
        }
      })
    },
    getComments() {
      console.log('get comments')
      this.$axios({
        method: 'get',
        url: 'http://120.24.4.97:8081/user/comment'
      }).then(res => {
        if (res.data.data !== null) {
          res.data.data.forEach(item =>{
            if(this.display_comments.length<4){
              this.display_comments.push(item)
            }
            this.comments.push(item)
          })
          this.goodsPage = Math.ceil(this.comments/4)
        } else {
          this.comments = []
        }
      })
    },
  }
}
</script>

<style scoped>
/*.comment-body {*/
/*  margin-left: 10%;*/
/*}*/

.comment-body .comment-item {
  padding: 0 10px;
  /*box-sizing: border-box;*/
  display: flex;
  flex-direction: column;
  /*padding: 10px;*/
  margin-top: 20px;
  /*border-bottom: 1px solid darkgrey;*/
}

.comment-body .comment-item .info {
  margin-left: 10px;
  display: flex;
  align-items: center;
}

.comment-body .comment-item .info .right {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-top: 10px;
}

.comment-body .comment-item .info .right .username {
  font-size: 16px;
  color: black;
  margin-bottom: 5px;
  font-weight: 500;
}

.comment-body .comment-item .info .right .date {
  font-size: 12px;
  color: grey;
}

.comment-body .comment-item .content {
  font-size: 16px;
  color: black;
  line-height: 20px;
  padding: 15px;
  margin-top: 10px;
  margin-left: 10px;
  border-bottom: 1px solid lightgrey;
  width: 60%;
}

.comment-body .comment-item .control {
  width: 60%;
}

.comment-body .comment-item .control .el-button {
  float: right;
}
</style>
