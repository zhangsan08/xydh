<template>
    <div>
        <el-drawer
            title="设置"
            :visible.sync="visible"
            :with-header="false"
            :append-to-body="true"
            :modal-append-to-body="false"
            :size="450"
            @close="close"
        >
            <el-container>
                <el-header height="86px">
                    <div class="logo">
                        <img src="~@/assets/logo.svg" class="logo" alt="logo" />
                    </div>
                    <div class="titleContent">
                        <div class="title">{{ activeItem.title }}</div>
                        <div class="info">{{ activeItem.info }}</div>
                    </div>
                </el-header>
                <el-container>
                    <el-aside width="140px">
                        <ul class="d-tabs relative">
                            <li
                                class="d-tabs-item"
                                :class="activeItem.key === item.key ? 'asideActive' : ''"
                                v-for="item in settingList"
                                :key="item.key"
                                @click="change(item)"
                            >
                                <div class="setting-aside-item">
                                    <i :class="item.icon"></i>
                                    <div class="item-title">{{ item.title }}</div>
                                </div>
                            </li>
                        </ul>
                    </el-aside>
                    <el-main>
                        <Account v-if="activeItem.key === 'account'" />
                        <About v-if="activeItem.key === 'about'" />
                        <Layout v-if="activeItem.key === 'layout'" />
                        <!-- <div class="card" v-if="activeItem.key === 'feedback'">
                            <a href="https://support.qq.com/products/106426/#label=show" class="felx" target="_blank">
                                产品反馈 <i class="el-icon-top-right"></i></a>
                        </div> -->
                    </el-main>
                </el-container>
            </el-container>
        </el-drawer>
    </div>
</template>
<script>
import About from './about';
import Layout from './layout';
import Account from './account';

export default {
    name: 'Setting',
    components: {
        About,
        Layout,
        Account,
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            activeItem: {
                title: '账号',
                info: '注册账号，配置云书签',
                icon: 'el-icon-user',
                key: 'account',
            },
            settingList: [
                {
                    title: '账号',
                    info: '注册账号，配置云书签',
                    icon: 'el-icon-user',
                    key: 'account',
                },
                {
                    title: '布局',
                    info: '配置主题风格',
                    icon: 'el-icon-s-operation',
                    key: 'layout',
                },
                {
                    title: '关于',
                    info: '关于iLinks',
                    icon: 'el-icon-info',
                    key: 'about',
                },
                // {
                //     title: '反馈',
                //     info: '欢迎对iLinks提出建议与意见',
                //     icon: 'el-icon-chat-line-square',
                //     key: 'feedback',
                // },
            ],
        };
    },

    mounted() {},
    methods: {
        change(item) {
            this.activeItem = item;
        },
        close() {
            this.$emit('setting-close');
        },
    },
};
</script>

<style lang="less">
    @import './index.less';
</style>
