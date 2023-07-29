<template>
    <div class="theme3">
        <Header></Header>
        <SiteTitle :titleInfo="userInfo.titleInfo"/>
        <div class="search-area">
            <Search ref="search" :userInfo="userInfo" :showDefaultSearchBox="true"/>
        </div>
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
import Search from '@/components/Search/index.vue';

export default {
    components: {
        SiteShow,
        SiteTitle,
        Footer,
        Player,
        Header,
        Search
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