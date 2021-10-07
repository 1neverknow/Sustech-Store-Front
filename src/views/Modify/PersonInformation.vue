<template>
  <div>
    <div class="modifyImage">
      <img src="@/assets/img.jpg" class="user-avator-pi" @click="EditImage()"  />
      <p style="text-align:center;">Click The Image to Modify</p>
    </div>



    <el-card id = "test" class="box-card" shadow="always" style="margin-top: 10px">
      <div slot="header" class="clearfix">
        <span>Basic information</span>
      </div>
      <el-form :model="BI_form" :rules="BI_rules" ref="BIForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="User Name" prop="user_name">
          <el-input v-model="BI_form.user_name"></el-input>
        </el-form-item>

        <el-form-item label="Gender" prop="gender">
          <el-select v-model="BI_form.gender" placeholder="Please select your gender" style="width: 14%;">
            <el-option label="Man" value="Man"></el-option>
            <el-option label="Woman" value="Woman"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Birthday" required>
          <el-date-picker type="date" placeholder="Please select your birthday"
                          v-model="BI_form.birthday"></el-date-picker>
        </el-form-item>

        <el-form-item label="Credit" required>
          <el-input v-model="BI_form.credit" disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="Personality Signature" prop="PersonalitySignature">
          <el-input type="textarea" v-model="BI_form.PersonalitySignature"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('BIForm')">Modify</el-button>
          <el-button @click="resetForm('BIForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>Modify Password</span>
      </div>
      <el-form :model="MP_form" :rules="MP_rules" ref="MPForm" label-width="100px" class="demo-ruleForm">

        <el-form-item v-if="!this.old_invisible" label="Old Password" label-width="160px" prop="old_password">
          <el-input placeholder = "Please input your old password" type="password" v-model="MP_form.old_password" style="width: 320px"></el-input>
          <el-checkbox v-model="old_invisible" style="margin-left: 5px">show password</el-checkbox>
        </el-form-item>
        <el-form-item v-else label="Old Password" prop="old_password" label-width="160px">
          <el-input placeholder = "Please input your old password" type="text" v-model="MP_form.old_password" style="width: 320px"></el-input>
          <el-checkbox v-model="old_invisible" style="margin-left: 5px">show password</el-checkbox>
        </el-form-item>

        <el-form-item v-if="!this.new_invisible" label="New Password" prop="new_password" label-width="160px">
          <el-input placeholder = "Please input your new password" type="password" v-model="MP_form.new_password" style="width: 320px"></el-input>
          <el-checkbox v-model="new_invisible" style="margin-left: 5px">show password</el-checkbox>
        </el-form-item>
        <el-form-item v-else  label="New Password" prop="new_password" label-width="160px">
          <el-input placeholder = "Please input your new password" type="text" v-model="MP_form.new_password" style="width: 320px"></el-input>
          <el-checkbox v-model="new_invisible" style="margin-left: 5px">show password</el-checkbox>
        </el-form-item>

        <el-form-item v-if="!this.new_yes_invisible" label="New Password Again" prop="new_yes_password" label-width="160px">
          <el-input placeholder = "Please input your new password again" type="password" v-model="MP_form.new_yes_password" style="width: 320px"></el-input>
          <el-checkbox v-model="new_yes_invisible" style="margin-left: 5px">show password</el-checkbox>
        </el-form-item>
        <el-form-item v-else label="New Password Again" prop="new_yes_password" label-width="160px">
          <el-input placeholder = "Please input your new password again" type="text" v-model="MP_form.new_yes_password" style="width: 320px"></el-input>
          <el-checkbox v-model="new_yes_invisible" style="margin-left: 5px">show password</el-checkbox>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="submitForm('MPForm')">Modify</el-button>
          <el-button @click="resetForm('MPForm')">Reset</el-button>
        </el-form-item>

      </el-form>
    </el-card>

    <el-card  style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>Modify Email</span>
      </div>
      <el-form :model="ME_form" :rules="ME_rules" ref="MEForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="Old E-Mail Address" label-width="150px">
          <el-input v-model="ME_form.old_email" disabled="true" style="width: 25%"></el-input>
        </el-form-item>

        <el-form-item label-width="150px" label="New E-Mail Address" prop="new_email">
          <el-input placeholder="Please input your new email"  v-model="ME_form.new_email" style="width: 320px"></el-input>
          <!--            倒计时按钮-->
          <el-button type="primary" :disabled="verify.disable" @click="Down('ruleForm')">{{verify.getCode}}</el-button>
          <!--            <el-button type="primary" :disabled="verify.disable" @click="getVerifyCode">{{verify.getCode}}</el-button>-->
        </el-form-item>

        <el-form-item label="Varify Code" prop="varifycode"  label-width="150px">
          <el-input placeholder="Please input the varify code in your new email address" v-model="ME_form.varifycode" style="width: 25%"></el-input>
        </el-form-item>

        <el-form-item>
        <el-button type="primary" @click="submitForm('MEForm')">Modify</el-button>
        <el-button @click="resetForm('MEForm')">Reset</el-button>
        </el-form-item>

      </el-form>

    </el-card>


    <el-dialog title="收货地址" :visible.sync="edit_image">
      <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>


  </div>
</template>
<script>
export default {
  name: 'PI',
  mounted() {
    console.log(this.$store.state.modify_pos)
    this.$el.querySelector(this.$store.state.modify_pos).scrollIntoView()
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Password is required'));
      } else if(value.length < 6){
        callback(new Error('Length must be more than 6'));
      } else {
        callback();
      }
    };

    return {
      old_invisible : false,
      new_invisible : false,
      new_yes_invisible : false,
      edit_image:false,
      imageUrl: '',


      ME_form: {
        old_email: '208347209@qq.com',
        new_email:'',
        varifycode: '',
      },
      ME_rules: {
        new_email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        varifycode: {required:true, trigger: 'blur',}
      },
      verify: {
        isGeting: false,
        getCode: 'Send',
        disable: false,
        time_out: 0
      },

      BI_form: {
        user_name: 'admin',
        picture: '',
        email: 'xxxxxxxx@sustech.edu.cn',
        gender: '',
        birthday: '2001-01-01',
        credit: 100,
        id_card: 'xxxxxxxxxxxxxx',
        money: 500.0,
        phone: 17796370472,
        PersonalitySignature: 'asd',
        image_path:'@/assets/img.jpg'
      },
      BI_rules: {
        user_name: [
          {required: true, message: 'Please input your user name', trigger: 'blur'},
          {min: 3, max: 10, message: 'The length should between 3 and 10', trigger: 'blur'}
        ],
        gender: [
          {required: true, message: 'Please select your gender', trigger: 'change'}
        ],
        birthday: [
          {type: 'date', required: true, message: 'Please select your birthday', trigger: 'change'}
        ],
      },
      MP_form: {
        old_password: '',
        new_password: '',
        new_yes_password: ''
      },
      MP_rules:{
        old_password: [
          {validator: validatePass, trigger: 'blur',},
          {required: true}
        ],
        new_password: [
          {validator: validatePass, trigger: 'blur',},
          {required: true}
        ],
        new_yes_password: [
          {validator: validatePass, trigger: 'blur',},
          {required: true}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    EditImage(){
      this.edit_image = true;
    },

    Down(formName) {
      this.$refs[formName].validateField("email", error => {
        if (!error) {
          this.$axios.post('http://localhost:8081/login/forgot', this.ME_form.email).then(res => {
            if(res.data.code!==200){
              console.log('error submit!!')
              return false
            }
            var countdown = setInterval(() => {
              if (this.verify.time_out < 1) {
                console.log("send verify code")
                this.verify.isGeting = false
                this.verify.disable = false
                this.verify.getCode = 'Send'
                this.verify.time_out = 6
                clearInterval(countdown)
              } else {
                console.log("sending")
                this.verify.isGeting = true
                this.verify.disable = true
                this.verify.getCode = --this.verify.time_out + 's'
              }
            }, 1000);
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style >

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
}

.user-avator-pi {
  margin:0 auto;
  display: block;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  cursor: pointer;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
