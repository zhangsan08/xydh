<template>
<div class="drawer">
    <!-- 按钮 -->
    <div class="drawerbtn" @click="draweSwitch = true"><i class="fa fa-bookmark-o"></i></div>
    <!-- 线报床体 -->
    <el-drawer
      title = "实验室"
      :visible.sync = "draweSwitch"
      direction = "rtl"
      size = "90%"
    >
        <!-- talk内容 -->
        <div class="talkbox">
          <el-tabs type="border-card" :stretch="true">
            <el-tab-pane label="公告">
              <b>过几天就把这个标签页删掉。</b> 
            <br>导航站最新资讯，每日送码，就关注官方公众号【炫技巧】
            <p><img width="150px" src="https://pic.downk.cc/item/5ecfb96ac2a9a83be569795b.png"></p>
            
            <el-divider>合作福利</el-divider>
            <!-- <div style="text-align: left; padding: 0 20px; overflow:scroll;"> -->
              
              <li><img width="250" src="https://pic.downk.cc/item/5ecfba55c2a9a83be56a6fee.jpg"></li>
              <li><a target='_blank' rel='nofollow' href='https://m.tb.cn/h.VOkHTQ2'><img width="300px" src="https://pic.downk.cc/item/5ecfbb6dc2a9a83be56bccc0.jpg"></a></li>
              <li><a target='_blank' rel='nofollow' href='https://u.jd.com/lYt94v'><img width="250px" src="https://pic.downk.cc/item/5ecfbd96c2a9a83be56e82dd.jpg"></a></li>
              
            </el-tab-pane>
            <el-tab-pane label="热榜">
                <Hot></Hot>
            </el-tab-pane>
          </el-tabs>
           
            <!-- </div> -->
        </div>
    </el-drawer>

</div>

</template>

<script>
import Hot from '@/views/Hot'

  export default {
    data() {
      return {
        draweSwitch: false,
      };
    },
    methods: {
      
    },
    components:{
        Hot,
    },
  };
</script>

<style>
.el-drawer.rtl {
  overflow: scroll;
}
    .talkbox {
        color: black;
        overflow:scroll;
        /* background-color: white; */
    }
    .drawer li {
      float: left;
    }
    .drawerbtn {
        /* 通用 */
        width: 15px;
        font-size: 14px;
        font-weight:500;
        margin: 10px auto;
        padding: 5px 5px;
        cursor: pointer;
        position:fixed;
        /* box-shadow: 0 0 5px #666; */
        border-radius: 5px;
        text-align: center;
        right: -4px;
        /* 定制 */
        bottom: 200px;
        background: rgb(18, 173, 240);
        /* border: 2px solid red; */
        color:white;
    }
    .drawerbtn :hover{
      color:yellow;
    }
</style>>