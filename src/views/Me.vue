<template>
    <div class="me">
        <el-divider>最新通知</el-divider>
        <div class="note">
            <h3>净网行动</h3>
            <li>任意门的上线收到大量举报。对于举报者有奖励。</li> 
          <b>请严查你的书签中是否有违法网站。涉黄涉黑涉政。外网VPN一律禁止。</b>
          <li>很多东西你自己找个地方存好就行了 分享已经构成了违法犯罪<br>炫猿的很多用户都很年轻 希望你们有基础的法制观念</li>
        </div>
        <el-divider></el-divider>
        <h2>您的专属链接</h2>
        <div>
             <i class="fa fa-link"></i>&#160;<el-link style="font-size:24px" type="primary" target="_blank" :href="'/'+username">{{username}}.xydh.fun</el-link>
        </div>
        <p>直接在浏览器地址栏输入，<b>不要加https的前缀</b>。<br>可以加http前缀，如http://{{username}}.xydh.fun<br>访问此链接无需登录，欢迎分享给你的朋友</p>
        <p><a target='_blank' rel='nofollow' href='https://support.qq.com/products/106426/faqs/63457'>关于如何让你的页面被搜索引擎收录</a></p>
        <p>请在个人电脑登录本控制台,否则请<el-button type="" @click="logout" round="">登出</el-button></p>
        <el-tabs type="border-card" :stretch="true">
            <el-tab-pane label="公告">
                <Notice v-if="userID!=7163"></Notice><div v-else>该账号为测试账号。仅用于展示后台功能。使用上有多处限制。</div>
            </el-tab-pane>

            <el-tab-pane label="小站配置">
                <SiteSet :userID=userID></SiteSet>
            </el-tab-pane>

            <el-tab-pane label="文件夹" :lazy="false">
                <FolderSet :userID=userID></FolderSet>
            </el-tab-pane>

            <el-tab-pane label="书签管理" :lazy="false">
                <LinkSet :userID=userID></LinkSet>
            </el-tab-pane>

            <el-tab-pane label="实验室" lazy>
                <Lab></Lab>
            </el-tab-pane>
            
            <el-tab-pane label="账户" v-if="userID!=7163" lazy>
                <Other></Other>
            </el-tab-pane>
        </el-tabs>

        <el-divider>⚠️警告</el-divider>
			<p style="color:red;font-weight:bolder;">为了炫猿长久地发展，请勿上传涉政涉黄涉黑等违法犯罪网站。发现一条永久封号。</p>
            使用本站的服务即同意<a target='_blank' rel='nofollow' href='https://support.qq.com/products/106426/blog/11015'>法律与免责声明</a>
<!-- 			
			<p>排行榜可任意查看用户数据。</p>
			<p>举报者可获得邀请码奖励。</p> -->
        <el-divider></el-divider>
        <!-- 跑马灯 -->
        <el-col :span="24">
            <Paomadeng></Paomadeng>
        </el-col>

    </div>
</template>

<script>
import { userService } from '@/common/api'
// import * as UserAPI from '@/api/user/'
import Notice from './Notice'
import SiteSet from './SiteSet'
import FolderSet from './FolderSet'
import LinkSet from './LinkSet'
import Lab from './ConsoleLab'
import Other from './Other'
import Paomadeng from '@/components/Paomadeng.vue'

export default {
    data() {
        return {
            userID: 0,
            username: "未登录",
            LoginCode: -1,
        }
    },
    methods: {
        getUser(){
            // 判断登录状态,若登录则取出当前userID和userName
            userService.UserMe().then((res) => {
                console.log(res)
                this.LoginCode = res.code
                if (this.LoginCode > 0) {
                    
                    this.$message({
                        message: '请登录',
                        center: true,
                        showClose: true,
                        type: 'warning'
                    });
                    this.$router.push({name:'ULogin'})
                }else{
                    if (res.data.level < 0){
						this.$alert('网络不是不法之地！请珍惜您的账号,账号申诉请联系邮箱 xuanyuandaohang@126.com 上传了非法网站的就不要申诉了', '该账号传播违法信息已被封禁', {
							confirmButtonText: '回主页',
							callback: () => {
                                this.logout()
                                window.location.href="https://xydh.fun"
							}
                        });
						return
					}
                    if (res.data.level == 0){
						this.$alert('请在删除违规书签后联系邮箱 xuanyuandaohang@126.com 申请解封', '你的书签存在违规', {
							// confirmButtonText: '回主页',
							callback: () => {
                                
							}
                        });
					}
                    this.userID = res.data.id
                    this.username = res.data.name
                }
            })
        },
        logout(){
            userService.UserLogout({noQs: false})
            this.$alert('', '注销成功', {
              type: 'success',
              callback: () => {
                this.$router.push({name:'Home'})
              }
            });
        }
    },
    components:{
        Notice,
        SiteSet,
        FolderSet,
        LinkSet,
        Lab,
        Other,
        Paomadeng,
    },
    beforeMount() {
        document.title = "炫猿控制台"
        this.getUser()
    }
}

</script>

<style scoped>
.note {
    background-color:wheat;
    margin: 0 auto;
    padding: 10px;
    border-radius: 20px;
    max-width: 800px;
}
.me { 
    min-width: 800px;
    max-width: 1680px;
    margin: 0 auto;
    text-align: center;
}
</style>