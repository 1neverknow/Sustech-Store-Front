<template>
  <el-row :gutter = "200">
    <!--    <el-col :span = "2">-->
    <!--      <img src="../assets/img.jpg" class="user-avator" alt />-->
    <!--    </el-col>el-col-->
    <el-col >
      <el-descriptions class="margin-top" title="Person Information" :column="3" border>
        <template slot="extra">
          <router-link to="/pi_modify">
            <el-button type="primary" size="medium">Modify</el-button>
          </router-link>
        </template>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            User Name
          </template>
          {{ user_name }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-male"></i>
            gender
          </template>
          {{ gender }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-message"></i>
            Email
          </template>
          {{ email }}
        </el-descriptions-item>


        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-date"></i>
            Birthday
          </template>
          {{ birthday }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-cherry"></i>
            Credit
          </template>
          {{ credit }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            Telephone Number
          </template>
          {{ phone }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-info"></i>
            ID Card
          </template>
          {{ id_card }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-money"></i>
            Money
          </template>
          {{ money }}
        </el-descriptions-item>


        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            Personality signature
          </template>
          <!--      <el-tag size="small">学校</el-tag>-->
          {{ PersonalitySignature }}
        </el-descriptions-item>

      </el-descriptions>
    </el-col>

  </el-row>


</template>

<script>
export default {
  name: "Account",
  data() {
    return {
      user_name: 'admin',
      picture : '',
      email: 'xxxxxxxx@sustech.edu.cn',
      gender: 'men',
      birthday: '2001-01-01',
      credit: 100,
      id_card: 'xxxxxxxxxxxxxx',
      money: 500.0,
      phone: 17796370472,
      PersonalitySignature: ''
    }
  },
  mounted() {
    this.initialAccount();
  },
  methods :{
    initialAccount(){

    }
  }
}
</script>

<style scoped>

.user-avator {
  margin-top: 30px;
  width: 150px;
  height: 150px;
  border-radius: 100%;
}


</style>
