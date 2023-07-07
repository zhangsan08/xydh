// 时间组件
<template>
    <div class="title">
        <h2 class="siteName">Sommer</h2>
        <h3 class="siteInfo">Great is the sun, and wide he goes</h3>
        <div class="kontakt">
            <!-- <el-popover
                placement="bottom"
                width="200"
                trigger="click"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
            >
                <img src="~@/assets/qq.png" class="logo" alt="logo" slot="reference"/>
            </el-popover> -->
            <img src="~@/assets/qq.png" class="logo" alt="logo" />
            <img src="~@/assets/github.png" class="logo" alt="logo" />
            <img src="~@/assets/bilibili.png" class="logo" alt="logo" />
            <img src="~@/assets/email.png" class="logo" alt="logo" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'Title',
    data() {
        return {};
    },
    mounted() {},
    methods: {},
};
</script>
<style scoped lang="less">
    .title {
        height: 140px;
        min-height: 140px;
        padding-top: 80px;
        .kontakt {
            display: flex;
            width: 100%;
            height: 20px;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
            img {
                height: 100%;
                margin-right: 13px;
            }
        }
        .siteName {
            font-size: 40px;
            font-weight: bold;
            padding-bottom: 10px;
            letter-spacing: 5px;
        }
        .siteInfo {
            font-size: 14px;
            font-weight: normal;
            letter-spacing: 2px;
        }
    }
</style>
