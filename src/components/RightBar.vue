<template>
  <div class="right">
    <!-- <el-backtop target="#app" :visibility-height="100"></el-backtop> -->
    
    <div class="nav">
          <a href="/"><i class="el-icon-s-home"></i></a>
          <a href="/Me"><i class="el-icon-user"></i></a>
    </div>

    <div class="btn">
      <el-popover
        placement="top-start"
        title="实时线报爬虫"
        width="150"
        visible-arrow="false"
        trigger="click">
        <div>开发ing</div>
        <p slot="reference" class="xianbao">
          实时线报
        </p>
      </el-popover>
    </div>



  </div>
</template>

<script>
import * as API from '@/api/user/'

  export default {
    name: 'RightBar',
    methods: {
        logout(){
            API.UserLogout()
            // alert('登出')
            this.$alert('即将回到主页', '注销成功', {
              // confirmButtonText: '点击进入控制台',
              type: 'success',
              callback: () => {
                this.$router.push({name:'Home'}).catch(() => { })
              }
            });
        }
    },
  }
</script>

<style>
  .nav{
    position:fixed;
    /* min-height: 1080px; */
    background: rgba(0, 0, 0, 0.5);
    max-width: 40px;
    font-size: 30px;
    color: white;
    text-align: center;
    top: 20px;
    right:30px;
    border-radius: 15px;
    border: 1px solid yellow;
    box-shadow: 0 0 5px #666;
  }

  .btn{
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
  .btn :hover{
    color:yellow;
  }
</style>
