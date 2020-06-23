<template>
    <div class="loginForm">

        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px">
            
            <el-form-item label="用户名" prop="name">
            <el-input type="text" placeholder="" v-model="loginForm.name" minlength="5" maxlength="15"></el-input>
            </el-form-item>
            
            <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="loginForm.password" autocomplete="off" @keyup.enter.native="submitForm('loginForm')"></el-input>
            </el-form-item>
            
            <div style="padding:10px 50px">
               <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                <el-button @click.native="reg()">注册并定制自己的导航</el-button>
            </div>
               
            
            
        </el-form>

    </div>
</template>

<script>
// import * as API from "@/api/user/";
import { userService } from '@/common/api'

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
      LoginCode: 0,
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
        userService.UserLogin(this.loginForm).then((res) => {
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
    },
    getUser(){
        // 判断登录状态,若登录则取出当前userID和userName
        userService.UserMe().then((res) => {
            this.LoginCode = res.code
            if (this.LoginCode > 0) {
                console.log("未登录")
            }else{
              
                this.$message({
                    message: '您已登录[多账号请先登出]',
                    center: true,
                    showClose: true,
                    type: 'warning'
                });
                this.$router.push('/me')
            }
        })
    },
  },
  beforeMount() {
        document.title = "登录炫猿控制台"
        this.getUser()
  }
};
</script>


<style scoped>
  .loginForm { 
    min-width: 200px;
    max-width: 400px;
    min-height: 400px;
    margin: 120px auto 300px;
  }
</style>