<template>
	<div class="siteshow">
		<div>
			<p class="siteName">{{ sitename }}</p>
			<p class="siteInfo">{{ siteinfo }}</p>
		</div>

			<div class="linksdiv">
			<li class="link" v-for="link in links" :key="link.id" @click="go(link.url)">
				<p>{{ link.name }}</p>
			</li>
			</div>

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
            this.username = this.userName,
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
	padding: 0 10px 0 10%;
	text-align:center;
}
.siteshow {
	min-height: 800px;
	margin: 0 auto;
	padding: 0px auto;
}
.linksdiv {
	/* min-width: 350px; */
	/* max-width: 1800px; */
	margin: 20px 0px;
	padding: 0 auto;
	display:inline-block;
}
.link {
		/* 大小布局 */
		min-width: 160px;
		height: 88px;
		line-height:88px;
		margin:10px 5px;
		
		float: left;
		/* overflow:hidden; */
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
p {
	margin: 10px auto;
	color: white;
	text-align: center;
}
.siteName {
	font-size: 20px;
	font-weight: bolder;
}
</style>