<template>
    <div >
        <div class="siteInlet"></div>
        <InitLoading />
        <Theme1 v-if="themeType === 'Theme1'" :userInfo="userInfo" :userName="userName" />
        <Theme2 v-if="themeType === 'Theme2'" />
        <SiteShow v-if="themeType === 'SiteShow'" />
    </div>
</template>

<script>
import Theme1 from './Theme1';
import Theme2 from './Theme2';
import SiteShow from '@/components/SiteShow/index.vue';
import InitLoading from '@/components/InitLoading.vue';
import {userService} from '@/common/api';
import {helloInit} from '@/common/getTime';
import {getAllLinkDataFunc} from '@/common/mainRequest';

export default {
    components: {
        Theme1,
        SiteShow,
        InitLoading,
        Theme2,
    },
    data() {
        return {
            themeType: '',
            userInfo: {},
            userName: '',
        };
    },
    created() {
        this.userName = this.$route.params.username;
        if (!this.userName) this.userName = 'admin';
        this.getUserInfo(this.userName);
        helloInit();
    },
    mounted() {
        this.themeType = 'Theme2';
    },
    methods: {
        async getUserInfo(id) {
            this.userInfo = await getAllLinkDataFunc(id);
        },
    },
};
</script>

<style lang="less">
    body {
        background-position: center center;
        background-color: black;
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
        z-index: -1;
        text-align: center;
        font-size: 13px;
        color: white;
        margin: 0;
        height: 100vh;
        min-height: 100vh;
    position: fixed;
    width: 100%;
    height: 100%;
    }
    .el-message {
        --el-message-bg-color: #00000040 !important;
        --el-message-text-color: #efefef !important;
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px) !important;
        border-radius: 25px !important;
        border-color: transparent !important;
    justify-content: center;
    min-width: 200px;
        .el-message__badge {
            display: none;
        }
    }
</style>
