<template>
    <div class="user_copy">
        <div class="upload">
            <i class="el-icon-upload"></i>
            <div class="text">将导出的浏览器书签文件拖到此处，或<em>点击上传</em></div>
            <div class="fileName">{{ fileName }}</div>
            <input type="file" ref="fileInput" accept=".html,text/html" @change="onFileChange" />
        </div>
        <div v-if="Folders.length > 0">
            <el-row type="flex" :gutter="20" justify="center" class="selectFolder">
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
                <el-col :span="2">
                    <el-button @click="createweb()" type="primary">确定</el-button>
                </el-col>
                <el-col :span="6">
                    没有找到文件夹？
                    <el-button type="text" @click="visible = true">新建文件夹 </el-button>
                </el-col>
            </el-row>
            <div v-for="Folder in Folders" :key="Folder.name">
                <div v-if="Folder.web.length > 0">
                    <el-divider content-position="left">{{ Folder.name }}</el-divider>
                    <el-row type="flex" :gutter="50">
                        <el-checkbox-group v-model="multipleSelection" @change="handleCheckedCitiesChange">
                            <el-col :span="5" v-for="bookmark in Folder.web" :key="bookmark.name">
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
        </div>
        <AddFolderPopup :visible="visible" @close="handleClose"/>
    </div>
</template>

<script>
import {folderService, linkService} from '@/common/api';

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
            multipleSelection: [],
            folder_id: '',
            Folderform: {
                id: '',
                name: '',
                icon: '',
                weight: 0,
            },
            visible: false,
            fileName: '',
        };
    },
    beforeMount() {
        document.title = '书签导入';
    },
    mounted() {
        this.getAllSiteAndweb();
    },
    methods: {
        getAllSiteAndweb() {
            folderService.getMyFolders().then(res => {
                this.MyFolders = res.data;
                this.MyFolders.sort(function (f1, f2) {
                    return f1.weight - f2.weight; // weight
                });
            });
        },
        createweb() {
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
        handleClose(v) {
            if (v === 'succ') {
                this.getAllSiteAndweb();
            }
            this.visible = false;
        },
        onFileChange() {
            // 获取上传的文件
            const file = this.$refs.fileInput.files[0];
            // 获取上传文件的名称
            this.fileName = file.name;
            if (file.name.indexOf('.html') < 0) {
                // 不处理非html的文件类型
                return;
            }
            // 获取文件里面的文本信息
            file.text().then(res => {
                // 内容转成dom对象
                const doms = this.parseToDOM(res);
                for (const dom of doms) {
                    // 从dom对象中获取DL标签
                    if (dom.tagName === 'DL') {
                        const result = this.textHandle(dom, null);
                        const other = {
                            name: '收藏夹栏',
                            web: result.web,
                        };
                        this.Folders = this.flatten([other, ...result.children]);
                    }
                }
            });
        },
        flatten(arr) {
            const result = [];
            arr.forEach(item => {
                const { children, ...rest } = item;
                result.push(rest);
                if (children && children.length > 0) {
                    result.push(...this.flatten(children));
                }
            });
            return result;
        },

        /**
             *
             * @param dl
             * @param temp
             * @returns {*}
             */
        textHandle(dl, temp) {
            // 先获取DL 下面的DT
            const dts = this.getDts(dl);
            if (dts.length > 0) {
                // 判断DT下面是否有DL标签
                for (const i in dts) {
                    const dt = dts[i],
                        hdl = this.getTag(dt, 'DL');
                    if (hdl != null) {
                        let h = this.getTag(dt, 'H3');
                        let returns = this.textHandle(hdl, {
                            name: h.textContent,
                            children: [],
                            web: []
                        });
                        if (temp == null) {
                            temp = returns;
                        } else {
                            temp.children.push(returns);
                        }
                    } else {
                        var a = this.getTag(dt, 'A');
                        temp.web.push({
                            url: a.href,
                            name: a.textContent,
                            desc: a.textContent,
                            logo: a.getAttribute('ICON'),
                        });
                    }
                }
            }
            return temp;
        },

        /**
             * 获取dt下面的标签
             *
             * @param dl
             * @return
             */
        getTag(dt, tagname) {
            let dtcs = dt.children,
                obj = null;
            if (dtcs.length < 1) {
                return obj;
            }
            for (const dtc of dtcs) {
                if (dtc.tagName.toUpperCase() == tagname) {
                    obj = dtc;
                    break;
                }
            }
            return obj;
        },

        /**
             * 获取DL下面的DT标签
             * @param dl
             * @returns {[]}
             */
        getDts(dl) {
            const dlcs = dl.children,
                arr = [];
            if (dlcs.length < 1) {
                return arr;
            }
            for (const dlc of dlcs) {
                if (dlc.tagName.toUpperCase() == 'DT') {
                    arr.push(dlc);
                }
            }
            return arr;
        },

        /**
             * 把String转为DOM对象
             * @param str
             * @returns {NodeListOf<ChildNode>}
             */
        parseToDOM(str) {
            const div = document.createElement('div');
            if (typeof str === 'string') {
                div.innerHTML = str;
            }
            return div.childNodes;
        },
    },
};
</script>

<style scoped lang="less">
    .user_copy {
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
        .linkName {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .selectFolder {
            position: sticky;
            top: 0;
            padding: 10px 0;
            background: #fff;
            z-index: 99;
        }
        .upload {
            background: #f6f8f9;
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            box-sizing: border-box;
            width: 100%;
            height: 180px;
            text-align: center;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            input {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
            }
            i {
                font-size: 67px;
                color: #c0c4cc;
                margin: 40px 0 16px;
                line-height: 50px;
            }
            .text {
                color: #606266;
                font-size: 14px;
                text-align: center;
            }
            .fileName {
                color: #606266;
                font-size: 14px;
                text-align: center;
                margin-top: 10px;
            }
            em {
                color: #409eff;
                font-style: normal;
            }
        }
    }
</style>

