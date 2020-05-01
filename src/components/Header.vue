<template>
<div class="header">
    <div style="text-align:right;">
        <a href="/Me" target="_blank">定制 | 登录</a>
    </div>
    <!-- 天气 -->
    <div class="weather" id="he-plugin-simple"></div>
    <div class="paomadeng">
        <el-carousel  indicator-position="none" arrow="always" direction="vertical" height="25px">
            <el-carousel-item v-for="item in data" :key="item.name">
                {{ item.name }}
            </el-carousel-item>
        </el-carousel>
    </div>
    
</div>
</template>

<script>
export default {
    data(){
        return{
            data: [
                {"name":"欢迎网罗灯下黑的粉丝!"},
            ]
        }
    },
}
</script>

<style scoped>
/* .header {
    background-color: black;
    left: -10px;
    margin: -10px -10px 0 -10px;
} */
/* 跑马灯内容 */
.el-carousel__item {
    font-size: 13px;
    line-height: 13px;
}
.paomadeng {
    /* background-color: black; */
    margin: -13px auto;
	max-width: 300px;
}
</style>