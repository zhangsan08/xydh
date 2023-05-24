<template>
    <div class="welcome">
        <el-row>
            <el-col :sm="12" :xs="24">
                <el-card class="card" header="您的专属链接" shadow="hover">
                    <el-link
                        v-if="username"
                        style="font-size: 20px"
                        type="primary"
                        target="_blank"
                        :href="'https://xydh.fun/' + username"
                    >https://xydh.fun/{{ username }}</el-link>
                    <div style="font-size: 17px">
                        <div>文件夹容量:[{{userAllInfo.max_folder}}]  书签容量:[{{userAllInfo.max_link}}]
                            <span><el-link
                                type="primary"
                                target="_blank"
                                href="../u/vip"
                            >扩容</el-link></span>
                            <span v-if="userAllInfo.is_vip">
                                <span> VIP到期时间:</span> [{{ userAllInfo.vip_time }}]</span>

                        </div>

                        <p><el-link type="primary" @click="logout" >退出登录</el-link></p>
                    </div>
                </el-card>
            </el-col>
            <el-col :sm="12" :xs="24">
                <el-card class="card" header="社群" shadow="hover">

                    <span><el-link
                        type="primary"
                        target="_blank"
                        href=" https://docs.qq.com/doc/DQXJKbkplRUtORGFI"
                    >点击加入微信群</el-link></span>
                    <p><el-link
                        type="primary"
                        target="_blank"
                        href="https://pic1.58cdn.com.cn/nowater/webim/big/n_v27b7aa70b649d4943b27cb7399f44d8a6.png"
                    >iLinks 高质量知识星球</el-link></p>

                    <!--                    <div><img src="https://pic1.58cdn.com.cn/nowater/webim/big/n_v27b7aa70b649d4943b27cb7399f44d8a6.png" alt="知识星球" height="200px"></div>-->
                </el-card>
            </el-col>
        </el-row>
        <el-card class="card" shadow="hover" ref="filterTable" v-if="tempLinks?.length>0">
            临时书签 放入文件夹后才可展示到导航站
            <el-table
                :data="tempLinks"
                height="360"
                stripe
            >
                <div v-if="tempLinks?.length>0">
                    <el-table-column label="名称" min-width="160" >
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
                                    <span slot="append" style="cursor: pointer;" @click="iconHandle(scope.row)">
                                        <i
                                            v-if="scope.row.icon"
                                            :class="'fa fa-' + scope.row.icon"
                                        ></i>
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
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="150"
                    >
                        <template slot-scope="scope">
                            <el-button-group>
                                <el-button
                                    icon="el-icon-view"
                                    size="small"
                                    title="打开书签"
                                    type="success"
                                    @click="openIframe(scope.row.url)"
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
                </div>
            </el-table>
        </el-card>
        <el-dialog title="预览" :visible.sync="dialogTableVisible" width='1180px' :close="closeIframe">
            <div class="iframeTips">网页加载可能存在延迟,如遇加载不出 <el-button type="primary" size='mini' @click="openLink">点击跳转</el-button></div>
            <iframe class="iframe" :src="linkUrl" :key="linkUrl"/>
        </el-dialog>
        <el-row>
            <el-col :sm="12" :xs="24">
                <el-card class="card" header="快捷添加书签秘钥" shadow="hover">
                    <div v-if="showjscode">
                        <div style="height: 10px"></div>
                        使用方法一：<br/><a :href="jscode">快捷添加书签</a>
                        拖住左边蓝字拖放至浏览器书签栏<br/>
                        右侧有视频教程
                        <div style="height: 10px"></div>
                        方法二：手动复制下面这个代码到你的书签栏
                        <el-input v-model="jscode" rows="2" type="textarea"></el-input>
                        <div style="height: 10px"></div>
                        <el-link
                            href="https://www.yuque.com/xydh/start/ky664n"
                            rel="nofollow"
                            target="_blank"
                        >方法二详细说明请点我查看
                        </el-link>
                        <br/>
                        <el-link
                            href="https://www.yuque.com/xydh/start/qgztd3"
                            rel="nofollow"
                            target="_blank"
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
                    <el-link
                        href="https://www.bilibili.com/video/BV1tf4y1J7yz?zw"
                        rel="nofollow"
                        target="_blank"
                    >点击观看
                    </el-link>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {linkService, userService} from "@/common/api";

export default {
    props: ["username", "userID", "FoldersWithTemp", "tempLinks", "userAllInfo"],
    data() {
        return {
            showjscode: false,
            JsToken: "xxxxxxxx",
            jscode: "***** 秘钥关联用户 请勿外传",
            dialogTableVisible: false,
            linkUrl: ''
        }
    },
    methods: {
        getJsToken() {
            userService.JsToken().then((res) => {
                this.JsToken = res.data;
                this.jscode =
                    "javascript:window.open('http://xydh.fun/api/v1/jsadd?token=" +
                    this.JsToken +
                    "&name='+document.title+'&url='+decodeURIComponent(location.href));void(0);";
            });
            this.showjscode = true;
        },
        openLink() {
            window.open(this.linkUrl, "_blank");
        },
        openIframe(link) {
            this.linkUrl = link
            this.dialogTableVisible = true
        },
        closeIframe() {
            this.linkUrl = ''
            this.dialogTableVisible = false
            const iframe = document.querySelector('.iframe'); // 找到iframe元素
            if (iframe) {
                iframe.removeEventListener('load', this.handleIframeLoad); // 移除iframe的load事件监听
                iframe.parentNode.removeChild(iframe); // 从DOM树中删除iframe元素
            }
        },
        updateLink(link) {
            if (link.fid === 0) {
                this.$notify.error({
                    title: "请选择一个文件夹",
                });
                return
            }
            const form = {
                id: link.id,
                fid: link.fid,
                icon: link.icon,
                name: link.name,
                url: link.url,
                info: link.info,
            };
            linkService.updateLink(form).then((res) => {
                if (res.code > 0) {
                    this.$notify.error({
                        title: "更新失败",
                        message: res.msg,
                    });
                } else {
                    // 刷新列表
                    this.$parent.$parent.$parent.getTempLinks();
                    this.$notify({
                        title: "更新成功!",
                        type: "success",
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
        deleteLink(link) {
            const form = {id: link.id};
            linkService.deleteLink(form).then((res) => {
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
                    this.$parent.$parent.$parent.getTempLinks();
                }
            })
                .catch((error) => {
                    this.$notify.error({
                        title: "错误 请检查",
                        message: error,
                    });
                });
        },
        iconHandle(content) {
            if (content) {
                this.$emit("chooseIcon", content);
                return;
            }
            this.$emit("chooseIcon", this.linkform);
        },
        logout() {
            userService.UserLogout({noQs: false});
            this.$alert("", "注销成功", {
                type: "success",
                callback: () => {
                    this.$router.push({name: "Home"});
                },
            });
        },
    }
}
</script>

<style scoped>
    .card {
        margin: 10px 10px;
    }
    .iframeTips{
        margin-bottom: 10px;
    }
    iframe {
            width: 100%;
            height: 500px;
            transform-origin: left top;
            border: 1px solid rgba(227, 227, 227, 1);
        }
</style>