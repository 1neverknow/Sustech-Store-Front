<template>
  <div class="publish">
    <div class="publish-header">
      <div class="header-content">
        <p>
          <i class="el-icon-edit"></i>
        </p>
        <p>Edit Goods</p>
        <router-link to></router-link>
      </div>
    </div>

    <el-card class="content">
      <div v-if="oldPhotos.length > 0" class="block">
        <el-carousel :interval="4000" type="card" height="150px">
          <el-carousel-item v-for="item in oldPhotos" :key="item.id">
            <el-image
                style="height: 150px; margin-left: 50px"
                :src="item"
                fit="contain"
            ></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>

      <div v-if="oldPhotos.length > 0" style="margin-left: 40%; margin-top: 3%">
        <el-button
            type="danger"
            @click="clearPicture"
            round
        >Clear all picture</el-button>
      </div>

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
          <el-col class="form-body" :span="9" :offset="2">
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
                          label="Delivery Fee" prop="postage">
              <el-input
                  v-model.number="goods.postage"
                  type="price"
                  autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
<!--          <el-divider direction="vertical"></el-divider>-->

          <el-col :span="10" :offset="2" class="img-uploader">
            <h4 style="color: grey; line-height: 60px; font-size: 14px"
            >Add new photos here
            </h4>
            <el-alert
                title="Tips：Click '+' to upload your image. You can only upload .jpg or .png image"
                type="warning"
                style="width: 300px; margin-top: -20px"
                :closable="false">
            </el-alert>
            <el-form class="avatar-uploader">
              <el-upload ref="upload" action="#" multiple :file-list="photos" list-type="picture-card"
                         :on-preview="handlePictureCardPreview" :on-change="OnChange" :on-remove="handleRemove"
                         accept="image/jpeg,image/png" :auto-upload="false">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" append-to-body>
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form>

            <el-form-item label="goodsImg" prop="goodsImg" hidden>
              <el-input v-model="photos" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="margin-left: 2%">
          <el-col :span="10" :offset="2" >
            <el-form-item label="Labels" prop="labels">
              <TagInput v-bind:dynamicTags="goods.labels"></TagInput>
            </el-form-item>
          </el-col>
        </el-row>

        <div>
          <el-button
              type="primary"
              class="publish-btn"
              @click="validateInfo('goods')"
              round
          >Publish</el-button
          >
        </div>
      </el-form>
    </el-card>
    <el-footer></el-footer>
  </div>
</template>

<script>
import Element from 'element-ui'
import axios from 'axios'
import TagInput from '@/components/TagInput'
export default {
  name: "EditGoods",
  components: {TagInput},
  data() {
    const validatePostage = (rule, value, callback) => {
      const valnum = parseInt(value)
      if (valnum < 0 || valnum > 999) {
        callback(new Error('Postage can only be (0, 999]'))
      } else {
        callback()
      }
    }
    const validateLabel = (rule, value, callback) => {
      console.log(value.length)
      if (value.length === 0) {
        callback(new Error('Label is needed'))
      } else {
        callback()
      }
    }
    const validatePrice = (rule, value, callback) => {
      const valnum = parseInt(value)
      if (valnum <= 0 || valnum > 99999999) {
        callback(new Error('Price can only be (0, 99999999]'))
      } else {
        callback()
      }
    }
    return {
      labelPosition: 'left',
      freeDelivery: true, // 是否包邮
      goods: {
        goodsId: 0,
        introduce: '',
        isSell: true,
        labels: [],
        price: '',
        title: '',
        postage: 0,
      },
      goodsId: 0,
      oldPhotos: [],
      photos: [],
      rules: {
        title:[
          {required: true, message: 'Title is required', trigger: 'blur'},
        ],
        introduce: [
          { required: true, message: 'Price is required' },
        ],
        postage: [
          {validator: validatePostage, trigger: 'blur',},
          { type: 'number', message: 'postage must be a number' },
        ],
        labels: [
          {validator: validateLabel, trigger: 'blur',},
        ],
        price: [
          {validator: validatePrice, trigger: 'blur',},
          { type: 'number', message: 'price must be a number' },
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },
  methods: {
    activate() {
      const goodsId = this.$route.params.goodsId
      if (!goodsId) {
        this.$router.push('/none')
        return
      }
      this.goods.goodsId = goodsId
      this.getDetails()
    },
    getDetails() {
      console.log('get details')
      this.$axios({
        method: 'get',
        url: 'http://120.24.4.97:8081/goods/' + this.goods.goodsId,
      })
          .then(res => {
            const productDetails = res.data.data
            this.goods.price = productDetails.price
            this.goods.title = productDetails.title
            this.getPicture(productDetails.picturePath)
            this.goods.labels = productDetails.labels
            this.goods.introduce = productDetails.introduce
            this.goods.postage = productDetails.postage
            this.freeDelivery = productDetails.postage === 0
          })
    },
    getPicture(picturePaths) {
      for (let i in picturePaths) {
        this.oldPhotos.push(picturePaths[i].path)
      }
    },
    clearPicture() {
      this.$axios.delete('http://120.24.4.97:8081/goods/picture/' + this.goods.goodsId)
      .then(res => {
        Element.Message({
          message: 'Delete all pictures!',
          type: 'success',
        })
        this.oldPhotos = []
      })
    },
    changeTag(tags) {
      this.goods.tags = tags
    },
    handleRemove(file, fileList) {
      console.log('file', file)
      const tmp_path = file.response
      console.log(tmp_path)
      const i = this.photos.findIndex(item => item.uid === file.uid)
      this.photos.splice(i, 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        Element.Message({
          message: 'Picture must be JPG/PNG format!',
          type: 'error',
        })
        return false
      }
      if (!isLt2M) {
        Element.Message({
          message: 'Picture size can not exceed 2MB!',
          type: 'error',
        })
        return false
      }
    },
    OnChange(file, fileList) {
      const isType = file.type === 'image/jpeg' || 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isType) {
        // this.$message.error('上传头像图片只能是 JPG 格式!');
        fileList.pop()
      }
      if (!isLt5M) {
        Element.Message({
          message: 'Size of picture should be less than 5M',
          type: 'error',
        })
        fileList.pop()
      }
      this.photos.push(file)
      this.hideUpload = fileList.length >= this.limit
    },
    validateInfo(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (!valid) {
          Element.Message({
            message: 'Please check your input',
            type: 'error',
          })
        } else {
          this.submitForm(formName)
        }
      })
    },
    async submitForm(formName) {
      await this.submitInfo()
      for (let i in this.photos) {
        await this.uploadPicture(i)
      }
      console.log('/goods/', this.goods.goodsId)
      this.$router.push('/goods/' + this.goods.goodsId)
    },
    submitInfo() {
      return new Promise(resolve => {
            this.$axios.post('http://120.24.4.97:8081/goods/edit', this.goods)
              .then((res) => {
                resolve('done');
              })
          }
      )
    },
    uploadPicture(i) {
      return new Promise(resolve => {
            // 上传商品图片
            let photoData = new FormData();
            photoData.append('photos', this.photos[i].raw)
            const newRequest = axios.create();
            newRequest({
              method: "POST",
              url: 'http://120.24.4.97:8081/goods/upload/picture?'
                  + 'goodsId=' + this.goods.goodsId,
              data: photoData,
              headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': this.$store.getters.getToken
              }
            }).then(res => {
            })
            resolve('done');
          }
      )
    }
  },
  mounted() {
    this.activate()
  }
}
</script>

<style scoped>
.publish {
  background-color: #f5f5f5;
  margin: auto auto auto -10%;
}
.publish .publish-header {
  background-color: #fff;
  border-bottom: 2px solid deepskyblue;
  margin-bottom: 20px;
  margin-top: -98px;
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
  /*margin: 0 auto;*/
  /*height: 800px;*/
}
.publish .content .form-body {
  margin-top: 70px;
  margin-left: 10%;
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
.publish .content .tag-input{
  margin-left: 100px;
}

.publish .content .publish-btn {
  float: left;
  width: 50%;
  margin-bottom: 50px;
  margin-top: 70px;
  margin-left: 25%;
}

.publish .content .block {
  margin-left: 20%;
  margin-bottom: -2%;
  width: 50%;
}

.publish .content .block .clear-all-picture {
  margin-left: 50%;
}
</style>