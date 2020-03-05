<template>
    <div>
        当前用户: {{ username }}
        用户id: {{ userid }}
        <el-form :model="SiteForm">
            <el-form-item label="站点名">
                <el-input type="text" v-model="SiteForm.name" minlength="2" maxlength="10"></el-input>
            </el-form-item>
            
            <el-form-item label="站点简介">
                <el-input type="text" v-model="SiteForm.info" minlength="0" maxlength="100"></el-input>
            </el-form-item>
            
            
            <el-form-item>
                <el-button type="primary" @click="updateSite()">更新站点信息</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>

import * as UserAPI from '@/api/user/'
import * as SiteAPI from '@/api/site/'

export default {
    data() {
        return {
            userid: 0,
            username: "未登录",
            LoginCode: -1,
            SiteForm: {
                name: "123",
                info: "123",
            },
        }
    },
    methods: {
        getUser(){
            UserAPI.UserMe().then((res) => {
                this.LoginCode = res.code
                if (this.LoginCode > 0) {
                    alert("未登录")
                    this.$router.push({name:'Home'})
                }else{  
                    this.userid = res.data.id
                    this.username = res.data.name
                    this.getSite()
                }
            })
        },
        getSite(){
            SiteAPI.getSitebyID(this.userid).then((res) =>{
                this.SiteForm.name = res.data.name
                this.SiteForm.info = res.data.info
            })
        },
        updateSite(){
            SiteAPI.updateSite(this.SiteForm).then((res) =>{
                if (res.code > 0) {
                    this.$notify.error({
                    title: "更新失败",
                    message: res.msg
                    });
                } else {
                    // API.currentUser = res.data.name
                    // console.log("用户"+API.currentUser+"登入")
                    this.$router.push({name:'SetSite'})
                    this.$notify({
                    title: "信息已更新😊",
                    message: `${res.data.name}您好，进入后台管理页面`,
                    type: "success",
                    });
                }
            })
        }
    },
    components:{

    },
    beforeMount() {
        this.getUser()
    }
}

</script>