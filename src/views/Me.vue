<template>
    <div class="me">
        <div v-if="isMaintenance" class="isMaintenance">
            <p>系统维护中...</p>
            <p>关注公众号 炫技巧 获取信息</p>
        </div>
        <div v-else>
            <!-- 选择小图标的弹窗 -->
            <el-dialog :visible.sync="dialogIconVisible" title="选择图标" append-to-body width="70%">
                <ICON @callback="chooseCallback"></ICON>
            </el-dialog>
            <div class="header">
                <div class="logo">
                    <img src="@/assets/logo.png" alt="" />
                    <div class="iLinks">
                        iLinks
                    </div>
                    <div class="Notice">
                        公告：
                        <el-carousel class="carousel" height="50px" direction="vertical" indicator-position="none">
                            <el-carousel-item> 站点订阅功能上线啦~ </el-carousel-item>
                            <el-carousel-item> 站点订阅功能上线啦~ </el-carousel-item>
                            <el-carousel-item> 站点订阅功能上线啦~ </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>

                <div class="rigthArea">
                    <div class="vip" v-if="isVIP">
                        <img src="@/assets/isVip.svg" alt="" />
                        {{ userAllInfo.vip_time }}到期
                    </div>
                    <div class="vip" v-else>
                        <el-popover placement="bottom" width="100" trigger="hover">
                            <div class="tips">
                                <p>您还不是Vip</p>
                                <el-link type="primary" @click="activeName = 'vip'">查看vip权益</el-link>
                            </div>
                            <img src="@/assets/noVip.svg" alt="" slot="reference" />
                        </el-popover>
                    </div>
                    <el-link type="primary" @click="logout">退出登录</el-link>
                </div>
            </div>
            <el-tabs type="border-card" :stretch="true" class="content" v-model="activeName">
                <el-tab-pane label="欢迎" name="welcome">
                    <Welcome
                        :username="username"
                        :userID="userID"
                        :userAllInfo="userAllInfo"
                        :FoldersWithTemp="FoldersWithTemp"
                        :temp-links="tempLinks"
                        @chooseIcon="iconHandle"
                    ></Welcome>
                </el-tab-pane>
                <el-tab-pane label="导航配置" lazy @tab-click="getSite" name="siteSet">
                    <SiteSet :userID="userID" :isVIP="isVIP"></SiteSet>
                </el-tab-pane>

                <el-tab-pane label="文件夹" :lazy="false">
                    <FolderSet :userID="userID" :Folders="Folders" @chooseIcon="iconHandle"></FolderSet>
                </el-tab-pane>

                <el-tab-pane label="书签管理" :lazy="false">
                    <LinkSet :userID="userID" :Folders="Folders" @chooseIcon="iconHandle"></LinkSet>
                </el-tab-pane>
                <el-tab-pane label="增值服务" name="vip">
                    <Vip />
                </el-tab-pane>
                <el-tab-pane label="进阶功能" lazy>
                    <Lab></Lab>
                </el-tab-pane>

                <el-tab-pane label="账户" v-if="userID !== 7163" lazy>
                    <Other></Other>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import {userService, folderService, linkService, siteService} from '@/common/api';
// import * as UserAPI from '@/api/user/'
import Welcome from './ConsoleWelcome';
import SiteSet from './SiteSet';
import FolderSet from './FolderSet';
import LinkSet from './LinkSet';
import Lab from './ConsoleLab';
import Vip from './Vip';
import Other from './Other';
import ICON from '@/components/icon.vue';
import iconModule from '@/plugins/icon';

export default {
    components: {
        Welcome,
        SiteSet,
        FolderSet,
        LinkSet,
        Lab,
        Other,
        ICON,
        Vip,
    },
    mixins: [iconModule],
    data() {
        return {
            userID: 0,
            username: '',
            isVIP: false,
            userAllInfo: {
                usedFolderNum: 0,
                usedLinks: 0
            },
            LoginCode: -1,
            Folders: [],
            FoldersWithTemp: [],
            tempLinks: [],
            activeName: 'welcome',
            isMaintenance: false, // 是否维护期间
        };
    },
    created() {
        if (!this.isMaintenance) {
            this.getUser();
            document.title = '炫猿控制台';
            this.getTempLinks();
        }
    },
    methods: {
        getUser() {
            // 判断登录状态,若登录则取出当前userID和userName
            userService.UserMe().then(res => {
                this.LoginCode = res.code;
                if (this.LoginCode > 0) {
                    this.$message({
                        message: '请登录',
                        center: true,
                        showClose: true,
                        type: 'warning',
                    });
                    this.$router.push({name: 'ULogin'});
                } else {
                    if (res.data.level < 0) {
                        this.$alert(
                            '网络不是不法之地！请珍惜您的账号,账号申诉请联系邮箱 xuanyuandaohang@126.com 上传了非法网站的就不要申诉了',
                            '该账号传播违法信息已被封禁',
                            {
                                confirmButtonText: '回主页',
                                callback: () => {
                                    this.logout();
                                    window.location.href = 'https://xydh.fun';
                                },
                            }
                        );
                        return;
                    }
                    if (res.data.level === 0) {
                        this.$alert(
                            '请在删除违规书签后联系邮箱 xuanyuandaohang@126.com 申请解封',
                            '你的书签存在违规',
                            {
                                // confirmButtonText: '回主页',
                                callback: () => {},
                            }
                        );
                    }
                    this.userID = res.data.id;
                    this.username = res.data.name;
                    this.isVIP = res.data.is_vip;
                    this.userAllInfo = {...res.data, usedFolderNum: 0, usedLinks: 0};
                    this.getFolder();
                    this.getSiteInfo(res.data.name)
                }
            });
        },
        getSiteInfo(uname) {
            siteService.getAllsiteandlinks(uname).then(res => {
                let linkInfo = res.data.folder_with_links
                let totalLinks = 0;
                for (let i = 0; i < linkInfo.length; i++) {
                    if (linkInfo[i].links != null) {
                        totalLinks += linkInfo[i].links.length;
                    }
                }
                this.userAllInfo.usedFolderNum = linkInfo.length
                this.userAllInfo.usedLinks = totalLinks
            });
        },
        logout() {
            userService.UserLogout({noQs: false});
            this.$alert('', '注销成功', {
                type: 'success',
                callback: () => {
                    this.$router.push({name: 'Home'});
                },
            });
        },
        getSite() {
            siteService.getSitebyID(this.userID).then(res => {
                this.SiteForm.name = res.data.name;
                this.SiteForm.info = res.data.info;
                this.SiteForm.bg = res.data.bg;
                this.SiteForm.mobile_bg = res.data.mobile_bg;
                this.SiteForm.btn_switch = res.data.btn_switch;
                this.SiteForm.bg_switch = res.data.bg_switch;
                this.SiteForm.bg_color = res.data.bg_color;
                this.SiteForm.font_color = res.data.font_color;
                this.SiteForm.bglizi = res.data.bglizi;
                this.SiteForm.lyb_id = res.data.lyb_id;
                if (res.data.music) {
                    this.music = JSON.parse(res.data.music);
                }
                if (res.data.top_bottom) {
                    this.top_bottom = JSON.parse(res.data.top_bottom);
                }

                this.userview = res.data.view;
            });
        },
        getFolder() {
            folderService.getMyFolders().then(res => {
                this.Folders = res.data;
                this.Folders.sort(function (f1, f2) {
                    return f1.weight - f2.weight; // weight
                });
                this.FoldersWithTemp = JSON.parse(JSON.stringify(this.Folders));
                this.FoldersWithTemp.unshift({
                    id: 0,
                    name: '选择文件夹',
                    weight: -1,
                });
            });
        },
        getTempLinks() {
            linkService.getTempLinks().then(res => {
                if (res.code === 0) {
                    this.tempLinks = res.data;
                }
            });
        },
    },
};
</script>

<style lang="less">
    .me {
        min-width: 800px;
        max-width: 2160px;
        margin: 0 auto;
        text-align: center;
        font-size: 17px;
        padding: 20px;
        padding-top: 0;
        height: 100%;
        min-height: 100vh;
        box-sizing: border-box;
        background-image: url('~@/assets/adminBg.png');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        .isMaintenance {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            font-size: 40px;
            font-weight: bold;
        }
        .header {
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            .logo {
                height: 100%;
                display: flex;
                align-items: center;
                .iLinks{
                    font-size: 27px;
                    font-weight: bold;
                    color: #88c666;
                    display: flex;
                    align-items: center;
                }
                img {
                    height: 80%;
                    margin-right: 10px;
                }
            }
            .Notice {
                display: flex;
                align-items: center;
                font-size: 14px;
                margin-left: 100px;
                .carousel {
                    width: 300px;

                    .el-carousel__container {
                        width: 100%;

                        .el-carousel__item {
                            display: flex;
                            align-items: center;
                            text-align: left;
                            color: red;
                        }
                    }
                }
            }
            .rigthArea {
                height: 100%;
                display: flex;
                img {
                    height: 25px;
                    margin-right: 10px;
                }
                .vip {
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    margin-right: 20px;
                }
            }
        }
    }
    .tips {
        text-align: center;
        p {
            margin-bottom: 5px;
        }
    }
    .el-button i {
        transform: translateX(-6px);
    }
    .el-tabs {
        border-radius: 6px;
        .el-tabs__header {
            border-radius: 6px 6px 0 0;
        }
    }
    .el-tabs__nav.is-stretch {
        padding: 0 5px;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
        border-radius: 10px 10px 0 0;
        margin-top: 8px;
        border-top-color: #dcdfe6;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item {
        margin-top: 8px;
    }
</style>
