<template>
    <div>
		<div class="tips">
			<p>请以一条为单位更新 因为每次更新后会刷新列表</p>
			<a target='_blank' rel='nofollow' href='https://support.qq.com/products/106426/faqs/62830'>添加小图标的方法</a>
		</div>

		<el-divider></el-divider>
		<el-row type="flex" justify="center">
			<el-col :span="3">图标</el-col>
			<el-col :span="6">名称</el-col>
			<el-col :span="3">排序</el-col>	
			<el-col :span="3">操作</el-col>
		</el-row>
		<!-- 添加 -->
		<el-row>
			<el-col :span="24">
				<el-card header="添加文件夹" shadow="hover" class="card" >
					<el-row :model="Folderform" gutter="1" type="flex" justify="center">
						<el-col :xs="3" :sm="3"><el-input type="text" v-model="Folderform.icon" minlength="0" maxlength="30" placeholder="icon"></el-input></el-col>
						<el-col :xs="9" :sm="6"><el-input type="text" v-model="Folderform.name" minlength="0" maxlength="8"  placeholder="0-8字/过长不好看"></el-input></el-col>
						<el-col :xs="6" :sm="3">
							<el-input-number size="mini" style="width:100px" v-model="Folderform.weight" :min="0" :max="10" label="越大越靠后"></el-input-number>
						</el-col>
						<el-col :xs="6" :sm="3"><el-button  type="success" icon="el-icon-plus" @click="createFolder()" circle></el-button></el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>

		<!-- 修改 -->
		<el-divider>更新文件夹</el-divider>
		关于文件夹密码: 1.本人登录状态下无需密码。2.密码为空则无需密码即可查看
		<el-table :data="Folders" stripe>
			<el-table-column label="图标" width="80">
				<template slot-scope="scope">
					<el-input type="text" v-model="scope.row.icon"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="名称" min-width="200">
				<template slot-scope="scope">
					<el-input type="text" v-model="scope.row.name"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="密码" min-width="100">
				<template slot-scope="scope">
					<el-input type="text" v-model="scope.row.password"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="排序" align="center" width="120">
				<template slot-scope="scope">
					<el-input-number size="mini" style="width:100px" v-model="scope.row.weight" :min="0" :max="15" label="越大越靠后"></el-input-number>
				</template>
			</el-table-column>
			<el-table-column
				fixed="right"
				label="操作"
				width="120">
				<template slot-scope="scope">
					<el-button-group>
							<el-button size="small" type="primary" icon="el-icon-edit" @click="updateFolder(scope.row)" ></el-button>
							<el-button size="small" type="danger" icon="el-icon-delete" @click="deleteFolder(scope.row)" ></el-button>
					</el-button-group>                            
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>


<script>

// import * as FolderAPI from '@/api/folder/'
import { folderService } from '@/common/api'

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
				weight: 0,
			}
		}
	},
	methods: {
		getFolder(){
			this.uid = this.userID,
			folderService.getFoldersbyID(this.uid).then((res) =>{
				this.Folders = res.data
				this.Folders.sort(function(f1,f2){
					return f1.weight-f2.weight//weight
				})
			})
		},
		createFolder(){
			folderService.createFolder(this.Folderform).then((res) => {
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
					this.Folderform={name: "",icon: "",}
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
		updateFolder(FolderRow){
			var form = {
				id: FolderRow.id,
				name: FolderRow.name,
				icon: FolderRow.icon,
				weight: FolderRow.weight,
				password: FolderRow.password,
			}
			folderService.updateFolder(form).then((res) => {
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
			var form = {id: Folder.id}
			
			folderService.deleteFolder(form).then((res) => {
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

<style>

.tips {
	margin: 0 auto;
	max-width: 500px;
	text-align: left;
}
.onerow {
	margin: 5px auto 0;
}
.onerow:hover{
	margin: 5px auto 20px;
}

</style>