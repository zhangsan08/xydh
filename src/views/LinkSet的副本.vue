<template>
	<div class="links">
		<el-row type="flex" justify="center">
			<el-col :span="4">名称</el-col>
			<el-col :span="6">链接</el-col>
			<el-col :span="6">介绍</el-col>
			<el-col :span="3">文件夹</el-col>
			<el-col :span="2">排序</el-col>
			<el-col :span="3">操作</el-col>
		</el-row>
		<el-row :model="linkform" :gutter="1" type="flex" justify="center">
			<el-col :span="4"><el-input type="text" v-model="linkform.name" 	minlength="0" maxlength="8"  placeholder="0-8字/过长不好看"></el-input></el-col>
			<el-col :span="6"><el-input type="text" v-model="linkform.url"		minlength="0" maxlength="50" placeholder="http开头" ></el-input></el-col>
			<el-col :span="6"><el-input type="text" v-model="linkform.info"		minlength="0" maxlength="30" placeholder="鼠标放上时的提示语(可为空)"></el-input></el-col>
			<el-col :span="3"><el-input type="text" v-model="linkform.folderid" placeholder="还没开发🙄" disabled></el-input></el-col>
			<el-col :span="2"><el-input type="text" v-model="linkform.weight" 	placeholder="还没开发🙄" disabled></el-input></el-col>
			<el-col :span="3">
				<el-button type="success" icon="el-icon-plus" @click="createLink()" circle></el-button>
			</el-col>
		</el-row>
		<el-row v-for="link in links" :key="link.id" :gutter="1">
			<el-col :span="4"><el-input type="text" v-model="link.name"	></el-input></el-col>
			<el-col :span="6"><el-input type="text" v-model="link.url"	></el-input></el-col>
			<el-col :span="6"><el-input type="text" v-model="link.info"	></el-input></el-col>
			<el-col :span="3"><el-input type="text" v-model="link.folderid" disabled></el-input></el-col>
			<el-col :span="2"><el-input type="text" v-model="link.weight" 	disabled></el-input></el-col>
			<el-col :span="3">
				<el-button type="info" icon="el-icon-edit" @click="updateLink(link)" circle></el-button>
				<el-button type="danger" icon="el-icon-delete" @click="deleteLink(link)" circle></el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>

import * as LinkAPI from '@/api/link/'

export default {
	props:["userID"],
	data() {
		return {
			uid: 0,
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
		getLink(){
			this.uid = this.userID,
			LinkAPI.getLinksbyID(this.uid).then((res) =>{
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
	// beforeMount() {
	// 	this.getUser()
	// },
	watch: {
        userID: function() {
            this.uid = this.userID,
            this.getLink()
        },
    }
}

</script>

<style scoped>
.links {
    margin: 0 auto;
    text-align: center;
}
</style>