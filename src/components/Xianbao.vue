<template>
<div>
    <!-- 按钮 -->
    <div class="xianbaobtn" @click="drawer = true">实时线报</div>
    <!-- 线报床体 -->
    <el-drawer
        class="xianbaobox"
        title="实时线报"
        :visible.sync="drawer"
        direction="ltr"
        size="40%"
        :withHeader="false"
    >
        <div class="">
            <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                <li v-for="i in count" :key="i" class="infinite-list-item">线报{{ i }}</li>
            </ul>
        </div>
    </el-drawer>

</div>

</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
        count: 0,
      };
    },
    methods: {
      load () {
          if (this.count<40){
            this.count += 2
          }
      }
    }
  };
</script>

<style>
    .xianbaobox {
        min-width: 600px;
        /* height: 10; */
    }
    .xianbaobtn {
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
    .xianbaobtn :hover{
      color:yellow;
    }
</style>>