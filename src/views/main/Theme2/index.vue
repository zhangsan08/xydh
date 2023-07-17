<template>
    <div class="bg">
        <div v-show="activeDock==='home'">
            <Title/>
            <Search :showDefaultSearchBox="true"/>
        </div>
        <div v-show="activeDock==='site'">
            <SiteShow/>
        </div>
        <Dock @dock-click="dockClick"/>
    </div>
</template>

<script>
import Dock from '@/components/Dock.vue';
import Title from '@/components/Title.vue';
import SiteShow from '@/components/SiteShow/index.vue'
import Search from '@/components/Search/index.vue';

export default {
    components: {
        Dock,
        Title,
        SiteShow,
        Search

    },
    data() {
        return {
            activeDock: 'home'
        }
    },
    methods: {
        dockClick(key) {
            this.activeDock = key
            console.log(key);

        }
    }
}
</script>

<style scoped lang="less">
 @import './index.less';
</style>