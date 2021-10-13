<template>
  <div>
    <!--    <el-col :span = "2">-->
    <!--      <img src="../assets/img.jpg" class="user-avator" alt />-->
    <!--    </el-col>el-col-->
    <el-card>
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
      <el-alert
          center
          title="Tips：Click Modify to check more address and modify them."
          type="warning"
          :closable="false">
      </el-alert>

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
      user_name: '',
      picture: '',
      email: '',
      gender: '',
      birthday: '',
      credit: '',
      id_card: '',
      money: '',
      phone: '',
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
  // "userId": 1,
  // "sign": null,
  // "userName": "evelyn",
  // "password": "$2a$10$AahBgEoEjpcPJlnWOdyE..g/4Z3.ExFKTvFaPWUA80m5PosF0vFlO",
  // "gender": 0,
  // "birthday": null,
  // "credit": 0,
  // "email": "208347209@qq.com",
  // "idCard": null,
  // "money": 0,
  // "picturePath": "/user_picture_default.png",
  // "phone": null,
  // "addresses": null,
  // "isActivate": true,
  // "activateCode": "208347209@qq.comcFLaeLb2Kn8mht1H"
  methods: {
    initialAccount() {
      // this.user_name = 'user'
      this.$axios({
        method: 'get',
        url: 'http://localhost:8081/user/information/'
            + this.$store.getters.getUser.userId,
        headers: {'authorization': this.$store.getters.getToken},
        data: {
          queryUserId: this.$store.getters.getUser.userId,
        },
      }).then(res => {
        if (res.data.code === 2000) {
          console.log(1)
          const data = res.data.data
          this.user_name = data.userName
          this.phone = data.phone
          this.picture = data.picturePath
          this.email = data.email
          this.gender = data.gender
          this.birthday = data.birthday
          this.credit = data.credit
          this.money = data.money
          this.id_card = data.idCard
          this.PersonalitySignature = data.sign
        } else {
          this.$alert(res.data.message, 'Tip', {
            confirmButtonText: 'OK'
          })
        }
      })
      this.$axios({
        method: 'get',
        url: 'http://localhost:8081/user/address',
        headers: {'authorization': this.$store.getters.getToken},
        transformRequest: [function (data) {  // 将{username:111,password:111} 转成 username=111&password=111
          var ret = '';
          for (var it in data) {
            // 如果要发送中文 编码
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret.substring(0, ret.length - 1)
        }]
      }).then(res => {
        if (res.data.code === 200) {
          const data = res.data.data
          if(data.length>0){
            this.receiver1=data[0].recipientName
            this.telephone1=data[0].phone
            this.address1= data[0].addressName
            if(data.length>1){
              this.receiver2=data[1].recipientName
              this.telephone2=data[1].phone
              this.address2= data[1].addressName
              if(data.length>2){
                this.receiver3=data[2].recipientName
                this.telephone3=data[2].phone
                this.address3= data[2].addressName
              }else{
                this.receiver3='not yet'
                this.telephone3='not yet'
                this.address3='not yet'
              }
            }else{
              this.receiver3='not yet'
              this.telephone3='not yet'
              this.address3='not yet'
              this.receiver2='not yet'
              this.telephone2='not yet'
              this.address2='not yet'
            }
          }else{
            this.receiver1='not yet'
            this.telephone1='not yet'
            this.address1='not yet'
            this.receiver2='not yet'
            this.telephone2='not yet'
            this.address2='not yet'
            this.receiver3='not yet'
            this.telephone3='not yet'
            this.address3='not yet'
          }
        } else {
          this.$alert(res.data.message, 'Tip', {
            confirmButtonText: 'OK'
          })
        }
      })
    },

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
