<template>

<div class="random">
    <div>
    </div>
</div>

</template>

<script>
import * as UserAPI from '@/api/user/'

export default {
    data() {
        return {
            retCode: 0,
            userID : 0,
            username : 0,
        }
    },
    methods: {
        getRandomUser(){
            // 判断登录状态,若登录则取出当前userID和userName
            UserAPI.UserRandom().then((res) => {
                this.retCode = res.code
                if (this.retCode > 0) {
                    this.$alert('', '有猿无分', {
                        confirmButtonText: '月光宝盒再来一次',
                        message: '该用户已被清理',
                        type: 'warning',
                        callback: () => {
                            window.open('/u/rand','_self')
                        }
                    });
                }else{
                    this.username = res.data.name
                    this.$message({
                        duration: 1500,
                        showClose: true,
                        type: 'success',
                        dangerouslyUseHTMLString: true,
                        message: '猿分啊! 欢迎来到'+this.username+'的小站 <p>发现违法与不良信息请在底部举报</p>',
                    });
                    this.$router.push({ name: 'ShowSite', params: { username: this.username }})
                }
            })
        },
    },
    beforeMount(){
        document.title = "猿分任意门"
        this.getRandomUser()
    }
}
</script>

<style>
/* body {
    background-image: url(https://bing.ioliu.cn/v1/rand);
    background-color: black;
} */
</style>