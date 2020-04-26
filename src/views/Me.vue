<template>
    <div class="me">
        <el-divider>最新通知</el-divider>
        <div class="note">
          <li>书签的名称最大长度改为12</li>
        为所有的去除广告用户增加了一个文件夹, 感谢你们的支持了!<br>
        也感谢所有购买了扩容服务的用户，炫猿会全力为用户打造最好用的浏览器第一站!
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
            <el-tab-pane label="公告" v-if="userID!=7163">
                <Notice></Notice>
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
			<p>为了炫猿长久地发展，请勿上传涉政涉黄涉黑等违法犯罪网站。</p>
			<p style="color:red;font-weight:bolder;">发现一条永久封号。</p>
			<p>排行榜可任意查看用户数据。</p>
			<p>举报者可获得邀请码奖励。</p>
        <el-divider></el-divider>
        <!-- 跑马灯 -->
        <el-col :span="24">
            <Paomadeng></Paomadeng>
        </el-col>

    </div>
</template>

<script>

import * as UserAPI from '@/api/user/'
import Notice from './Notice'
import SiteSet from './SiteSet'
import FolderSet from './FolderSet'
import LinkSet from './LinkSet'
import Lab from './Lab'
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
            UserAPI.UserMe().then((res) => {
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
                    this.userID = res.data.id
                    this.username = res.data.name
                }
            })
        },
        logout(){
            UserAPI.UserLogout()
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