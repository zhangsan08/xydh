<template>
    <div class="user_copy">
        <p>输入用户名</p>
        <p>
            <el-input type="text" v-model="username" style="width:200px"></el-input>
        </p>
        <el-button type="primary" @click="getAllSiteAndLinks(username)">抄作业</el-button>
        <br>
        <div v-if="Folders.length>0">
            <el-divider>他的小站信息</el-divider>
            <div v-if="bg">背景图：{{ bg }}
                <el-image style=" height: 100px" :src="bg" fit="scale-down"></el-image>
            </div>

            <div v-if="mobile_bg">竖版背景图：{{ mobile_bg }}
                <el-image style=" height: 100px" :src="mobile_bg" fit="scale-down"></el-image>
            </div>
            <div>音乐：暂不开放（这个需要么？社区告诉我）</div>

            <el-divider>他的书签</el-divider>
            <p>注意，每次只能选择对方的一个文件夹！</p>
            <el-table
                :data="Folders"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-table
                            :data="props.row.links"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column
                                label="名称"
                                width="200">
                                <template slot-scope="scope">{{ scope.row.name }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="url"
                                label="链接"
                                width="300"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                prop="info"
                                label="简介"
                                show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                        <br><br>
                        <el-row type="flex" justify="center">
                            <el-col :span="4">
                                <el-select v-model="folder_id" placeholder="选择导入文件夹">
                                    <el-option
                                        v-for="Folder in MyFolders"
                                        :key="Folder.id"
                                        :label="Folder.name"
                                        :value="Folder.id"
                                    ></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="4">
                                <el-button
                                    @click="createLinks()"
                                >我抄！
                                </el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column
                    label="文件夹"
                    prop="name">
                </el-table-column>
            </el-table>
        </div>
        <br><br><br><br>

    </div>
</template>

<script>
import {folderService, linkService, siteService} from '@/common/api'

// import * as UserAPI from '@/api/user/'
// import * as SiteAPI from '@/api/site/'

export default {
    data() {
        return {
            username: "",
            Folders: [],
            MyFolders: [],
            SiteInfo: {},
            bg: "",
            mobile_bg: "",
            music: {
                open: false,
                list: [],
            },
            multipleSelection: [],
            folder_id: "",
        }
    },
    methods: {
        // 取所有书签[文件夹、书签]
        getAllSiteAndLinks(username) {
            if (username === "") {
                this.$notify.error({
                    title: "请输入要抄的用户名",
                    message: "抄主站请输入xydh"
                });
                return
            }
            if (username === "xydh") {
                username = "admin"
            }
            siteService.getAllsiteandlinks(username).then((res) => {
                if (res.code > 0) {
                    this.$notify.error({
                        title: "请输入正确的用户名",
                    });
                } else {
                    const siteInfo = res.data.site_info;
                    this.bg = siteInfo.bg
                    this.mobile_bg = siteInfo.mobile_bg
                    this.Folders = res.data.folder_with_links
                    this.Folders.sort(function (f1, f2) {
                        return f1.weight - f2.weight//weight
                    })
                    folderService.getMyFolders().then((res) => {
                        this.MyFolders = res.data;
                        this.MyFolders.sort(function (f1, f2) {
                            return f1.weight - f2.weight; //weight
                        });
                    });
                }
            })
        },
        handleSelectionChange(val) {
            // 把勾选项加入数组
            this.multipleSelection = val;
            // console.log(this.multipleSelection)
        },
        createLinks() {
            if (this.folder_id === 0) {
                this.$notify.error({
                    title: "添加失败",
                    message: "请选择一个要导入的文件夹",
                });
                return
            }
            if (this.multipleSelection.length === 0) {
                this.$notify.error({
                    title: "添加失败",
                    message: "请选择要导入的书签",
                });
                return
            }
            const clearLinks = this.multipleSelection.map(
                // 抹掉脏数据
                item=>{
                    delete item.id
                    delete item.user_id
                    delete item.folder_id
                    return item
                }
            )
            var links = {
                'folder_id': this.folder_id,
                'links': clearLinks
            }
            linkService
                .createLinks(links)
                .then((res) => {
                    if (res.code > 0) {
                        this.$notify.error({
                            title: "添加失败",
                            message: res.msg,
                        });
                    } else {
                        this.$notify({
                            title: "添加成功!",
                            type: "success",
                            message: "请前往书签管理查看",
                            duration: "800",
                        });
                    }
                })
                .catch((error) => {
                    this.$notify.error({
                        title: "错误 请检查",
                        message: error,
                    });
                });
        },
    },
    beforeMount() {
        document.title = "抄作业";
    },
}
</script>

<style scoped>
.user_copy {
    /* margin: 0 auto; */
    text-align: center;
}
</style>