<template>
  <el-card shadow="hover" class="mgb20" style="height:252px;">
    <div class="user-info">
      <img src="../assets/img.jpg" class="user-avator" alt />
      <div class="user-info-cont">
        <div class="user-info-name">{{this.$store.state.name}}</div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "HomePage",
  data(){
    return{

    }
  },
  mounted () {
    this.initHomepage()
  },
  methods :{
    initHomepage(){

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

</style>
