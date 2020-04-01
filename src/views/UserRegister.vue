<template>
<div class="regForm">
  <p>为了永久地为用户提供服务 炫猿采用邀请码注册制</p>
  <p>邀请码的获取方式 目前考虑使用公众号合作的模式</p>
  <p>如果你是自媒体号主。欢迎联系并注明来意xuanyuandaohang@126.com</p>
  
    <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px">
        <el-form-item label="邀请码" prop="yuankey">
            <el-input v-model="registerForm.yuankey"></el-input>
        </el-form-item>

        <el-form-item label="用户名" prop="name">
            <p class="tips">tips: 用户名将决定您的专属访问链接<br>如用户{{registerForm.name}}的链接为 http://{{registerForm.name}}.xydh.fun/</p>
            <el-input type="text" placeholder="5~15字符 建议使用简短好记的字母组合" v-model="registerForm.name" minlength="5" maxlength="15" show-word-limit></el-input>
        </el-form-item>
        
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="registerForm.password_confirm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-link type="primary"   @click="agreeVisible = true" >请点击阅读用户注册协议</el-link>
        </el-form-item>
        
        <el-form-item>
            <el-button type="primary"   @click="submitForm('registerForm')" >同意用户注册协议并注册</el-button>
            <el-button type="danger"    @click="resetForm('registerForm')"  >重置</el-button>
        </el-form-item>
    </el-form> 

    <el-dialog title="用户注册协议" :visible.sync="agreeVisible">
<h1>炫猿软件服务条款</h1>
<p>感谢您使用炫猿导航。使用我们的服务即表示您已同意本条款。我们始终在不断更改和改进我们的服务。我们可能会增加或删除功能，也可能暂停或彻底停止某项服务。您可以随时停止使用我们的服务，我们也可以随时停止向您提供服务，或随时对我们的服务增加新的限制。如果不同语言的炫猿软件服务条款出现歧义，以简体中文版为准。</p>
<h2>服务的使用</h2>
<p>您必须在法律允许的范围内使用我们的服务。您不可以进行以下操作：</p>
<ul>
<li>使用我们的服务来传输任何非法内容</li>
<li>滥用我们的服务</li>
<li>使用任何方式干扰或破坏我们的服务</li>
<li>对炫猿软件的网络请求进行抓包和编辑</li>
<li>尝试绕过我们的服务的任何限制</li>
<li>尝试使用我们没有公开提供的接口</li>
<li>将炫猿虚拟主机用于建站以外的用途，包括但不限于下载盗版文件、DDoS 攻击、端口扫描、反向代理和爬虫</li>

</ul>
<p>如果您不遵守我们的条款或政策，我们可以暂停或停止向您提供服务。</p>
<h2>炫猿账号</h2>
<p>为了保护您的炫猿账号，请务必保管好您的密码。不要将您的密码告诉他人。您应对自己的炫猿账号上发生的活动或通过该账号进行的活动负法律责。</p>
<h2>隐私与版权</h2>
<p>使用我们的服务即表示您同意炫猿软件按照隐私政策使用您的个人数据。</p>
<p>您不可以盗用炫猿软件的代码，无论是否为商业用途。在未经炫猿授权的情况下，您不可以制作或发行使用炫猿内部接口的应用或网站。您不可以在未经炫猿授权的应用或网站上使用炫猿的服务。</p>
<p>当您使用炫猿虚拟主机时，您不应该复制其它网站的源代码并将其用于您的网站，网站模板除外。您不应该发布任何盗版内容。我们会根据《中华人民共和国著作权法》对涉嫌侵犯版权的内容进行删除，并对屡次侵权者的账户进行封禁。</p>
<p>如果您认为有炫猿用户发布的内容侵犯了您的版权，请<a href='http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&amp;email=J0RPTklGS05fVGdWVglESEo'>与我们联系</a>。</p>
<h2>您在我们服务中发布的内容</h2>
<p>我们的部分服务允许您上传、提交、存储、发送或接收内容。您保留对该内容持有的任何知识产权的所有权。简言之，属于您的内容依然归您所有。</p>
<p>根据国家网信办发布的《互联网信息服务管理办法》，您在我们的服务中上传的内容不得含有下列内容的信息：</p>
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
<p>系统会自动删除服务器上的非法文件，并对非法文件上传者进行永久封禁。</p>

    </el-dialog>
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
      agreeVisible: false,
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
              confirmButtonText: '点击登录',
              message: '您的小站链接为http://'+this.registerForm.name+'.xydh.fun'+'访问此链接无需登录, 方便您查看、分享',
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
  margin: 100px auto 200px;
  min-height: 400px;
}
.tips{
  color: red;
  font-size: 12px;
  line-height: 15px;
}
</style>