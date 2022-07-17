<template>
    <div>
        <!-- 添加 -->
        <el-row>
            <el-col :span="24">
                <el-card class="card" header="添加文件夹" shadow="hover">
                    <el-row justify="center" type="flex">
                        <el-col :span="8">图标</el-col>
                        <el-col :span="16">名称</el-col>
                        <el-col :span="8">排序</el-col>
                    </el-row>
                    <el-row :model="Folderform" justify="center" type="flex">
                        <el-col :span="6"
                        >
                            <el-input
                                v-model="Folderform.icon"
                                maxlength="30"
                                minlength="0"
                                placeholder="icon"
                                type="text"
                            >
                                <span slot="append" style="cursor: pointer;" @click="iconHandleFolder()">
                                    <i
                                        v-if="Folderform.icon"
                                        :class="'fa fa-' + Folderform.icon"
                                    ></i>
                                    <i v-else :class="'fa fa-hand-pointer-o'"></i>
                                </span>
                            </el-input>
                        </el-col>
                        <el-col :span="16"
                        >
                            <el-input
                                v-model="Folderform.name"
                                maxlength="8"
                                minlength="0"
                                placeholder="0-8字/过长不好看"
                                type="text"
                            ></el-input
                            >
                        </el-col>
                        <el-col :span="8">
                            <el-input-number
                                v-model="Folderform.weight"
                                :max="10"
                                :min="0"
                                label="越大越靠后"
                                style="width: 120px"
                            ></el-input-number>
                        </el-col>
                    </el-row>
                    <el-row justify="center" type="flex">
                        <el-col :span="8">密码</el-col>
                        <el-col :span="16">引导语</el-col>
                        <el-col :span="8">操作</el-col>
                    </el-row>
                    <el-row justify="center" type="flex">
                        <el-col :span="8">
                            <el-input
                                v-model="Folderform.password"
                                show-password
                                type="text"
                            ></el-input>
                        </el-col>
                        <el-col :span="16">
                            <el-input
                                v-model="Folderform.info"
                                maxlength="30"
                                placeholder="设置了密码后的文字提示"
                                show-word-limit
                                type="text"
                            ></el-input>
                        </el-col>
                        <el-col :span="8"
                        >
                            <el-button type="success" @click="createFolder()"
                            >添加
                            </el-button
                            >
                        </el-col
                        >
                    </el-row>
                </el-card>
            </el-col>
        </el-row>

        <!-- 修改 -->
        <el-divider>更新文件夹</el-divider>
        <div class="tips">
            <p>请以一条为单位更新 因为每次更新后会刷新列表</p>
            <p>文件夹密码: 1、本人登录状态下无需密码；2、密码为空则无需密码</p>
        </div>
        <el-table :data="Folders" stripe>
            <el-table-column label="图标" width="180">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.icon" type="text">
                        <span slot="append" style="cursor: pointer;" @click="iconHandleFolder(scope.row)">
                                    <i
                                        v-if="scope.row.icon"
                                        :class="'fa fa-' + scope.row.icon"
                                    ></i>
                                    <i v-else :class="'fa fa-hand-pointer-o'"></i>
                                </span>
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column label="名称" min-width="200">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.name" type="text"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="密码" min-width="100">
                <template slot-scope="scope">
                    <el-input
                        v-model="scope.row.password"
                        show-password
                        type="text"
                    ></el-input>
                </template>
            </el-table-column>
            <el-table-column label="引导语" min-width="100">
                <template slot-scope="scope">
                    <el-input
                        v-model="scope.row.info"
                        maxlength="30"
                        show-word-limit
                        type="text"
                    ></el-input>
                </template>
            </el-table-column>
            <el-table-column align="center" label="排序" width="120">
                <template slot-scope="scope">
                    <el-input-number
                        v-model="scope.row.weight"
                        :max="15"
                        :min="0"
                        label="越大越靠后"
                        size="mini"
                        style="width: 100px"
                    ></el-input-number>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="updateFolder(scope.row)"
                        >更新
                        </el-button
                        >
                        <el-button
                            size="mini"
                            type="danger"
                            @click="deleteFolder(scope.row)"
                        >删除
                        </el-button
                        >
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>


<script>
// import * as FolderAPI from '@/api/folder/'
import {folderService} from "@/common/api";

export default {
    props: ["userID", "Folders"],
    data() {
        return {
            uid: 0,
            Folderform: {
                id: "",
                name: "",
                icon: "",
                weight: 0,
            },
        };
    },
    methods: {
        createFolder() {
            folderService
                .createFolder(this.Folderform)
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
                            duration: "800",
                        });
                        this.Folderform = {name: "", icon: ""};
                        this.$parent.$parent.$parent.getFolder();
                    }
                })
                .catch((error) => {
                    this.$notify.error({
                        title: "错误 请检查",
                        message: error,
                    });
                });
        },
        updateFolder(FolderRow) {
            var form = {
                id: FolderRow.id,
                name: FolderRow.name,
                icon: FolderRow.icon,
                weight: FolderRow.weight,
                password: FolderRow.password,
                info: FolderRow.info,
            };
            folderService
                .updateFolder(form)
                .then((res) => {
                    if (res.code > 0) {
                        this.$notify.error({
                            title: "更新失败",
                            message: res.msg,
                        });
                    } else {
                        this.$notify({
                            title: "更新成功!",
                            type: "success",
                            duration: "800",
                        });
                        this.$parent.$parent.$parent.getFolder();
                    }
                })
                .catch((error) => {
                    this.$notify.error({
                        title: "错误 请检查",
                        message: error,
                    });
                });
        },
        deleteFolder(Folder) {
            var form = {id: Folder.id};

            folderService
                .deleteFolder(form)
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
                        this.$parent.$parent.$parent.getFolder();
                    }
                })
                .catch((error) => {
                    this.$notify.error({
                        title: "错误 请检查",
                        message: error,
                    });
                });
        },
        iconHandleFolder(content) {
            if (content) {
                this.$emit("chooseIcon", content);
                return;
            }
            this.$emit("chooseIcon", this.Folderform);
        },
    },
};
</script>

<style>
.onerow {
    margin: 5px auto 0;
}

.onerow:hover {
    margin: 5px auto 20px;
}

#bookmarks i {
    transform: translateX(-6px);
}
</style>