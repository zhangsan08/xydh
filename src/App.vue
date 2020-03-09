<template>
  <div>
    <router-view></router-view>
    <RightBar></RightBar>
    <Footer></Footer>
  </div>  
</template>

<script>
  // import NavBar from './components/NavBar'

//   import Header from './components/Header'
  import RightBar from './components/RightBar'
  import Footer from './components/Footer'

  export default {
    name: 'App',
    components: {
      // NavBar,
      RightBar,
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
  /* background:aquamarine; */
  /* background: -webkit-linear-gradient(left, rgb(121, 127, 209) , rgb(67, 139, 246));     背景色渐变 */
  /* -webkit-background-clip: text;         规定背景的划分区域 */
  /* -webkit-text-fill-color: transparent;  防止字体颜色覆盖 */
  @font-face {
		font-family: 'webfont';
		font-display: swap;
		src: url('//at.alicdn.com/t/webfont_gdf8ndz5djj.eot'); /* IE9*/
		src: url('//at.alicdn.com/t/webfont_gdf8ndz5djj.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
		url('//at.alicdn.com/t/webfont_gdf8ndz5djj.woff2') format('woff2'),
		url('//at.alicdn.com/t/webfont_gdf8ndz5djj.woff') format('woff'), /* chrome、firefox */
		url('//at.alicdn.com/t/webfont_gdf8ndz5djj.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
		url('//at.alicdn.com/t/webfont_gdf8ndz5djj.svg#NotoSansHans-Black') format('svg'); /* iOS 4.1- */
	}

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

.el-header {
  background-color: #B3C0D1;
}
.el-aside {
  background-color: yellow;
}
.el-footer {
  background-color: red;
}
/* .el-main {
  background-color: burlywood;
} */
</style>
