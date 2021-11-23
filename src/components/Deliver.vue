<template>
<!--卖家填写邮递单号-->
  <div>
    <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-postion="top"
    >
      <el-form-item
          label="Mailing Number"
          prop="mailingNumber"
      ><el-input v-model="ruleForm.mailingNumber"></el-input>
      </el-form-item>

      <el-form-item style="margin-top: 40px; margin-bottom: -10px; margin-left: 70%">
        <el-button type="primary" @click="submitForm('ruleForm')"
        >Submit</el-button
        >
        <el-button @click="open">No Delivery</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Element from "element-ui"
export default {
  name: "Deliver",
  props: ['dealId'],
  data() {
    return {
      ruleForm: {
        mailingNumber: '',
      },
      photo: '',
      rules: {
        mailingNumber: [
          {required: true, message: 'Please input mailing number', trigger: 'blur',},
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.put('http://localhost:8081/deal/deliver/'
              + this.dealId
              + '?mailingNumber=' + this.ruleForm.mailingNumber)
          .then((res) => {
            Element.Message({
              message: 'Success!',
              type: 'success',
            })
            this.refresh()
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
    open() {
      Element.MessageBox.confirm('确认为当面交易?', 'prop', {
        confirmButtonText: 'YES',
        cancelButtonText: 'CANCEL',
        type: 'warning'
      }).then(() => {
        this.$axios.put('http://localhost:8081/deal/deliver/'
            + this.dealId
            + '?mailingNumber=null')
        .then((res) => {
          Element.Message({
            message: 'Success!',
            type: 'success',
          })
          this.refresh()
          this.closeDialog()
        })
      }).catch(() => {
      });
    },
    closeDialog() {
      this.$emit('changeDeliverVisible', false)
    },
    refresh() {
      this.$emit('refresh')
    }
  }
}
</script>

<style scoped>

</style>