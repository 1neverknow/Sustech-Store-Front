<!--发布商品-->
<template>
  <div class="publish">
    <div class="publish-header">
      <div class="publish-title">
        Publish New Goods
<!--        <i class="el-icon-star-on" style="color: gold"></i>-->
      </div>
    </div>
    <div class="content">
      <el-form
          ref="ruleForm"
          :model="goods"
          :rules="rules"
          :label-position="labelPosition"
          label-width="120px"
          class="demo-ruleForm"
      >
        <el-row>
          <el-col class="form-body" :span="8" :offset="2">
            <el-form-item label="Goods' Name" prop="name">
              <el-input v-model="goods.title"></el-input>
            </el-form-item>
            <el-form-item label="Price" prop="price">
              <el-input
                  v-model.number="goods.price"
                  type="price"
                  autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Introduction" prop="introduce">
              <el-input
                  v-model="goods.introduce"
                  :autosize="{ minRows: 4, maxRows: 6 }"
                  type="textarea"
              ></el-input>
            </el-form-item>
            <el-form-item label="Free Delivery" prop="delivery">
              <el-switch v-model="goods.freeDelivery"></el-switch>
            </el-form-item>
          </el-col>

          <el-col :span="12" :offset="2">
            <span
                style="color: grey; line-height: 60px; margin-left: 50px"
            >Upload your goods' image
            </span>
            <el-alert
                title="Tips：Click '+' to upload your image. You can only upload .jpg or .png image"
                type="warning"
                :closable="false">
            </el-alert>
            <!--不使用action 符号#   用http-request实现自定义上传  :http-request="httpRequest"  :on-change="handleChange"-->
            <el-upload
                class="avatar-uploader"
                action="lei"
                :on-change="handleChange"
                :show-file-list="false"
                :http-request="httpRequest"><!--覆盖默认上传-->
              <template >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </template>
            </el-upload>

            <el-form-item label="goodsImg" prop="goodsImg" hidden>
              <el-input v-model="goods.goodsImg" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Publish",
  data() {
    return {
      labelPosition: 'left',
      imageUrl: '',
      goods: {
        title: '',
        price: '',
        introduce: '',
        goodsImg: '',
        freeDelivery: false, // 是否包邮
      },
      rules: {

      }
    }
  },
  methods: {
    //将上传图片的原路径赋值给临时路径
    handleChange(file, fileList) {
      this.tempUrl = URL.createObjectURL(file.raw);
    },
//实现图片上传功能
    httpRequest(item) {
      //验证图片格式大小信息
      const isJPG = item.file.type === 'image/jpeg' || item.file.type === 'image/png';
      const isLt2M = item.file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      //图片格式大小信息没问题 执行上传图片的方法
      if (isJPG && isLt2M === true) {
        // post上传图片
        let App = this;
        //定义FormData对象 存储文件
        let mf = new FormData();
        //将图片文件放入mf
        mf.append('file', item.file);
        App.$Api.fileUpload(mf, function (result) {
          if (result.result === "true") {
            App.$notify.success({
              title: '温馨提示：',
              message: result.message,
            });
            //将临时文件路径赋值给显示图片路径（前端显示的图片）
            App.imageUrl = App.tempUrl;
            //将后台传来的数据库图片路径赋值给car对象的图片路径
            App.car.carImg = result.imgUrl;
          } else {
            App.$notify.error({
              title: '温馨提示：',
              message: result.message,
            });
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.publish {
  background-color: #f5f5f5;
}
.publish .publish-header {
  height: 64px;
  background-color: lightskyblue;
  /*border-bottom: 5px solid deepskyblue;*/
}
.publish .publish-header .publish-title {
  width: 1225px;
  margin-left: 100px;
  height: 64px;
  line-height: 58px;
  font-size: 28px;
  font-weight: bold;
}
.publish .content {
  padding: 20px 0;
  width: 1225px;
  margin: 0 auto;
}
.publish .content .form-body {
  /*width: 40%;*/
  margin-top: 50px;
}
.publish .content .form-avatar {
  margin: auto;
}
.avatar-uploader {
  margin-top: 20px;
  margin-left: 50px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
}
.avatar-uploader:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: flex;
}
</style>