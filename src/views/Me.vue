<template>
    <div class="me">
        <!-- 选择小图标的弹窗 -->
        <el-dialog
            :visible.sync="dialogIconVisible"
            title="选择图标"
            append-to-body
            width='70%'
        >
            <ICON @callback="chooseCallback"></ICON>
        </el-dialog>

        <el-tabs type="border-card" :stretch="true">
            <el-tab-pane label="欢迎">
                <Welcome
                    :username="username"
                    :userID="userID"
                    :userAllInfo="userAllInfo"
                    :FoldersWithTemp="FoldersWithTemp"
                    :temp-links="tempLinks"
                    @chooseIcon="iconHandle"
                ></Welcome>
            </el-tab-pane>

            <el-tab-pane label="导航配置" lazy @tab-click="getSite">
                <SiteSet :userID="userID" :isVIP="isVIP"></SiteSet>
            </el-tab-pane>

            <el-tab-pane label="文件夹" :lazy="false">
                <FolderSet :userID="userID" :Folders="Folders" @chooseIcon="iconHandle"></FolderSet>
            </el-tab-pane>

            <el-tab-pane label="书签管理" :lazy="false">
                <LinkSet :userID="userID"  :Folders="Folders" @chooseIcon="iconHandle"></LinkSet>
            </el-tab-pane>

            <el-tab-pane label="进阶功能" lazy>
                <Lab></Lab>
            </el-tab-pane>

            <el-tab-pane label="账户" v-if="userID !== 7163" lazy>
                <Other></Other>
            </el-tab-pane>
        </el-tabs>

        <el-divider></el-divider>
    </div>
</template>

<script>
import {userService, folderService, linkService, siteService} from "@/common/api";
// import * as UserAPI from '@/api/user/'
import Welcome from "./ConsoleWelcome";
import SiteSet from "./SiteSet";
import FolderSet from "./FolderSet";
import LinkSet from "./LinkSet";
import Lab from "./ConsoleLab";
import Other from "./Other";
import ICON from "@/components/icon.vue";
import iconModule from "@/plugins/icon";

export default {
    components: {
        Welcome,
        SiteSet,
        FolderSet,
        LinkSet,
        Lab,
        Other,
        ICON,
    },
    mixins: [iconModule],
    data() {
        return {
            userID: 0,
            username: "",
            isVIP: false,
            userAllInfo: {},
            LoginCode: -1,
            Folders: [],
            FoldersWithTemp: [],
            tempLinks: [],
        };
    },
    beforeMount() {
        document.title = "炫猿控制台";
        this.getUser();
        this.getTempLinks();
    },
    methods: {
        getUser() {
            // 判断登录状态,若登录则取出当前userID和userName
            userService.UserMe().then((res) => {
                this.LoginCode = res.code;
                if (this.LoginCode > 0) {
                    this.$message({
                        message: "请登录",
                        center: true,
                        showClose: true,
                        type: "warning",
                    });
                    this.$router.push({name: "ULogin"});
                } else {
                    if (res.data.level < 0) {
                        this.$alert(
                            "网络不是不法之地！请珍惜您的账号,账号申诉请联系邮箱 xuanyuandaohang@126.com 上传了非法网站的就不要申诉了",
                            "该账号传播违法信息已被封禁",
                            {
                                confirmButtonText: "回主页",
                                callback: () => {
                                    this.logout();
                                    window.location.href = "https://xydh.fun";
                                },
                            }
                        );
                        return;
                    }
                    if (res.data.level === 0) {
                        this.$alert(
                            "请在删除违规书签后联系邮箱 xuanyuandaohang@126.com 申请解封",
                            "你的书签存在违规",
                            {
                                // confirmButtonText: '回主页',
                                callback: () => {
                                },
                            }
                        );
                    }
                    this.userID = res.data.id;
                    this.username = res.data.name;
                    this.isVIP = res.data.is_vip;
                    this.userAllInfo = res.data
                    this.getFolder();
                }
            });
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
        getSite() {
            siteService.getSitebyID(this.userID).then((res) => {
                this.SiteForm.name = res.data.name
                this.SiteForm.info = res.data.info
                this.SiteForm.bg = res.data.bg
                this.SiteForm.mobile_bg = res.data.mobile_bg
                this.SiteForm.btn_switch = res.data.btn_switch
                this.SiteForm.bg_switch = res.data.bg_switch
                this.SiteForm.bg_color = res.data.bg_color
                this.SiteForm.font_color = res.data.font_color
                this.SiteForm.bglizi = res.data.bglizi
                this.SiteForm.lyb_id = res.data.lyb_id
                if (res.data.music) {
                    this.music = JSON.parse(res.data.music);
                }
                if (res.data.top_bottom) {
                    this.top_bottom = JSON.parse(res.data.top_bottom);
                }

                this.userview = res.data.view
            })
        },
        getFolder() {
            folderService.getMyFolders().then((res) => {
                this.Folders = res.data;
                this.Folders.sort(function (f1, f2) {
                    return f1.weight - f2.weight; // weight
                });
                this.FoldersWithTemp = JSON.parse(JSON.stringify(this.Folders));
                this.FoldersWithTemp.unshift({
                    id: 0,
                    name: "选择文件夹",
                    weight: -1,
                });
            });
        },
        getTempLinks() {
            linkService.getTempLinks().then((res) => {
                this.tempLinks = res.data;
            });
        },

    },
};
</script>

<style scoped>
.me {
    /* min-width: 800px; */
    max-width: 1680px;
    margin: 0 auto;
    text-align: center;
    font-size: 17px;
}

.el-button i {
    transform: translateX(-6px);
}
</style>