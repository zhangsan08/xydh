<template>
    <div class="siteTitle">
        <h2 class="siteName">{{ titleInfo.name }}</h2>
        <h2 class="siteInfo">{{ titleInfo.info }}</h2>
    </div>
</template>
<script>

export default {
    components: {

    },
    props: {
        titleInfo: {
            type: Object,
        },
    },
    data() {
        return {

        };
    },
    methods: {

    }
};
</script>

<style scoped lang="less">
.siteTitle {
    height: 76px;
    min-height: 76px;
    position: relative;
    z-index: 1;
}
.siteName {
    font-size: 36px;
    font-weight: bold;
    padding-bottom: 10px;
}
.siteInfo{
    font-size: 13px;
    font-weight: normal;
    max-width: 80%;
    margin: 0 auto;
}
</style>
