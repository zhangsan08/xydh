<template>
    <el-dialog
        :visible.sync="visible"
        title="添加文件夹"
        append-to-body
        width="720"
        :before-close="handleClose"
    >
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
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="createFolder()">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import {folderService} from '@/common/api'
export default {
    props: {
        visible: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            Folderform: {
                id: '',
                name: '',
                icon: '',
                weight: 0,
            },
        }
    },
    methods: {
        handleClose() {
            this.$emit('close');
        },
        createFolder() {
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
                        this.handleClose()
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
}
</script>