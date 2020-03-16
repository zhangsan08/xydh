<template>
<div>
	<div class="header">
		<div id="tp-weather-widget"></div>
		公告: 新炫猿上线啦 系兄弟就来砍我
	</div>
	<div>
		<p class="siteName">{{ sitename }}</p>
		<p class="siteInfo">{{ siteinfo }}</p>
	</div>
	<div>
		<SearchTool></SearchTool>
	</div>

	<el-row>

		<el-col :xs="24" :sm="12" :md="8">
			<div class="folder">
				<div class="foldername"><p>猿选</p></div>
				<div>
					<el-col :span="8">
						<div class="link tooltip">
							<span class="tooltiptext">还记得那个经典的炫猿吗？</span>
								<p>炫猿旧版</p>
						</div>
					</el-col>
				</div>
			</div>
		</el-col>

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
								<span v-if="link.info" class="tooltiptext">{{ link.info }}</span>
								<p v-if="link.icon"><i :class="'fa fa-'+link.icon"></i>&#160;{{ link.name }}</p>
								<p v-else>{{ link.name }}</p>
							</div>
						</el-col>
					</div>
				</div>
			</el-col>
		</div>		
	</el-row>

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
			userid: "",
			username: "",
			sitename: "",
			siteinfo: "",
			Folders: [],
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
				}
			})
		},
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

				}
			})
		},
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
	watch: {
        userName: function() {
			console.log("watch")
            this.load(this.username)
        },
    }
}
</script>

<style>
body {
	background-image: url(../assets/bg.jpg);
	background-repeat: no-repeat;
	background-size: 100%;
	background-size: cover;
	text-align:center;
	font-size: 13px;
	color: white;
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
	background: rgba(0, 0, 0, 0.1);
	height: 160px;
	margin: 10px 20px;
	padding: 10px;
	overflow: auto;
	border-radius: 20px;
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
}
.link {
	font-size: 12.6px;
	margin: 6px 10px;
	cursor: pointer;
}
/* Tooltip 文本 */
.link .tooltiptext {
    visibility: hidden;
    /* background-color: black; */
    color: yellow;
	font-size: 16px;
    /* 定位 */
	bottom: 20px;
	left: 20px;
    position: fixed;
    z-index: 1;
}
.link:hover .tooltiptext {
    visibility: visible;
}
</style>