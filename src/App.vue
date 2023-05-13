<template>
    <div style="height:100%;">
        <router-view></router-view>
        <!-- 回到顶端 -->
        <el-backtop></el-backtop>
    </div>
</template>

<script>
export default {
    name: 'App',
    components: {
    },
    mounted() {
        setTimeout(() => {
            // 去除加载标记
            document.getElementsByTagName("body")[0].className = "";
            // 给加载动画添加结束标记
            let loadingBox = document.getElementById("loading-box");
            loadingBox.classList.add("loaded");
        }, 250);
    }
}
</script>

<style>
#app {
      /* 这里给app一个滚动效果 */
    overflow-y: scroll;
}
body {
  font-family: "webfont","Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
li{list-style-type:none;}
a {
  text-decoration: none;
}
</style>
