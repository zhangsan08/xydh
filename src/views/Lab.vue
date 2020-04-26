<template>
    <div>
        <p>本页面为实验性功能 请在父母的指导下操作</p>
        <p>请不要过度使用本页中的功能 频繁使用者将封号</p>
        <el-row gutter="20" justify="center">
        <el-col span="8"><el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
                <span>书签备份</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="go1()">进入实验室</el-button>
            </div>
            <div>
                <p>介绍</p>
                炫猿承诺会永久为大家提供服务。但为了降低由于不可抗力对各位猿友产生的风险, 建议您对精心收藏的书签定期备份, 相信大家的每个书签都是宝贵的数字资源。
                <p>使用方法</p>
                输入用户id，即可以markdown格式的纯文本将该用户的所有书签数据展示。
            </div>
        </el-card>
        </el-col>
        <el-col span="8"><el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
                <span>扩容\去广告</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="go2()">进入实验室</el-button>
            </div>
            <div>
                <p>介绍</p>
                由于个人开发服务器能力有限，默认账户下最多可添加8个文件夹和120个书签。使用扩容服务可以增加导航的容量。
                去广告可以去除猿选文件夹和底部的滚动播放条。
                <p>使用方法</p>
                在<a target='_blank' rel='follow' href='http://vip.x-jq.cn'>自动售卖机</a>购买卡密后，进入实验室兑换即可。
            </div>
        </el-card>
        </el-col>
        <el-col span="8"><el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
                <span>改名(即将上线)</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="go3()" disabled="">进入实验室</el-button>
            </div>
            <div>
                <p>介绍</p>
                更改id需要进行大批量磁盘读写，所有与该id有关的数据都需要进行写操作，对数据库性能产生大量消耗。因此极少有网站提供更改id的服务。但是有很多猿友提出想更换id以获得更加优雅的域名，故将此功能以增值服务的形式推出。
                <p>使用方法</p>
                敬请期待
            </div>
        </el-card>
        </el-col>
        </el-row>
        
    </div>
</template>

<script>
export default {
    methods:{
        go1(){
            let routeData = this.$router.resolve({ path: '/u/export', query: {   } });
            window.open(routeData.href, '_blank');
        },
        go2(){
            let routeData = this.$router.resolve({ path: '/u/vip', query: {   } });
            window.open(routeData.href, '_blank');
        },
    }
}
</script>


<style scoped>
.box-card {
    text-align: left;
}
</style>