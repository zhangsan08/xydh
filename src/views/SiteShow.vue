<template>
<div>
		<div>
			<p class="siteName">{{ sitename }}</p>
			<p class="siteInfo">{{ siteinfo }}</p>
		</div>

	<el-row>

		<el-col :xs="24" :sm="12" :md="8">
			<div class="cat">
				<div class="catname"><p>Favorite</p></div>
				<div v-for="link in links" :key="link.id" @click="go(link.url)">
					<el-col :span="8"><div class="link">{{link.name}}</div></el-col>
				</div>
			</div>
		</el-col>		
		<el-col :xs="24" :sm="12" :md="8">
			<div class="cat">
				<div class="catname"><p>FolderName</p></div>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
			</div>
		</el-col>		
		<el-col :xs="24" :sm="12" :md="8">
			<div class="cat">
				<div class="catname"><p>FolderName</p></div>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
			</div>
		</el-col>		
		<el-col :xs="24" :sm="12" :md="8">
			<div class="cat">
				<div class="catname"><p>FolderName</p></div>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
			</div>
		</el-col>		
		<el-col :xs="24" :sm="12" :md="8">
			<div class="cat">
				<div class="catname"><p>FolderName</p></div>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
			</div>
		</el-col>		
		<el-col :xs="24" :sm="12" :md="8">
			<div class="cat">
				<div class="catname"><p>FolderName</p></div>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
			</div>
		</el-col>		
		<el-col :xs="24" :sm="12" :md="8">
			<div class="cat">
				<div class="catname"><p>FolderName</p></div>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
			</div>
		</el-col>		
		<el-col :xs="24" :sm="12" :md="8">
			<div class="cat">
				<div class="catname"><p>FolderName</p></div>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
			</div>
		</el-col>		
		<el-col :xs="24" :sm="12" :md="8">
			<div class="cat">
				<div class="catname"><p>FolderName</p></div>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
				<el-row>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
					<el-col :span="8"><div class="link">百度</div></el-col>
				</el-row>
			</div>
		</el-col>		

	</el-row>

</div>
</template>

<script>

import * as LinkAPI from '@/api/link/'
import * as SiteAPI from '@/api/site/'

export default {
	name: 'ShowSite',
	props:["userName"],
	data(){
		return{
			username: "",
			sitename: "",
			siteinfo: "",
			links: [],
		}
	},
	methods: {
		load(name){
			SiteAPI.getSite(name).then((res) => {
				if (res.code > 0 ){
						this.$alert('', '走迷路了', {
						confirmButtonText: '回主页',
						callback: () => {
							this.$router.push({name:'Home'}).catch(() => { })
						}
					});
					return
				}
				this.sitename = res.data.name
				this.siteinfo = res.data.info
			})
			LinkAPI.getLinks(name).then((res) => {
				this.links = res.data
			})
		},
		go(url){
			window.open(url,"target")
		}
	},
	beforeMount() {
		this.username = this.$route.params.username
		console.log("user=",this.username)
		if(this.username){
			this.load(this.username)
		}
			
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
	/* background-size: <div class="link">1</div>00% <div class="link">1</div>00%; */
	background-size: cover;
	/* background: black; */
	text-align:center;
	color: white;
}
.siteName {
	color: white;
	font-size: 20px;
	font-weight: bold;
	margin: 0 0;
}
.siteInfo {
	color: white;
	margin: 5px;
}
.cat {
	background: rgba(0, 0, 0, 0.1);
	/* background: red; */
	height: 160px;
	margin: 6px 10px;
	padding: 10px;
	overflow: auto;
	border-radius: 15px;
	/* 滚动条 */
	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* IE 10+ */
}
/* 滚动条 */
::-webkit-scrollbar {
	display: none; /* Chrome Safari */
}
.catname {
	left: 0;
}
.link {
	font-size: 12.6px;
	margin: 5px;
}
</style>