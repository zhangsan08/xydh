<template>
<div>
	<!-- <div class="img1 note" :style ="note">
      123123
	</div> -->
	<div class="header">
		<div id="tp-weather-widget"></div>
		公告: 新炫猿上线啦 系兄弟就来砍我
	</div>

	<!-- 名称简介 -->
	<div>
		<p class="siteName">{{ sitename }}</p>
		<p class="siteInfo">{{ siteinfo }}</p>
	</div>

	<!-- 搜索框 -->
	<div>
		<SearchTool></SearchTool>
	</div>

	<!-- 猿选 -->
	<el-col :xs="24" :sm="12" :md="8">
		<div class="folder">
			<div class="foldername">
				<p>猿选</p>
			</div>
			<div v-for="link in yuanxuan" :key="link.id" @click="go(link.url)">
				<el-col :span="8">
					<div class="link">
						<span v-if="link.info" class="tooltiptext"><i class="fa fa-info-circle">{{ link.info }}</i></span>
						<p v-if="link.icon"><i :class="'fa fa-'+link.icon"></i>&#160;{{ link.name }}</p>
						<p v-else>{{ link.name }}</p>
					</div>
				</el-col>
			</div>
		</div>
	</el-col>

	<!-- 用户自定义内容 -->
	<div  v-for="Folder in Folders" :key="Folder.id">
		<el-col :xs="24" :sm="12" :md="8">
			<div class="folder">
				<div class="foldername">
					<p v-if="Folder.icon"><i :class="'fa fa-'+Folder.icon"></i>{{Folder.name}}</p>
					<p v-else>{{Folder.name}}</p>
				</div>
				<div v-for="link in Folder.links" :key="link.id" @click="go(link.url)">
					<el-col :span="8">
						<div class="link">
							<span v-if="link.info" class="tooltiptext"><i class="fa fa-info-circle">{{ link.info }}</i></span>
							<p v-if="link.icon"><i :class="'fa fa-'+link.icon"></i>&#160;{{ link.name }}</p>
							<p v-else>{{ link.name }}</p>
						</div>
					</el-col>
				</div>
			</div>
		</el-col>
	</div>

	<!-- 跑马灯 -->
	<el-col :span="24">
		<div class="paomadeng">
			<el-carousel :interval="6000" autoplay="false" height="200px" arrow="always">
				<el-carousel-item v-for="item in 6" :key="item">
				炫猿推荐{{ item }}
				</el-carousel-item>
			</el-carousel>
		</div>
	</el-col>
</div>
</template>

<script>

import * as UserAPI from '@/api/user/'
import * as SiteAPI from '@/api/site/'
import SearchTool from './SearchTool.vue'

export default {
	name: 'ShowSite',
	props:["userName"],
	data(){
		return{
			baseImg: "url(../assets/bg.jpg)",
			bg: "https://www.baidu.com/img/baidu_resultlogo@2.png",
			note: {
				backgroundImage: "url(" + require("../assets/bg.jpg") + ") ",
				backgroundPosition: "center center",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
			},
			userid: "",
			username: "",
			sitename: "",
			siteinfo: "",
			Folders: [],
			yuanxuan: [
				{"icon":"","name":"🙉炫猿经典版","url":"https://oo1.win","info":"还记得那个老版的炫猿吗",},
				{"icon":"windows","name":"大白软件站","url":"https://win.o--o.win","info":"重装系统后的第一站",},
			],
		}
	},
	methods: {
		getWeather(){
			(function(a,h,g,f,e,d,c,b){b=function(){d=h.createElement(g);c=h.getElementsByTagName(g)[0];d.src=e;d.charset="utf-8";d.async=1;c.parentNode.insertBefore(d,c)};a["SeniverseWeatherWidgetObject"]=f;a[f]||(a[f]=function(){(a[f].q=a[f].q||[]).push(arguments)});a[f].l=+new Date();if(a.attachEvent){a.attachEvent("onload",b)}else{a.addEventListener("load",b,false)}}(window,document,"script","SeniverseWeatherWidget","//cdn.sencdn.com/widget2/static/js/bundle.js?t="+parseInt((new Date().getTime() / 100000000).toString(),10)));
			window.SeniverseWeatherWidget('show', {
				flavor: "bubble",
				location: "WX4FBXXFKE4F",
				geolocation: true,
				language: "zh-Hans",
				unit: "c",
				theme: "auto",
				token: "8910fc0f-7319-4498-a8c4-64caf9a9f4c9",
				hover: "enabled",
				container: "tp-weather-widget"
			})
		},
		load(uname){
			UserAPI.UserID(uname).then((res) => {
				if (res.code > 0 ){
						this.$alert('', '走迷路了', {
						confirmButtonText: '回主页',
						callback: () => {
							this.$router.push({name:'Home'}).catch(() => { })
						}
					});
					return
				} else {
					this.userid = res.data.id
					this.getSite(this.userid)
					this.getAll(this.userid)
					// 改变背景图片
					// document.getElementsByTagName("body")[0].setAttribute("style","background-image: url(https://bing.ioliu.cn/v1/rand)");
				}
			})
		},
		// 取小站信息[名称、简介]
		getSite(userid){
			SiteAPI.getSitebyID(userid).then((res) => {
				if (res.code > 0 ){
						this.$alert('', '走迷路了', {
						confirmButtonText: '回主页',
						callback: () => {
							this.$router.push({name:'Home'}).catch(() => { })
						}
					});
					return
				}else{
					this.sitename = res.data.name
					this.siteinfo = res.data.info
					document.title = this.sitename
				}
			})
		},
		// 取所有书签[文件夹、书签]
		getAll(userid){
			SiteAPI.getAll(userid).then((res) => {
				if (res.code > 0 ){
						this.$alert('', '走迷路了', {
						confirmButtonText: '回主页',
						callback: () => {
							this.$router.push({name:'Home'}).catch(() => { })
						}
					});
					return
				}else{
					this.Folders = res.data
				}
			})
		},
		// 打开url
		go(url){
			window.open(url,"target")
		}
	},
	components:{
		SearchTool,
	},
	beforeMount() {
		this.username = this.$route.params.username
		if(this.username){
			this.load(this.username)
		}
		this.getWeather()
	},
	// watch: {
    //     userName: function() {
	// 		console.log("watch")
    //         this.load(this.username)
    //     },
    // }
}
</script>

<style>
body {
	background-image: url(../assets/bg.jpg);
	background-color: black;
	background-repeat: no-repeat;
	background-size: 100%;
	background-size: cover;
	text-align:center;
	font-size: 13px;
	color: rgb(255, 255, 255);
}
.header {
	height: 50px;
	text-align: left;
	padding: 0 100px;
}
.siteName {
	font-size: 20px;
	font-weight: bold;
}
.folder {
	background: rgba(0, 0, 0, 0.3);
	height: 160px;
	margin: 10px 20px;
	padding: 10px;
	overflow: auto;
	border-radius: 20px;
	/* box-shadow: 1 1 1 white; */
	/* 滚动条 */
	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* IE 10+ */
}
/* 滚动条 */
::-webkit-scrollbar {
	display: none; /* Chrome Safari */
}
.foldername p{
	letter-spacing:10px;
	font-size: 14px;
	font-weight: bolder;
	margin: 0 auto 6px;
}
.link {
	font-size: 12.6px;
	margin: 6px 10px;
	cursor: pointer;
}
/* Tooltip 文本 */
.link .tooltiptext {
    visibility: hidden;
    /* background-color: yellow; */
	background: rgba(0, 0, 0, 0.5);
	box-shadow: 0 0 5px #666;
    color: yellow;
	font-size: 16px;
	border-radius: 5px;
    /* 定位 */
	bottom: 20px;
	left: 20px;
	padding: 5px 5px;
    position: fixed;
    z-index: 1;
}
.link:hover .tooltiptext {
    visibility: visible;
}

.el-carousel__item {
    color: white;
    font-size: 13px;
    line-height: 200px;
    margin: 0;
}
.paomadeng {
	margin: 0 auto;
	/* line-height: 200px; */
	max-width: 800px;
}
</style>