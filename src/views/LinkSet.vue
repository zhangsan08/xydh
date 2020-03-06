<template>
	<div>
		当前用户: {{ username }}
		用户id: {{ userid }}
		<p>您的专属链接 <a :href="'/'+username">xydh.fun/{{username}}</a></p>
		
		<div class="links" >
			<el-row>
				<el-col :span="4">名称</el-col>
				<el-col :span="6">链接</el-col>
				<el-col :span="6">介绍</el-col>
				<el-col :span="3">文件夹</el-col>
				<el-col :span="2">排序</el-col>
				<el-col :span="3">操作</el-col>
			</el-row>
			<el-row :model="linkform"  :gutter="1">
				<el-col :span="4"><el-input placeholder="2-6字符 过长不好看" type="text" v-model="linkform.name"></el-input></el-col>
				<el-col :span="6"><el-input placeholder="http开头" type="text" v-model="linkform.url"></el-input></el-col>
				<el-col :span="6"><el-input placeholder="鼠标放上时的提示语(可为空)" type="text" v-model="linkform.info"></el-input></el-col>
				<el-col :span="3"><el-input placeholder="还没开发🙄" type="text" v-model="linkform.folderid" disabled></el-input></el-col>
				<el-col :span="2"><el-input placeholder="还没开发🙄" type="text" v-model="linkform.weight" disabled></el-input></el-col>
				<el-col :span="3">
					<el-button type="success" icon="el-icon-plus" @click="createLink()" circle></el-button>
				</el-col>
			</el-row>
				
			<el-row v-for="link in links" :key="link.id" :gutter="1">
				<el-col :span="4"><el-input type="text" v-model="link.name"></el-input></el-col>
				<el-col :span="6"><el-input type="text" v-model="link.url"></el-input></el-col>
				<el-col :span="6"><el-input type="text" v-model="link.info"></el-input></el-col>
				<el-col :span="3"><el-input type="text" v-model="link.folderid" disabled></el-input></el-col>
				<el-col :span="2"><el-input type="text" v-model="link.weight" disabled></el-input></el-col>
				<el-col :span="3">
					<el-button @click="updateLink(link)" circle>更</el-button>
					<el-button type="danger" icon="el-icon-delete" @click="deleteLink(link)" circle></el-button>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>

import * as UserAPI from '@/api/user/'
import * as LinkAPI from '@/api/link/'
// import axios from 'axios'

export default {
	data() {
		return {
			userid: 0,
			username: "未登录",
			LoginCode: -1,
			links: [],
			linkform: {
				id: "",
				name: "",
				url: "",
				info: "",
			}
		}
	},
	methods: {
		getUser(){
			UserAPI.UserMe().then((res) => {
				this.LoginCode = res.code
				if (this.LoginCode > 0) {
					alert("未登录")
					this.$router.push({name:'ULogin'})
				}else{  
					this.userid = res.data.id
					this.username = res.data.name
					this.getLink()
				}
			})
		},
		getLink(){
			LinkAPI.getLinksbyID(this.userid).then((res) =>{
				this.links = res.data
			})
		},
		createLink(){
			LinkAPI.createLink(this.linkform).then((res) => {
				if (res.code > 0) {
					this.$notify.error({
					title: "添加失败",
					message: res.msg
					});
				} else {
					this.$notify({
					title: "添加成功!",
					type: "success",
					duration: "800"
					});
					this.getLink()
				}
				})
				.catch(error => {
				this.$notify.error({
					title: "错误 请检查",
					message: error
				});
			});
		},
		updateLink(link){
			var form = {
				id: link.id,
				name: link.name,
				url: link.url,
				info: link.info
			}
			LinkAPI.updateLink(form).then((res) => {
				if (res.code > 0) {
					this.$notify.error({
					title: "更新失败",
					message: res.msg
					});
				} else {
					this.$notify({
					title: "更新成功!",
					type: "success",
					duration: "800"
					});
					this.getLink()
				}
				})
				.catch(error => {
				this.$notify.error({
					title: "错误 请检查",
					message: error
				});
			});
		},
		deleteLink(link){
			var form = {
				data:{id: link.id}
			}
			LinkAPI.deleteLink(form).then((res) => {
				if (res.code > 0) {
					this.$notify.error({
					title: "删除失败",
					message: res.msg
					});
				} else {
					this.$notify({
					title: "删除成功!",
					type: "success",
					duration: "800"
					});
					this.getLink()
				}
				})
				.catch(error => {
				this.$notify.error({
					title: "错误 请检查",
					message: error
				});
			});
		}

	},
	components:{

	},
	beforeMount() {
		this.getUser()
	}
}

</script>

<style scoped>
</style>