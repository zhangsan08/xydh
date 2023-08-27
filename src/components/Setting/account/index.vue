<template>
    <div class="account">
        <div class="card">
            <a href="https://xydh.fun/me" class="felx" target="_blank">
                打开后台 <i class="el-icon-top-right"></i></a>
        </div>
        <div class="card">
            <a href="https://xydh.fun/u/login" class="felx" target="_blank">
                注册新账号 <i class="el-icon-top-right"></i></a>
        </div>
        <div class="accountTips">
            后台功能:
            <ul>
                <li>
                    生成个人专属导航，云端同步随时访问
                </li>
                <li>
                    设置主页标题、简介、背景、音乐
                </li>
                <li>
                    文件夹和书签的增删和排序
                </li>
                <li>
                    网站改名、书签文件夹扩容
                </li>
                <li>
                    浏览器书签导入、书签本地导出备份
                </li>
                <li>
                    克隆其他站长网站
                </li>
                <li>
                    订阅其他站长的书签实时同步
                </li>
            </ul>
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
