<template>
    <div class="siteForm">
        <p>热度: {{ userview }} [后期推出排行榜功能]</p>
        <el-form :model="SiteForm">
            <el-form-item label="站点名">
                <el-input type="text" v-model="SiteForm.name" minlength="2" maxlength="10" placeholder="2-10字符"></el-input>
            </el-form-item>
            
            <el-form-item label="站点简介">
                <el-input type="text" v-model="SiteForm.info" minlength="0" maxlength="100" placeholder="可为空"></el-input>
            </el-form-item>
            
            <el-popconfirm confirmButtonText='OK' cancelButtonText='取消' icon="el-icon-info" iconColor="red" title="确定更新站点信息吗" @onConfirm="updateSite()">
                <el-button slot="reference" type="primary">更新站点信息</el-button>
            </el-popconfirm>
        </el-form>
        <el-divider content-position="center">更多定制化功能开发ing</el-divider>
        <el-divider content-position="center">欢迎提出你的意见</el-divider>
    </div>
    
</template>

<script>

// import * as UserAPI from '@/api/user/'
import * as SiteAPI from '@/api/site/'

export default {
    props:["userID"],
    data() {
        return {
            uid: "",
            userview: 0,
            SiteForm: {
                name: "",
                info: "",
            },
        }
    },
    methods: {
        getSite(){
            this.uid = this.userID,
            SiteAPI.getSitebyID(this.uid).then((res) =>{
                this.SiteForm.name = res.data.name
                this.SiteForm.info = res.data.info
                this.userview = res.data.view
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
                    this.$router.push({name:'Me'})
                    this.$notify({
                    title: "更新完成😊",
                    // message: `${res.data.name}您好，进入后台管理页面`,
                    type: "success",
                    });
                }
            })
        }
    },
    components:{

    },
    // created(){
    //     console.log("创建完成：");
    //     // this.getSite()
    // },
    // beforeMount() {
    //     console.log("挂载前：");
    //     // this.getSite()
    // },
    // mounted() {
    //     console.log("挂载完成：");
    //     // this.getSite()
    // },
    watch: {
        userID: function() {
            this.uid = this.userID,
            this.getSite()
        },
    }
}

</script>

<style scoped>
.siteForm {
    min-width: 400px;
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
}
</style>