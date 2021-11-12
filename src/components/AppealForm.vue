<template>
  <div>
    <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
    >
      <el-form-item label="Reason" prop="content">
        <el-input v-model="ruleForm.content" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="Photo" prop="photo">
        <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
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

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
        >Submit</el-button
        >
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AppealForm",
  props: ['dealId'],
  data() {
    const validateContent = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input a comment'));
      } else {
        callback();
      }
    }
    return {
      ruleForm: {
        dealId: this.dealId,
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
        console.log(this.$refs[formName])
        if (valid) {
          this.$emit('changeAppealVisible', false)
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
  },
}
</script>

<style scoped>

</style>