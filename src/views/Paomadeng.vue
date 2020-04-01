<template>
    <div class="paomadeng">
        <el-carousel :interval="6000" indicator-position="none" height="100px" arrow="always">
            <el-carousel-item v-for="item in data" :key="item.name">
                <a :href="item.url" target="_blank" >{{ item.name }}</a>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data: [
                {"name":"炫猿导航 王者归来","url":""},
                {"name":"自定义背景功能氪命开发中(最近有点忙)","url":""},
                {"name":"虚位以待","url":""},
            ]
        }
    },
}
</script>

<style scoped>
/* 跑马灯内容 */
.el-carousel__item {
    /* color: white; */
    font-size: 13px;
    line-height: 100px;
    margin: 0;
}
.paomadeng {
	margin: 100px auto 0;
	max-width: 800px;
}
</style>