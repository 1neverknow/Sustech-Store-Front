<template>
  <div>
    <!--    <el-col :span = "2">-->
    <!--      <img src="../assets/img.jpg" class="user-avator" alt />-->
    <!--    </el-col>el-col-->
    <el-card >
      <el-descriptions class="margin-top" title="Person Information" :column="3" border>
        <template slot="extra">
          <router-link to="/pi_modify">
            <el-button type="primary" size="medium">Modify</el-button>
          </router-link>
        </template>

        <el-descriptions-item label-style="width:15%" content-style="width:15%">
          <template slot="label">
            <i class="el-icon-user"></i>
            User Name
          </template>
          {{ user_name }}
        </el-descriptions-item>

        <el-descriptions-item label-style="width:15%" content-style="width:15%">
          <template slot="label">
            <i class="el-icon-male"></i>
            gender
          </template>
          {{ gender }}
        </el-descriptions-item>

        <el-descriptions-item label-style="width:15%" content-style="width:15%">
          <template slot="label">
            <i class="el-icon-message"></i>
            Email
          </template>
          {{ email }}
        </el-descriptions-item>


        <el-descriptions-item label-style="width:15%" content-style="width:15%">
          <template slot="label">
            <i class="el-icon-date"></i>
            Birthday
          </template>
          {{ birthday }}
        </el-descriptions-item>

        <el-descriptions-item label-style="width:15%" content-style="width:15%">
          <template slot="label">
            <i class="el-icon-cherry"></i>
            Credit
          </template>
          {{ credit }}
        </el-descriptions-item>

        <el-descriptions-item label-style="width:15%" content-style="width:15%">
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            Telephone Number
          </template>
          {{ phone }}
        </el-descriptions-item>

        <el-descriptions-item label-style="width:15%" content-style="width:15%">
          <template slot="label">
            <i class="el-icon-info"></i>
            ID Card
          </template>
          {{ id_card }}
        </el-descriptions-item>

        <el-descriptions-item label-style="width:15%" content-style="width:15%">
          <template slot="label">
            <i class="el-icon-money"></i>
            Money
          </template>
          {{ money }}
        </el-descriptions-item>


        <el-descriptions-item label-style="width:15%" content-style="width:15%">
          <template slot="label">
            <i class="el-icon-tickets"></i>
            Personality signature
          </template>
          <!--      <el-tag size="small">学校</el-tag>-->
          {{ PersonalitySignature }}
        </el-descriptions-item>

      </el-descriptions>
    </el-card>

    <el-card style="margin-top: 20px">
      <el-descriptions class="margin-top" title="Address List" :column="3" border>
        <template slot="extra">
          <router-link to="/ai_modify">
            <el-button type="primary" size="medium">Modify</el-button>
          </router-link>
        </template>

        <el-descriptions-item label-style="width:15%" content-style="width:15%">
          <template slot="label">
            <i class="el-icon-user"></i>
            Receiver1
          </template>
          {{ receiver1 }}
        </el-descriptions-item>

        <el-descriptions-item label-style="width:15%" content-style="width:15%">
          <template slot="label">
            <i class="el-icon-phone"></i>
            Telephone1
          </template>
          {{ telephone1 }}
        </el-descriptions-item>

        <el-descriptions-item label-style="width:15%" content-style="width:15%">
          <template slot="label">
            <i class="el-icon-message"></i>
            Address1
          </template>
          {{ address1 }}
        </el-descriptions-item>

        <el-descriptions-item label-style="width:15%" content-style="width:15%">
          <template slot="label">
            <i class="el-icon-user"></i>
            Receiver2
          </template>
          {{ receiver2 }}
        </el-descriptions-item>

        <el-descriptions-item label-style="width:15%" content-style="width:15%">
          <template slot="label">
            <i class="el-icon-phone"></i>
            Telephone2
          </template>
          {{ telephone2 }}
        </el-descriptions-item>

        <el-descriptions-item label-style="width:15%" content-style="width:15%">
          <template slot="label">
            <i class="el-icon-message"></i>
            Address2
          </template>
          {{ address2 }}
        </el-descriptions-item>

        <el-descriptions-item label-style="width:15%" content-style="width:15%">
          <template slot="label">
            <i class="el-icon-user"></i>
            Receiver3
          </template>
          {{ receiver3 }}
        </el-descriptions-item>

        <el-descriptions-item label-style="width:15%" content-style="width:15%">
          <template slot="label">
            <i class="el-icon-phone"></i>
            Telephone3
          </template>
          {{ telephone3 }}
        </el-descriptions-item>

        <el-descriptions-item label-style="width:15%" content-style="width:15%">
          <template slot="label">
            <i class="el-icon-message"></i>
            Address3
          </template>
          {{ address3 }}
        </el-descriptions-item>

      </el-descriptions>

    </el-card>

    <el-card style="margin-top: 20px">


    </el-card>


  </div>


</template>

<script>
export default {
  name: "Account",
  data() {
    return {
      user_name: 'admin',
      picture: '',
      email: 'xxxxxxxx@sustech.edu.cn',
      gender: 'men',
      birthday: '2001-01-01',
      credit: 100,
      id_card: 'xxxxxxxxxxxxxx',
      money: 500.0,
      phone: 17796370472,
      PersonalitySignature: '',
      receiver1: '',
      telephone1: '',
      address1: '',
      receiver2: '',
      telephone2: '',
      address2: '',
      receiver3: '',
      telephone3: '',
      address3: '',
    }
  },
  mounted() {
    this.initialAccount();
  },
  methods: {
    initialAccount() {
      // this.user_name = 'user'
      //   this.$axios({
      //     method: 'get',
      //     url: 'http://localhost:8081/user/information/'
      //          + this.$store.getters.getUser.user_id ,
      //     data: {
      //       queryUserId: this.$store.getters.getUser.user_id,
      //     },
      //
      //   }).then(res => {
      //     if (res.data.code === 200) {
      //       const data = res.data.data
      //       this.user_name = data.userName
      //       this.phone = data.phone
      //     } else {
      //       this.$alert(res.data.message, 'Tip', {
      //         confirmButtonText: 'OK'
      //       })
      //     }
      //   })
      // }
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
