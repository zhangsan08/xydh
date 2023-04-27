<template>
    <div class="welcome">
        <el-card class="card" shadow="hover">
            临时书签 放入文件夹后才可展示到导航站
            <iframe
                src="https://blog.csdn.net/qq_36726507/article/details/81138936"
                width="1000"
                height="300"
                style="zoom: 0.5"
            ></iframe>
            <el-table :data="tempLinks" height="360" stripe>
                <el-table-column label="名称" min-width="160">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.name" type="text"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="文件夹" min-width="130">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.fid">
                            <el-option
                                v-for="Folder in FoldersWithTemp"
                                :key="Folder.id"
                                :label="Folder.name"
                                :value="Folder.id"
                            ></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="链接" min-width="160">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.url" type="text"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="图标" width="150">
                    <template slot-scope="scope">
                        <el-row>
                            <el-input v-model="scope.row.icon" type="text">
                                <span slot="append" style="cursor: pointer" @click="iconHandle(scope.row)">
                                    <i v-if="scope.row.icon" :class="'fa fa-' + scope.row.icon"></i>
                                    <i v-else :class="'fa fa-hand-pointer-o'"></i>
                                </span>
                            </el-input>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column label="简介" min-width="180">
                    <template slot-scope="scope">
                        <el-input
                            v-model="scope.row.info"
                            placeholder="鼠标放上时的提示语(可为空)"
                            resize="none"
                            type="textarea"
                        ></el-input>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button-group>
                            <el-button
                                icon="el-icon-view"
                                size="small"
                                title="打开书签"
                                type="success"
                                @click="openLink(scope.row.url)"
                            ></el-button>
                            <el-button
                                icon="el-icon-edit"
                                size="small"
                                title="确认编辑"
                                type="primary"
                                @click="updateLink(scope.row)"
                            ></el-button>
                            <el-button
                                icon="el-icon-delete"
                                size="small"
                                title="删除书签"
                                type="danger"
                                @click="deleteLink(scope.row)"
                            ></el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-row>
            <el-col :sm="12" :xs="24">
                <el-card class="card" header="快捷添加书签秘钥" shadow="hover">
                    <div v-if="showjscode">
                        <div style="height: 10px"></div>
                        使用方法一：<br /><a :href="jscode">快捷添加书签</a> 拖住左边蓝字拖放至浏览器书签栏<br />
                        右侧有视频教程
                        <div style="height: 10px"></div>
                        方法二：手动复制下面这个代码到你的书签栏
                        <el-input v-model="jscode" rows="2" type="textarea"></el-input>
                        <div style="height: 10px"></div>
                        <el-link href="https://www.yuque.com/xydh/start/ky664n" rel="nofollow" target="_blank"
                            >方法二详细说明请点我查看
                        </el-link>
                        <br />
                        <el-link href="https://www.yuque.com/xydh/start/qgztd3" rel="nofollow" target="_blank"
                            >手机端玩法(iOS安卓均支持)
                        </el-link>
                    </div>
                    <div v-else>
                        <el-button round type="" @click="getJsToken()">点击生成快捷添加书签秘钥</el-button>
                    </div>
                </el-card>
            </el-col>
            <el-col :sm="12" :xs="24">
                <el-card class="card" header="快捷添加书签视频教程" shadow="hover">
                    <el-link href="https://www.bilibili.com/video/BV1tf4y1J7yz?zw" rel="nofollow" target="_blank"
                        >点击观看
                    </el-link>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {linkService, userService} from '@/common/api';

    export default {
        props: ['userID', 'FoldersWithTemp', 'tempLinks'],
        data() {
            return {
                showjscode: false,
                JsToken: 'xxxxxxxx',
                jscode: '***** 秘钥关联用户 请勿外传',
            };
        },
        methods: {
            getJsToken() {
                userService.JsToken().then(res => {
                    this.JsToken = res.data;
                    this.jscode =
                        "javascript:window.open('http://xydh.fun/api/v1/jsadd?token=" +
                        this.JsToken +
                        "&name='+document.title+'&url='+decodeURIComponent(location.href));void(0);";
                });
                this.showjscode = true;
            },
            openLink(link) {
                window.open(link, '_blank');
            },
            updateLink(link) {
                if (link.fid === 0) {
                    this.$notify.error({
                        title: '请选择一个文件夹',
                    });
                    return;
                }
                const form = {
                    id: link.id,
                    fid: link.fid,
                    icon: link.icon,
                    name: link.name,
                    url: link.url,
                    info: link.info,
                };
                linkService
                    .updateLink(form)
                    .then(res => {
                        if (res.code > 0) {
                            this.$notify.error({
                                title: '更新失败',
                                message: res.msg,
                            });
                        } else {
                            // 刷新列表
                            this.$parent.$parent.$parent.getTempLinks();
                            this.$notify({
                                title: '更新成功!',
                                type: 'success',
                                duration: '800',
                            });
                        }
                    })
                    .catch(error => {
                        this.$notify.error({
                            title: '错误 请检查',
                            message: error,
                        });
                    });
            },
            deleteLink(link) {
                const form = {id: link.id};
                linkService
                    .deleteLink(form)
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
                            this.$parent.$parent.$parent.getTempLinks();
                        }
                    })
                    .catch(error => {
                        this.$notify.error({
                            title: '错误 请检查',
                            message: error,
                        });
                    });
            },
            iconHandle(content) {
                if (content) {
                    this.$emit('chooseIcon', content);
                    return;
                }
                this.$emit('chooseIcon', this.linkform);
            },
        },
    };
</script>

<style scoped>
    .card {
        margin: 10px 10px;
    }
</style>
