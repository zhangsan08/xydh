<template>
    <div class="bg">
        <div v-show="activeDock==='home'">
            <Time/>
            <Search ref="search" :userInfo="userInfo" :showDefaultSearchBox="false"/>
        </div>
        <div v-show="activeDock==='site'">
            <SiteShow :userInfo="userInfo" :userName="userName"/>
        </div>
        <Dock @dock-click="dockClick"/>
    </div>
</template>

<script>
import Dock from '@/components/Dock.vue';
import Time from '@/components/Time.vue';
import SiteShow from '@/components/SiteShow/index.vue'
import Search from '@/components/Search/index.vue';

export default {
    components: {
        Dock,
        Time,
        SiteShow,
        Search

    },
    props: {
        userInfo: {
            type: Object,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            activeDock: 'home'
        }
    },
    methods: {
        dockClick(key) {
            if (key === 'search') {
                this.$refs.search.souClick();
            } else {
                this.activeDock = key
            }
            console.log(key);

        }
    }
}
</script>

<style scoped lang="less">
 @import './index.less';
</style>