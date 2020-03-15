<template>
    <div>
        <p>请以一条为单位更新 因为每次更新后会刷新列表</p>
		<el-row type="flex" justify="center">
			<el-col :span="6">名称</el-col>
			
			<el-col :span="3">图标</el-col>
		
			<el-col :span="3">排序</el-col>
			<el-col :span="3">操作</el-col>
		</el-row>
		<el-row :model="Folderform" :gutter="1" type="flex" justify="center">
			<el-col :span="6"><el-input type="text" v-model="Folderform.name" 	minlength="0" maxlength="8"  placeholder="0-8字/过长不好看"></el-input></el-col>
			
			<el-col :span="3"><el-input type="text" v-model="Folderform.icon"		minlength="0" maxlength="30" placeholder="icon"></el-input></el-col>
			
			<el-col :span="3"><el-input type="text" v-model="Folderform.weight" 	placeholder="还没开发🙄" disabled></el-input></el-col>
			<el-col :span="3">
				<el-button size="small" type="success" icon="el-icon-plus" @click="createFolder()" circle></el-button>
			</el-col>
		</el-row>
		<el-divider></el-divider>
		<el-row v-for="Folder in Folders" :key="Folder.id" :gutter="1" type="flex" justify="center">
				<el-col :span="6"><el-input type="text" v-model="Folder.name"	></el-input></el-col>
			
				<el-col :span="3"><el-input type="text" v-model="Folder.icon"	></el-input></el-col>
				
				<el-col :span="3"><el-input type="text" v-model="Folder.weight" 	disabled></el-input></el-col>
				<el-col :span="3">
					<el-button-group>
						<el-button size="small" type="primary" icon="el-icon-edit" @click="updateFolder(Folder)" ></el-button>
						<el-button size="small" type="danger" icon="el-icon-delete" @click="deleteFolder(Folder)" ></el-button>
					</el-button-group>

					
				</el-col>
		</el-row>
	</div>
</template>


<script>

import * as FolderAPI from '@/api/folder/'

export default {
	props:["userID"],
	data() {
		return {
			uid: 0,
			Folders: [],
			Folderform: {
				id: "",
				name: "",
				icon: "",
			}
		}
	},
	methods: {
		getFolder(){
			this.uid = this.userID,
			FolderAPI.getFoldersbyID(this.uid).then((res) =>{
				this.Folders = res.data
			})
		},
		createFolder(){
			FolderAPI.createFolder(this.Folderform).then((res) => {
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
					this.getFolder()
				}
				})
				.catch(error => {
				this.$notify.error({
					title: "错误 请检查",
					message: error
				});
			});
		},
		updateFolder(Folder){
			var form = {
				id: Folder.id,
				name: Folder.name,
				url: Folder.url,
				icon: Folder.icon
			}
			FolderAPI.updateFolder(form).then((res) => {
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
					this.getFolder()
				}
				})
				.catch(error => {
				this.$notify.error({
					title: "错误 请检查",
					message: error
				});
			});
		},
		deleteFolder(Folder){
			var form = {
				data:{id: Folder.id}
			}
			FolderAPI.deleteFolder(form).then((res) => {
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
					this.getFolder()
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
            this.getFolder()
        },
    }
}

</script>

<style scoped>
/* .folders{
	margin: 2px auto;
} */
</style>