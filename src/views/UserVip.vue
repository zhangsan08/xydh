<template>

<div class="vip">
    <h3>卡密兑换</h3>
    <el-form :model="VipForm" status-icon  label-width="100px">
        <el-form-item>
            您要充值的账号id为: {{ username }}
        </el-form-item>
        <el-form-item >当前最大文件夹容量: {{ maxf }}</el-form-item>
        <el-form-item>当前最大书签容量: {{ maxl }}</el-form-item>
        <el-form-item>是否去除猿选文件夹: {{ rmad }}</el-form-item>
        <el-form-item label="输入兑换卡密">
            <el-col span="18"><el-input type="text" placeholder="" v-model="VipForm.key"></el-input></el-col>
            <el-col span="4"><el-button type="primary" @click="Use()">兑换</el-button></el-col>
        </el-form-item>
    </el-form>
</div>
    
</template>

<script>
// import * as UserAPI from '@/api/user/'

import { userService } from '@/common/api'

export default {
    data() {
        return {
            userID: 0,
            username: "未登录",
            LoginCode: -1,
            VipForm:{
                key: "",
            },
            maxf: 0,
            maxl: 0,
            rmad: 0,
        }
    },
    methods: {
        getUser(){
            // 判断登录状态,若登录则取出当前userID和userName
            userService.UserMe().then((res) => {
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
                    this.maxf = res.data.max_folder
                    this.maxl = res.data.max_link
                    this.rmad = res.data.rm_ad
                }
            })
        },
        Use(){
            userService.UserVip(this.VipForm).then((res) => {
                if (res.code > 0) {
                    this.$notify.error({
                    title: "兑换失败",
                    message: res.msg
                    });
                }else{  
                    this.$notify({
                        title: "兑换成功!",
                        message: `感谢您的支持了!`,
                        type: "success",
                    });
                    this.username = res.data.name
                    this.maxf = res.data.max_folder
                    this.maxl = res.data.max_link
                    this.rmad = res.data.rm_ad
                }
            })
        },
    },
    beforeMount(){
        this.getUser()
    }
}
</script>

<style scoped>
.vip { 
    min-width: 200px;
    max-width: 400px;
    min-height: 400px;
    margin: 120px auto 300px;
}
</style>