<template>
    <div>
        <el-row :gutter="20" justify="center">
        <el-col :xs="24" :sm="24">
            <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
                <span>扩容 | 改名 | 开通VIP</span>
                <el-button style="float: right; padding: 13px 15px" type="danger" @click="go('http://vip.x-jq.cn')">购买卡密</el-button>
                <el-button style="float: right; padding: 13px 15px" type="text" @click="go2()">兑换卡密</el-button>
            </div>
            <div>
                <p><b>介绍</b></p>
                由于个人开发服务器能力有限，默认账户下最多可添加8个文件夹和120个书签。
                <li> 使用扩容服务可以永久地增加导航的容量。</li>
                <li> 开通VIP可以永久去除猿选文件夹和底部信息自定义(待上线)。</li>
                <li> 使用改名卡可以获得更心仪的ID与域名。</li>
            </div>
            </el-card>
        </el-col>
        <el-col :xs="24" :sm="12">
            <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
                <span>书签排序</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="go5()">进入该功能</el-button>
            </div>
            <div>
                <p><b>介绍</b></p>
                你们要的书签排序 
                <p><b>使用方法</b></p>
                仅支持电脑端操作 拖动排序 记得点击保存
            </div>
            </el-card>
        </el-col>

        <el-col :xs="24" :sm="12">
            <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                    <span>书签备份</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="go1()">进入该功能</el-button>
                </div>
                <div>
                    <p><b>介绍</b></p>
                    炫猿承诺会永久为大家提供服务。但为了降低由于不可抗力对各位猿友产生的风险, 建议您对精心收藏的书签定期备份, 相信大家的每个书签都是宝贵的数字资源。
                    <p><b>使用方法</b></p>
                    输入用户id，即可以markdown格式的纯文本将该用户的所有书签数据展示。
                </div>
            </el-card>
        </el-col>
        </el-row>
        
    </div>
</template>

<script>
export default {
    methods:{
        go(link){
            window.open(link, '_blank');
        },
        go1(){
            let routeData = this.$router.resolve({ path: '/u/export', query: {   } });
            window.open(routeData.href, '_blank');
        },
        go2(){
            let routeData = this.$router.resolve({ path: '/u/vip', query: {   } });
            window.open(routeData.href, '_blank');
        },
        go5(){
            let routeData = this.$router.resolve({ path: '/l/sort', query: {   } });
            window.open(routeData.href, '_blank');
        },
    }
}
</script>


<style scoped>
.box-card {
    margin: 10px 5px;
    text-align: left;
    height: 280px;
    overflow: auto;
}
</style>