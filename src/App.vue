<template>
  <div>
    <router-view></router-view>
    <RightBar></RightBar>
    <Xianbao></Xianbao>
    <Footer></Footer>
    <el-backtop></el-backtop>
  </div>  
</template>

<script>
  // import NavBar from './components/NavBar'

//   import Header from './components/Header'
  import RightBar from './components/RightBar'
  import Xianbao from './components/Xianbao'
  import Footer from './components/Footer'
  import 'element-ui/lib/theme-chalk/display.css';

  export default {
    name: 'App',
    components: {
      RightBar,
      Xianbao,
      Footer,
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
a:link {color: yellow}
a:visited {color: yellow}
a:hover {color: blanchedalmond}
a:active {color: red}
</style>
