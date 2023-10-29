<template>
    <div class="layout">
        <!-- <div class="card selectLayout">
            <div class="layoutItem" @click="handelTheme(3)">
                <img src="~@/assets/jingdian.png"  alt="经典主题" :class="{ 'isChecked': themeType===3 }"/>
                <span>经典主题</span>
            </div>
            <div class="layoutItem" @click="handelTheme(1)">
                <img src="~@/assets/jijian.png"  alt="极简主题" :class="{ 'isChecked': themeType===1 }"/>
                <span>极简主题</span>
            </div>
        </div> -->
        <div class="card felx">
            <div>搜索框圆角</div>
            <el-switch
                v-model="searchBoxFillet"
                @change="(v)=>handel(v,'searchBoxFillet')"
            >
            </el-switch>
        </div>
        <div class="card felx">
            <div>足迹开关</div>
            <el-switch
                v-model="showHistory"
                @change="(v)=>handel(v,'showHistory')"
            >
            </el-switch>
        </div>
        <div class="card felx">
            <div>书签文字居中</div>
            <el-switch
                v-model="lineTextCenter"
                @change="(v)=>handel(v,'lineTextCenter')"
            >
            </el-switch>
        </div>
        <div class="card felx">
            <div>显示书签图标</div>
            <el-switch
                v-model="showLineIcon"
                @change="(v)=>handel(v,'showLineIcon')"
            >
            </el-switch>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Layout',
    props: {
        // visible: {
        //     type: Boolean,
        //     default: false,
        // },
    },
    data() {
        return {
            searchBoxFillet: this.$store.state.userConfig.searchBoxFillet,
            showHistory: this.$store.state.userConfig.showHistory,
            lineTextCenter: this.$store.state.userConfig.lineTextCenter,
            showLineIcon: this.$store.state.userConfig.showLineIcon,
            themeType: this.$store.state.userConfig.themeType,
        };
    },

    mounted() {},
    methods: {
        handel(v, type) {
            this.$store.commit('updateUserConfig', {[type]: v});
        },
        handelTheme(type) {
            console.log(type);
            this.themeType = type
            this.$store.commit('updateUserConfig', {themeType: type});
        }
    },
};
</script>

<style lang="less">
    @import './index.less';
    @import '../index.less';
</style>
