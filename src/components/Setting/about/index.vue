<template>
    <div class="about">
        <!-- <div class="card">
            <a href="">iLinks官网</a>
        </div> -->
        <div class="title">加入官方社区</div>
        <div class="cards">
            <div class="card">
                <el-popover
                    placement="top-start"
                    title="微信群"
                    width="180"
                    trigger="hover"
                    popper-class="qr"
                >
                    <img src="~@/assets/wxq.jpg" class="logo" alt="wxq" />
                    <div slot="reference">微信群</div>
                </el-popover>
            </div>
            <div class="card">
                <el-popover
                    placement="top-start"
                    title="知识星球"
                    width="180"
                    trigger="hover"
                    popper-class="qr"
                >
                    <img src="~@/assets/zsxq.jpg" class="logo" alt="zsxq" />
                    <div slot="reference">知识星球</div>
                </el-popover>
            </div>
        </div>
        <div class="title">我们活跃在这些平台</div>
        <div class="cards">
            <div class="card">
                <el-popover
                    placement="top-start"
                    title="微信公众号"
                    width="180"
                    trigger="hover"
                    popper-class="qr"
                >
                    <img src="~@/assets/gzh.jpg" alt="gzh" />
                    <div  slot="reference">微信公众号</div>
                </el-popover>
            </div>
            <div class="card">
                <el-popover
                    placement="top-start"
                    width="180"
                    trigger="hover"
                    popper-class="qr"
                    title="Bilibili(点码可直接跳转)"
                >
                    <a href="https://space.bilibili.com/107370169" target="_blank">
                        <img src="~@/assets/bilibili.jpg" class="logo" alt="bilibili" />
                    </a>
                    <div slot="reference">Bilibili</div>
                </el-popover>
            </div>
        </div>
        <div class="title">鼓励作者</div>
        <div class="card zanshang" >
            <div>
                请作者喝杯咖啡
            </div>
            <img src="~@/assets/zanshang.jpg" class="logo" alt="赞赏码" />
        </div>
        <div class="title">关于我们</div>
        <div class="card">
            <div>合作邮箱：xydh@126.com</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'About',
    props: {
        // visible: {
        //     type: Boolean,
        //     default: false,
        // },
    },
    data() {
        return {};
    },

    mounted() {},
    methods: {},
};
</script>

<style lang="less">
    @import './index.less';
    @import '../index.less';
</style>
