<template>

<div class="vip">
    <h2>您要充值的账号id为: {{ username }}</h2>
    <el-link style="font-size:20px" target='_blank' rel='nofollow' :href='"https:\/\/xydh.fun/"+username' >{{ username }}.xydh.fun</el-link>
    <h3>卡密兑换</h3>
    <el-form :model="VipForm" status-icon  label-width="100px">
        <el-form-item>
            您要充值的账号id为: {{ username }}
        </el-form-item>
        <el-form-item >当前最大文件夹容量: {{ maxf }}</el-form-item>
        <el-form-item>当前最大书签容量: {{ maxl }}</el-form-item>
        <el-form-item><div v-if="is_vip"><span>VIP到期时间:</span> {{vip_time}}</div><span v-else>未开通 VIP</span></el-form-item>
        <el-form-item label="输入兑换卡密">
            <el-col span="18"><el-input type="text" placeholder="" v-model="VipForm.key"></el-input></el-col>
        </el-form-item>
        <el-form-item><el-col span="4"><el-button type="primary" @click="Use()">兑换</el-button></el-col></el-form-item>
    </el-form>
    <h3>改名</h3>
    <el-form :model="renameForm" status-icon  label-width="100px">
        <el-form-item label="新ID">
            <el-col span="18"><el-input type="text" placeholder="" v-model="renameForm.name"></el-input></el-col>
        </el-form-item>
        <el-form-item label="卡密">
            <el-col span="18"><el-input type="text" placeholder="" v-model="renameForm.key"></el-input></el-col>
        </el-form-item>
        <el-form-item label="">
            <el-col span="4"><el-button type="primary" @click="Rename()">兑换</el-button></el-col>
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
            renameForm:{
                key:"",
                name:"",
            },
            maxf: 0,
            maxl: 0,
            is_vip: 0,
            vip_time: '',
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
                    this.is_vip = res.data.is_vip
                    this.vip_time = res.data.vip_time
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
                    this.is_vip = res.data.is_vip
                    this.vip_time = res.data.vip_time
                }
            })
        },
        Rename(){
            userService.UserRename(this.renameForm).then((res) => {
                if (res.code > 0) {
                    this.$notify.error({
                    title: "兑换失败",
                    message: res.msg
                    });
                }else{  
                    this.$notify({
                        title: "兑换成功!",
                        message: `新名字很霸气！`,
                        type: "success",
                    });
                    this.username = res.data.name
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