<template>
    <div class="theme1">
        <Time v-show="activeDock==='home'" />
        <div class="search-area" v-show="activeDock==='home'" >
            <Search ref="search" :userInfo="userInfo" :showDefaultSearchBox="true"/>
        </div>
        <keep-alive>
            <SiteShow :userInfo="userInfo" :userName="userName" v-if="activeDock==='site'"/>
        </keep-alive>
        <Setting @setting-close="settingVisible = false" :visible="settingVisible"/>
        <Dock @dock-click="dockClick"/>
    </div>
</template>

<script>
import Dock from '@/components/Dock.vue';
import Time from '@/components/Time.vue';
import SiteShow from '@/components/SiteShow/index.vue'
import Search from '@/components/Search/index.vue';
import Setting from '@/components/Setting';

export default {
    components: {
        Dock,
        Time,
        SiteShow,
        Search,
        Setting
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
            activeDock: 'home',
            settingVisible: false
        }
    },
    methods: {
        dockClick(key) {
            if (key === 'search') {
                this.$refs.search.souClick();
            } else if (key === 'setting') {
                this.settingVisible = true
            } else {
                this.activeDock = key
            }
        }
    }
}
</script>

<style scoped lang="less">
 @import './index.less';
</style>