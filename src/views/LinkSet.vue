<template>
    <div>
		<p><a target='_blank' rel='nofollow' href='https://support.qq.com/products/106426/faqs/62830'>添加小图标的方法</a></p>
		
        <el-collapse accordion v-model="FolderID" @change="getLinksin(FolderID)" v-loading="loading">
			<div  v-for="Folder in Folders" :key="Folder.id">
            <el-collapse-item :name="Folder.id">
				<!-- 这是文件夹名字 -->
                <template slot="title">
                {{ Folder.name }}
                </template>
				<!-- 这是文件夹里的内容 -->
				<div class="links">
					<!-- 标题 -->
					<el-row type="flex" justify="center">
						<el-col :span="2">图标</el-col>
						<el-col :span="4">名称</el-col>
						<el-col :span="6">链接</el-col>
						<el-col :span="6">介绍</el-col>
						<el-col :span="3">文件夹</el-col>
						<el-col :span="3">操作</el-col>
					</el-row>
					<!-- 添加 -->
					<el-divider>添加书签</el-divider>
					隐私与法律免责声明: 炫猿会记录你的信息, 你所添加的每一个链接都将负法律责任
					<el-row :model="linkform" :gutter="1" type="flex" justify="center">
						<el-col :span="2"><el-input type="text" v-model="linkform.icon" 	placeholder="可为空"></el-input></el-col>
						<el-col :span="4"><el-input type="text" v-model="linkform.name" 	minlength="0" maxlength="12"  placeholder="0-8字/过长不好看"></el-input></el-col>
						<el-col :span="6"><el-input type="text" v-model="linkform.url"		minlength="0" maxlength="100" placeholder="http开头" ></el-input></el-col>
						<el-col :span="6"><el-input type="text" v-model="linkform.info"		minlength="0" maxlength="30" placeholder="鼠标放上时的提示语(可为空)"></el-input></el-col>
						<el-col :span="3"><P>{{ Folder.name }}</P></el-col>
						<el-col :span="3">
							<el-button size="small" type="success" icon="el-icon-plus" @click="createLink(Folder.id)" circle></el-button>
						</el-col>
					</el-row>
					<!-- 更删 -->
					<el-divider>更新书签</el-divider>
					<el-row v-for="link in links" :key="link.id" :gutter="1" class="onerow">
						<el-col :span="2"><el-input type="text" v-model="link.icon"></el-input></el-col>
						<el-col :span="4"><el-input type="text" v-model="link.name"></el-input></el-col>
						<el-col :span="6"><el-input type="text" v-model="link.url" ></el-input></el-col>
						<el-col :span="6"><el-input type="text" v-model="link.info"></el-input></el-col>
						<el-col :span="3">
							<el-select v-model="link.fid">
								<el-option
								v-for="Folder in Folders"
								:key="Folder.id"
								:label="Folder.name"
								:value="Folder.id">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="3">
							<el-button-group>
								<el-button size="small" type="primary" icon="el-icon-edit" @click="updateLink(Folder.id,link)" ></el-button>
								<el-button size="small" type="danger" icon="el-icon-delete" @click="deleteLink(Folder.id,link)" ></el-button>
							</el-button-group>
						</el-col>
					</el-row>
				</div>
            </el-collapse-item>
			</div>
        </el-collapse>
    </div>
</template>
<script>

// import * as FolderAPI from '@/api/folder/'
// import * as LinkAPI from '@/api/link/'

import { folderService,linkService } from '@/common/api'


export default {
	props:["userID"],
	data() {
		return {
			loading: false,
			FolderID: "",
			uid: 0,
			Folders: [],
			links: [],
			linkform: {
				id: "",
				fid: "",
				icon: "",
				name: "",
				url: "",
				info: "",
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
		getLinksin(fid){
			// 这样只在折页打开时执行
			// this.loading = true;
			// setTimeout(() => {
			// 	this.loading = false;
			// }, 500);
			if(fid){
				linkService.getLinksbyFolderID(fid).then((res) =>{
					if(res.data){
						this.links = res.data
						this.links.sort(function(l1,l2){
							return l2.weight-l1.weight//weight
						})
					}else{
						this.links = []
					}
				})
			}
			else{
				// 折页关闭
			}
		},
		createLink(fid){
			this.linkform.fid = fid
			linkService.createLink(this.linkform).then((res) => {
				if (res.code > 0) {
					this.$notify.error({
					title: "添加失败",
					message: res.msg
					});
				} else {
					this.$notify({
						title: "添加成功!",
						type: "success",
						message: "刷新列表",
						duration: "800"
					});
					this.linkform = {id: "",fid: "",icon: "",name: "",url: "",info: "",}
					this.getLinksin(fid)
				}
				})
				.catch(error => {
				this.$notify.error({
					title: "错误 请检查",
					message: error
				});
			});
		},
		updateLink(fid,link){
			//传入folderID仅仅是为了更新后刷新列表
			var form = {
				id: link.id,
				fid: link.fid,
				icon: link.icon,
				name: link.name,
				url: link.url,
				info: link.info
			}
			linkService.updateLink(form).then((res) => {
				if (res.code > 0) {
					this.$notify.error({
					title: "更新失败",
					message: res.msg
					});
				} else {
					// 刷新列表
					this.getLinksin(fid)
					this.$notify({
						title: "更新成功!",
						type: "success",
						duration: "800"
					});
				}
				})
				.catch(error => {
				this.$notify.error({
					title: "错误 请检查",
					message: error
				});
			});
		},
		deleteLink(fid,link){
			this.linkform.fid = fid
			var form = {id: link.id}
			
			linkService.deleteLink(form).then((res) => {
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
					this.getLinksin(fid)
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

</style>