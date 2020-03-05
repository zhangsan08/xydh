<template>
  <div class="container">
    <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="demo-registerForm">
      <el-form-item label="邀请码" prop="yuankey">
        <el-input v-model="registerForm.yuankey"></el-input>
      </el-form-item>

      <el-form-item label="用户名" prop="name">
        <p class="tips">tips: 用户名将决定您的专属访问链接<br>如用户xiaoming的链接为 http://xydh.fun/xiaoming</p>
        <el-input type="text" placeholder="5~15字符 建议使用简短好记的字母组合" v-model="registerForm.name" minlength="5" maxlength="15" show-word-limit></el-input>
      </el-form-item>
      
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="registerForm.password_confirm" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
        <el-button type="danger" @click="resetForm('registerForm')">重置</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>

<script>
import * as API from "@/api/user/";

export default {
  data() {
    var checkyuankeya = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邀请码不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        yuankey: "",
        name: "",
        password: "",
        password_confirm: ""
      },
      rules: {
        yuankey: [{ required: true, validator: checkyuankeya, trigger: "blur" }],
        name: [{required: true,message: '请输入用户名'}],
        password: [{ validator: validatePass, trigger: "blur" }],
        password_confirm: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    SubmitRegister() {
        API.UserRegister(this.registerForm).then((res) => {
          if (res.code > 0) {
            this.$notify.error({
              title: "注册失败 请核对",
              message: res.msg
            });
          } else {
            this.$notify({
              title: "注册成功!",
              message: `您的小站链接为</br><a target="_blank" href="/${res.data.name}">https://xydh.fun/${res.data.name}</a> </br></br> <a href='/u/login'>点击登录网站后台管理您的导航页</a>`,
              type: "success",
              dangerouslyUseHTMLString: "true"
            });
          }
        })
        .catch(error => {
          this.$notify.error({
            title: "错误 请检查",
            message: error
          });
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.SubmitRegister();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.container {
  /* height: 200px; */
  top: 100px;
  align-self: auto;;
  max-width: 2080px;
  position: absolute;
}
.tips{
  color: red;
  font-size: 12px;
  line-height: 15px;
}
</style>