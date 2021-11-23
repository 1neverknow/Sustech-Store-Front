<template>
  <div>
    <transition name="fade">
      <div class="input-wrapper">
        <el-input class="gray-bg-input"
                  v-model="commentForm.content"
                  type="textarea"
                  :rows="3"
                  autofocus
                  placeholder="Write down your comment...">
        </el-input>
        <div v-if="goodsState === 0" class="btn-control">
          <el-button class="btn" type="success" round @click="commitComment">Submit</el-button>
        </div>
        <div v-else class="btn-control">
          <el-button class="btn" type="success" round @click="commitComment" disabled>Submit</el-button>
        </div>
      </div>
    </transition>
    <div class="comment-body">
      <div class="comment-item" v-for="item in comments" :key="item.commentId">
        <div class="info">
          <el-avatar :size="50" fit="cover" :src="item.picturePath"></el-avatar>
          <div class="right">
            <div class="username">{{item.username}}</div>
            <div class="date">{{item.commentDate}}</div>
          </div>
        </div>
        <div class="content">
          {{item.content}}
        </div>
        <div class="control">
          <template v-if="item.userId===$store.getters.getUser.userId">
            <el-button type="text" @click="deleteComment(item.commentId)">Delete</el-button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Element from 'element-ui'
export default {
  name: "GoodsComment",
  props: ['goodsId','comments','goodsState'],
  data() {
    return {
      commentForm: {
        content: '',
        goodsId: '',
      }
    }
  },
  methods: {
    // 提交评论
    commitComment() {
      // 需要先验证用户是否已经登陆
      if (!this.$store.getters.getToken) {
        Element.Message({
          message: 'Please login first',
          type: 'error',
        })
        return
      }
      if (this.commentForm.content === '') {
        Element.Message({
          message: 'Your input cannot be null',
          type: 'error',
        })
        return
      }
      this.commentForm.goodsId = this.goodsId
      this.$axios.post('http://localhost:8081/goods/comment', this.commentForm)
          .then((res)=>{
            Element.Message({
              message: 'Comment success!',
              type: 'success',
            })
            this.refresh()
      })
    },
    deleteComment(commentId) {
      console.log(commentId)
      this.$axios.delete('http://localhost:8081/goods/comment?commentId=' + commentId)
          .then((res)=>{
            Element.Message({
              message: 'Delete success!',
              type: 'success',
            })
            this.refresh()
          })
    },
    refresh() {
      this.$emit('refresh')
    }
  }
}
</script>

<style scoped>
.input-wrapper {
  margin-left: 10%;
  padding: 10px;
  width: 60%;
}
.input-wrapper .gray-bg-input {
  background-color: lightgrey;
}
.input-wrapper .btn-control {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 10px;
}

.comment-body {
  margin-left: 10%;
}

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