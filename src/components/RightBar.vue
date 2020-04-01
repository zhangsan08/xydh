<template>
  <div class="right">
    <!-- <el-backtop target="#app" :visibility-height="100"></el-backtop> -->
    
    <div class="nav yellow">
          <a href="/"   target="_blank"><i class="el-icon-s-home"></i></a>
          <a href="/Me" target="_blank"><i class="el-icon-user"></i></a>
    </div>
    <!-- <div class="btn">
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
    </div> -->
  </div>
</template>

<script>
import * as API from '@/api/user/'

  export default {
    name: 'RightBar',
    methods: {
        logout(){
            API.UserLogout()
            this.$alert('即将回到主页', '注销成功', {
              // confirmButtonText: '点击进入控制台',
              type: 'success',
              callback: () => {
                this.$router.push({name:'Home'}).catch(() => { })
              }
            });
        }
    },
    components: {
    }
  }
</script>

<style>
    .nav{
        position:fixed;
        /* min-height: 1080px; */
        background: rgba(0, 0, 0, 0.5);
        max-width: 26px;
        font-size: 20px;
        color: white;
        text-align: center;
        padding: 5px 0px;
        /* 位置 */
        top: 10px;
        right:10px;
        border-radius: 5px;
        /* border: 2px solid yellow; */
        box-shadow: 0 0 5px #666;
    }
    .yellow a:link {color: yellow}
    .yellow a:visited {color: yellow}
    .yellow a:hover {color: blanchedalmond}
    .yellow a:active {color: red}
</style>
