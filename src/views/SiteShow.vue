<template>
<div class="bg">
	<div v-if="bglizi>0">
		<Particle :bglizi="bglizi"></Particle>
	</div>

	<div class="totop" v-if="btn_switch">
		<Header></Header>
		<!-- <RightBar></RightBar> -->
	</div>

	<!-- 名称简介 -->
	<div style="margin:20px auto 0px;">
		<span class="siteName">{{ sitename }}</span>
		<div style="margin:10px auto"></div>
		<!-- <p class="siteInfo">{{ siteinfo }}</p> -->
		{{ siteinfo }}
	</div>

	<!-- 搜索框 -->
	<div class="search"><SearchTool></SearchTool></div>

	<div class="hidden-xs-only" style="height:50px;"></div>
	
	<div class="Lab totop" v-if="labSwitch">
		<div class="hidden-sm-and-up" style="height:50px;"></div>
		<transition name="el-zoom-in-left">
			<IndexLab :lybID=lybID></IndexLab>
		</transition>
	</div>
	<div class="bookmark" v-else>
		<!-- 手机端快捷导航 -->
		<div class="hidden-sm-and-up totop yellow">
			<el-divider>快捷导航</el-divider>
			<div style="padding:10px 10px;">
				<el-col :span="6" v-for="Folder in Folders" :key="Folder.id">
					<div style="margin:5px auto">
						<a class="zhida"  :href="'#'+Folder.name" style="font-size:16px">
						{{Folder.name}}
						</a>
					</div>
				</el-col>
			
			</div>
		</div>
		<!-- 猿选 -->
		<el-col v-if="ad" :xs="24" :sm="12" :md="8" :xl="6" >
			<div class="folder totop" :style="{height:(screenWidth>768?'180px':'auto')}">
				<div class="foldername">
					<p>猿选</p>
				</div>
				<div v-for="link in yuanxuan" :key="link.id">
					<el-col :span="8">
						<div class="link">
							<a :href="link.url" target="_blank" rel="nofollow">
							<span v-if="link.info" class="tooltiptext"><i class="fa fa-info-circle">{{ link.info }}</i></span>
							<p v-if="link.icon"><i :class="'fa fa-'+link.icon"></i>&#160;{{ link.name }}</p>
							<p v-else>{{ link.name }}</p>
							</a>
						</div>
					</el-col>
				</div>
			</div>
		</el-col>
		<!-- 用户自定义内容 -->
		<div v-for="Folder in Folders" :key="Folder.id">
			<el-col :xs="24" :sm="12" :md="8" :xl="6">
				<div class="folder totop" :style="{height:(screenWidth>768?'180px':'auto')}" :id="Folder.id" @dblclick="unfolder(Folder.id)" @click="enfolder(Folder.id)" onselectstart="return false;">
					<div class="foldername" :id="Folder.name">
						<p v-if="Folder.icon"><i :class="'fa fa-'+Folder.icon"></i>{{Folder.name}}</p>
						<p v-else>{{Folder.name}}</p>
					</div>
					<div class="links" v-for="link in Folder.links" :key="link.id">
						<el-col :span="8">
							<div class="link">
							<a :href="link.url" target="_blank" rel="nofollow">
								<span v-if="link.info" class="tooltiptext"><i class="fa fa-info-circle">{{ link.info }}</i></span>
								<p v-if="link.icon"><i :class="'fa fa-'+link.icon"></i>&#160;{{ link.name }}</p>
								<p v-else>{{ link.name }}</p>
							</a>
							</div>
						</el-col>
					</div>
				</div>
			</el-col>
		</div>
	</div>
	

	<!-- 跑马灯 -->
	<el-col :span="24">
		<div class="totop">
			<!-- <Paomadeng v-if="ad"></Paomadeng>
			<div v-else style="height:100px"></div> -->
			<Footer></Footer>
		</div>
	</el-col>
	
</div>
</template>

<script>

// import * as UserAPI from '@/api/user/'
// import * as SiteAPI from '@/api/site/'
import { userService,siteService } from '@/common/api'

import IndexLab from '@/views/IndexLab.vue'

// import RightBar from '@/components/RightBar'
import SearchTool from '@/components/SearchTool.vue'
// import Paomadeng from '@/components/Paomadeng.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Particle from '@/components/particle.vue'

export default {
	name: 'ShowSite',
	props:["userName"],
	data(){
		return{
			ad: 1,
			labSwitch: false,
			screenWidth: "",
			userid: "",
			username: "",
			sitename: "",
			siteinfo: "",
			btn_switch: true,
			bglizi: 0,
			lybID: "",
			Folders: [],
			yuanxuan: [
				{"icon":"","name":"华为云羊毛【独家】","url":"https://www.yuque.com/xydh/partner/huawei","info":"独家合作",},
				{"icon":"star","name":"炫猿经典版","url":"https://oo1.win","info":"还记得那个老版的炫猿吗",},
				{"icon":"windows","name":"大白软件站","url":"https://win.o--o.win","info":"重装系统后的第一站",},	
				{"icon":"apple","name":"大白软件站","url":"https://o--o.win","info":"新Mac的第一站",},	
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
			userService.UserID(uname).then((res) => {
				if (res.code > 0 ){
					this.$alert('', '走迷路了', {
						confirmButtonText: '回主页',
						callback: () => {
							window.location.href="https://xydh.fun"
						}
					});
					return
				} else {
					// 加载用户
					this.userid = res.data.id
					if(res.data.rm_ad){
						this.ad = 0
					}
					// 违规用户
					if (res.data.level <= 0){
						this.$alert('网络不是不法之地！请珍惜您的账号,账号申诉请联系邮箱 xuanyuandaohang@126.com 上传了非法网站的就不要申诉了', '该账号传播违法信息已被封禁', {
							confirmButtonText: '回主页',
							callback: () => {
								window.location.href="https://xydh.fun"
							}
						});
						return
					}
					// 正常用户 加载数据
					this.getSite(this.userid)
					this.getAll(this.userid)
				}
			})
		},
		// 取小站信息[名称、简介]
		getSite(userid){
			siteService.getSitebyID(userid).then((res) => {
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
					this.lybID = res.data.lyb_id
					document.title = this.sitename+" | 炫猿"
					// var obj = document.getElementsByClassName("bg")[0]
					var obj = document.getElementsByTagName("body")[0]
					obj.style.color = res.data.font_color
					if(res.data.bg_switch){
						// document.getElementsByTagName("body")[0].setAttribute("style","background-image: url("+res.data.bg+")"+";color:"+res.data.font_color);
						obj.style.backgroundImage = "url("+res.data.bg+")"
						obj.style.color = res.data.font_color
					}else{
						// var obj2 = document.getElementsByTagName("body")[0]
						obj.style.backgroundColor = res.data.bg_color
						// obj2.style.color = res.data.font_color
					}
				}
			})
		},
		// 取所有书签[文件夹、书签]
		getAll(userid){
			siteService.getAll(userid).then((res) => {
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
						if(!this.Folders[i].links)
							continue
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
					folders[i].setAttribute("style","height:180px;");
				}
			}else{
				document.getElementById(id).setAttribute("style","height:180px;");
			}
		},
		switchLab(){
			if(this.labSwitch){
				this.labSwitch = false
			}else{
				this.labSwitch = true
			}
		}
	},
	components:{
		SearchTool,
		// Paomadeng,
		Header,
		Footer,
		IndexLab,
		// RightBar,
		Particle,
	},
	beforeMount() {
		// this.$message({
        //   showClose: true,
        //   message: '这几天网站进行技术维护.可能会一直出现打不开的情况.一定关注公众号【炫技巧】防止迷路',
        //   type: 'warning'
        // });
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
	/* background-image: url('../assets/bg.jpg'); */

	background-attachment:fixed;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;

	text-align:center;
	font-size: 13px;
	color: white;
	margin: 0;
}

.siteName {
	font-size: 36px;
	font-weight: bold;
}
.folder {
	background: rgba(0, 0, 0, 0.06);
	/* background: rgba(255, 255, 255, 0.06); */
	/* height: 180px; */
	margin: 12px 20px;
	padding: 5px;

	border-radius: 20px;
	/* 滚动条 */
	overflow: auto;
	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* IE 10+ */
}
/* 滚动条 */
::-webkit-scrollbar {
	display: none; /* Chrome Safari */
}

.foldername p{
	font-size: 16px;
	letter-spacing:5px;
	font-weight: bolder;
	margin: 6px auto 6px;
	cursor: pointer;
}
.links {
	margin: 6px auto 0;
}
/* 每个书签 */
.link {
	min-height: 20px;
	max-height: 20px;
}
.link:hover{
    color: gold;
	/* cursor: pointer; */
}
/* Tooltip 文本 */
.link .tooltiptext {
    visibility: hidden;
	background: rgba(0, 0, 0, 1);
	box-shadow: 0 0 5px #666;
    /* color: gold; */
	font-size: 16px;
	border-radius: 5px;
    /* 定位 */
	bottom: 20px;
	left: 20px;
	padding: 5px 5px;
    position: fixed;
}
.link:hover .tooltiptext {
    visibility: visible;
	/* z-index: 999; */
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