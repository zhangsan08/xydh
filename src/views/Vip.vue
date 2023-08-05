<template>
    <div class="vip">
        <el-row :gutter="20" justify="center">
            <el-col :xs="24" :sm="12">
                <el-card class="card" shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>扩容 | 改名 | 开通VIP</span>
                        <el-button
                            type="text"
                            style="float: right; padding: 13px 15px"
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
        </el-row>
    </div>
</template>

<script>

export default {
    data() {
        return {

        }
    },
    methods: {
        go2() {
            let routeData = this.$router.resolve({path: '/u/vip', query: {}});
            window.open(routeData.href, '_blank');
        },
    },

}
</script>

<style scoped lang="less">
.vip{
.vipCard{
    height: 200px;
    width: 300px;
    color: #ffeaa7;
    background: #1F2029;
}
}
</style>