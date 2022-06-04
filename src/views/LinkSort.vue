<template>
    <div class="linksort">
        <el-collapse accordion v-model="FolderID" @change="getLinksin(FolderID)">
            <div v-for="Folder in Folders" :key="Folder.id">
                <el-collapse-item :name="Folder.id">
                    <!-- 这是文件夹名字 -->
                    <template slot="title">
                        {{ Folder.name }}
                    </template>

                    <!-- 这是文件夹里的内容 -->
                    <div>
                        拖动书签进行排序
                        <el-button type="text" @click="sortLink()">点击保存</el-button>
                        <el-tree
                            :props="defaultProps"
                            :data="links"
                            node-key="id"
                            draggable
                            :allow-drop="allowDrop"
                        >
                        </el-tree>
                    </div>
                </el-collapse-item>
            </div>
        </el-collapse>
    </div>
</template>

<script>

import {userService, folderService, linkService} from '@/common/api'

// import * as UserAPI from '@/api/user/'
// import * as FolderAPI from '@/api/folder/'
// import * as LinkAPI from '@/api/link/'

export default {
    data() {
        return {
            FolderID: "",
            uid: 0,
            Folders: [],
            links: [],
            defaultProps: {
                label: 'name'
            }
        };
    },
    methods: {
        getUser() {
            // 判断登录状态,若登录则取出当前userID和userName
            userService.UserMe().then((res) => {
                this.LoginCode = res.code
                if (this.LoginCode > 0) {
                    this.$message({
                        message: '请登录',
                        center: true,
                        showClose: true,
                        type: 'warning'
                    });
                    this.$router.push({name: 'ULogin'})
                } else {
                    folderService.getMyFolders().then((res) => {
                        this.Folders = res.data
                        this.Folders.sort(function (f1, f2) {
                            return f1.weight - f2.weight//weight
                        })
                    })
                }
            })
        },
        getLinksin(fid) {
            if (fid) {
                linkService.getLinksbyFolderID(fid).then((res) => {
                    this.links = res.data
                    this.links.sort(function (l1, l2) {
                        return l2.weight - l1.weight//weight
                    })
                })
            } else {
                // 折页关闭
            }
        },
        sortLink() {
            let l = this.links.length;
            for (let i = 0; i < l; ++i) {
                this.links[i].weight = l-i
            }
            var json = {
                links: this.links
            }
            linkService.sortLink(json).then((res) => {
                if (res.code > 0) {
                    this.$notify.error({
                        title: "保存失败",
                        message: res.msg
                    });
                } else {
                    this.$notify({
                        title: "排序保存成功!",
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
        allowDrop(draggingNode, dropNode, type) {
            return type !== 'inner';
        },
    },
    beforeMount() {
        this.getUser()
    }
};
</script>

<style scoped>
.linksort {
    margin: 20px auto;
    max-width: 400px;
}
</style>