<template>
    <div class="loginForm">

        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px">
            
            <el-form-item label="用户名" prop="name">
            <el-input type="text" placeholder="" v-model="loginForm.name" minlength="5" maxlength="15"></el-input>
            </el-form-item>
            
            <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="loginForm.password" autocomplete="off" @keyup.enter.native="submitForm('loginForm')"></el-input>
            </el-form-item>
            
            <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                    <el-button @click.native="reg()">注册</el-button>
            </el-form-item>
            
        </el-form>

    </div>
</template>

<script>
import * as API from "@/api/user/";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        name: "",
        password: "",
      },
      rules: {
        name: [{required: true,message: '请输入用户名'}],
        password: [{ validator: validatePass, trigger: "blur" }],
      }
    };
  },
  methods: {
    SubmitLogin() {
        API.UserLogin(this.loginForm).then((res) => {
          if (res.code > 0) {
            this.$notify.error({
              title: "登录失败",
              message: res.msg
            });
          } else {
            this.$router.push({name:'Me'})
            this.$notify({
              title: "登录成功!",
              message: `${res.data.name}您好,欢迎进入控制台`,
              type: "success",
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
          this.SubmitLogin();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    reg(){
      this.$router.push('/u/register')
    }
  }
};
</script>


<style scoped>
  .loginForm { 
    min-width: 200px;
    max-width: 400px;
    min-height: 400px;
    margin: 100px auto;
  }
</style>