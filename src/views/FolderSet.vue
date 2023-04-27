<template>
    <div>
        <el-dialog :visible.sync="visible" title="添加文件夹" append-to-body width="720">
            <el-form ref="form" :model="Folderform" label-width="80px" label-position="left">
                <el-form-item label="图标">
                    <el-row type="flex" justify="space-between">
                        <el-col :span="20">
                            <el-input
                                v-model="Folderform.icon"
                                type="text"
                                minlength="0"
                                maxlength="30"
                                placeholder="icon"
                            />
                        </el-col>
                        <el-col :span="2">
                            <el-button title="选择图标" @click="iconHandleFolder()">
                                <i v-if="Folderform.icon" :class="'fa fa-' + Folderform.icon" />
                                <i v-else :class="'fa fa-hand-pointer-o'" />
                            </el-button>
                        </el-col>
                        <el-row />
                    </el-row>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input
                        v-model="Folderform.name"
                        type="text"
                        minlength="0"
                        maxlength="8"
                        placeholder="0-8字/过长不好看"
                    />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="Folderform.password" type="text" show-password />
                </el-form-item>
                <el-form-item label="引导语">
                    <el-input
                        v-model="Folderform.info"
                        type="text"
                        maxlength="30"
                        placeholder="设置了密码后的文字提示"
                        show-word-limit
                    />
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number
                        style="width: 120px"
                        v-model="Folderform.weight"
                        :min="0"
                        :max="10"
                        label="越大越靠后"
                    ></el-input-number>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="createFolder()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改 -->
        <div class="tips">
            <p>请以一条为单位更新 因为每次更新后会刷新列表</p>
            <p>文件夹密码: 1、本人登录状态下无需密码；2、密码为空则无需密码</p>
            <div class="primaryButton">
                <el-button type="primary" @click="visible = true"> 添加文件夹 </el-button>
                <el-button type="primary" @click="isSort = true" v-if="!isSort"> 点击排序 </el-button>
                <el-button type="primary" @click="sortConfirm" v-else> 确定 </el-button>
            </div>
        </div>

        <el-table ref="table" :data="tableData" stripe row-key="id">
            <el-table-column label="排序" width="50" v-if="isSort">
                <div class="el-rank">
                    <i class="el-icon-rank" />
                </div>
            </el-table-column>
            <el-table-column label="图标名称" width="140">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.icon" type="text" />
                </template>
            </el-table-column>
            <el-table-column label="选择图标" width="100">
                <template slot-scope="scope">
                    <el-button id="bookmarks" title="选择图标" style="width: 40px" @click="iconHandleFolder(scope.row)">
                        <i v-if="scope.row.icon" :class="'fa fa-' + scope.row.icon" />
                        <i v-else :class="'fa fa-hand-pointer-o'" />
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="文件夹名称" min-width="200">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.name" type="text" />
                </template>
            </el-table-column>
            <el-table-column label="是否加密"  width="100">
                <template>
                    <i class="el-icon-lock" />
                </template>
            </el-table-column>
            <!-- <el-table-column label="密码" min-width="100">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.password" type="text" show-password />
                </template>
            </el-table-column>
            <el-table-column label="引导语" min-width="100">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.info" type="text" maxlength="30" show-word-limit />
                </template>
            </el-table-column> -->
            <!-- <el-table-column align="center" label="排序" width="120">
                <template slot-scope="scope">
                    <el-input-number
                        v-model="scope.row.weight"
                        size="mini"
                        style="width: 100px"
                        :min="0"
                        :max="15"
                        label="越大越靠后"
                    />
                </template>
            </el-table-column> -->
            <el-table-column fixed="right" label="操作" width="250">
                <template slot-scope="scope">
                    <el-link icon="el-icon-refresh"  type="primary" @click="updateFolder(scope.row)">更新</el-link>
                    <el-divider direction="vertical"></el-divider>
                    <el-link icon="el-icon-delete"  type="primary" @click="updateFolder(scope.row)">删除</el-link>
                    <el-divider direction="vertical"></el-divider>
                    <el-link icon="el-icon-setting"  type="primary" @click="updateFolder(scope.row)">设置密码</el-link>
                </template>
            </el-table-column>
        </el-table>
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
            const sortId = this.tableData.map((item) => {return item.id})
            this.isSort = false
            console.log(sortId);
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
    }
    .primaryButton {
        margin: 15px 0;
    }
</style>
