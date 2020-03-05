<template>
  <el-menu class="el-menu-demo" mode="horizontal" router>
    <el-menu-item index="/">Home</el-menu-item>
    <el-menu-item index="/admin2/">admin2</el-menu-item>
    <el-menu-item index="/u/register/">register</el-menu-item>
    <el-menu-item index="/u/login/">login</el-menu-item>
    <el-menu-item index="/set/site/">SiteSet</el-menu-item>
    <el-menu-item @click="logout">Logout</el-menu-item>

  </el-menu>
</template>

<script>
import * as API from '@/api/user/'

  export default {
    name: 'NavBar',
    methods: {
        logout(){
            API.UserLogout()
            alert('登出')
            this.$router.push({name:'Home'})
        }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>