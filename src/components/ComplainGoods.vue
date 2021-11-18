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
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
        >
          <el-icon class="el-icon-upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
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
export default {
  name: "ComplainGoods",
  props: ['goodsId'],
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
        goodsId: this.goodsId,
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let photoData = new FormData();
          photoData.append('photos', this.photos)
          const newRequest = axios.create();
          newRequest({
            method: "POST",
            url: 'http://localhost:8081/goods/complain?'
                + 'content=' + this.ruleForm.content
                + '&goodsId=' + this.goodsId,
            data: photoData,
            headers: {
              "Content-Type": "multipart/form-data",
              'Authorization': store.getters.getToken
            }
          }).then(res => {
            Element.Message({
              message: 'Success',
              type: 'success',
            })
            this.closeDialog()
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
      this.$emit('changeComplainVisible', false)
    }
  },
}
</script>

<style scoped>
</style>