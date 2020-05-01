<template>
<div>
	<div v-if="bglizi>0">
		<Particle :bglizi="bglizi"></Particle>
	</div>
	<!-- <div class="">
		
	</div> -->
	<div class="totop" v-if="btn_switch">
		<Header></Header>
		<!-- <RightBar></RightBar> -->
	</div>

	<!-- 名称简介 -->
	<div>
		<p class="siteName">{{ sitename }}</p>
		<p class="siteInfo">{{ siteinfo }}</p>
	</div>

	<!-- 搜索框 -->
	<div class="search"><SearchTool></SearchTool></div>

	<div class="hidden-xs-only" style="height:50px;"></div>

	<!-- 手机端快捷导航 -->
	<div class="hidden-sm-and-up totop yellow">
		<a class="zhida" v-for="Folder in Folders" :key="Folder.id" :href="'#'+Folder.name" style="margin:10px">
			{{Folder.name}}
		</a>
	</div>

	<!-- 猿选 -->
	<el-col v-if="ad" :xs="24" :sm="12" :md="8">
		<div class="folder totop" :style="{height:(screenWidth>768?'160px':'auto')}">
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
	<div v-for="Folder in Folders" :key="Folder.id">
		<el-col :xs="24" :sm="12" :md="8">
			<div class="folder totop" :style="{height:(screenWidth>768?'160px':'auto')}" :id="Folder.id" @dblclick="unfolder(Folder.id)" @click="enfolder(Folder.id)" onselectstart="return false;">
				<div class="foldername" :id="Folder.name">
					<p v-if="Folder.icon"><i :class="'fa fa-'+Folder.icon"></i>{{Folder.name}}</p>
					<p v-else>{{Folder.name}}</p>
				</div>
				<div class="links" v-for="link in Folder.links" :key="link.id" @click="go(link.url)">
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

	<!-- <Talk></Talk> -->

	<!-- 跑马灯 -->
	<el-col :span="24">
		<div class="totop">
			<Paomadeng v-if="ad"></Paomadeng>
			<div v-else style="height:100px"></div>
			<Footer></Footer>
		</div>
	</el-col>
	
</div>
</template>

<script>

import * as UserAPI from '@/api/user/'
import * as SiteAPI from '@/api/site/'

// import RightBar from '@/components/RightBar'
import SearchTool from '@/components/SearchTool.vue'
import Paomadeng from '@/components/Paomadeng.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
// import Talk from '@/components/Talk.vue'
import Particle from '@/components/particle.vue'

export default {
	name: 'ShowSite',
	props:["userName"],
	data(){
		return{
			ad: 1,
			screenWidth: "",
			userid: "",
			username: "",
			sitename: "",
			siteinfo: "",
			btn_switch: true,
			bglizi: 0,
			Folders: [],
			yuanxuan: [
				{"icon":"","name":"炫猿经典版","url":"https://oo1.win","info":"还记得那个老版的炫猿吗",},
				{"icon":"windows","name":"大白软件站","url":"https://win.o--o.win","info":"重装系统后的第一站",},	
				{"icon":"apple","name":"大白软件站","url":"https://o--o.win","info":"新Mac的第一站",},	
				{"icon":"","name":"自荐上首页","url":"https://support.qq.com/products/106426?","info":"",},	
				{"icon":"","name":"自定义背景","url":"https://support.qq.com/products/106426/faqs/62946","info":"",},
				{"icon":"","name":"极品广告位","url":"https://support.qq.com/products/106426/blog/10114","info":"",},	
				{"icon":"","name":"虚位以待","url":"https://support.qq.com/products/106426/blog/10114","info":"",},	
			],
			f_color: "white",
		}
	},
	methods: {
		load(uname){
			// userName取ID
			UserAPI.UserID(uname).then((res) => {
				if (res.code > 0 ){
						this.$alert('', '走迷路了', {
						confirmButtonText: '回主页',
						callback: () => {
							window.location.href="https://xydh.fun"
						}
					});
					return
				} else {
					this.userid = res.data.id
					if(res.data.rm_ad){
						this.ad = 0
					}
					this.getSite(this.userid)
					this.getAll(this.userid)
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
					this.btn_switch = res.data.btn_switch
					this.bglizi = res.data.bglizi
					document.title = this.sitename+" | 炫猿"
					if(res.data.bg_switch){
						// document.getElementsByTagName("body")[0].setAttribute("style","background-image: url("+res.data.bg+")"+";color:"+res.data.font_color);
						var obj = document.getElementsByTagName("body")[0]
						obj.style.backgroundImage = "url("+res.data.bg+")"
						obj.style.color = res.data.font_color
					}else{
						var obj2 = document.getElementsByTagName("body")[0]
						obj2.style.backgroundColor = res.data.bg_color
						obj2.style.color = res.data.font_color
					}
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
					this.Folders.sort(function(f1,f2){
						return f1.weight-f2.weight//weight
					})
					for(var i=0;i<this.Folders.length;i++){
						this.Folders[i].links.sort(function(l1,l2){
							return l2.weight-l1.weight//weight
						})
					}
				}
			})
		},
		// 打开url
		go(url){
			window.open(url,"_blank")
		},
		// 展开folder
		unfolder(id){
			if(id==0){
				var folders = document.getElementsByClassName('folder');
				for(var i=0;i<folders.length;i++){
					folders[i].setAttribute("style","height:auto;");
				}
			}else{
				document.getElementById(id).setAttribute("style","height:auto;");
			}
		},
		enfolder(id){
			if(id==0){
				var folders = document.getElementsByClassName('folder');
				for(var i=0;i<folders.length;i++){
					folders[i].setAttribute("style","height:160px;");
				}
			}else{
				document.getElementById(id).setAttribute("style","height:160px;");
			}
		}
	},
	components:{
		SearchTool,
		Paomadeng,
		Header,
		Footer,
		// Talk,
		// RightBar,
		Particle,
	},
	beforeMount() {
		this.screenWidth = document.body.clientWidth
		this.username = this.$route.params.username
		if(!this.username)
			this.username = "admin"
		this.load(this.username)
	},
	mounted() {
		// 动态调整folder高度
		window.onresize = () => {
			this.screenWidth = document.body.clientWidth
			if(this.screenWidth<=768){
				this.unfolder(0)
			}else{
				this.enfolder(0)
			}
		}
	},
}
</script>

<style>
body {
	background-color: black;
	background-repeat: no-repeat;
	background-position-x: center;
	background-attachment:fixed;
	/* background-position: 0px 0px;
    background-size: 100% 100%; */
	background-size: cover;
	/* background-size: contain; */
	text-align:center;
	font-size: 13px;
	color: white;
}
.siteName {
	font-size: 25px;
	font-weight: bold;
}
.folder {
	background: rgba(0, 0, 0, 0.06);
	/* background: rgba(255, 255, 255, 0.06); */
	/* height: 160px; */
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
	font-weight: bolder;
	margin: 0 auto;
	cursor: pointer;
}
.links {
	margin: 6px auto 0;
}
/* 每个书签 */
.link {
	min-height: 28px;
	max-height: 28px;
}
.link:hover{
    color: gold;
	cursor: pointer;
}
/* Tooltip 文本 */
.link .tooltiptext {
    visibility: hidden;
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
    z-index: 99;
}
.link:hover .tooltiptext {
    visibility: visible;
}
.totop {
	z-index: 1;
	position: relative;
}
a {
	color: inherit;
}
/* .yellow a:link {color: yellow}
.yellow a:visited {color: yellow}
.yellow a:hover {color: blanchedalmond}
.yellow a:active {color: red} */
</style>