<template>
    <div>
        <!-- <el-divider content-position="center">书签导入</el-divider>
        <el-divider content-position="center">开发ing</el-divider>
        <el-upload
            class="upload"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">导入书签，将Chrome浏览器导出的html文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">仅限赞助用户</div>
        </el-upload> -->
        <el-divider content-position="center">密码修改</el-divider>
        <div class="pwdForm">
            <el-form :model="pwdForm" status-icon ref="pwdForm" label-width="100px">

                <el-form-item label="密码">
                    <el-input type="password" v-model="pwdForm.password" autocomplete="off" minlength="6"
                              maxlength="40"></el-input>
                </el-form-item>

                <el-form-item label="确认密码">
                    <el-input type="password" v-model="pwdForm.password_confirm" autocomplete="off" minlength="6"
                              maxlength="40"></el-input>
                </el-form-item>

                <el-popconfirm confirmButtonText='OK' cancelButtonText='取消' icon="el-icon-info" iconColor="red"
                               title="确定更改密码吗" @confirm="updatePWD()">
                    <el-button slot="reference" type="primary">更改密码</el-button>
                </el-popconfirm>

            </el-form>

        </div>
    </div>

</template>

<script>
import {userService} from '@/common/api'
// import * as API from "@/api/user/";

export default {
    data() {
        return {
            pwdForm: {
                password: "",
                password_confirm: "",
            },
        };
    },
    methods: {
        updatePWD() {
            userService.UserUpdate(this.pwdForm).then((res) => {
                if (res.code > 0) {
                    this.$notify.error({
                        title: "更改失败",
                        message: res.msg
                    });
                } else {
                    userService.UserLogout({noQs: false})
                    this.$router.push({name: 'ULogin'})
                    this.$notify({
                        title: "更改成功!",
                        message: "请重新登录",
                        type: "success",
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
    },
    beforeMount() {

    },
};
</script>


<style scoped>
.upload {
    margin: 20px auto 50px;
}

.pwdForm {
    min-width: 200px;
    max-width: 400px;
    margin: 0 auto;
}
</style>