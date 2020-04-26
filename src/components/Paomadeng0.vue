<template>
    <div class="paomadeng">
        <el-carousel  indicator-position="none" arrow="always" direction="vertical" height="25px">
            <el-carousel-item v-for="item in data" :key="item.name">
                {{ item.name }}
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data: [
                {"name":"欢迎极简源码的粉丝"},
                {"name":"欢迎喵喵软件屋的粉丝"},
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
    line-height: px;
    margin: 0;
}
.paomadeng {
	margin: 0px auto 0;
	max-width: 800px;
}
</style>