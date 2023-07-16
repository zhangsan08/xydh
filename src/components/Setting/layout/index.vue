<template>
    <div class="layout">
        <div class="card selectLayout">
            <div class="layoutItem">
                <img src="~@/assets/jingdian.png"  alt="赞赏码" class="isChecked"/>
                <span>经典主题</span>
            </div>
            <div class="layoutItem">
                <img src="~@/assets/jijian.png"  alt="赞赏码" />
                <span>极简主题</span>
            </div>
        </div>
        <div class="card felx">
            <div>足迹开关</div>
            <el-switch
                v-model="value"
            >
            </el-switch>
        </div>
        <div class="card felx">
            <div>书签文字居中</div>
            <el-switch
                v-model="value"
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
            value: true
        };
    },

    mounted() {},
    methods: {},
};
</script>

<style lang="less">
    @import './index.less';
    @import '../index.less';
</style>
