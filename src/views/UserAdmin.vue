<template>

<div class="aadmin">
    <h3>重置用户</h3>
    <div class="pwdForm" style="width:400px">
        <el-form :model="resetForm" status-icon ref="pwdForm" label-width="100px">
            <el-form-item label="用户名">
                <el-input v-model="resetForm.username" ></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="resetForm.password" ></el-input>
            </el-form-item>
            <!-- <el-form-item label="Level">
                <el-input type="number" v-model.number="resetForm.level" ></el-input>
            </el-form-item> -->
            <el-form-item label="Level">
				<el-input-number size="mini" style="width:100px" v-model="resetForm.level"></el-input-number>
			</el-form-item>

            <el-popconfirm confirmButtonText='OK' cancelButtonText='取消' icon="el-icon-info" iconColor="red" title="确定更改密码吗" @onConfirm="resetUser()">
                <el-button slot="reference" type="primary">重置</el-button>
            </el-popconfirm>
            
        </el-form>
    </div>
</div>

</template>

<script>
import { userService } from '@/common/api'
// import * as UserAPI from '@/api/user/'

export default {
    data() {
        return {
            LoginCode: -1,
            resetForm: {
                username: "",
                password: "",
                level: 1,
            },
        }
    },
    methods: {
        getUser(){
            // 判断是不是管理员
            userService.UserMe().then((res) => {
                this.LoginCode = res.code
                if (this.LoginCode > 0 || res.data.level<10) {
                    this.$message({
                        message: '请登录',
                        center: true,
                        showClose: true,
                        type: 'warning'
                    });
                    this.$router.push({name:'ULogin'})
                }
            })
        },
        resetUser(){
            userService.UserReset(this.resetForm).then((res) => {
                if (res.code > 0) {
                    this.$notify.error({
                        title: "重置失败",
                        message: res.msg
                    });
                } else {
                    this.$notify({
                        title: "重置成功!",
                        type: "success",
                    });
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

</style>