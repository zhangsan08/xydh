<template>
    <div class="indexLab">
        <el-page-header @back="switchLab" content="炫猿实验室" title="返回导航">
        </el-page-header>
        <!-- 实验室内容 -->
        <div class="labTabs">
        <el-tabs type="card">
            <el-tab-pane label="热榜">
                优化后回归
                <Hot></Hot>
            </el-tab-pane>
            <el-tab-pane label="公告">
                <br>导航站最新资讯，每日送码，就关注官方公众号【炫技巧】
                <p><img width="150px" src="https://pic.downk.cc/item/5ecfb96ac2a9a83be569795b.png"></p>
            </el-tab-pane>
            <el-tab-pane label="留言板">
                开发中
            </el-tab-pane>
        </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        switchLab(){
            this.$parent.switchLab()
        }
    },
    beforeMount(){
        // alert("123")
    }
}
</script>

<style  scoped>
.indexLab {
    background-color: white;
    min-height: 500px;
    z-index: 999;

    color: black;
    margin: 0 20px;
    padding: 5px 10px;
    
    border-radius: 10px;
}
.closeBtn {
    position:absolute;
    top: 5px;
    right: 30px;
    cursor: pointer;
    font-size: 20px;
}
.labTabs {
    margin: 20px 0px;
}
</style>