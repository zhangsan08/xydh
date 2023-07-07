<template>
    <div class="about">
        <div class="card">
            <a href="">iLinks官网</a>
        </div>
        <div class="card"><a href="">产品反馈</a></div>
        <div class="title">加入官方社区</div>
        <div class="cards">
            <el-popover
                placement="top-start"
                title="微信群"
                width="200"
                trigger="hover"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
            >
                <div class="card" slot="reference">微信群</div>
            </el-popover>
            <el-popover
                placement="top-start"
                title="知识星球"
                width="200"
                trigger="hover"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
            >
                <div class="card" slot="reference">知识星球</div>
            </el-popover>
        </div>
        <div class="title">我们活跃在这些平台</div>
        <div class="cards">
            <el-popover
                placement="top-start"
                title="微信公众号"
                width="200"
                trigger="hover"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
            >
                <div class="card" slot="reference">微信公众号</div>
            </el-popover>
            <el-popover
                placement="top-start"
                title="Bilibili "
                width="200"
                trigger="hover"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
            >
                <div class="card" slot="reference">Bilibili </div>
            </el-popover>
        </div>
        <div class="title">鼓励作者</div>
        <div class="card">请作者喝杯咖啡</div>
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
