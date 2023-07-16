<template>
    <div class="account">
        <div class="card">
            <a href="https://xydh.fun/me" class="felx" target="_blank">
                打开后台 <i class="el-icon-top-right"></i></a>
        </div>
        <div class="card">
            <a href="https://xydh.fun/u/register" class="felx" target="_blank">
                注册专属导航 <i class="el-icon-top-right"></i></a>
        </div>
        <div class="card">
            <a href="https://xydh.fun/u/ImportBookmarks" class="felx" target="_blank">
                导入浏览器书签 <i class="el-icon-top-right"></i></a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Account',
    props: {
        // visible: {
        //     type: Boolean,
        //     default: false,
        // },
    },
    data() {
        return {
            value: true,
        };
    },

    mounted() {},
    methods: {},
};
</script>

<style lang="less">
    @import './index.less';
    @import '../index.less';
</style>
