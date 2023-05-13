<template>
    <div>
        <el-row :gutter="20" justify="center">
            <el-col :xs="24" :sm="12">
                <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>抄作业</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="go('/u/copy')">进入该功能</el-button>
                    </div>
                    <div>
                        <p><b>介绍</b></p>
                        偷学武功 && 懒猿福音
                        <p><b>使用方法</b></p>
                        输入用户id，即可将其站内书签导入到自己的小站。（ps,抄谁的作业呢？去<a href="/hgs" target="_blank">花果山</a>看下咯）
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12">
                <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>扩容 | 改名 | 开通VIP</span>
                        <el-button
                            style="float: right; padding: 13px 15px"
                            type="danger"
                            @click="go('https://pr.kuaifaka.net/item/xydh_fun')"
                        >购买卡密
                        </el-button>
                        <el-button style="float: right; padding: 13px 15px" type="text" @click="go2()">兑换卡密</el-button>
                    </div>
                    <div>
                        <p><b>介绍</b></p>
                        <li> 文件夹扩容卡：每次使用增加 10 个</li>
                        <li> 书签扩容卡：每次使用增加 180 个</li>
                        <li> 改名卡：可以获得更心仪的ID与域名。</li>
                        <li> VIP：顶部开关、底部自定义、BMG 歌单</li>
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
                        每个书签都是宝贵的数字资源，本站承诺会永久为大家提供服务。但为了降低由于不可抗力对各位猿友产生的风险, 建议您对精心收藏的书签定期备份。
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
    methods: {
        go(link) {
            window.open(link, '_blank');
        },
        go1() {
            let routeData = this.$router.resolve({path: '/u/export', query: {}});
            window.open(routeData.href, '_blank');
        },
        go2() {
            let routeData = this.$router.resolve({path: '/u/vip', query: {}});
            window.open(routeData.href, '_blank');
        }
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