<template>
  <div>

    <el-upload
        class="avatar-uploader_image"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <el-alert
        center
        title="Tips：Click image to modify your image. You can only upload .jpg or .png image"
        type="warning"
        :closable="false">
    </el-alert>

    <el-card id="test" class="box-card" shadow="always" style="margin-top: 10px">
      <div slot="header" class="clearfix">
        <span>Basic information</span>
      </div>
      <el-form :model="BI_form" :rules="BI_rules" ref="BIForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="User Name" prop="user_name">
          <el-input v-model="BI_form.user_name"></el-input>
        </el-form-item>

        <el-form-item label="Gender" prop="gender">
          <el-select v-model="BI_form.gender" placeholder="Please select your gender" style="width: 14%;">
            <el-option label="Man" value="0"></el-option>
            <el-option label="Woman" value="1"></el-option>
            <el-option label="Secret" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Birthday" required>
          <el-date-picker type="date" placeholder="Please select your birthday"
                          v-model="BI_form.birthday" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>

        <el-form-item label="Credit" required>
          <el-input v-model="BI_form.credit" disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="Personality Signature" prop="PersonalitySignature">
          <el-input type="textarea" v-model="BI_form.PersonalitySignature"></el-input>
        </el-form-item>

        <el-form-item label="goodsImg" prop="goodsImg" hidden>
          <el-input v-model="BI_form.image_path" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitBIForm('BIForm')">Modify</el-button>
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
          <el-input placeholder="Please input your old password" type="password" v-model="MP_form.old_password"
                    style="width: 320px"></el-input>
          <el-checkbox v-model="old_invisible" style="margin-left: 5px">show password</el-checkbox>
        </el-form-item>
        <el-form-item v-else label="Old Password" prop="old_password" label-width="160px">
          <el-input placeholder="Please input your old password" type="text" v-model="MP_form.old_password"
                    style="width: 320px"></el-input>
          <el-checkbox v-model="old_invisible" style="margin-left: 5px">show password</el-checkbox>
        </el-form-item>

        <el-form-item v-if="!this.new_invisible" label="New Password" prop="new_password" label-width="160px">
          <el-input placeholder="Please input your new password" type="password" v-model="MP_form.new_password"
                    style="width: 320px"></el-input>
          <el-checkbox v-model="new_invisible" style="margin-left: 5px">show password</el-checkbox>
        </el-form-item>
        <el-form-item v-else label="New Password" prop="new_password" label-width="160px">
          <el-input placeholder="Please input your new password" type="text" v-model="MP_form.new_password"
                    style="width: 320px"></el-input>
          <el-checkbox v-model="new_invisible" style="margin-left: 5px">show password</el-checkbox>
        </el-form-item>

        <el-form-item v-if="!this.new_yes_invisible" label="New Password Again" prop="new_yes_password"
                      label-width="160px">
          <el-input placeholder="Please input your new password again" type="password"
                    v-model="MP_form.new_yes_password" style="width: 320px"></el-input>
          <el-checkbox v-model="new_yes_invisible" style="margin-left: 5px">show password</el-checkbox>
        </el-form-item>
        <el-form-item v-else label="New Password Again" prop="new_yes_password" label-width="160px">
          <el-input placeholder="Please input your new password again" type="text" v-model="MP_form.new_yes_password"
                    style="width: 320px"></el-input>
          <el-checkbox v-model="new_yes_invisible" style="margin-left: 5px">show password</el-checkbox>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="submitMPForm('MPForm')">Modify</el-button>
          <el-button @click="resetForm('MPForm')">Reset</el-button>
        </el-form-item>

      </el-form>
    </el-card>

    <el-card style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>Modify Email</span>
      </div>
      <el-form :model="ME_form" :rules="ME_rules" ref="MEForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="Old E-Mail Address" label-width="150px">
          <el-input v-model="ME_form.old_email" disabled="true" style="width: 25%"></el-input>
        </el-form-item>

        <el-form-item label-width="150px" label="New E-Mail Address" prop="new_email">
          <el-input placeholder="Please input your new email" v-model="ME_form.new_email"
                    style="width: 320px"></el-input>
          <!--            倒计时按钮-->
          <el-button type="primary" :disabled="verify.disable" @click="Down('ruleForm')">{{ verify.getCode }}
          </el-button>
          <!--            <el-button type="primary" :disabled="verify.disable" @click="getVerifyCode">{{verify.getCode}}</el-button>-->
        </el-form-item>

        <el-form-item label="Varify Code" prop="varifycode" label-width="150px">
          <el-input placeholder="Please input the varify code in your new email address" v-model="ME_form.varifycode"
                    style="width: 25%"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('MEForm')">Modify</el-button>
          <el-button @click="resetForm('MEForm')">Reset</el-button>
        </el-form-item>


      </el-form>

    </el-card>

  </div>
</template>
<script>
import {Element} from "element-ui";
import axios from "axios";
import store from "@/store";

export default {
  name: 'PI',
  mounted() {
    console.log(this.$store.state.modify_pos)
    this.$el.querySelector(this.$store.state.modify_pos).scrollIntoView()
    this.initial()
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Password is required'));
      } else if (value.length < 6) {
        callback(new Error('Length must be more than 6'));
      } else {
        callback();
      }
    };

    return {
      old_invisible: false,
      new_invisible: false,
      new_yes_invisible: false,
      edit_image: false,
      dialogImageUrl: '',
      dialogVisible: false,
      imageUrl : 'http://localhost:8081/' + this.$store.getters.getBasic_Info.picturePath,

      ME_form: {
        old_email: '208347209@qq.com',
        new_email: '',
        varifycode: '',
      },
      ME_rules: {
        new_email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        varifycode: {required: true, trigger: 'blur',}
      },
      verify: {
        isGeting: false,
        getCode: 'Send',
        disable: false,
        time_out: 0
      },

      BI_form: {
        user_name: this.$store.getters.getBasic_Info.userName,
        picture: this.$store.getters.getBasic_Info.picturePath,
        email: this.$store.getters.getBasic_Info.email,
        gender: this.$store.getters.getBasic_Info.gender,
        birthday: this.$store.getters.getBasic_Info.birthday,
        credit: this.$store.getters.getBasic_Info.credit,
        id_card: this.$store.getters.getBasic_Info.id_card,
        money: this.$store.getters.getBasic_Info.money,
        phone: this.$store.getters.getBasic_Info.phone,
        PersonalitySignature: this.$store.getters.getBasic_Info.sign,
        image_path: ''
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
      MP_rules: {
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.BI_form.image_path = file.raw;

      //创建 formData 对象
      let formData = new FormData();
      // 向 formData 对象中添加文件
      if(this.BI_form.image_path!=='')
        formData.append('photo', this.BI_form.image_path);
      else formData.append('photo',null)
      this.$axios({
        method: 'post',
        url: 'http://localhost:8081/user/upload/face',
        headers: {
          'Authorization': this.$store.getters.getToken,
          'Content-Type': 'multipart/form-data'
        },
        data: formData,
        transformRequest: [function (data) {  // 将{username:111,password:111} 转成 username=111&password=111
          var ret = '';
          for (var it in data) {
            // 如果要发送中文 编码
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret.substring(0, ret.length - 1)
        }]
      }).then(res => {
        console.log(res)
        if (res.data.code === 2000) {

        }
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式 !');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return (isPNG || isJPG) && isLt2M;
    },

    submitBIForm(formName) {
      console.log(this.BI_form.birthday)
      this.$refs[formName].validate((valid) => {
        //创建 formData 对象
        let formData = new FormData();
        // 向 formData 对象中添加文件
        if(this.BI_form.image_path!=='')
          formData.append('photo', this.BI_form.image_path);
        else formData.append('photo',null)
        const newRequest = axios.create({
          baseUrl: "http://localhost:8081"//请求地址
        });

        let gender = 0
        if(this.BI_form.gender==='Woman') gender = 1
        else if (this.BI_form.gender === 'Secret') gender = 2
        newRequest({
          method: "POST",
          url: "/user/update"
              + '?birthday=' + this.BI_form.birthday
              + '&gender=' + gender
              + '&name=' + this.BI_form.user_name
              + '&sign=' + this.BI_form.PersonalitySignature,
          data: formData,
          headers: {
            "Content-Type":
                "multipart/form-data",
            'Authorization': this.$store.getters.getToken
          }
        }).then(res => {
          this.$message({
            type: 'success',
            message: 'Modify the information successfully'
          });
        });
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    EditImage() {
      this.edit_image = true;
    },

    Down(formName) {

    },
  }

}
</script>

<style>

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

.avatar-uploader_image .el-upload {
  margin-left: 40%;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader_image .el-upload:hover {
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
