<template>
    <div class="me">
        <p>您的专属链接</p>
        <div>
             <i class="fa fa-link"></i>&#160;<el-link style="font-size:24px" type="primary" target="_blank" :href="'/'+username">{{username}}.xydh.fun</el-link>
        </div>
        <p>访问此链接无需登录，欢迎分享给你的朋友</p>
        <p>请在个人电脑登录本控制台,否则请<el-button type="" @click="logout" round="">登出</el-button></p>
        <el-tabs type="border-card" :stretch="true">
            <el-tab-pane label="公告">
                <Notice></Notice>
            </el-tab-pane>

            <el-tab-pane label="小站配置" :lazy="false">
                <SiteSet :userID=userID></SiteSet>
            </el-tab-pane>

            <el-tab-pane label="文件夹" :lazy="false">
                <FolderSet :userID=userID></FolderSet>
            </el-tab-pane>

            <el-tab-pane label="书签管理" :lazy="false">
                <LinkSet :userID=userID></LinkSet>
            </el-tab-pane>

            <el-tab-pane label="排行榜" disabled="">还没写</el-tab-pane>
            
            <el-tab-pane label="其他">
                <Other></Other>
            </el-tab-pane>
        </el-tabs>

         <div class="notice">
            <el-divider>⚠️警告</el-divider>
			<p>为了炫猿长久地发展，请勿上传涉政涉黄涉黑等违法犯罪网站。</p>
			<p style="color:red;font-weight:bolder;">发现一条永久封号。</p>
			<p>排行榜可任意查看用户数据。</p>
			<p>举报者可获得邀请码奖励。</p>
            <el-divider></el-divider>
		</div>
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
import Other from './Other'
import Paomadeng from './Paomadeng.vue'

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

.me { 
    min-width: 800px;
    max-width: 1680px;
    margin: 0 auto;
    text-align: center;
}
</style>