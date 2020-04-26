<template>
<div>
    <!-- 按钮 -->
    <div class="talkbtn" @click="draweSwitch = true"><i class="fa fa-commenting"></i></div>
    <!-- 线报床体 -->
    <el-drawer
        title="实时线报"
        :visible.sync="draweSwitch"
        direction="rtl"
        size="40%"
        :withHeader="false"
    >
        <!-- talk内容 -->
        <div class="talkbox">
            留言模块氪命开发中...
        </div>
    </el-drawer>

</div>

</template>

<script>
  export default {
    data() {
      return {
        draweSwitch: false,
      };
    },
    methods: {
    }
  };
</script>

<style>
    .talkbox {
        /* max-width: 800px; */
        /* height: 100; */
        color: black;
    }
    .talkbtn {
        /* 通用 */
        width: 20px;
        font-size: 14px;
        font-weight:500;
        margin: 10px auto;
        padding: 5px 5px;
        cursor: pointer;
        position:fixed;
        box-shadow: 0 0 5px #666;
        border-radius: 5px;
        text-align: center;
        right: -4px;
        /* 定制 */
        bottom: 200px;
        background: rgb(18, 173, 240);
        /* border: 2px solid red; */
        color:white;
    }
    .talkbtn :hover{
      color:yellow;
    }
</style>>