<template>
<div class="header">
    <!-- 天气 -->
    <div class="weather" id="he-plugin-simple"></div>
    <div style="text-align:right;" class="headerbtn">
        <!-- <div class="btn">
            <span class="tooltip">猿分啊</span>
            <a href="/u/rand" target="_blank">任意门</a>
            </div>
        <div class="btn"><a href="/Me" target="_blank">自定义|登录</a></div> -->
        <!-- <span class="tooltip">123123</span> -->
        <a href="/u/rand" target="_blank">任意门</a>
        <a href="/Me" target="_blank">自定义</a>
    </div>  
    <div class="paomadeng">
        <el-carousel  indicator-position="none" arrow="always" direction="vertical" height="25px">
            <!-- <el-carousel-item>
                公告
            </el-carousel-item> -->
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
                // {"name":"留言板添加方法见上午8点炫技巧推文"},
            ]
        }
    },
}
</script>

<style scoped>
.header {
    margin: 10px 10px;
}
.headerbtn a{
    margin: 5px;
}
/* 跑马灯内容 */
.el-carousel__item {
    font-size: 13px;
}
.paomadeng {
    /* background-color: black; */
    margin: 0 auto;
	max-width: 300px;
    /* height: 100px; */
}
</style>