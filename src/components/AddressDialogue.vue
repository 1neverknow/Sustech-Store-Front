<template>
  <!-- 内容主体区域 -->
  <el-card class="box-card">
    <el-form
        :model="addressForm"
        :rules="addressFormRules"
        label-position="top"
        ref="addressFormRef"
        label-width="100px"
    >
      <el-form-item label="Recipient" prop="recipient">
        <el-input v-model="addressForm.recipientName"></el-input>
      </el-form-item>
      <el-form-item label="Phone Number" prop="phoneNumber">
        <el-input v-model="addressForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="Address" prop="address">
        <el-input v-model="addressForm.addressName"></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <div style="text-align: center; margin-top: 30px;">
      <el-button type="primary" @click="addAddress">Submit</el-button>
    </div>
  </el-card>
</template>

<script>
import Element from 'element-ui'
export default {
  name: "AddressDialogue",
  props: {
    addressForm: {
      recipientName: '',
      phone: '',
      addressName: ''
    },
  },
  data() {
    return {
      addressFormRules: {
        recipientName: [
          { required: true, message: 'Please input your name', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: 'Please input your phone number', trigger: 'blur' }
        ],
        addressName: [
          { required: true, message: 'Please input your address', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    addAddress() {
        this.$axios.post('http://localhost:8081/user/address', this.addressForm).then((res)=>{
          Element.Message({
            message: 'Success!',
            type: 'success',
          })
          this.closeDialog()
          this.refresh()
      })
    },
    closeDialog() {
      this.$emit('changeAddressVisible', false)
    },
    refresh() {
      this.$emit('refresh')
    }
  }
}
</script>

<style scoped>

</style>