<template>
    <div class="siteForm">
        <!-- <p>热度: {{ userview }} [后期推出排行榜功能]</p> -->
        <el-form :model="SiteForm" label-width="100px" label-position="right">
            <el-form-item label="站点名">
                <el-input type="text" v-model="SiteForm.name" minlength="2" maxlength="10" placeholder="2-10字符"></el-input>
            </el-form-item>
            
            <el-form-item label="站点简介">
                <el-input type="text" v-model="SiteForm.info" minlength="0" maxlength="100" placeholder="可为空"></el-input>
            </el-form-item>

            <el-form-item label="顶部开关">
                <el-switch v-model="SiteForm.btn_switch" active-color="#13ce66" inactive-color="#ff4949" active-text="显示" inactive-text="隐藏">
                </el-switch>
                <div style="font-size:12px">关闭后可从主站进入控制台</div> 
            </el-form-item>

            <el-form-item label="自定义背景">
                <el-switch
                v-model="SiteForm.bg_switch" active-color="#13ce66" inactive-color="#ff4949" active-text="图片背景" inactive-text="纯色背景">
                </el-switch>
                 <div v-if="SiteForm.bg_switch">
                    <span style="color:red;font-size:12px;line-height:13px">推荐使用炫猿首页中的"聚合图床" 速度较快</span>
                    <el-input type="text" v-model="SiteForm.bg" minlength="0" maxlength="100" placeholder="请自行选择图床上传背景图片 不填则是默认"></el-input>
                    <!-- <el-button disabled="">背景图拉伸方式</el-button> -->
                    <a target='_blank' rel='nofollow' href='https://support.qq.com/products/106426/faqs/62946'>怎么自定义背景图片?</a>
                </div>
                <div v-else>
                    <el-color-picker v-model="SiteForm.bg_color" :predefine="predefineColors"></el-color-picker>
                </div>
            </el-form-item>
            
            <el-form-item label="字体颜色">
                <el-color-picker v-model="SiteForm.font_color" :predefine="predefineColors"></el-color-picker>
            </el-form-item>

            <el-form-item label="背景特效">
                <el-select v-model="SiteForm.bglizi" placeholder="请选择">
                    <el-option
                    v-for="item in texiao"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="留言板">
                <el-input type="text" v-model="SiteForm.lyb_id" minlength="24" maxlength="24" placeholder=""></el-input>
            </el-form-item>
            
            <el-popconfirm v-if="uid!=7163" confirmButtonText='OK' cancelButtonText='取消' icon="el-icon-info" iconColor="red" title="确定更新站点信息吗" @onConfirm="updateSite()">
                <el-button slot="reference" type="primary">更新站点信息</el-button>
            </el-popconfirm>
        </el-form>
        <el-divider content-position="center">更多定制化功能开发ing</el-divider>
        <el-divider content-position="center">欢迎提出你的意见</el-divider>
    </div>
    
</template>

<script>

// import * as UserAPI from '@/api/user/'
// import * as SiteAPI from '@/api/site/'
import { siteService } from '@/common/api'

export default {
    props:["userID"],
    data() {
        return {
            uid: "",
            userview: 0,
            SiteForm: {
                name: "",
                info: "",
                bg: "",
                btn_switch: "",
                bg_switch: "",
                bg_color: "123123",
                font_color: "",
                bglizi: 0,
                lyb_id: "",
            },
            texiao: [
                {value: 0,label: '关闭'}, 
                {value: 1,label: '繁星点点'},
                {value: 2,label: '科技线条'},
                {value: 3,label: '搞怪猫(会使背景图片失效)'},
                {value: 4,label: '吹气泡(点击生成气泡)'},
            ],
            predefineColors: ['#000000','#ffffff','#ff4500','#ff8c00','#ffd700','#90ee90','#00ced1','#1e90ff','#c71585',],
        }
    },
    methods: {
        getSite(){
            this.uid = this.userID,
            siteService.getSitebyID(this.uid).then((res) =>{
                this.SiteForm.name = res.data.name
                this.SiteForm.info = res.data.info
                this.SiteForm.bg = res.data.bg
                this.SiteForm.btn_switch = res.data.btn_switch
                this.SiteForm.bg_switch = res.data.bg_switch
                this.SiteForm.bg_color = res.data.bg_color
                this.SiteForm.font_color = res.data.font_color
                this.SiteForm.bglizi = res.data.bglizi
                this.SiteForm.lyb_id = res.data.lyb_id
                this.userview = res.data.view
            })
        },
        updateSite(){
            siteService.updateSite(this.SiteForm).then((res) =>{
                if (res.code > 0) {
                    this.$notify.error({
                    title: "更新失败",
                    message: res.msg
                    });
                } else {
                    this.$router.push({name:'Me'})
                    this.$notify({
                    title: "更新完成😊",
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
    beforeMount(){
      console.log(this.uid)
    },
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

<style>
.siteForm {
    min-width: 400px;
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
}
.el-form-item :hover{
    background-color: rgba(0, 0, 0, 0.05);
    /* border-radius: 10px; */
    /* padding: 3px 3px; */
}
/* 搜索框 */
.el-input__inner {
  border-radius: 10px;
  /* border-top-left-radius: 0px; */
  /* border-bottom-left-radius: 0px; */
}
.el-color-dropdown__main-wrapper {
    display:none;
}
.el-color-dropdown__value {
    display: none;
}
</style>