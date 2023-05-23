<template>
    <div>
        <!-- 添加 -->
        <div style="color:red">隐私与法律免责声明: 你所添加的每一个链接都将负法律责任</div>
        <el-divider>手动添加书签 | <a target='_blank' rel='nofollow' href='https://www.bilibili.com/video/BV1tf4y1J7yz/'>快速加书签必看教程</a>
        </el-divider>
        <el-card shadow="hover" class="card" :model="linkform">

            <el-row type="flex" justify="center">
                <el-col :span="8">名称</el-col>
                <el-col :span="16">链接</el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col
                    :span="8"
                >
                    <el-input
                        type="text"
                        v-model="linkform.name"
                        minlength="0"
                        maxlength="12"
                        placeholder="0-8字/过长不好看"
                    ></el-input>
                </el-col>
                <el-col
                    :span="16"
                >
                    <el-input
                        type="text"
                        v-model="linkform.url"
                        minlength="0"
                        maxlength="100"
                        placeholder="http开头"
                    ></el-input>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="6">图标</el-col>
                <el-col :span="10">介绍</el-col>
                <el-col :span="4">文件夹</el-col>
                <el-col :span="4">添加</el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col
                    :span="4"
                >
                    <el-input
                        type="text"
                        v-model="linkform.icon"
                        placeholder="可为空"
                    ></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button @click="iconHandleLink()" title="选择图标">
                        <i :class="'fa fa-' + linkform.icon" v-if="linkform.icon"></i>
                        <i :class="'fa fa-hand-pointer-o'" v-else></i>
                    </el-button>
                </el-col>
                <el-col
                    :span="10"
                >
                    <el-input
                        type="text"
                        v-model="linkform.info"
                        minlength="0"
                        maxlength="25"
                        placeholder="鼠标经过时的提示语,可用于站内搜索"
                    ></el-input>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="linkform.fid" placeholder="请选择">
                        <el-option
                            v-for="Folder in Folders"
                            :key="Folder.id"
                            :label="Folder.name"
                            :value="Folder.id"
                        ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-button
                        size="small"
                        type="success"
                        icon="el-icon-plus"
                        @click="createLink()"
                        circle
                    ></el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-divider><a target='_blank' rel='nofollow' href='../u/ImportBookmarks'>导入浏览器书签</a>
        </el-divider>
        <!-- 更删 -->
        <el-divider>更新书签 | 选择文件夹</el-divider>
        <!--        文件夹列表-->
        <div class="mainbox">
            <div
                v-for="Folder in Folders"
                :key="Folder.id"
                :id="Folder.id"
                @click="getLinksIn(Folder.id)"
            >
                <span v-if="Folder.icon">
                    <i :class="'fa fa-' + Folder.icon"></i>{{ Folder.name }}
                </span>
                <span v-else>{{ Folder.name }}</span>
            </div>
        </div>
        <!--        书签列表-->
        <div class="bookmarkcard">
            <div class="marklist" v-if="links.length!==0">
                <el-table :data="links" v-if="!isSorting" stripe>
                    <el-table-column label="图标" width="150">
                        <template slot-scope="scope">
                            <el-input type="text" v-model="scope.row.icon">
                                <span slot="append" style="cursor: pointer;" @click="iconHandleLink(scope.row)">
                                    <i
                                        v-if="scope.row.icon"
                                        :class="'fa fa-' + scope.row.icon"
                                    ></i>
                                    <i v-else :class="'fa fa-hand-pointer-o'"></i>
                                </span>
                            </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" min-width="160">
                        <template slot-scope="scope">
                            <el-input type="text" v-model="scope.row.name"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="链接" min-width="160">
                        <template slot-scope="scope">
                            <el-input type="text" v-model="scope.row.url"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="简介" min-width="180">
                        <template slot-scope="scope">
                            <el-input
                                type="textarea"
                                resize="none"
                                v-model="scope.row.info"
                                placeholder="鼠标经过时的提示语,可用于站内搜索"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="文件夹" min-width="130">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.fid">
                                <el-option
                                    v-for="Folder in Folders"
                                    :key="Folder.id"
                                    :label="Folder.name"
                                    :value="Folder.id"
                                ></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button-group>
                                <el-button
                                    title="打开书签"
                                    size="small"
                                    type="success"
                                    icon="el-icon-view"
                                    @click="openLink(scope.row.url)"
                                ></el-button>
                                <el-button
                                    title="删除书签"
                                    size="small"
                                    type="danger"
                                    icon="el-icon-delete"
                                    @click="deleteLink(scope.row)"
                                ></el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
                <el-table
                    :data="links"
                    row-key="id"
                    v-if="isSorting"
                    class="sort_table"
                    border
                    stripe
                >
                    <el-table-column label="名称">
                        <template slot-scope="scope">
                            {{scope.row.name}}
                        </template>
                    </el-table-column>
                </el-table>
                <div class="floatOnTop">
                    <el-button type="primary" round v-if="!isSorting" @click="beforeSorting()">调整顺序</el-button>
                    <el-button type="primary" round v-if="isSorting" @click="cancelSorting()">退出排序</el-button>
                    <el-button type="primary" round @click="updateLinks()">保存变更</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import * as FolderAPI from '@/api/folder/'
// import * as LinkAPI from '@/api/link/'

import {linkService} from "@/common/api";
import Sortable from "sortablejs";

export default {
    props: ["userID", "Folders"],
    data() {
        return {
            loading: false,
            SelectedFolderID: "",
            uid: 0,
            rigthnowPage: 0,
            links: [],
            toSortLinks: [],
            isSorting: false,
            linkform: {
                id: "",
                fid: "",
                icon: "",
                name: "",
                url: "",
                info: "",
            },
        };
    },
    computed: {
        pageCount() {
            return this.Folders.length;
        },
    },
    methods: {
        getLinksIn(fid) {
            this.SelectedFolderID = fid
            this.ChooseFolder(fid);
            linkService.getLinksbyFolderID(fid).then((res) => {
                if (res.data) {
                    this.links = res.data;
                    this.links.sort(function (l1, l2) {
                        return l2.weight - l1.weight; // weight
                    });
                } else {
                    this.links = [];
                }
            });
        },
        beforeSorting() {
            this.isSorting = true
            const _this = this
            const tbody = document.querySelector(".marklist tbody");
            Sortable.create(tbody, {
                onEnd({newIndex, oldIndex}) {
                    const currRow = _this.links.splice(oldIndex, 1)[0];
                    _this.links.splice(newIndex, 0, currRow);
                }
            });
        },
        cancelSorting() {
            this.isSorting = false
        },
        createLink() {
            if (this.linkform.fid === "") {
                this.$notify.error({
                    title: "请选择一个文件夹",
                });
                return
            }
            linkService
                .createLink(this.linkform)
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
                            message: "刷新列表",
                            duration: "800",
                        });
                        this.linkform = {
                            id: "",
                            fid: this.linkform.fid,
                            icon: "",
                            name: "",
                            url: "",
                            info: "",
                        };
                        this.getLinksIn(this.linkform.fid);
                    }
                })
                .catch((error) => {
                    this.$notify.error({
                        title: "错误 请检查",
                        message: error,
                    });
                });
        },
        updateLinks() {
            let i = 0, l = this.links.length;
            for (; i < l; i++) {
                this.links[i].weight = l - i
            }
            const jsonData = {
                links: this.links
            };
            linkService.updateLinks(jsonData).then((res) => {
                if (res.code > 0) {
                    this.$notify.error({
                        title: "更新失败",
                        message: res.msg,
                    });
                } else {
                    this.$alert("更新成功")
                    // 刷新列表
                    this.getLinksIn(this.SelectedFolderID);
                }
            })
                .catch((error) => {
                    this.$notify.error({
                        title: "错误 请检查",
                        message: error,
                    });
                });
        },
        deleteLink(link) {
            this.linkform.fid = link.fid;
            var form = {id: link.id};
            linkService
                .deleteLink(form)
                .then((res) => {
                    if (res.code > 0) {
                        this.$notify.error({
                            title: "删除失败",
                            message: res.msg,
                        });
                    } else {
                        this.$notify({
                            title: "删除成功!",
                            type: "success",
                            duration: "800",
                        });
                        this.getLinksIn(link.fid);
                    }
                })
                .catch((error) => {
                    this.$notify.error({
                        title: "错误 请检查",
                        message: error,
                    });
                });
        },
        openLink(link) {
            window.open(link, "_blank");
        },
        iconHandleLink(content) {
            if (content) {
                this.$emit("chooseIcon", content);
                return;
            }
            this.$emit("chooseIcon", this.linkform);
        },
        ChooseFolder(id) {
            // 选中文件夹后样式的变化
            const divs = document.querySelector(".mainbox").querySelectorAll("div");
            Array.from(divs).filter(function (element) {
                element.className = "";
                if (element.id === id.toString()) {
                    element.className = "aim";
                }
            });
        },
    }
};
</script>

<style scoped>
#bookmarks i i {
    transform: translateX(-6px);
}

.mainbox {
    display: table-cell;
    position: relative;
    align-items: center;
    /* height: 150px; */
}

.mainbox div {
    float: left;
    box-sizing: border-box;
    height: 30px;
    /* line-height: 20px; */
    transform: translate(0, 0);
    border: 0.3px solid #ccc;
    border-radius: 8px;
    padding: 0 10px;
    cursor: pointer;
    background-color: #fff;
    color: #ccc;
    margin: 5px 5px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.mainbox div:hover {
    border: 2px solid wheat;
}

.mainbox .aim {
    border: 1px solid #000;
    color: white;
    background: black;
}

.bookmarkcard {
    display: flex;
    box-sizing: border-box;
    min-height: 173px;
    width: 100%;
}

.marklist {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}

.floatOnTop {
    margin: 0 auto;
    text-align: center;
    bottom: 10px;
    position: fixed;
    z-index: 99;
    width: 100%;
}

.sort_table {
    width: 50%;
}
</style>