<template>
<div class="regForm">
  <p>内测期间 功能仅供测试 账号可能删档[待定]</p>
  <p>正式上线之后 内测人员享受第一批邀请码注册</p>
    <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="demo-registerForm">
        <el-form-item label="邀请码" prop="yuankey">
            <el-input v-model="registerForm.yuankey"></el-input>
        </el-form-item>

        <el-form-item label="用户名" prop="name">
            <p class="tips">tips: 用户名将决定您的专属访问链接<br>如用户{{registerForm.name}}的链接为 http://xydh.fun/{{registerForm.name}}</p>
            <el-input type="text" placeholder="5~15字符 建议使用简短好记的字母组合" v-model="registerForm.name" minlength="5" maxlength="15" show-word-limit></el-input>
        </el-form-item>
        
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="registerForm.password_confirm" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary"   @click="submitForm('registerForm')" >注册</el-button>
            <el-button type="danger"    @click="resetForm('registerForm')"  >重置</el-button>
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
        name: "XiaoMing",
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
            this.$alert('', '注册成功', {
              confirmButtonText: '点击进入控制台',
              message: '您的小站链接为 https://xydh.fun/'+this.registerForm.name+"  访问此链接无需登录, 方便您查看、分享",
              type: 'success',
              callback: () => {
                this.$router.push({name:'ULogin'})
              }
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
.regForm { 
  min-width: 400px;
  max-width: 400px;
  margin: 100px auto;
  min-height: 400px;
}
.tips{
  color: red;
  font-size: 12px;
  line-height: 15px;
}
</style>