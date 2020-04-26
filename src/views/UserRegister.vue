<template>
<div class="reg">
  <p>为了永久地为用户提供服务,炫猿采用邀请码注册制。如果你是自媒体号主,可以联系我获得一部分邀请码进行合作推广:xuanyuandaohang@126.com 请在邮件内容中注明来意</p><p>个人用户请勿联系 邮件太多完全没有时间回复</p>
  <h4>合作预告</h4>
  公众号 极简源码 2020年4月26号18点30分发码 欢迎蹲点<br>
  公众号 喵喵软件屋 2020年4月26号20点20分发码 欢迎蹲点<br>
  <b>公众号 虚拟精华 2020年4月28号18点30分发码 欢迎蹲点（大佬号，量大易抢）</b><br>
  <h4>注册</h4>
    <div class="regform">
      <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px">
          <el-form-item label="邀请码" prop="yuankey">
            <a target='_blank' rel='nofollow' href='http://vip.x-jq.cn/product/4.html'>购买邀请码</a>
              <el-input v-model="registerForm.yuankey" ></el-input>
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
    </div>
    
    <h3>感谢以下科技榜优质自媒体 也欢迎大家关注他们</h3>
    <p>如果你在他们的文章中领取到了邀请码, 也回去给他们留个言、点点在看、或者点点广告都是对他们的支持了!</p>
    <h4>第一梯队</h4>
    <el-table :data="tableData" stripe style="width: 800px">
      <el-table-column prop="date" label="推文日期" width="100"></el-table-column>
      <el-table-column prop="name" label="自媒体" width="180"></el-table-column>
      <el-table-column prop="address" label="推文地址"></el-table-column>
    </el-table>
    <h4>历史合作</h4>
    <el-table :data="tableData2" stripe style="width: 800px">
      <el-table-column prop="date" label="推文日期" width="100"></el-table-column>
      <el-table-column prop="name" label="自媒体" width="180"></el-table-column>
      <el-table-column prop="address" label="推文地址"></el-table-column>
    </el-table>

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
      <p>如果您认为有炫猿用户发布的内容侵犯了您的版权，请与我们联系 xuanyuandaohang@126.com </p>
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
      <p>系统会自动删除服务器上的非法文件，并对非法网站上传者进行永久封禁。</p>

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
      tableData: [
        { date: '2020-04-01', name: '飞雪科技园', address: 'https://mp.weixin.qq.com/s/smnGrN1LC9TCelMEfBTwXQ'}, 
        { date: '2020-04-06', name: '迅哥儿的猹(每日送码)', address: 'https://mp.weixin.qq.com/s/mx9yegGlTmAeIk7V0u_bxA'},
        { date: '2020-04-09', name: '搜罗软件', address: 'https://mp.weixin.qq.com/s/Wy45xiUudv9xBpZwNbHh9Q'},
        { date: '2020-04-15', name: '迅哥(每日送码)', address: 'https://mp.weixin.qq.com/s/ogKgQJQdaLegLEd3hY4poA'},
        { date: '2020-04-18', name: '黑白鲨(每日送码)', address: 'https://mp.weixin.qq.com/s/1GUY-3scqG9L3sf9D9nIDA'},
      ],
      tableData2: [
        { date: '2020-04-25', name: '科技蒙太奇', address: 'https://mp.weixin.qq.com/s/d_iLDoVt_w6tF8-9I-QQ8A'},
        { date: '2020-04-24', name: '拾光小黑屋', address: 'https://mp.weixin.qq.com/s/NsNZFaeYHphUufGOQCtWoQ'},
        { date: '2020-04-24', name: 'APP喵', address: 'https://mp.weixin.qq.com/s/a6UQ0UVowy6nlaMKzDNacg'},
        { date: '2020-04-22', name: '梦十里', address: 'https://mp.weixin.qq.com/s/h9Ll4MrnJKbyBMZDiUvPmQ'},
        { date: '2020-04-22', name: '软件安装猫管家', address: 'https://mp.weixin.qq.com/s/leeBfvqBwdSr4GlwdSaJDQ'},
        { date: '2020-04-22', name: '黑鲨实验室', address: 'https://mp.weixin.qq.com/s/kEpE2hnCBw8jYu7UVmbzqQ'},
        { date: '2020-04-21', name: '软件收藏家', address: 'https://mp.weixin.qq.com/s/FUTrNpN4WnnjUW8ArGEjWg'},
        { date: '2020-04-21', name: 'APP资源君', address: 'https://mp.weixin.qq.com/s/1xel1xgq5TYEZvzBQCsVgQ'},
        { date: '2020-04-20', name: '山猫黑科技', address: 'https://mp.weixin.qq.com/s/LyMrvEeaqsxJLWlV6YOFOA'},
        { date: '2020-04-19', name: '极光玩机', address: 'https://mp.weixin.qq.com/s/Gp07o65VllqVa7fbJ5ySqw'},
        { date: '2020-04-16', name: '软件趣谈', address: 'https://mp.weixin.qq.com/s/dCFcVaHMTfvP1m54FmseTA'},
        { date: '2020-04-13', name: '软件资源共享', address: 'https://mp.weixin.qq.com/s/bEe8RyhEz4V81M_1tEpBOw'},
        { date: '2020-04-11', name: 'Free黑科技', address: 'https://mp.weixin.qq.com/s/LYjAOuwqsjo7vZDRxnb5ig'},
        { date: '2019-10-29', name: '资源分享天地', address: 'https://mp.weixin.qq.com/s/dDub5ELYsTLtoHkyr2SRHw'},
      ],
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
        password_confirm: [{ validator: validatePass2, trigger: "blur" }],
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
.reg { 
  min-width: 400px;
  max-width: 800px;
  margin: 50px auto;
  min-height: 400px;
  text-align: left;
}
.tips{
  color: red;
  font-size: 12px;
  line-height: 15px;
}
.regform {
  width: 400px;
  margin: 0 auto;
}
</style>