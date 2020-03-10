<template>
    <div class="me">
        <!-- <p>当前用户: {{ username }}</p> -->
        <!-- <p>用户id: {{ userID }}</p> -->
        <p>您的专属链接 <a :href="'/'+username" target="_blank">xydh.fun/{{username}}</a></p>
        
        <el-button @click="logout">登出</el-button>
        <div class="notice">
			<p>为了炫猿长久地发展，请勿上传涉政涉黄涉黑等违法犯罪网站。</p>
			<p style="color:red;font-weight:bolder;">发现一条永久封号。</p>
			<p>排行榜可任意查看用户数据。</p>
			<p>举报者可获得邀请码奖励。</p>
		</div>
        <el-tabs type="border-card" :stretch="true">
            <el-tab-pane label="小站配置">
                <SiteSet :userID=userID></SiteSet>
            </el-tab-pane>

            <el-tab-pane label="文件夹" disabled="">none</el-tab-pane>

            <el-tab-pane label="书签管理">
                <LinkSet :userID=userID></LinkSet>
            </el-tab-pane>

            <el-tab-pane label="排行榜" disabled="">还没写</el-tab-pane>
            
            <el-tab-pane label="其他">
                <Other></Other>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

import * as UserAPI from '@/api/user/'
import SiteSet from './SiteSet'
import LinkSet from './LinkSet'
import Other from './Other'

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
        SiteSet,
        LinkSet,
        Other,
    },
    beforeMount() {
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
a:link {color: black}
a:visited {color: black}
a:hover {color: red}
a:active {color: red}
</style>