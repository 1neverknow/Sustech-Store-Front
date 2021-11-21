<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img :src="imageUrl" class="user-avator" alt/>
            <div class="user-info-cont">
              <div class="user-info-name">{{this.$store.getters.getBasic_Info.userName}}</div>
            </div>
          </div>
          <div class="user-info-list">
            欢迎观临！！
          </div>
        </el-card>
        <el-card >
          <el-carousel indicator-position="outside" autoplay interval="2000">
            <el-carousel-item v-for="url in items">
              <image :src=url ></image>
            </el-carousel-item>
          </el-carousel>
        </el-card>
      </el-col>
      <!---->
      <el-col :span="12">
        <div style="height: 100%">
          <el-calendar v-model="value">
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
      imageUrl: '',
      value: new Date(),
      items:[
        '../assets/image.png',
        '@/assets/logo.png',
        '@/assets/pic.png',
        '@/assets/lazy.png'
      ]
    }
  },
  mounted() {
    this.imageUrl = 'http://localhost:8081/' + this.$store.getters.getBasic_Info.picturePath

  },
  methods: {

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

</style>
