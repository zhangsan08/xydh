<template>
    <div>
        <el-dialog
            :visible.sync="visible"
            title="添加文件夹"
            append-to-body
            width="600px"
            :before-close="handleClose"
        >
            <el-form
                ref="form"
                :model="Folderform"
                label-width="80px"
                label-position="left"
                :rules="rules"
            >
                <el-form-item label="图标" prop="icon">
                    <el-row type="flex" justify="space-between">
                        <el-col :span="18">
                            <el-input
                                v-model="Folderform.icon"
                                type="text"
                                minlength="0"
                                maxlength="30"
                                placeholder="icon"
                            />
                        </el-col>
                        <el-col :span="4">
                            <el-button title="选择图标" @click="iconHandleFolder" style="width: 100%">
                                <i v-if="Folderform.icon" :class="'fa fa-' + Folderform.icon" />
                                <i v-else :class="'fa fa-hand-pointer-o'" />
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="名称" prop="name">
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
        <el-dialog :visible.sync="dialogIconVisible" title="选择图标" append-to-body width="70%">
            <ICON @callback="chooseCallback"></ICON>
        </el-dialog>
    </div>
</template>

<script>
import {folderService} from '@/common/api';
import ICON from '@/components/icon.vue';

export default {
    components: {
        ICON,
    },
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            Folderform: {
                id: '',
                name: '',
                icon: '',
                weight: 0,
            },
            dialogIconVisible: false, // 弹窗visible状态
            iconObj: {},
            rules: {
                name: [{required: true, message: '请输入名称', trigger: 'blur'}],
            },
        };
    },
    methods: {
        iconHandleFolder() {
            this.dialogIconVisible = true;
        },
        chooseCallback(res) {
            this.Folderform.icon = res;
            this.dialogIconVisible = false;
        },
        handleClose() {
            this.$refs.form.resetFields();
            this.$emit('close');
        },
        createFolder() {
            this.$refs.form.validate(valid => {
                if (valid) {
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
                                this.$refs.form.resetFields();
                                this.$emit('close', 'succ');
                            }
                        })
                        .catch(error => {
                            this.$notify.error({
                                title: '错误 请检查',
                                message: error,
                            });
                        });
                }
            });

        },
    },
};
</script>
