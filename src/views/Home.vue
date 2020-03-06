<template>
	<div class="links" >
		<li class="linkcard" v-for="link in links" :key="link.id">
			<el-card :span="12" shadow="hover">
					{{ link.name }}
			</el-card>
		</li>
	</div>
</template>

<script>

import * as API from '@/api/link/'

export default {
	name: 'ShowSite',
	data(){
		return{
			links: [],
		}
	},
	methods: {
		load(){
			API.getLinks("admin").then((res) => {
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
	.linkcard {
		width: 100px;
	}
	li {
		float: left;
		list-style:none; 
		cursor: pointer;
	}
</style>