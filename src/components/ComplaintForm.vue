<template>
  <div>
    <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
    >
      <el-form-item label="Reason" prop="content">
        <el-input v-model="ruleForm.content" type="textarea" style="width: 70%"></el-input>
      </el-form-item>
      <el-form-item label="Photo" prop="photo">
        <el-upload
            class="upload-demo"
            :file-list="photo"
            :before-upload="beforeUpload"
            drag
            action="#"
            :on-change="OnChange"
            accept="image/jpeg,image/png"
            :auto-upload="false"
            multiple
        >
          <el-icon class="el-icon-upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em> (optional)
          </div>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
    <div  style="margin-left: 75%">
      <el-button
          type="primary"
          @click="submitForm('ruleForm')"
      >Submit</el-button
      >
      <el-button @click="resetForm('ruleForm')">Reset</el-button>
    </div>
  </div>
</template>

<script>
import Element from "element-ui"
import axios from "axios"
export default {
  name: "Complain",
  props: ['type', 'id'],
  data() {
    const validateContent = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Reasons are needed'));
      } else {
        callback();
      }
    }
    return {
      ruleForm: {
        content: '',
      },
      photo: '',
      rules: {
        content: [
          {validator: validateContent, trigger: 'blur',},
        ],
      },
    }
  },
  methods: {
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isJPG) {
        Element.Message({
          message: 'File must be JPG/PNG format!',
          type: 'error',
        })
        return false
      }
      if (!isLt5M) {
        Element.Message({
          message: 'Picture size can not exceed 5MB!',
          type: 'error',
        })
        return false
      }
    },
    handleSuccess(res, file) {
      this.photo = file.raw
    },
    OnChange(file, fileList) {
      const isType = file.type === 'image/jpeg' || 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isType) {
        Element.Message({
          message: 'File should be JPG/PNG',
          type: 'error',
        })
        fileList.pop()
        return
      }
      if (!isLt5M) {
        Element.Message({
          message: 'Size of picture should be less than 5M',
          type: 'error',
        })
        fileList.pop()
        return
      }
      this.photo = file.raw
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let photoData = new FormData();
          photoData.append('picture', this.photo)
          const newRequest = axios.create();
          let url = ''
          let method = 'POST'
          if (this.type === 'goods') {
            url = 'http://120.24.4.97:8081/goods/complain?'
                    + 'content=' + this.ruleForm.content
                    + '&goodsId=' + this.id
          } else if(this.type === 'deal') {
            url = 'http://120.24.4.97:8081/deal/appealing/'
                + this.id
                + '?content=' + this.ruleForm.content
            method = 'GET'
          }
          newRequest({
            method: method,
            url: url,
            data: photoData,
            headers: {
              "Content-Type": "multipart/form-data",
              'Authorization': this.$store.getters.getToken
            }
          }).then(res => {
            Element.Message({
              message: 'Success',
              type: 'success',
            })
            this.closeDialog()
            if (this.type === 'deal') {
              this.refresh()
            }
          })
        } else {
          Element.Message({
            message: 'Please check your input!',
            type: 'error',
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    closeDialog() {
      this.$emit('changeVisible', false)
    },
    refresh() {
      this.$emit('refresh')
    }
  },
}
</script>

<style scoped>
</style>