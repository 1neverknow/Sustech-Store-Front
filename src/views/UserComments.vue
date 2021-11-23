<template>
  <div>
    <div v-for="comment in comments">
      <el-card style="margin-bottom: 10px">
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
          </div>
        </div>

      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comments",
  data(){
    return{
      comments:[1,2,3]

    }
  }
}
</script>

<style scoped>
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
