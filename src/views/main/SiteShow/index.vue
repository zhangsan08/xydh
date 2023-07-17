<template>
    <div>
        <div class="hHidden">
            <h1>炫猿,炫猿导航</h1>
            <h2>炫猿,炫猿导航,网址导航,自定义网址导航,定制网址导航,炫猿邀请码,ilinks</h2>
        </div>
        <div v-if="isWeiXin" class="wx">
            <img src="~@/assets/share.png" class="logo" alt="logo" />
            更多内容，请点击右上角分享按钮，在默认浏览器打开
        </div>
        <div class="bg" v-else>
            <div class="particle" v-if="bglizi > 0">
                <Particle :bglizi="bglizi"></Particle>
            </div>

            <div class="totop" v-if="top_bottom.top_switch">
                <Header :historySwitch="historySwitch" :navSwitch="navSwitch" :Folders="Folders"></Header>
                <!-- <RightBar></RightBar> -->
            </div>

            <!-- 名称简介 -->
            <div class="siteTitle">
                <h2 class="siteName">{{ sitename }}</h2>
                <h2 class="siteInfo">{{ siteinfo }}</h2>
            </div>
            <div style="height: 80px" v-if="!navSwitch && !labSwitch"></div>
            <!-- 搜索框 -->
            <SearchTool :AllLinks="AllLinks"></SearchTool>

            <!-- 点击实验室按钮会打开实验室页面 -->
            <!-- <div class="Lab totop" v-if="labSwitch">
                <div class="hidden-sm-and-up" style="height: 50px"></div>
                <transition name="el-zoom-in-left">
                    <IndexLab :lybID="lybID" :Folders="TabFolders" :IMGs="TabIMGs" :AimName="AimTabName"></IndexLab>
                </transition>
            </div> -->
            <!-- <el-drawer title="我是标题" :visible.sync="labSwitch">
                <div class="hidden-sm-and-up" style="height: 50px"></div>
                <transition name="el-zoom-in-left">
                    <IndexLab
                        :lybID="lybID"
                        :Folders="TabFolders"
                        :AimName="AimFolderName"
                        v-Clickoutside="switchLab"
                    ></IndexLab>
                </transition>
            </el-drawer> -->
            <!-- 历史足迹 -->
            <el-row>
                <div class="historyLinks">
                    <div @click="switchHistory()" class="historyLinksArrow">
                        我的足迹<i class="el-icon-arrow-down" v-if="historySwitch"></i>
                        <i class="el-icon-arrow-up" v-else></i>
                    </div>

                    <div v-if="historySwitch">
                        <div v-if="cacheList.length > 0" class="historyLinkArea">
                            <div class="historyLink" v-for="link in cacheList" @click="goToUrl(link)" :key="link.id">
                                <div class="icon">
                                    <i :class="'fa fa-' + link.icon" v-if="link.icon"></i>
                                    <i class="el-icon-s-promotion" v-else></i>
                                </div>
                                <span class="title">{{ link.name }}</span>
                            </div>
                        </div>
                        <div v-else>
                            <el-divider>暂无书签最近访问记录呢~🐱</el-divider>
                        </div>
                    </div>

                </div>
            </el-row>
            <div class="bookmark" v-if="!labSwitch && navSwitch">
                <div class="nav" v-if="username === 'admin'">
                    <ul>
                        <div v-for="item in tabsList" :key="item.id">
                            <li @click="clickTab(item.id)" v-if="item.noUrl" >
                                <div :class="item.id === activeTabId ? 'active' : ''">
                                    {{ item.title }}
                                </div>
                            </li>
                            <el-tooltip
                                placement="bottom"
                                effect="light"
                                v-else
                            >
                                <div slot="content" class="tooltipContent">
                                    <a
                                        :href="`https://xydh.fun/${item.id}`"
                                        target="_blank"
                                    >前往站长主页 <i class="el-icon-top-right"></i></a>
                                </div>
                                <li @click="clickTab(item.id)">
                                    <div :class="item.id === activeTabId ? 'active' : ''">
                                        {{ item.title }}
                                    </div>
                                </li>
                            </el-tooltip>
                        </div>

                    </ul>
                </div>
                <div v-if="Folders.length === 0" class="navLoading">
                    <Loading />
                </div>

                <!-- 用户自定义内容 -->
                <el-row v-else>
                    <div class="totop quickNav" v-if="env === 'h5'">
                        <div class="foldername">
                            <p>快捷导航</p>
                        </div>
                        <el-row :class="isBorder ? 'folder' : 'folderNoBorder'">
                            <el-col :span="8" v-for="Folder in Folders" :key="Folder.id">
                                <div class="link" :class="env">
                                    <span class="icon">
                                        <i :class="'fa fa-mail-forward'"></i>
                                    </span>
                                    <a :href="'#' + Folder.name">
                                        {{ Folder.name }}
                                    </a>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-row>
                <div class="folderContent" :class="env">
                    <div v-for="(Folder, index) in Folders" :key="Folder.id" class="folderArea">
                        <div class="infoTips" v-if="showMessage && hoverFileId === Folder.id">
                            <i class="el-icon-info"></i>
                            {{ infoTips }}
                        </div>
                        <div class="foldername" :id="Folder.name">
                            <h3 v-if="Folder.icon"><i :class="'fa fa-' + Folder.icon"></i>{{ Folder.name }}</h3>
                            <h3 v-else>{{ Folder.name }}</h3>
                            <el-tooltip content="展开文件夹" placement="top" v-if="env === 'pc'">
                                <div class="openFolder" @click="openFolder(Folder)">
                                    <i class="fa fa-arrows-alt"></i>
                                </div>
                            </el-tooltip>
                        </div>
                        <div
                            :class="isBorder ? 'folder' : 'folderNoBorder'"
                            :style="{height: screenWidth > 768 ? '140px' : 'auto'}"
                            :id="Folder.id"
                            onselectstart="return false;"
                        >
                            <div class="linkbox">
                                <div class="inputPWD" v-if="Folder.need_password">
                                    <p><i class="el-icon-lock"></i></p>
                                    <p v-if="Folder.info">密码提示：{{ Folder.info }}</p>
                                    <!-- 如果文件夹需要密码 -->
                                    <el-input
                                        type="text"
                                        autosize
                                        v-model="passwords[index]"
                                        clearable
                                        class="input"
                                        placeholder="输入密码"
                                    >
                                        <span
                                            slot="append"
                                            type="text"
                                            @click="getPWDFolder(index, Folder.id, passwords[index])"
                                        >确定</span>
                                    </el-input>
                                </div>
                                <div
                                    class="links"
                                    v-else-if="Folder.links && Folder.links.length > 0"
                                    v-for="link in Folder.links"
                                    :key="link.id"
                                >
                                    <el-col :span="8">
                                        <div
                                            class="link"
                                            :class="env"
                                            v-on:mouseenter="linkMouseEnter(link.info, Folder.id)"
                                            v-on:mouseleave="linkMouseLeave"
                                        >
                                            <a @click="goToUrl(link)" target="_blank" rel="nofollow">
                                                <div class="linkContent">
                                                    <span class="icon">
                                                        <i :class="'fa fa-' + link.icon" v-if="link.icon"></i>
                                                        <i :class="'fa fa-bookmark-o'" v-else></i>
                                                    </span>
                                                    <span class="linkName">{{ link.name }}</span>
                                                </div>
                                            </a>
                                        </div>
                                    </el-col>
                                </div>
                                <div v-else class="emptyFolder">空空如也~</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <MoreLinkModal
            :visible="moreLinkModalVisible"
            :foldersInfo="foldersInfo"
            @close-click="moreLinkModalCloseClick"
        />
        <ImgLinkModal :visible="imgLinkModalVisible" :imgLinkInfo="imgLinkInfo" @close-click="imgLinkModalCloseClick" />

        <!-- 音乐 -->
        <Player :musicList="music.list" v-if="music.open" />
        <!-- 跑马灯（暂时去掉了 本想留作广告位。发现接不到 -->
        <el-col :span="24">
            <div class="totop">
                <!-- <Paomadeng v-if="ad"></Paomadeng>
                <div v-else style="height:100px"></div> -->
                <!-- 这里是200px 高的占位符。不然不好看 -->
                <div style="height: 200px" v-if="!navSwitch && !labSwitch"></div>
                <div v-if="!is_vip || userid === 1">
                    <Footer></Footer>
                </div>
                <div v-else style="max-width: 768px; margin: 30px auto 30px; text-align: center">
                    <div style="height: 100px"></div>
                    <li style="float: left" v-for="link in top_bottom.bottom_list" :key="link.title">
                        <a @click="goToUrl(link)" target="_blank" rel="nofollow">
                            {{ link.title }}
                        </a>
                    </li>
                </div>
            </div>
        </el-col>
    </div>
</template>

<script>
// import * as UserAPI from '@/api/user/'
// import * as SiteAPI from '@/api/site/'
import {siteService} from '@/common/api';
import {getPWDFolderFunc, getActiveLabelDataFunc, setHistoryLink} from '@/common/mainRequest';

import {cookieGet, cookieSet} from '@/common/cookie';
// import IndexLab from '@/views/IndexLab.vue';
import {getUrl} from '@/common/pickup';
import {isWeiXin, getEnv} from '@/common/env';
// import RightBar from '@/components/RightBar'
import SearchTool from '@/components/SearchTool.vue';
// import Paomadeng from '@/components/Paomadeng.vue'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Particle from '@/components/particle.vue';
import Player from '@/components/Player.vue';
import Loading from '@/components/Loading.vue';
import MoreLinkModal from '@/components/MoreLinkModal.vue';
import ImgLinkModal from '@/components/ImgLinkModal.vue';

export default {
    name: 'ShowSite',
    filters: {
        getDomain(url) {
            return getUrl(url);
        },
    },
    components: {
        SearchTool,
        // Paomadeng,
        Header,
        Footer,
        // IndexLab,
        // RightBar,
        Particle,
        Player,
        Loading,
        MoreLinkModal,
        ImgLinkModal,
    },
    props: ['userName'],
    data() {
        return {
            is_vip: 0,
            labSwitch: false,
            historySwitch: false,
            navSwitch: true,
            screenWidth: '',
            userid: 0,
            username: '',
            sitename: '',
            siteinfo: '',
            bglizi: 0,
            mobile_bg: '',
            lybID: '',
            Folders: [],
            TabFolders: [],
            TabIMGs: [],
            AllLinks: [], // 检索用
            AimTabName: '',
            f_color: 'white',
            autoBgColor: '#fff',
            cacheList: [],
            passwords: [],
            music: {
                open: false,
                list: [
                    // {
                    //     title: '孤独面店',
                    //     artist: '姜云升',
                    //     url: 'https://cdn.jsdelivr.net/gh/mlchsq/tuchuang/姜云升 - 孤独面店.mp3',
                    // },
                ],
            },
            timeoutId: null, // 存储 setTimeout 的 ID
            top_bottom: {
                top_switch: true,
                bottom_list: [],
            },
            isWeiXin: isWeiXin(),
            activeIndex: '1',
            tabsList: [
                {title: '首页', id: 'admin', noUrl: true},
                {title: 'AI', id: 'loveai'},
                {title: '小帅', id: 'gmengshuai'},
                {title: '以西', id: 'chenyixi'},
                {title: 'YYDS', id: 'yyds007'},
                {title: '文学', id: 'tiantian666'},
                {title: '加入', id: 'friend', noUrl: true},
            ],
            activeTabId: 'admin',
            random: new Date().valueOf(), // 处理切换tab重复请求
            showMessage: false,
            infoTips: '',
            hoverFileId: '',
            env: '',
            isBorder: false,
            moreLinkModalVisible: false,
            imgLinkModalVisible: false,
            foldersInfo: {},
            imgLinkInfo: {},
        };
    },
    beforeMount() {
        this.screenWidth = document.body.clientWidth;
    },
    created() {
        this.username = this.$route.params.username;
        if (!this.username) this.username = 'admin';
        this.load(this.username);
    },
    mounted() {
        // 动态调整folder高度
        window.onresize = () => {
            this.screenWidth = document.body.clientWidth;
            if (this.screenWidth <= 768) {
                this.unfolder(0);
            } else {
                this.enfolder(0);
            }
        };
        this.env = getEnv();
        // 取“足迹”
        let cache = cookieGet('cacheLinkList');
        if (cache) {
            this.cacheList = [];
            let tempList = this.compare(JSON.parse(cache), 'count');
            let showNum = tempList.length >= 12 ? 12 : tempList.length;
            for (let i = 0; i < showNum; i++) {
                this.cacheList.push(tempList[i]);
            }
        }

        // 取“足迹开关状态”
        let open1 = cookieGet('historySwitch');
        if (open1 !== undefined) {
            this.historySwitch = open1 === 'true';
        }
        // 取“实验室开关状态”
        let open2 = cookieGet('labSwitch');
        if (open2 !== undefined) {
            this.labSwitch = open2 === 'true';
        }
        // 取“导航开关状态”
        let open3 = cookieGet('navSwitch');
        if (open3 !== undefined) {
            this.navSwitch = open3 === 'true';
        }
    },
    methods: {
        linkMouseEnter(info, id) {
            if (!info) return;
            this.hoverFileId = id;
            this.showMessage = true;
            this.infoTips = info;
        },
        linkMouseLeave() {
            this.showMessage = false;
        },
        // 切换tab
        clickTab(id) {
            // 更新随机数，用于判断是否需要更新数据
            this.random = new Date().valueOf();
            // 清空Folders数组，以便展示loading效果
            this.Folders = [];
            // 设置当前活动的tabId
            this.activeTabId = id;
            // 获取缓存数据
            const cacheKey = `xydh_tab_cached_data_for_id_${id}`;
            const cachedData = window.localStorage.getItem(cacheKey);
            if (cachedData) {
                // 如果有缓存的数据，则直接使用
                this.Folders = JSON.parse(cachedData);
            }
            // 请求数据
            this.getActiveLabelData(id);
        },
        // 切换tab,请求数据
        getActiveLabelData(id) {
            this.Folders = getActiveLabelDataFunc(id, this.random);
        },
        // 排序
        handlelinkSort(data) {
            // 取文件夹和书签
            let linksData = data;
            // 文件夹排序
            linksData.sort(function (f1, f2) {
                return f1.weight - f2.weight; // weight
            });
            // 文件夹里的每个书签排序
            for (var i = 0; i < linksData.length; i++) {
                if (!linksData[i].links) continue;
                linksData[i].links.sort(function (l1, l2) {
                    return l2.weight - l1.weight; // weight
                });
            }
            return linksData;
        },
        switchHistory() {
            this.historySwitch = !this.historySwitch;
            cookieSet('historySwitch', this.historySwitch);
        },
        switchLab() {
            this.labSwitch = !this.labSwitch;
            cookieSet('labSwitch', this.labSwitch);
        },
        switchNav() {
            this.navSwitch = !this.navSwitch;
            cookieSet('navSwitch', this.navSwitch);
        },
        load(uname) {
            siteService.getAllsiteandlinks(uname).then(res => {
                if (res.code > 0) {
                    this.$message({
                        message: '走迷路了哦，用户不存在',
                        onClose: function (instance) {
                            window.location.href = 'https://xydh.fun';
                        },
                    });
                } else {
                    // 加载用户
                    this.userid = res.data.target.id;
                    this.is_vip = res.data.target.is_vip;
                    // 违规用户
                    if (res.data.target.level <= 0) {
                        this.$alert(
                            '网络不是不法之地！请珍惜您的账号,账号申诉请联系邮箱 xuanyuandaohang@126.com 上传了非法网站的就不要申诉了',
                            '该账号传播违法信息已被封禁',
                            {
                                confirmButtonText: '回主页',
                                callback: () => {
                                    window.location.href = 'https://xydh.fun';
                                },
                            }
                        );
                        return;
                    }
                    // 加载 Site
                    this.sitename = res.data.site_info.name;
                    this.siteinfo = res.data.site_info.info;
                    this.bglizi = res.data.site_info.bglizi;
                    this.lybID = res.data.site_info.lyb_id;
                    this.mobile_bg = res.data.site_info.mobile_bg;
                    document.title = this.sitename;
                    // 改背景颜色或图片
                    var obj = document.getElementsByTagName('body')[0];
                    var style = document.createElement('style');

                    if (res.data.site_info.bg_switch) {
                        if (window.innerWidth < 768 && this.mobile_bg) {
                            let bg = this.mobile_bg;
                            style.innerHTML = `body::before { background-image: url(${bg})}`;
                        } else {
                            let bg = res.data.site_info.bg;
                            style.innerHTML = `body::before { background-image: url(${bg})}`;
                        }
                        this.isBorder = res.data.site_info.bg !== '';
                        document.head.appendChild(style);
                    } else {
                        obj.style.backgroundColor = res.data.site_info.bg_color;
                    }
                    obj.style.color = res.data.site_info.font_color;
                    // 取文件夹和书签
                    this.Folders = this.handlelinkSort(res.data.folder_with_links);
                    //    载入所有书签到 AllLinks,检索用
                    for (let i = 0; i < this.Folders.length; i++) {
                        this.AllLinks = this.AllLinks.concat(this.Folders[i].links);
                    }
                    // 载入音乐和自定义底部
                    if (res.data.site_info.music !== '') {
                        this.music = JSON.parse(res.data.site_info.music);
                    }
                    if (!this.is_vip) {
                        this.music.list.splice(1);
                    }
                    if (res.data.site_info.top_bottom !== '') {
                        this.top_bottom = JSON.parse(res.data.site_info.top_bottom);
                    }
                }
            });
        },
        // 输入密码
        getPWDFolder(index, id, password) {
            this.Folders[index] = getPWDFolderFunc(id, password);
        },
        // 打开url
        goToUrl(linkInfo) {
            // 如果是图片
            var thisUrl = linkInfo.url;
            var houzhui = /.[^.]+$/.exec(thisUrl);
            switch (houzhui[0]) {
            case '.png':
            case '.jpg':
            case '.jpeg':
            case '.gif':
            case '.svg':
                this.openImgLink(linkInfo);
                return;
            default:
                break;
            }
            this.cacheList = setHistoryLink(linkInfo);
            window.open(linkInfo.url, '_blank');
        },
        compare(array, key) {
            return array.sort(function (a, b) {
                var x = a[key];
                var y = b[key];
                return y < x ? -1 : x > y ? 1 : 0;
            });
        },
        // 展开folder
        unfolder() {
            var folders = document.getElementsByClassName('folder');
            for (var i = 0; i < folders.length; i++) {
                folders[i].setAttribute('style', 'height:auto;');
            }
            var openFolderBtns = document.getElementsByClassName('openFolder');
            for (var j = 0; j < openFolderBtns.length; j++) {
                openFolderBtns[j].setAttribute('style', 'display:none;');
            }
        },
        enfolder() {
            var folders = document.getElementsByClassName('folder');
            for (var i = 0; i < folders.length; i++) {
                folders[i].setAttribute('style', 'height:180px;');
            }
            var openFolderBtns = document.getElementsByClassName('openFolder');
            for (var j = 0; j < openFolderBtns.length; j++) {
                openFolderBtns[j].setAttribute('style', 'display:inline;');
            }
        },
        moreLinkModalCloseClick() {
            this.moreLinkModalVisible = false;
        },
        imgLinkModalCloseClick() {
            this.imgLinkModalVisible = false;
        },
        openFolder(folder) {
            this.foldersInfo = folder;
            this.moreLinkModalVisible = true;
        },
        openImgLink(IMGLink) {
            this.imgLinkInfo = IMGLink;
            this.imgLinkModalVisible = true;
        },
    },
};
</script>

<style lang="less">
    @import './index.less';
</style>
