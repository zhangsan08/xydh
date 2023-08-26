<template>
    <div id="userLayout" :class="['user-layout-wrapper']">
        <div class="container">
            <div class="top">
                <div class="header">
                    <a href="/">
                        <img src="~@/assets/logo.svg" class="logo" alt="logo" />
                        <span class="title">炫猿控制台</span>
                    </a>
                </div>
                <div class="desc">后PC时代的玩法</div>
            </div>

            <div class="main">
                <el-form
                    id="formLogin"
                    ref="formLogin"
                    class="user-layout-login"
                    :model="form"
                    :rules="rules"
                >
                    <el-alert
                        v-if="isLoginError"
                        type="error"
                        show-icon
                        style="margin-bottom: 24px"
                        message="账户或密码错误"
                    />
                    <el-form-item prop="name">
                        <el-input v-model="form.name" size="large" type="text" placeholder="请输入用户名">
                            <el-icon slot="prefix" type="user" :style="{color: 'rgba(0,0,0,.25)'}" />
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input v-model="form.password" size="large" placeholder="请输入密码" show-password>
                            <el-icon slot="prefix" type="lock" :style="{color: 'rgba(0,0,0,.25)'}" />
                        </el-input>
                    </el-form-item>

                    <el-form-item style="margin-top: 14px">
                        <el-button
                            size="large"
                            type="primary"
                            html-type="submit"
                            class="login-button"
                            :loading="state.loginBtn"
                            :disabled="state.loginBtn"
                            @click="handleSubmit('formLogin')"
                        >
                            确定
                        </el-button>
                    </el-form-item>

                    <div class="user-login-other">
                        <router-link class="register" :to="{path: '/u/register'}"> 注册并定制自己的导航 </router-link>
                    </div>
                </el-form>
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
import {userService} from '@/common/api';

export default {
    data() {
        return {
            loginBtn: false,
            // login type: 0 email, 1 username, 2 telephone
            loginType: 1,
            isLoginError: false,
            form: {
                name: '',
            },
            state: {
                time: 60,
                loginBtn: false,
                // login type: 0 email, 1 username, 2 telephone
                loginType: 1,
                smsSendBtn: false,
            },

            vaptchaObj: {},
            rules: {
                name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                password: [{required: true, message: '请输入密码', trigger: 'blur'}],
            },
        };
    },
    beforeMount() {
        document.title = '登录炫猿控制台';
        this.getUser();
    },
    methods: {
        submitLogin(form) {
            userService
                .UserLogin(form)
                .then(res => {
                    if (res.code > 0) {
                        this.$notify.error({
                            title: '登录失败',
                            message: res.msg,
                        });
                        this.state.loginBtn = false;
                    } else {
                        this.$router.push({name: 'Me'});
                        this.$notify({
                            title: '登录成功!',
                            message: `${res.data.user.name} 您好,欢迎进入控制台`,

                            type: 'success',
                        });
                    }
                })
                .catch(error => {
                    this.$notify.error({
                        title: '错误 请检查',
                        message: error,
                    });
                    this.state.loginBtn = false;
                });
        },
        handleSubmit(formName) {
            const {state} = this;

            this.$refs[formName].validate(valid => {
                if (valid) {
                    state.loginBtn = true;
                    const formData = this.form;
                    const loginParams = Object.assign({}, formData);
                    this.submitLogin(loginParams);
                } else {
                    setTimeout(() => {
                        state.loginBtn = false;
                    }, 600);
                }
            });
        },
        reg() {
            this.$router.push('/u/register');
        },
        getUser() {
            // 判断登录状态,若登录则取出当前userID和userName
            userService.UserMe().then(res => {
                this.LoginCode = res.code;
                if (this.LoginCode > 0) {
                    // 未登录
                } else {
                    this.$message({
                        message: '您已登录[多账号请先登出]',
                        center: true,
                        showClose: true,
                        type: 'warning',
                    });
                    this.$router.push('/me');
                }
            });
        },
    },
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
            height: 100vh;
            box-sizing: border-box;

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
                        color: rgba(0, 0, 0, 0.85);
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
