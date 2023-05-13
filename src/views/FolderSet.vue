<template>
    <div>
        <el-card class="card" >
            <div slot="header" class="clearfix">
                <span>新增文件夹</span>
            </div>
            <el-row :gutter="20">
                <el-form ref="form" label-width="60px">
                    <el-col :span="5">
                        <el-form-item label="图标">
                            <el-input
                                v-model="Folderform.icon"
                                maxlength="30"
                                minlength="0"
                                placeholder="icon"
                                type="text"
                            >
                                <span slot="append" @click="iconHandleFolder()">
                                    <i
                                        v-if="Folderform.icon"
                                        :class="'fa fa-' + Folderform.icon"
                                    ></i>
                                    <i v-else :class="'fa fa-hand-pointer-o'"></i>
                                </span>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="名称">
                            <el-input
                                v-model="Folderform.name"
                                maxlength="8"
                                minlength="0"
                                placeholder="0-8字/过长不好看"
                                type="text"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="密码">
                            <el-input
                                v-model="Folderform.password"
                                show-password
                                type="text"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="引导语">
                            <el-input
                                v-model="Folderform.info"
                                maxlength="30"
                                placeholder="设置了密码后的文字提示"
                                show-word-limit
                                type="text"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <el-row type="flex" class="row-bg" justify="end">
                <el-button
                    type="primary"
                    @click="createFolder()"
                >点击添加
                </el-button>
            </el-row>

        </el-card>
        <el-card class="card" >
            <div slot="header" class="clearfix">
                <span>修改文件夹</span>
            </div>
            <!-- 修改 -->
            <div class="tips">
                <p>请以一条为单位更新 因为每次更新后会刷新列表</p>
                <p>文件夹密码: 1、本人登录状态下无需密码；2、密码为空则无需密码</p>
            </div>
            <div class="primaryButton">
                <el-button type="primary" size='medium' @click="isSort = true" v-if="!isSort"> 点击排序 </el-button>
                <el-button type="primary"  size='medium' @click="sortConfirm" v-else> 确定 </el-button>
            </div>
            <el-table
                ref="table"
                :data="tableData"
                stripe
                row-key="id"
            >
                <el-table-column label="排序" width="50" v-if="isSort">
                    <div class="el-rank">
                        <i class="el-icon-rank" />
                    </div>
                </el-table-column>
                <el-table-column label="图标" width="230" >
                    <template slot-scope="scope" >
                        <el-input v-model="scope.row.icon" type="text" :disabled="isSort">
                            <span slot="append" style="cursor: pointer;" class="append" @click="iconHandleFolder(scope.row)">
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
                        <el-input v-model="scope.row.name" type="text" :disabled="isSort"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="密码" min-width="100">
                    <template slot-scope="scope">
                        <el-input
                            v-model="scope.row.password"
                            show-password
                            type="text"
                            :disabled="isSort"
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
                            :disabled="isSort"
                        ></el-input>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150" >
                    <template slot-scope="scope">
                        <el-button-group >
                            <el-button
                                size="mini"
                                type="primary"
                                @click="updateFolder(scope.row)"
                                :disabled="isSort"
                            >更新
                            </el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="deleteFolder(scope.row)"
                                :disabled="isSort"
                            >删除
                            </el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
// import * as FolderAPI from '@/api/folder/'
import {folderService} from '@/common/api';
import Sortable from 'sortablejs';

export default {
    props: ['userID', 'Folders'],
    data() {
        return {
            uid: 0,
            Folderform: {
                id: '',
                name: '',
                icon: '',
                weight: 0,
            },
            visible: false,
            sortable: null,
            newList: [],
            tableData: [],
            isSort: false,
        };
    },
    watch: {
        Folders() {
            this.tableData = this.Folders;
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.rowDrop();
        });
    },
    methods: {
        sortConfirm() {
            const sortId = this.tableData.map((item, index) => {item.weight = index; return item})
            this.isSort = false
            console.log(sortId);
            folderService
                .updateFolders({folders: sortId})
                .then(res => {
                    console.log(res);
                    if (res.code === 0) {
                        this.$message({
                            message: '排序修改成功~',
                            type: 'success',
                            center: true
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error',
                            center: true
                        });
                    }
                })
                .catch(error => {
                    this.$message({
                        message: error,
                        type: 'error',
                        center: true
                    });
                });
        },
        rowDrop() {
            const tableBody = this.$refs.table.$el.querySelector('.el-table__body-wrapper tbody');
            this.sortable = Sortable.create(tableBody, {
                animation: 150,
                handle: '.el-rank',
                onEnd: evt => {
                    const item = this.tableData.splice(evt.oldIndex, 1)[0];
                    this.tableData.splice(evt.newIndex, 0, item);
                },
            });
        },
        createFolder() {
            this.visible = true;
            folderService
                .createFolder(this.Folderform)
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
                            duration: '800',
                        });
                        this.Folderform = {name: '', icon: ''};
                        this.$parent.$parent.$parent.getFolder();
                    }
                })
                .catch(error => {
                    this.$notify.error({
                        title: '错误 请检查',
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
                .then(res => {
                    if (res.code > 0) {
                        this.$notify.error({
                            title: '更新失败',
                            message: res.msg,
                        });
                    } else {
                        this.$notify({
                            title: '更新成功!',
                            type: 'success',
                            duration: '800',
                        });
                        this.$parent.$parent.$parent.getFolder();
                    }
                })
                .catch(error => {
                    this.$notify.error({
                        title: '错误 请检查',
                        message: error,
                    });
                });
        },
        deleteFolder(Folder) {
            var form = {id: Folder.id};

            folderService
                .deleteFolder(form)
                .then(res => {
                    if (res.code > 0) {
                        this.$notify.error({
                            title: '删除失败',
                            message: res.msg,
                        });
                    } else {
                        this.$notify({
                            title: '删除成功!',
                            type: 'success',
                            duration: '800',
                        });
                        this.$parent.$parent.$parent.getFolder();
                    }
                })
                .catch(error => {
                    this.$notify.error({
                        title: '错误 请检查',
                        message: error,
                    });
                });
        },
        iconHandleFolder(content) {
            if (content) {
                this.$emit('chooseIcon', content);
                return;
            }
            this.$emit('chooseIcon', this.Folderform);
        },
    },
};
</script>

<style scoped>
    .onerow {
        margin: 5px auto 0;
    }

    .onerow:hover {
        margin: 5px auto 20px;
    }

    #bookmarks i {
        transform: translateX(-6px);
    }
    .tips {
        background: #f6f8f9;
        border-radius: 8px;
        cursor: default;
        padding: 15px 20px;
        color: #666;
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        list-style-type: none;
        padding-bottom: 2px;
            margin: 15px 0;
    }
    .primaryButton {
        margin: 15px 0;
        text-align: right;
    }
    .append{
        width: 14px;
        display: inline-block;
        cursor: pointer;
    }
    .card{
        margin-bottom: 20px;
    }
    .clearfix{
        text-align: left;
    }
</style>

