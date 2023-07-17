<template>
    <div class="user_copy">
        <br />
        <div>
            <span>用户名</span>
            <span class="input">
                <el-input type="text" v-model="username" style="width: 200px"></el-input>
            </span>
            <el-button type="primary" @click="getAllSiteAndLinks(username)">搜索</el-button>
        </div>
        <br />
        <div v-if="Folders.length > 0">
            <el-divider>他的小站信息</el-divider>
            <div v-if="bg">横版背景图：{{ bg }}</div>
            <div v-if="mobile_bg">竖版背景图：{{ mobile_bg }}</div>
            <el-divider></el-divider>
            <div class="selectFolder">
                <el-select v-model="folder_id" placeholder="选择导入文件夹" class="input">
                    <el-option
                        v-for="Folder in MyFolders"
                        :key="Folder.id"
                        :label="Folder.name"
                        :value="Folder.id"
                    ></el-option>
                </el-select>
                <el-button @click="createLinks()" type="primary">抄作业</el-button>
                <span class="input"> 没有找到文件夹？</span>
                <el-button type="text" @click="visible = true">新建文件夹 </el-button>
            </div>
            <div v-for="Folder in Folders" :key="Folder.id">
                <el-divider content-position="left">{{ Folder.name }}</el-divider>
                <el-row type="flex" :gutter="50">
                    <el-checkbox-group v-model="multipleSelection">
                        <el-col :span="4" v-for="bookmark in Folder.links" :key="bookmark.id">
                            <el-checkbox :label="bookmark">
                                <div class="linkName">
                                    {{ bookmark.name || '--' }}
                                </div>
                            </el-checkbox>
                        </el-col>
                    </el-checkbox-group>
                </el-row>
            </div>
        </div>
        <AddFolderPopup :visible="visible" @close="handleClose" />
    </div>
</template>

<script>
import {folderService, linkService, siteService} from '@/common/api';
import AddFolderPopup from '@/components/AddFolderPopup.vue';
export default {
    components: {
        AddFolderPopup,
    },
    data() {
        return {
            username: '',
            Folders: [],
            MyFolders: [],
            SiteInfo: {},
            bg: '',
            mobile_bg: '',
            multipleSelection: [],
            folder_id: '',
            Folderform: {
                id: '',
                name: '',
                icon: '',
                weight: 0,
            },
            visible: false,
        };
    },
    beforeMount() {
        document.title = '抄作业';
    },
    methods: {
        handleClose(v) {
            if (v === 'succ') {
                this.getAllSiteAndweb();
            }
            this.visible = false;
        },
        getAllSiteAndweb() {
            folderService.getMyFolders().then(res => {
                this.MyFolders = res.data;
                this.MyFolders.sort(function (f1, f2) {
                    return f1.weight - f2.weight; // weight
                });
            });
        },
        // 取所有书签[文件夹、书签]
        getAllSiteAndLinks(username) {
            if (username === '') {
                this.$notify.error({
                    title: '请输入要抄的用户名',
                    message: '抄主站请输入xydh',
                });
                return;
            }
            if (username === 'xydh') {
                username = 'admin';
            }
            siteService.getAllsiteandlinks(username).then(res => {
                if (res.code > 0) {
                    this.$notify.error({
                        title: '请输入正确的用户名',
                    });
                } else {
                    const siteInfo = res.data.site_info;
                    this.bg = siteInfo.bg;
                    this.mobile_bg = siteInfo.mobile_bg;
                    this.Folders = res.data.folder_with_links;
                    this.Folders.sort(function (f1, f2) {
                        return f1.weight - f2.weight; // weight
                    });
                    this.getAllSiteAndweb();
                }
            });
        },
        createLinks() {
            if (this.folder_id === 0) {
                this.$notify.error({
                    title: '添加失败',
                    message: '请选择一个要导入的文件夹',
                });
                return;
            }
            if (this.multipleSelection.length === 0) {
                this.$notify.error({
                    title: '添加失败',
                    message: '请选择要导入的书签',
                });
                return;
            }
            const clearLinks = this.multipleSelection.map(
                // 抹掉脏数据
                item => {
                    delete item.id;
                    delete item.user_id;
                    delete item.folder_id;
                    return item;
                }
            );
            var links = {
                folder_id: this.folder_id,
                links: clearLinks,
            };
            linkService
                .createLinks(links)
                .then(res => {
                    if (res.code > 0) {
                        this.$notify.error({
                            title: '添加失败',
                            message: res.msg,
                        });
                    } else {
                        this.$notify({
                            title: '添加成功!',
                            type: 'success',
                            message: '请前往书签管理查看',
                            duration: '800',
                        });
                        this.multipleSelection = [];
                    }
                })
                .catch(error => {
                    this.$notify.error({
                        title: '错误 请检查',
                        message: error,
                    });
                });
        },
    },
};
</script>

<style scoped lang="less">
    .user_copy {
        /* margin: 0 auto; */
        text-align: center;
        min-width: 800px;
        /deep/ .expanded {
            background: #f6f8f9;
        }
        /deep/ .el-checkbox {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            width: 100%;
            font-weight: normal;
        }
        /deep/ .el-checkbox__label {
            width: 100%;
        }
        /deep/ .el-checkbox-group {
            width: 100%;
        }
        .selectFolder {
            position: sticky;
            top: 0;
            padding: 10px 0;
            background: #fff;
            z-index: 99;
        }
        .linkName {
            text-align: left;
        }
        .input {
            margin: 0 20px;
        }
    }
</style>
