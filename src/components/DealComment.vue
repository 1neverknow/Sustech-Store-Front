<template>
  <div>
    <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
    >
      <el-form-item label="Satisfied?" prop="isGood">
        <el-radio-group v-model="ruleForm.isGood">
          <el-radio label="YES"></el-radio>
          <el-radio label="NO"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Comment" prop="content">
        <el-input v-model="ruleForm.content" type="textarea"></el-input>
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
import Element from 'element-ui'
export default {
  name: "DealComment",
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
        isGood: '',
        content: '',
      },
      rules: {
        isGood: [
          {
            required: true,
            message: 'This should not be empty',
            trigger: 'change',
          },
        ],
        content: [
          {validator: validateContent, trigger: 'blur',},
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) =>{
        console.log(this.$refs[formName])
        if (valid) {
          this.$axios.post('http://localhost:8081/deal/comment/' + this.dealId, this.ruleForm)
            .then((res)=>{
            Element.Message({
              message: 'Success!',
              type: 'success',
            })
          })
          this.$emit('changeCommentVisible', false)
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