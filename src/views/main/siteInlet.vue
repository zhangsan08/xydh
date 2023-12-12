<template>
    <div class="siteInletaaa">
        <div v-if="isWeiXin" class="wx">
            <img src="~@/assets/share.png" class="logo" alt="logo" />
            更多内容，请点击右上角分享按钮，在默认浏览器打开
        </div>
        <div v-else>
            <div class="hHidden">
                <h1>炫猿,炫猿导航</h1>
                <h2>炫猿,炫猿导航,网址导航,自定义网址导航,定制网址导航,炫猿邀请码,ilinks</h2>
            </div>
            <div class="particle" v-if="userInfo.bglizi > 0">
                <Particle :bglizi="userInfo.bglizi"></Particle>
            </div>
            <div class="siteInlet"></div>
            <InitLoading />
            <div class="mainArea">
                <Theme1 v-if="themeType === 1" :userInfo="userInfo" :userName="userName" />
                <Theme2 v-if="themeType === 2" />
                <Theme3 v-if="themeType === 3" :userInfo="userInfo" />
            </div>
        </div>
    </div>
</template>

<script>
import Theme1 from './Theme1';
import Theme2 from './Theme2';
import Theme3 from './Theme3';
import InitLoading from '@/components/InitLoading.vue';
import {userService} from '@/common/api';
import {helloInit} from '@/common/getTime';
import {getAllLinkDataFunc} from '@/common/mainRequest';
import {isWeiXin} from '@/common/env';
import Particle from '@/components/particle.vue';

export default {
    components: {
        Theme1,
        InitLoading,
        Theme2,
        Theme3,
        Particle,
    },
    data() {
        return {
            userInfo: {},
            userName: '',
            isWeiXin: isWeiXin(),
        };
    },
    computed: {
        themeType() {
            return 1;
        },
    },
    created() {
        helloInit();
    },

    mounted() {
        this.userName = this.$route.params.username;
        if (!this.userName) this.userName = 'admin';
        this.getUserInfo(this.userName);
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
    .particle {
        z-index: -999;
    }
    .mainArea {
        position: relative;
        z-index: 1;
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
    .hHidden {
        height: 0;
        overflow: hidden;
    }
    .wx {
        height: 100vh;
        width: 100%;
        background: #000;
        position: absolute;
        top: 0;
        z-index: 1000;
        color: #000;
        font-size: 16px;
    }
    .wx img {
        width: 100%;
    }
</style>
