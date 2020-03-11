<template>
	<div class="siteshow">
		<div>
			<p class="siteName">{{ sitename }}</p>
			<p class="siteInfo">{{ siteinfo }}</p>
		</div>


<el-container>
<div class="links">
					<li class="link" v-for="link in links" :key="link.id" @click="go(link.url)">
						<p class="linkname">{{ link.name }}</p>
					</li>
				</div>
</el-container>
				
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
				if (res.code >1){
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
	/* background-size: 100% 100%; */
	background-size: cover;
	background: black;
	text-align:center;
}
.siteshow {
	min-height: 800px;
}
.links {
	text-align:center;
	/* width: 1210px; */
	/* margin: 0 10% 0 10%; */
}
.link {
	/* 大小布局 */
	width: 160px;
	height: 88px;
	line-height:88px;
	margin:10px 5px;
	float: left;
	/* 文字 */
	text-align: center;
	font-size: 20px;
	/* 指针 */
	cursor: pointer;
	/* 边框 */
	border:1px solid rgba(255, 255, 0, 0.1);
	border-radius:20px;
	background:rgba(255, 255, 255, 0.1);
}
.linkname {
	margin: 10px auto;
	color: white;
	text-align: center;
}
.siteName {
	color: white;
	font-size: 26px;
	font-weight: bolder;
	margin: 0 0;
}
.siteInfo {
	color: white;
	margin: 5px;
}
</style>