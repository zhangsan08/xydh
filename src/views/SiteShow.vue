<template>
<div class="bg">
	<div v-if="bglizi>0">
		<Particle :bglizi="bglizi"></Particle>
	</div>

	<div class="totop" v-if="btn_switch">
		<Header :historySwitch=historySwitch :navSwitch=navSwitch :Folders=Folders></Header>
		<!-- <RightBar></RightBar> -->
	</div>

	<!-- 名称简介 -->
	<div style="margin:0px auto 0px;">
		<span class="siteName">{{ sitename }}</span>
		<div style="margin:10px auto"></div>
		<!-- <p class="siteInfo">{{ siteinfo }}</p> -->
		{{ siteinfo }}
	</div>

	<div style="height:80px" v-if="!navSwitch && !labSwitch"></div>
	<!-- 搜索框 -->
	<div class="search"><SearchTool></SearchTool></div>

	<!-- 点击实验室按钮会打开实验室页面 -->
	<div class="Lab totop" v-if="labSwitch">
		<div class="hidden-sm-and-up" style="height:50px;"></div>
		<transition name="el-zoom-in-left">
			<IndexLab :lybID=lybID></IndexLab>
		</transition>
	</div>

	<!-- 历史足迹 -->
	<el-row>
		<div class="historyLinks" v-if="historySwitch">
			<div v-if="cacheList.length > 0">
				<div class="historyLink" v-for="link in cacheList" @click="goToUrl(link)" :key="link.id">
					<p>{{ link.name }}</p>
				</div>
			</div>
			<div v-else>
				<el-divider>正常使用导航后此处将显示本地最常访问的书签哦</el-divider>
			</div>
		</div>
	</el-row>

	<div class="bookmark" v-if="!labSwitch&&navSwitch">	
		<!-- 手机端快捷导航 -->
		<div class="hidden-sm-and-up totop">
			<el-divider>快捷导航</el-divider>
			<div style="padding:10px 10px;">
				<el-col :span="6" v-for="Folder in Folders" :key="Folder.id">
					<div style="margin:5px auto">
						<a :href="'#'+Folder.name" style="font-size:16px">
						{{Folder.name}}
						</a>
					</div>
				</el-col>
			
			</div>
		</div>
		<!-- 手机端快捷导航 -->
		<!-- <div class="totop">
			<el-divider>快捷导航</el-divider>
			<el-tabs v-model="activeName" @tab-click="handleClick" v-for="Folder in Folders" :key="Folder.id">
				<el-tab-pane :label="Folder.name" name="first"></el-tab-pane>
			</el-tabs>
		</div> -->
		<!-- 猿选 -->
		<el-col v-if="ad" :xs="24" :sm="12" :md="8" :xl="6" >
			<div class="folder totop" :style="{height:(screenWidth>768?'180px':'auto')}">
				<div class="foldername">
					<p>猿选</p>
				</div>
				<div v-for="link in yuanxuan" :key="link.id">
					<el-col :span="8">
						<div class="link">
							<a @click="goToUrl(link)" target="_blank" rel="nofollow">
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
		<div v-for="(Folder,index) in Folders" :key="Folder.id">
			<el-col :xs="24" :sm="12" :md="8" :xl="6">
				<div class="folder totop" :style="{height:(screenWidth>768?'180px':'auto')}" :id="Folder.id"  onselectstart="return false;">
					<div class="foldername" :id="Folder.name">
						<p v-if="Folder.icon"><i :class="'fa fa-'+Folder.icon"></i>{{Folder.name}}</p>
						<p v-else>{{Folder.name}}</p>
					</div>
					<div class="inputPWD" v-if="Folder.need_password">
							<el-input type="text" v-model="passwords[index]" placeholder="请输入密码" clearable @keyup.enter.native="Sou(url+txt)">
								<span slot="append" type="text" @click="GetPWDFolder(index,Folder.id,passwords[index])">确定</span>
							</el-input>
					</div>
					<div class="links" v-else v-for="link in Folder.links" :key="link.id">
						<el-col :span="8">
							<div class="link">
							<a @click="goToUrl(link)" target="_blank" rel="nofollow">
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
	

	<!-- 跑马灯（暂时去掉了 本想留作广告位。发现接不到 -->
	<el-col :span="24">
		<div class="totop">
			<!-- <Paomadeng v-if="ad"></Paomadeng>
			<div v-else style="height:100px"></div> -->
			<div style="height:200px" v-if="!navSwitch && !labSwitch" ></div>
			<Footer></Footer>
		</div>
	</el-col>
	

</div>
</template>

<script>

// import * as UserAPI from '@/api/user/'
// import * as SiteAPI from '@/api/site/'
import { userService,siteService } from '@/common/api'
import { cookieGet,cookieSet} from '@/common/cookie'
import IndexLab from '@/views/IndexLab.vue'
import { getUrl } from '@/common/pickup'

// import RightBar from '@/components/RightBar'
import SearchTool from '@/components/SearchTool.vue'
// import Paomadeng from '@/components/Paomadeng.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Particle from '@/components/particle.vue'

export default {
	name: 'ShowSite',
	props:["userName"],
	filters: {
		getDomain(url){
			return getUrl(url)
		}
	},
	data(){
		return{
			ad: 1,
			labSwitch: false,
			historySwitch: false,
			navSwitch: true,
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
				{"icon":"","id":"1","name":"薅羊毛捡垃圾群","url":"https://www.yuque.com/xydh/partner/grf3qg","info":"独家合作",},
				{"icon":"","id":"9","name":"付费网课代下","url":"https://www.yuque.com/xydh/partner/wangke","info":"慕课、极客时间等",},
				{"icon":"star","id":"2","name":"炫猿经典版","url":"https://oo1.win","info":"还记得那个老版的炫猿吗",},
				{"icon":"windows","id":"3","name":"大白软件站","url":"https://win.o--o.win","info":"重装系统后的第一站",},	
				{"icon":"apple","id":"4","name":"大白软件站","url":"https://o--o.win","info":"新Mac的第一站",},	
				{"icon":"","id":"5","name":"自定义背景","url":"https://support.qq.com/products/106426/faqs/62946","info":"",},
				{"icon":"","id":"6","name":"极品广告位","url":"https://support.qq.com/products/106426/blog/10114","info":"",},	
				{"icon":"","id":"7","name":"虚位以待","url":"https://support.qq.com/products/106426/blog/10114","info":"",},	
			],
			f_color: "white",
			autoBgColor:'#fff',
			cacheList:[],
			passwords: [],
		}
	},
	methods: {
		switchHistory(){
			this.historySwitch = !this.historySwitch
			cookieSet("historySwitch", this.historySwitch)
		},
		switchLab(){
			this.labSwitch = !this.labSwitch
			cookieSet("labSwitch", this.labSwitch)
		},
		switchNav(){
			this.navSwitch = !this.navSwitch
			cookieSet("navSwitch", this.navSwitch)
		},
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
					document.title = this.sitename
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
		GetPWDFolder(index, id, password){
			siteService.getLinksbyfolderid(id, password).then((res) => {
				if (res.code > 0){
						this.$alert('请重试', '密码错误', {
					});
					return
				}else{
					this.Folders[index].need_password = false;
					this.Folders[index].links = res.data;
				}
			})
		},
		// 打开url
		go(url){
			window.open(url,"_blank")
		},
		goToUrl(linkInfo){
			console.log(linkInfo)
			let cache = cookieGet("cacheLinkList")
			let existKey = false
			if(cache){
				let cacheExist = JSON.parse(cache)
				cacheExist.filter((d)=>{
					if(d.id == linkInfo.id){
						existKey = true
						d.count +=1
					}
				})

				if(!existKey){
					linkInfo['count'] = 1
					cacheExist.push(linkInfo)
				}
				cookieSet("cacheLinkList",JSON.stringify(cacheExist))
			}else{
				let array = []
				linkInfo['count'] = 1
				array.push(linkInfo)
				cookieSet("cacheLinkList",JSON.stringify(array))
			}

			window.open(linkInfo.url,"_blank")
		},
		compare(array,key){
			return array.sort(function(a,b){
				var x = a[key];
				var y = b[key];
				return ((y<x)?-1:(x>y)?1:0)
			})
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
		
	},
	components:{
		SearchTool,
		// Paomadeng,
		Header,
		Footer,
		IndexLab,
		// RightBar,
		Particle
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

		// 取“足迹”
		let cache = cookieGet("cacheLinkList")
		if(cache){
			this.cacheList = []
			let tempList = this.compare(JSON.parse(cache),'count')
			let showNum = tempList.length >= 12 ? 12 : tempList.length
			for (let i = 0; i < showNum; i++) {
				this.cacheList.push(tempList[i])
			}
		}

		// 取“足迹开关状态”
		let open1 = cookieGet("historySwitch")
		if(open1 != undefined){
			this.historySwitch = (open1 == "true")
		}
		// 取“实验室开关状态”
		let open2 = cookieGet("labSwitch")
		if(open2 != undefined){
			this.labSwitch = (open2 == "true")
		}
		// 取“导航开关状态”
		let open3 = cookieGet("navSwitch")
		if(open3 != undefined){
			this.navSwitch = (open3 == "true")
		}
	},
}
</script>

<style>
body {
	/* background-image: url('../assets/bg.jpg'); */

	background-attachment:fixed;
	background-size: cover;
	background-position: center center;
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
	background: rgba(0, 0, 0, 0.03);
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
.folder:hover{
    background: rgba(0, 0, 0, 0.6);
	color: white;
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
	min-height: 33px;
	max-height: 33px;
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

.historyLinks {
	margin: 10px auto 100px;
	max-width: 1080px;
}
.historyLink {
	cursor: pointer;
	float: left;
	background: rgba(0, 0, 0, 1);
	max-width:300px;
	height:40px;
	border-radius: 10px;
	margin: 5px 10px;
	padding: 10px 15px;
	display: table-cell;
	vertical-align: middle;
	font-size: 20px;
	line-height: 20px;
	color: white;
}

.inputPWD {
	padding: 10%;
}

.inputPWD .el-input__inner {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 0px;
  color: inherit;
}

.inputPWD .el-input-group__append {
    background-color: rgba(0, 0, 0, 0.2);
    color: inherit;
	border-radius: 0px;
    cursor: pointer;
}
</style>