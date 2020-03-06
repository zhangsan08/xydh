<template>
	<div>
		<p>用户: {{ username }}</p>
		<p>siteName: {{ sitename }}</p>
		<p>siteInfo: {{ siteinfo }}</p>
		<li v-for="link in links" :key="link.id">
			<el-card :span="12" shadow="hover">
					{{ link.name }}
			</el-card>
		</li>
	</div>
</template>

<script>

import * as LinkAPI from '@/api/link/'
import * as SiteAPI from '@/api/site/'

export default {
	name: 'ShowSite',
	data(){
		return{
			username: "",
			sitename: "",
			siteinfo: "",
			links: [],
		}
	},
	methods: {
		load(){
			this.username = this.$route.params.username
			SiteAPI.getSite(this.$route.params.username).then((res) => {
				this.sitename = res.data.name
				this.siteinfo = res.data.info
			})
			LinkAPI.getLinks(this.$route.params.username).then((res) => {
				this.links = res.data
			})
		},
	},
	beforeMount() {
		this.load()
	}
}
</script>

<style>
</style>