<!--发布商品-->
<template>
  <div class="publish">
    <div class="publish-header">
      <div class="header-content">
        <p>
          <i class="el-icon-circle-plus"></i>
        </p>
        <p>Publish New Goods</p>
        <router-link to></router-link>
      </div>
    </div>

    <div class="content">
      <el-form
          ref="goods"
          :model="goods"
          :rules="rules"
          :label-position="labelPosition"
          :hide-required-asterisk="true"
          label-width="120px"
          size="medium"
      >
        <el-row>
          <el-col class="form-body" :span="9" :offset="1">
            <el-form-item label="Title" prop="name">
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
              <el-switch v-model="freeDelivery"></el-switch>
            </el-form-item>
            <el-form-item v-if="freeDelivery === false"
                label="Delivery Fee" prop="deliveryFee">
              <el-input
                  v-model.number="goods.postage"
                  type="price"
                  autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10" :offset="2" class="img-uploader">
            <span
                style="color: grey; line-height: 60px; font-size: 14px"
            >Upload your goods' photos
            </span>
            <el-alert
                title="Tips：Click '+' to upload your image. You can only upload .jpg or .png image"
                type="warning"
                style="width: 300px"
                :closable="false">
            </el-alert>

            <el-form class="avatar-uploader">
              <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-success="handleSuccess"
                  :before-upload="beforeUpload"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog v-model="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </el-form>

            <el-form-item label="goodsImg" prop="goodsImg" hidden>
              <el-input v-model="goods.photos" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="Labels" prop="label">
        </el-form-item>


        <div>
          <el-button type="primary" style="float: left;width: 30%; margin-top: 30px ;margin-left: 300px;"
                     @click="submitForm('goods')"
          >Publish</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Element } from 'element-ui'
import axios from 'axios'
import store from '@/store'

export default {
  name: "Publish",
  data() {
    const validatePostage = (rule, value, callback) => {
      if (!this.freeDelivery && val === 0) {
        callback(new Error('Postage is needed'))
      } else {
        callback()
      }
    }
    return {
      labelPosition: 'left',
      photolist: [],
      freeDelivery: true, // 是否包邮
      goods: {
        introduce: 'aaaaaaaaaa',
        isSell: true,
        tags: [],
        name: 'aaa',
        price: '111111',
        title: '11111111',
        photos: '',
        postage: 0,
      },
      rules: {
        title:[
          {required: true, message: 'Title is required', trigger: 'blur'},
        ],
        introduce: [
          { required: true, message: 'Price is required' },
        ],
        photolist: [
          {required: true, trigger: 'blur',},
        ],
        postage: [
          {validator: validatePostage, trigger: 'blur',}
        ]
      },
      dialogImageUrl: '',
      dialogVisible: ''
    }
  },
  methods: {
    changeTag(tags) {
      this.goods.tags = tags
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(res, file) {
      this.goods.photos = file.raw
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        Element.Message({
          showClose: true,
          message: 'Picture must be JPG/PNG format!',
          type: 'error',
        })
        return false
      }
      if (!isLt2M) {
        Element.Message({
          showClose: true,
          message: 'Picture size can not exceed 2MB!',
          type: 'error',
        })
        return false
      }
    },
    submitForm(formName) {
      //创建 formData 对象
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append('photos', this.goods.photos);
      const newRequest = axios.create({
        baseUrl: "http://localhost:8081"//请求地址
      });

      console.log(this.goods.photos)
      newRequest({
        method: "POST",
        url: "/goods/addGoods"
              + '?introduce=' + this.goods.introduce
              + '&isSell=' + true
              + '&labels=' + this.goods.labels
              + '&price=' + this.goods.price
              + '&title=' + this.goods.title
              + '&postage=' + this.goods.postage,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': store.getters.getToken
        }
      }).then(res => {
        alert('success')
      });
    },
  },

}
</script>

<style scoped>
.publish {
  background-color: #f5f5f5;
}
.publish .publish-header {
  background-color: #fff;
  border-bottom: 2px solid deepskyblue;
  margin-bottom: 20px;
  margin-top: -50px;
  width: 100%;
}
.publish .publish-header .header-content {
  width: 1225px;
  margin: 30px auto;
  height: 80px;
}
.publish .publish-header .header-content p {
  float: left;
  font-size: 28px;
  line-height: 80px;
  color: #424242;
  margin-right: 20px;
}
.publish .publish-header .header-content p i {
  font-size: 45px;
  color: deepskyblue;
  line-height: 80px;
}

.publish .content {
  padding: 20px 0;
  width: 1225px;
  margin: 0 auto;
  height: 800px;
}
.publish .content .form-body {
  margin-top: 70px;
}
.publish .content .img-uploader {
  margin-top: 30px;
}
.publish .content .img-uploader .avatar-uploader {
  margin-top: 20px;
  /*margin-left: 50px;*/
}

.publish .content .img-uploader .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.publish .content .img-uploader .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.publish .content .img-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.publish .content .form-btn {
  margin: 40px auto;
}
</style>