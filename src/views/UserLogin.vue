<template>
    <!-- <div class="loginForm">

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

    </div> -->

  <div id="userLayout" :class="['user-layout-wrapper']">
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="/">
            <img src="~@/assets/logo.png" class="logo" alt="logo">
            <span class="title">炫猿导航管理平台</span>
          </a>
        </div>
        <div class="desc">
          后PC时代,用炫猿就对了!
        </div>
      </div>

      <div class="main">
        <a-form
          id="formLogin"
          class="user-layout-login"
          ref="formLogin"
          :form="form"
          @submit="handleSubmit"
        >
          <a-tabs
            activeKey="tab1"
            :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
          >
            <a-tab-pane key="tab1" tab="用户名密码登录">
              <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" message="账户或密码错误" />
              <a-form-item>
                <a-input
                  size="large"
                  type="text"
                  placeholder="请输入用户名"
                  v-decorator="[
                    'name',
                    {rules: [{ required: true, message: '请输入帐户名' }], validateTrigger: 'change'}
                  ]"
                >
                  <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
              </a-form-item>

              <a-form-item>
                <a-input-password
                  size="large"
                  placeholder="请输入密码"
                  v-decorator="[
                    'password',
                    {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
                  ]"
                >
                  <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input-password>
              </a-form-item>
            </a-tab-pane>
            
          </a-tabs>

          <a-form-item style="margin-top:14px">
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              class="login-button"
              :loading="state.loginBtn"
              :disabled="state.loginBtn"
            >确定</a-button>
          </a-form-item>


          <div class="user-login-other">
            <router-link class="register" :to="{ path: '/u/register' }">注册并定制自己的导航</router-link>
          </div>
        </a-form>

      </div>

      <!-- <div class="footer">
        <div class="links">
          <a href="_self">帮助</a>
          <a href="_self">隐私</a>
          <a href="_self">条款</a>
        </div>
        <div class="copyright">
          Copyright &copy; 2018 vueComponent
        </div>
      </div> -->
    </div>
  </div>  
</template>

<script>
// import * as API from "@/api/user/";
import { userService } from '@/common/api'

export default {
  data() {
    return {
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 1,
      isLoginError: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 1,
        smsSendBtn: false
      },

      vaptchaObj: {}
    };
  },
  methods: {
    SubmitLogin(form) {
      userService.UserLogin(form).then((res) => {
        if (res.code > 0) {
          this.$notify.error({
            title: "登录失败",
            message: res.msg
          });
          this.state.loginBtn = false
        } else {
          this.$router.push({name:'Me'})
          this.$notify({
            title: "登录成功!",
            message: `${res.data.user.name} 您好,欢迎进入控制台`,
            
            type: "success",
          });
        }
      })
      .catch(error => {
        this.$notify.error({
          title: "错误 请检查",
          message: error
        });
        this.state.loginBtn = false
      });
    },
    handleSubmit(e){
      e.preventDefault()
      const {
        form: { validateFields },
        state
      } = this

      state.loginBtn = true

      const validateFieldsKey = ['name', 'password']
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const loginParams = { ...values }
          this.SubmitLogin(loginParams)
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    // submitForm(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       this.SubmitLogin();
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
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


<style lang="less" scoped>

#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
    background-size: 100%;
    padding: 110px 0 144px;
    position: relative;

    a {
      text-decoration: none;
    }

    .top {
      text-align: center;

      .header {
        height: 44px;
        line-height: 44px;

        .badge {
          position: absolute;
          display: inline-block;
          line-height: 1;
          vertical-align: middle;
          margin-left: -12px;
          margin-top: -10px;
          opacity: 0.8;
        }

        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
          border-style: none;
        }

        .title {
          font-size: 33px;
          color: rgba(0, 0, 0, .85);
          font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }

    .main {
      min-width: 260px;
      width: 368px;
      margin: 0 auto;
    }

    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;
        a {
          color: rgba(0, 0, 0, 0.45);
          transition: all 0.3s;
          &:not(:last-child) {
            margin-right: 40px;
          }
        }
      }
      .copyright {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }
  }
}

.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>