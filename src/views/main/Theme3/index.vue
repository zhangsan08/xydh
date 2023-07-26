<template>
    <div class="theme3">
        <Header ></Header>
        <SiteTitle :titleInfo="userInfo.titleInfo"/>
        <SiteShow  :userInfo="userInfo"/>
        <!-- 音乐 -->
        <Player :musicList="userInfo.music.list" v-if="userInfo.music.open" />
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '@/components/Header'
import SiteTitle from '@/components/SiteTitle'
import SiteShow from '@/components/SiteShow/index.vue'
import Footer from '@/components/Footer.vue';
import Player from '@/components/Player.vue';
export default {
    components: {
        SiteShow,
        SiteTitle,
        Footer,
        Player,
        Header

    },
    props: {
        userInfo: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
        }
    },
    methods: {

    }
}
</script>

<style scoped lang="less">
 @import './index.less';
</style>