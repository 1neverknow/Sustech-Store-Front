<template>
  <div>
    <!-- 内容主体区域 时间线 -->
    <el-timeline>
      <el-timeline-item
          v-for="(activity, index) in progressInfo"
          :key="index"
          :timestamp="activity.time"
      >
        {{ activity.context }}
      </el-timeline-item>
    </el-timeline>
<!--确认收货-->
    <template v-if="queryType==='buy'">
      <el-button
          style="margin-left: 40%"
          icon="el-icon-check"
          type="success"
          @click="confirmGet"
          plain
      >I have received</el-button>
    </template>
  </div>
</template>

<script>
import Element from 'element-ui'
export default {
  name: "Shipment",
  props: ['dealId', 'queryType'],
  data() {
    return {
      progressInfo: [],
    }
  },
  methods: {
    confirmGet() {
      this.$axios.put('http://localhost:8081/deal/confirm/' + this.dealId)
        .then(res => {
          Element.Message({
            message: 'Success!',
            type: 'success',
          })
          this.$emit('refresh')
          this.closeDialog()
        })
    },
    closeDialog() {
      this.$emit('changeShipmentVisible', false)
    }
  }
}
</script>

<style scoped>

</style>