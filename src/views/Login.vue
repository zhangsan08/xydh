<template>
    <section>
        <span v-for="i in 500" :key="i" class="backgroundSpan"></span>
        <div class="container" id="container">
            <div class="h5">
                <div class="signin" v-if="isLogin">
                    <div class="content">
                        <h2>登录 iLinks</h2>
                        <div class="form">
                            <div class="inputBox">
                                <input type="text" required v-model="loginForm.name" /> <span>用户名</span>
                            </div>
                            <div class="inputBox">
                                <input type="password" required v-model="loginForm.password" /> <span>密码</span>
                            </div>
                            <div class="links">
                                <div><span>没有账号？</span> <a @click="goRegister">注册</a></div>
                            </div>
                            <div class="submitButton" @click="handleLoginSubmit">登录</div>
                        </div>
                    </div>
                </div>
                <div class="signin" v-else>
                    <div class="content">
                        <h2>注册 iLinks</h2>
                        <div class="form">
                            <div class="inputBox">
                                <input type="text" required v-model="registerForm.name" maxlength="15" />
                            </div>
                            <div class="inputBox">
                                <input type="password" required v-model="registerForm.password" /> <span>密码</span>
                            </div>
                            <div class="inputBox">
                                <input type="text" required v-model="registerForm.password_confirm" />
                                <span>确认密码</span>
                            </div>
                            <div class="inputBox">
                                <input type="text" required v-model="registerForm.yuankey" />
                                <span>邀请码</span>
                            </div>
                            <div class="links">
                                <span> <span>已有账号？</span> <a @click="goLogin">登录</a> </span>
                                <a href="https://jinshuju.net/f/yukl9Z" target="_blank">获取邀请码</a>
                            </div>
                            <div class="submitButton" @click="handleRegisterSubmit">注册</div>
                        </div>
                        <div @click="agreeVisible = true" class="zhucexieyibutton">注册协议</div>
                    </div>
                </div>
            </div>
            <div class="pc">
                <div class="form-container login-container">
                    <div class="signin">
                        <div class="content">
                            <h2>注册 iLinks</h2>
                            <div class="form">
                                <div class="inputBox">
                                    <input type="text" required v-model="registerForm.name" maxlength="15" />
                                </div>
                                <div class="inputBox">
                                    <input type="text" required v-model="registerForm.password" /> <span>密码</span>
                                </div>
                                <div class="inputBox">
                                    <input type="text" required v-model="registerForm.password_confirm" />
                                    <span>确认密码</span>
                                </div>
                                <div class="inputBox">
                                    <input type="text" required v-model="registerForm.yuankey" />
                                    <span>邀请码</span>
                                </div>
                                <div class="links">
                                    <span> <span>已有账号？</span> <a @click="goLogin">登录</a> </span>
                                    <a href="https://jinshuju.net/f/yukl9Z" target="_blank">获取邀请码</a>
                                </div>
                                <div class="submitButton" @click="handleRegisterSubmit">注册</div>
                            </div>
                            <div @click="agreeVisible = true" class="zhucexieyibutton">注册协议</div>
                        </div>
                    </div>
                </div>
                <div class="form-container register-container">
                    <div class="signin">
                        <div class="content">
                            <h2>登录 iLinks</h2>
                            <div class="form">
                                <div class="inputBox">
                                    <input type="text" required v-model="loginForm.name" /> <span>用户名</span>
                                </div>
                                <div class="inputBox">
                                    <input type="password" required v-model="loginForm.password" /> <span>密码</span>
                                </div>
                                <div class="links">
                                    <div><span>没有账号？</span> <a @click="goRegister">注册</a></div>
                                </div>
                                <div class="submitButton" @click="handleLoginSubmit">登录</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-right">
                            <h1>iLinks | 书签导航</h1>
                            <h3>管理记录你收藏的网站</h3>
                            <div class="loginAbout">
                                <p>关注公众号【炫技巧】获取网站最新资讯</p>
                                <div style="textalign: center">
                                    <img width="120px" src="https://pic.downk.cc/item/5ecfb96ac2a9a83be569795b.png" />
                                </div>
                            </div>

                            <div class="bottomArea">
                                <div class="logo">
                                    <img
                                        src="~@/assets/logo.png"
                                        alt=""
                                    />
                                    iLinks
                                </div>
                                <div class="info">
                                    服务由iLinks提供
                                </div>
                            </div>

                        </div>
                        <div class="overlay-panel overlay-left">
                            <h3><i class="fa fa-modx"></i>长期保障</h3>
                            <p>已稳定服务三年，可导出到本地冷备</p>
                            <h3><i class="fa fa-cloud"></i>书签上云</h3>
                            <p>随时随地，不限设备，即刻访问</p>
                            <h3><i class="fa fa-edit"></i>高度自定义</h3>
                            <p>自定义域名、背景、音乐、用户数据订阅</p>
                            <div class="registerAbout">
                                <p>
                                    注册小贴士：用户名将决定您的专属链接，如用户名为：XiaoMing<br />
                                    个人站点为：https://xydh.fun/XiaoMing
                                </p>
                            </div>
                            <div class="bottomArea">
                                <div class="logo">
                                    <img
                                        src="~@/assets/logo.png"
                                        alt=""
                                    />
                                    iLinks
                                </div>
                                <div class="info">
                                    服务由iLinks提供
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="用户注册协议" :visible.sync="agreeVisible">
            <div class="xieyi">
                <h1>炫猿软件服务条款</h1>
                <p>
                    感谢您使用炫猿导航。使用我们的服务即表示您已同意本条款。我们始终在不断更改和改进我们的服务。我们可能会增加或删除功能，也可能暂停或彻底停止某项服务。您可以随时停止使用我们的服务，我们也可以随时停止向您提供服务，或随时对我们的服务增加新的限制。如果不同语言的炫猿软件服务条款出现歧义，以简体中文版为准。
                </p>
                <h2>服务的使用</h2>
                <p>您必须在法律允许的范围内使用我们的服务。您不可以进行以下操作：</p>
                <ul>
                    <li>使用我们的服务来传输任何非法内容</li>
                    <li>滥用我们的服务</li>
                    <li>使用任何方式干扰或破坏我们的服务</li>
                    <li>对炫猿软件的网络请求进行抓包和编辑</li>
                    <li>尝试绕过我们的服务的任何限制</li>
                    <li>尝试使用我们没有公开提供的接口</li>
                    <li>
                        将炫猿虚拟主机用于建站以外的用途，包括但不限于下载盗版文件、DDoS 攻击、端口扫描、反向代理和爬虫
                    </li>
                </ul>
                <p>如果您不遵守我们的条款或政策，我们可以暂停或停止向您提供服务。</p>
                <h2>炫猿账号</h2>
                <p>
                    为了保护您的炫猿账号，请务必保管好您的密码。不要将您的密码告诉他人。您应对自己的炫猿账号上发生的活动或通过该账号进行的活动负法律责。
                </p>
                <h2>隐私与版权</h2>
                <p>使用我们的服务即表示您同意炫猿软件按照隐私政策使用您的个人数据。</p>
                <p>
                    您不可以盗用炫猿软件的代码，无论是否为商业用途。在未经炫猿授权的情况下，您不可以制作或发行使用炫猿内部接口的应用或网站。您不可以在未经炫猿授权的应用或网站上使用炫猿的服务。
                </p>
                <p>
                    当您使用炫猿虚拟主机时，您不应该复制其它网站的源代码并将其用于您的网站，网站模板除外。您不应该发布任何盗版内容。我们会根据《中华人民共和国著作权法》对涉嫌侵犯版权的内容进行删除，并对屡次侵权者的账户进行封禁。
                </p>
                <p>如果您认为有炫猿用户发布的内容侵犯了您的版权，请与我们联系 xuanyuandaohang@126.com</p>
                <h2>您在我们服务中发布的内容</h2>
                <p>
                    我们的部分服务允许您上传、提交、存储、发送或接收内容。您保留对该内容持有的任何知识产权的所有权。简言之，属于您的内容依然归您所有。
                </p>
                <p>
                    根据国家网信办发布的《互联网信息服务管理办法》，您在我们的服务中上传的内容不得含有下列内容的信息：
                </p>
                <ul>
                    <li>反对宪法所确定的基本原则的</li>
                    <li>危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的</li>
                    <li>损害国家荣誉和利益的</li>
                    <li>煽动民族仇恨、民族歧视，破坏民族团结的</li>
                    <li>破坏国家宗教政策，宣扬邪教和封建迷信的</li>
                    <li>散布谣言，扰乱社会秩序，破坏社会稳定的</li>
                    <li>散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的</li>
                    <li>侮辱或者诽谤他人，侵害他人合法权益的</li>
                    <li>含有法律、行政法规禁止的其他内容的</li>
                </ul>
                <p>系统会自动删除服务器上的非法文件，并对非法网站上传者进行永久封禁。</p>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import {userService} from '@/common/api';
const extend = function (to, _from) {
    for (const key in _from) {
        to[key] = _from[key];
    }
    return to;
};
export default {
    props: {
        type: {
            type: String,
            default: 'invisible',
        },
        scene: {
            type: [String, Number],
            default: 0,
        },
        vpStyle: {
            type: String,
            default: 'dark',
        },
        color: {
            type: String,
            color: '#3C8AFF',
        },
        lang: {
            type: String,
            default: 'auto',
        },
    },
    data() {
        return {
            loginForm: {
                name: '',
                password: '',
            },
            registerForm: {
                yuankey: '',
                name: '',
                password: '',
                password_confirm: '',
            },
            agreeVisible: false,
            isLogin: true,
        };
    },
    mounted() {
        let self = this;
        var config = extend(
            {
                vid: '5ed51bb4187d2bfd159c033d',
                // container: this.$refs.vaptcha,
                style: self.vpStyle,
            },
            self.$props
        );
        self.loadV2Script().then(() => {
            window.vaptcha(config).then(vaptchaObj => {
                window.vaptchaObj = vaptchaObj;
                this.obj = vaptchaObj;
                self.$emit('input', vaptchaObj);

                vaptchaObj.listen('pass', function () {
                    // 验证成功进行后续操作
                    self.registerForm.token = vaptchaObj.getToken();
                    self.SubmitRegister();
                });
                // 关闭验证弹窗时触发
                vaptchaObj.listen('close', function () {
                    vaptchaObj.reset();
                });
                // obj.render()
            });
        });
    },
    methods: {
        goRegister() {
            const container = document.getElementById('container');
            container.classList.add('right-panel-active');
            this.isLogin = false;
        },
        goLogin() {
            const container = document.getElementById('container');
            container.classList.remove('right-panel-active');
            this.isLogin = true;
        },
        submitLogin(form) {
            userService
                .UserLogin(form)
                .then(res => {
                    if (res.code > 0) {
                        this.$message({
                            type: 'warning',
                            message: `登录失败，${res.msg}`,
                            center: true,
                        });
                    } else {
                        this.$router.push({name: 'Me'});
                        this.$message({
                            type: 'success',
                            message: `${res.data.user.name} 您好,欢迎进入控制台`,
                            center: true,
                        });
                    }
                })
                .catch(error => {
                    this.$message({
                        type: 'warning',
                        message: `错误 请检查，${error}`,
                        center: true,
                    });
                });
        },
        checkEmptyValues(registerForm) {
            for (let key in registerForm) {
                if (registerForm.hasOwnProperty(key)) {
                    if (registerForm[key] === '') {
                        return true; // 存在空值
                    }
                }
            }
            return false; // 不存在空值
        },
        handleLoginSubmit() {
            const loginParams = this.loginForm;
            const hasEmptyValues = this.checkEmptyValues(loginParams);
            if (hasEmptyValues) {
                this.$message({
                    type: 'warning',
                    message: '有选项未填写，请检查~',
                    center: true,
                });
                return;
            }
            this.submitLogin(loginParams);
        },
        handleRegisterSubmit() {
            const hasEmptyValues = this.checkEmptyValues(this.registerForm);
            if (hasEmptyValues) {
                this.$message({
                    type: 'warning',
                    message: '有选项未填写，请检查~',
                    center: true,
                });
                return;
            }
            if (this.registerForm.password !== this.registerForm.password_confirm) {
                this.$message({
                    type: 'warning',
                    message: '两次输入密码不一致，请检查~',
                    center: true,
                });
                return;
            }
            window.vaptchaObj.validate();
        },
        SubmitRegister() {
            // window.vaptchaObj.validate();
            userService
                .UserRegister(this.registerForm)
                .then(res => {
                    if (res.code > 0) {
                        this.$notify.error({
                            title: '注册失败 请核对',
                            message: res.msg,
                        });
                        window.vaptchaObj.reset();
                    } else {
                        this.$alert('', '注册成功', {
                            confirmButtonText: '点击登录',
                            message: '您的个人站网址为 https://' + '.xydh.fun' + this.registerForm.name,
                            type: 'success',
                            callback: () => {
                                this.$router.push({name: 'ULogin'});
                            },
                        });
                    }
                })
                .catch(error => {
                    this.$notify.error({
                        title: '错误 请检查',
                        message: error,
                    });
                    window.vaptchaObj.reset();
                });
        },
        loadV2Script() {
            if (typeof window.vaptcha === 'function') {
                // 如果已经加载就直接放回
                return Promise.resolve();
            } else {
                return new Promise(resolve => {
                    var script = document.createElement('script');
                    script.src = 'https://v.vaptcha.com/v3.js';
                    script.async = true;
                    script.onload = script.onreadystatechange = function () {
                        if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
                            resolve();
                            script.onload = script.onreadystatechange = null;
                        }
                    };
                    document.getElementsByTagName('head')[0].appendChild(script);
                });
            }
        },
    },
};
</script>

<style lang="less" scoped>
    section {
        position: absolute;
        width: 100vw;
        height: 100%;
        min-height: 600px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        overflow: hidden;
        background: #000;
    }
    section * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    section::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(#000, #0f0, #000);
        animation: animate 5s linear infinite;
    }
    @keyframes animate {
        0% {
            transform: translateY(-100%);
        }
        100% {
            transform: translateY(100%);
        }
    }
    section .backgroundSpan {
        position: relative;
        display: block;
        width: calc(6.25vw - 2px);
        height: calc(6.25vw - 2px);
        background: #181818;
        z-index: 2;
        transition: 1.5s;
        margin-bottom: 2px;
    }
    section .backgroundSpan:hover {
        background: #0f0;
        transition: 0s;
    }
    @media (max-width: 900px) {
        section .backgroundSpan {
            width: calc(10vw - 2px);
            height: calc(10vw - 2px);
        }
    }
    @media (max-width: 600px) {
        section .backgroundSpan {
            width: calc(20vw - 2px);
            height: calc(20vw - 2px);
        }
    }
    section .signin {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #222;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 9);
    }
    section .signin .content {
        position: relative;
        width: 100%;
        height: 100%;
    }
    section .signin .content h2 {
        font-size: 2em;
        color: #0f0;
    }
    section .signin .content .form {
        width: 100%;
        display: flex;
        flex-direction: column;
        // gap: 25px;
    }
    section .signin .content .form .inputBox {
        width: 100%;
        position: relative;
    }
    section .signin .content .form .inputBox input {
        position: relative;
        width: 100%;
        background: #333;
        border: none;
        outline: none;
        padding: 25px 10px 7.5px;
        border-radius: 4px;
        color: #fff;
        font-weight: 500;
        font-size: 1em;
        &:-internal-autofill-previewed,
        &:-internal-autofill-selected {
            -webkit-text-fill-color: #808080;
            transition: background-color 1000s ease-out 0.5s;
        }
    }

    section .signin .content .form .inputBox span {
        position: absolute;
        left: 0;
        top: 0;
        padding: 15px 10px;
        font-style: normal;
        color: #aaa;
        transition: 0.5s;
        pointer-events: none;
        white-space: nowrap;
        font-size: 14px;
    }
    .signin .content .form .inputBox input:focus ~ span,
    .signin .content .form .inputBox input:valid ~ span {
        transform: translateY(-7.5px);
        font-size: 0.8em;
        color: #fff;
    }
    .signin .content .form .links {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        a {
            color: #0f0;
            font-weight: 600;
            text-decoration: none;
            cursor: pointer;
        }
    }
    .signin .content .form .inputBox input[type='submit'] {
        padding: 10px;
        background: #0f0;
        color: #000;
        font-weight: 600;
        font-size: 1.35em;
        letter-spacing: 0.05em;
        cursor: pointer;
        position: absolute;
        bottom: 0;
    }
    .submitButton {
        position: relative;
        width: 100%;
        border: none;
        outline: none;
        border-radius: 4px;
        padding: 10px;
        background: #0f0;
        color: #000;
        font-weight: 600;
        font-size: 1.35em;
        letter-spacing: 0.05em;
        cursor: pointer;
        position: absolute;
        bottom: 0;
        text-align: center;
        margin: 8px 0;
    }
    .zhucexieyibutton {
        position: absolute;
        bottom: -23px;
        color: #fff;
        right: 0;
        font-size: 14px;
        cursor: pointer;
    }
    input[type='submit']:active {
        opacity: 0.6;
    }

    h1 {
        font-weight: bold;
        margin: 0;
        font-size: 28px;
    }

    h2 {
        text-align: center;
    }
    h3 {
        font-size: 16px;
        letter-spacing: 2px;
    }
    p {
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.5px;
        margin: 20px 0 30px;
    }

    input {
        background-color: #eee;
        border: none;
        padding: 12px 15px;
        margin: 8px 0;
        width: 100%;
    }

    .container {
        border-radius: 10px;
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
        position: absolute;
    }
    .pc {
        position: relative;
        overflow: hidden;
        width: 768px;
        max-width: 100%;
        min-height: 480px;
        border-radius: 4px;

    }
    .form-container {
        position: absolute;
        top: 0;
        height: 100%;
        transition: all 0.6s ease-in-out;
    }

    .register-container {
        left: 0;
        width: 50%;
        z-index: 2;
    }

    .container.right-panel-active .register-container {
        transform: translateX(100%);
    }

    .login-container {
        left: 0;
        width: 50%;
        opacity: 0;
        z-index: 1;
    }

    .container.right-panel-active .login-container {
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
        animation: show 0.6s;
    }

    @keyframes show {
        0%,
        49.99% {
            opacity: 0;
            z-index: 1;
        }

        50%,
        100% {
            opacity: 1;
            z-index: 5;
        }
    }

    .overlay-container {
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        overflow: hidden;
        transition: transform 0.6s ease-in-out;
        z-index: 100;
    }

    .container.right-panel-active .overlay-container {
        transform: translateX(-100%);
    }

    .overlay {
        background: #ff416c;
        background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
        background: linear-gradient(to right, #ff4b2b, #ff416c);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 0 0;
        color: #ffffff;
        position: relative;
        left: -100%;
        height: 100%;
        width: 200%;
        transform: translateX(0);
        transition: transform 0.6s ease-in-out;
    }

    .container.right-panel-active .overlay {
        transform: translateX(50%);
    }

    .overlay-panel {
        position: absolute;
        padding: 30px;
        text-align: left;
        top: 0;
        height: 100%;
        width: 50%;
        transform: translateX(0);
        transition: transform 0.6s ease-in-out;
    }

    .overlay-left {
        transform: translateX(-20%);
    }

    .container.right-panel-active .overlay-left {
        transform: translateX(0);
    }

    .overlay-right {
        right: 0;
        transform: translateX(0);
    }

    .container.right-panel-active .overlay-right {
        transform: translateX(20%);
    }
    .h5 {
        position: relative;
        overflow: hidden;
        width: 375px;
        min-height: 480px;
        display: none;
        border-radius: 4px;
    }
    @media screen and (max-width: 768px) {
        .h5 {
            display: block;
        }
        .pc {
            display: none;
        }
        /deep/.el-dialog {
            width: 80%;
            .xieyi {
                height: 400px;
            }
        }
    }
    .xieyi {
        height: 500px;
        overflow: auto;
    }
    .loginAbout{
        margin-top: 70px;
        color: #bbbbbb;
    }
    .registerAbout{
        color: #bbbbbb;
    }
    .bottomArea{
        position: absolute;
        bottom: 38px;
        left: 30px;
        .logo{
        height: 40px;
        display: flex;
        align-items: center;
        font-size: 25px;
        letter-spacing: 1px;
        color: #88C666;
    font-weight: bold;
        img{
            height: 100%;
            margin-right: 10px;
        }
    }
    .info{
        color: #bbbbbb;
        letter-spacing: 1px;
        font-size: 12px;
        margin-top: 5px;
    }
    }

</style>
