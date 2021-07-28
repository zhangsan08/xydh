<template>
    <div class="linksort">
        <p>
            肝不动了。界面丑了点。仅支持电脑端操作。凑合用吧。书签排序属于批量写入，即使你只改变某一个书签的位置，带来的也是全部书签的改写操作。大家尽量一次性改好顺序。不要一直改了。真的没钱再给服务器升配了。有能力的请用金钱羞辱我，谢谢！</p>
        <el-collapse accordion v-model="FolderID" @change="getLinksin(FolderID)" v-loading="loading">
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
            loading: false,
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
            // 这样只在折页打开时执行
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 500);
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
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 2000);
            var json = {
                list: this.links
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