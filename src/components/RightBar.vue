<template>
  <div>
    <div class="nav">
          <!-- <a href="/"   target="_blank" style="color:yellow">Home</a> -->
          <!-- <a href="/Me" target="_blank" style="color:yellow">定制 | 登录</a> -->
          <a href="/"   target="_blank" style="color:yellow"><i class="el-icon-s-home"></i></a>
          <a href="/Me" target="_blank" style="color:yellow"><i class="el-icon-user"></i></a>
    </div>
  </div>
</template>

<script>
// import * as API from '@/api/user/'

import { userService } from '@/common/api'

  export default {
    name: 'RightBar',
    methods: {
        logout(){
            userService.UserLogout()
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
        background: rgba(0, 0, 0, 1);
        width: 65px;
        height: 20px;
        font-size: 18px;
        letter-spacing:3px;
        color: white;
        text-align: center;
        padding: 5px 0;
        /* 位置 */
        top: 10px;
        right:10px;
        border-radius: 15px;
        z-index: 99;
    }
</style>
