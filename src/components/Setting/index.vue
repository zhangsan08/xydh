<template>
    <el-drawer
        title="我是标题"
        :visible.sync="visible"
        :with-header="false"
        :direction="ltr"
        :append-to-body="true"
        :modal-append-to-body="false"
        :size="450"
    >
        <el-container>
            <el-header height="86px">
                <div class="logo">
                    <img src="~@/assets/logo.png" class="logo" alt="logo" />
                </div>
                <div class="titleContent">
                    <div class="title">{{activeItem.title}}</div>
                    <div class="info">{{activeItem.info}}</div>
                </div>
            </el-header>
            <el-container>
                <el-aside width="140px">
                    <ul class="d-tabs relative">
                        <li
                            class="d-tabs-item"
                            :class="activeItem.key===item.key?'active':''"
                            v-for="item in settingList"
                            :key="item.key"
                            @click="change(item)"
                        >
                            <div class="setting-aside-item">
                                <i :class="item.icon"></i>
                                <div class="item-title">{{item.title}}</div>
                            </div>
                        </li>
                    </ul>
                </el-aside>
                <el-main>
                    <About/>
                </el-main>
            </el-container>
        </el-container>
    </el-drawer>
</template>
<script>
import About from './about';

export default {
    name: 'Setting',
    components: {
        About,
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
                title: '打开后台',
                info: '打开后台',
                icon: 'el-icon-guide',
                key: '1'
            },
            settingList: [
                {
                    title: '打开后台',
                    info: '打开后台',
                    icon: 'el-icon-guide',
                    key: '1'
                },
                {
                    title: '打开后台1',
                    info: '打开后台1',
                    icon: 'el-icon-guide',
                    key: '2'
                }
            ]
        };
    },

    mounted() {},
    methods: {
        change(item) {
            this.activeItem = item
            console.log(item);

        }
    },
};
</script>

<style lang="less">
    @import './index.less';
</style>
