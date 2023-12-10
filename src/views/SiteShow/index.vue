<template>
    <div>
        <div class="hHidden">
            <h1>炫猿,炫猿导航,iLinks</h1>
            <h2>炫猿,炫猿导航,网址导航,自定义网址导航,定制网址导航,炫猿邀请码,iLinks</h2>
        </div>

        <InitLoading />
        <div v-if="isWeiXin" class="wx">
            <img src="~@/assets/share.png" class="logo" alt="logo" />
            更多内容，请点击右上角分享按钮，在默认浏览器打开
        </div>
        <div class="bg" v-else>
            <div class="particle" v-if="bglizi > 0">
                <Particle :bglizi="bglizi"></Particle>
            </div>

            <div class="totop">
                <Header :isOpen="top_bottom.top_switch"></Header>
            </div>

            <!-- 最近 7 天添加的书签 -->
            <div class="recent_links" v-if="recentLinks.length > 0">
                最近更新：
                <li v-for="item in recentLinks" :key="item.id">
                    <a target="_blank" :href="item.url"><i :class="'fa fa-' + item.icon" v-if="item.icon"></i>
                        <i :class="'fa fa-bookmark-o'" v-else></i>
                        {{ item.name }}</a>
                </li>
            </div>

            <!-- 名称简介 -->
            <div class="siteTitle">
                <h2 class="siteName">{{ sitename }}</h2>
                <h2 class="siteInfo">{{ siteinfo }}</h2>
            </div>
            <div style="height: 80px" v-if="!navSwitch && !labSwitch"></div>
            <!-- 搜索框 -->
            <!-- <SearchTool :AllLinks="AllLinks"></SearchTool> -->
            <div class="SearchTool">
                <Search ref="search" :AllLinks="AllLinks" :customSearchEngines="customSearchEngines" />
            </div>
            <!-- 点击实验室按钮会打开实验室页面 -->
            <div class="Lab totop" v-if="labSwitch">
                <div class="hidden-sm-and-up" style="height: 50px"></div>
                <transition name="el-zoom-in-left">
                    <IndexLab :lybID="lybID" :Folders="TabFolders" :IMGs="TabIMGs" :AimName="AimTabName"></IndexLab>
                </transition>
            </div>
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
            <el-row v-if="showHistory">
                <div class="historyLinks">
                    <div @click="switchHistory()" class="historyLinksArrow">我的足迹<i
                        class="el-icon-arrow-down"
                        v-if='historySwitch'
                    ></i>
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
                <div class="nav" v-if="subscribe.open">
                    <ul>
                        <li @click="clickTab(0, username)">
                            <div :class="0 === activeTabId ? 'active' : ''">
                                首页
                            </div>
                        </li>
                        <div v-for="item in subscribe.list" :key="item.id">
                            <!-- <el-popover
                                placement="top"
                                trigger="hover"
                            >
                                <div class="tooltipContent">
                                    <a
                                        :href="`https://xydh.fun/${item.id}`"
                                        target="_blank"
                                    >前往站长主页 <i class="el-icon-top-right"></i></a>
                                </div> -->
                            <li @click="clickTab(item.id, item.user_name)" slot="reference">
                                <div :class="item.id === activeTabId ? 'active' : ''">
                                    {{ item.alias || item.user_name }}
                                </div>
                            </li>
                            <!-- </el-popover> -->
                        </div>
                        <div v-for="item in expandList" :key="item.id">
                            <li @click="clickTab(item.id)" slot="reference">
                                <div :class="item.id === activeTabId ? 'active' : ''">
                                    {{ item.title }}
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>
                <div v-if="activeTabId!==4">
                    <div v-if="Folders.length === 0" class="navLoading">
                        <Loading />
                    </div>
                    <!-- 用户自定义内容 -->
                    <el-row v-else>
                        <div class="totop quickNav" v-if="env === 'h5'">
                            <div class="foldername">
                                <h3>快捷导航</h3>
                            </div>
                            <el-row :class="isBorder ? 'folder' : 'folderNoBorder'">
                                <el-col
                                    :span="6"
                                    :md="6"
                                    :sm="8"
                                    v-for="Folder in Folders"
                                    :key="Folder.id"
                                >
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
                                class="totop"
                                :style="{ height: screenWidth > 768 ? '140px' : 'auto' }"
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
                                                @click="GetPWDFolder(index, Folder.id, passwords[index])"
                                            >确定</span>
                                        </el-input>
                                    </div>
                                    <div class="links" v-else v-for="link in Folder.links" :key="link.id">
                                        <el-col :span="8">
                                            <div
                                                class="link"
                                                :class="{ [env]: true, 'lineTextCenter': lineTextCenter }"
                                                v-on:mouseenter="linkMouseEnter(link.info, link.name, Folder.id)"
                                                v-on:mouseleave="linkMouseLeave"
                                            >
                                                <a @click="goToUrl(link)" target="_blank" rel="nofollow">
                                                    <div class="linkContent">
                                                        <span class="icon" v-if="showLineIcon">
                                                            <i :class="'fa fa-' + link.icon" v-if="link.icon"></i>
                                                            <i :class="'fa fa-bookmark-o'" v-else></i>
                                                        <!-- <img :src="`http://www.google.com/s2/favicons?domain=${link.url}`" alt=""> -->
                                                        </span>
                                                        <span class="linkName">{{ link.name }}</span>
                                                    </div>
                                                </a>
                                            </div>
                                        </el-col>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="gameArea">
                    <div v-for="item in gameList" :key="item.name" class="gameAreaItem" @click="clickGame(item)">
                        <div class="icon">
                            <i :class="'fa fa-gamepad'"></i>
                        </div>
                        <div class="info">
                            <div class="title">
                                {{ item.name }}
                            </div>
                            <div class="brief">
                                {{ item.info ||'摸鱼神器，一键畅玩'}}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <MoreLinkModal :visible="moreLinkModalVisible" :foldersInfo="foldersInfo" @close-click="moreLinkModalCloseClick" />
        <ImgLinkModal :visible="imgLinkModalVisible" :imgLinkInfo="imgLinkInfo" @close-click="imgLinkModalCloseClick" />
        <ExtendModal
            :visible="extendModalVisible"
            @close-click="extendModalCloseClick"
            :gameData="activeGame"
        />
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
                <div v-else class="footer">
                    <a
                        @click="goToUrl(link)"
                        target="_blank"
                        rel="nofollow"
                        class="name"
                        v-for="(link, index) in top_bottom.bottom_list"
                        :key="`${link.title}-${index}`"
                        style="margin: 0 5px;"
                    >
                        {{ link.title }}
                    </a>
                </div>
            </div>
        </el-col>
    </div>
</template>

<script>
// import * as UserAPI from '@/api/user/'
// import * as SiteAPI from '@/api/site/'
import { siteService } from '@/common/api';
import { cookieGet, cookieSet } from '@/common/cookie';
import IndexLab from '@/views/IndexLab.vue';
import { getUrl } from '@/common/pickup';
import { isWeiXin, getEnv } from '@/common/env';
// import RightBar from '@/components/RightBar'
import SearchTool from '@/components/SearchTool.vue';
// import Paomadeng from '@/components/Paomadeng.vue'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Particle from '@/components/particle.vue';
import Player from '@/components/Player.vue'
import Loading from '@/components/Loading.vue';
import InitLoading from '@/components/InitLoading.vue';
import MoreLinkModal from '@/components/MoreLinkModal.vue';
import ImgLinkModal from '@/components/ImgLinkModal.vue';
import Search from '@/components/Search/index.vue';
import { saveAs } from 'file-saver';
import ExtendModal from '@/components/ExtendModal.vue';
import { gameList } from '@/common/gameConfig';

export default {
    name: 'ShowSite',
    filters: {
        getDomain(url) {
            return getUrl(url);
        },
    },
    components: {
        // SearchTool,
        Search,
        // Paomadeng,
        Header,
        Footer,
        IndexLab,
        // RightBar,
        Particle,
        Player,
        Loading,
        InitLoading,
        MoreLinkModal,
        ImgLinkModal,
        ExtendModal
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
                    // 默认有一条数据，否则初始化报错
                    {
                        name: '孤独面店',
                        artist: '姜云升',
                        url: 'https://cdn.jsdelivr.net/gh/mlchsq/tuchuang/姜云升 - 孤独面店.mp3',
                    },
                ],
            },
            subscribe: {
                open: false,
                list: [],
                allowRecommend: true,
            },
            expandList: [
                {
                    key: 'game',
                    title: '游戏',
                    id: 4
                }
            ],
            customSearchEngines: {
                type: '自定义',
                list: [
                    // {
                    //     title: '必应1',
                    //     url: 'https://cn.bing.com/search',
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
            activeTabId: 0,
            random: new Date().valueOf(), // 处理切换tab重复请求
            showMessage: false,
            infoTips: '',
            hoverFileId: '',
            env: '',
            isBorder: false,
            moreLinkModalVisible: false,
            imgLinkModalVisible: false,
            extendModalVisible: false,
            foldersInfo: {},
            imgLinkInfo: {},
            recentLinks: [],
            gameList: gameList,
            activeGame: {}
        };
    },
    computed: {
        showHistory() {
            return this.$store.state.userConfig.showHistory;
        },
        lineTextCenter() {
            return this.$store.state.userConfig.lineTextCenter;
        },
        showLineIcon() {
            return this.$store.state.userConfig.showLineIcon;
        },
    },
    beforeMount() {
        // this.$message({
        //   showClose: true,
        //   message: '这几天网站进行技术维护.可能会一直出现打不开的情况.一定关注公众号【炫技巧】防止迷路',
        //   type: 'warning'
        // });
        this.screenWidth = document.body.clientWidth;
    },
    created() {
        this.username = this.$route.params.username;
        if (!this.username) {
            this.username = 'admin';
            window.isLinks = true
        }
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
        clickGame(item) {
            if (item.type === 'webPage') {
                window.open(item.path, "_blank");
                return
            }
            this.activeGame = item
            this.extendModalVisible = true
        },
        linkMouseEnter(info, name, id) {
            if (!info && !name) {
                return
            }
            this.hoverFileId = id;
            this.showMessage = true;
            if (info) {
                this.infoTips = info;
            }
            else {
                this.infoTips = name;
            }
        },
        linkMouseLeave() {
            this.showMessage = false;
        },
        // 切换tab
        clickTab(id, user_name) {
            // 更新随机数，用于判断是否需要更新数据
            this.random = new Date().valueOf();
            // 清空Folders数组，以便展示loading效果
            this.Folders = [];
            // 设置当前活动的tabId
            this.activeTabId = id;
            if (id === 4) {
                return
            }
            // 获取缓存数据
            const cacheKey = `xydh_tab_cached_data_for_id_${user_name}_${id}`;
            const cachedData = window.localStorage.getItem(cacheKey);
            if (cachedData) {
                // 如果有缓存的数据，则直接使用
                this.Folders = JSON.parse(cachedData);
            }
            // 请求数据
            this.getActiveLabelData(id, user_name);
        },
        // 处理书签数据,存入localStorage
        handleFoldersData(data, user_name, id) {
            // 对数据进行相关处理
            let linksData = this.handlelinkSort(data);
            // 比较数据是否和缓存中的一致
            const cacheKey = `xydh_tab_cached_data_for_id_${user_name}_${id}`;
            const cachedData = window.localStorage.getItem(cacheKey);
            if (!_.isEqual(linksData, cachedData)) {
                // 如果不一致，则进行更新，并将数据存入localStorage中
                this.Folders = [...linksData];
                window.localStorage.setItem(cacheKey, JSON.stringify(linksData));
            }
        },
        // 切换tab,请求数据
        getActiveLabelData(id, user_name) {
            // 记录当前的随机数，用于判断是否需要更新数据
            const random = this.random;
            // 调用API获取数据
            siteService.getAllsiteandlinks(user_name).then(res => {
                // 如果随机数已经变化，则表示已经更新了tab，需要丢弃当前的数据
                if (this.random !== random) return;
                this.handleFoldersData(res.data.folder_with_links, user_name, id)
            });
        },
        // 排序
        handlelinkSort(data) {
            let i;
            // 取文件夹和书签
            let linksData = data;
            // 文件夹排序
            linksData.sort(function (f1, f2) {
                return f1.weight - f2.weight; // weight
            });
            // 文件夹里的每个书签排序
            for (i = 0; i < linksData.length; i++) {
                if (!linksData[i].links) continue;
                linksData[i].links.sort(function (l1, l2) {
                    return l2.weight - l1.weight; // weight
                });
            }
            this.AllLinks = []
            //    载入所有书签到 AllLinks,检索用
            for (let i = 0; i < linksData.length; i++) {
                this.AllLinks = this.AllLinks.concat(linksData[i].links);
            }
            // 给AllLinks 排个序。看看有没有最近更新的书签
            // 过滤掉空值和没有 update_time_unix 属性的对象
            this.AllLinks = this.AllLinks.filter(link => link && link.update_time_unix);
            this.AllLinks.sort(function (l1, l2) {
                return l2.update_time_unix - l1.update_time_unix
            });
            let sevenDaysAgo = Date.now() / 1000 - (7 * 24 * 60 * 60 )

            this.recentLinks = []
            for (i = 0; i < 20; i++) {
                if (this.AllLinks[i].update_time_unix > sevenDaysAgo) {
                    this.recentLinks.push(this.AllLinks[i])
                }
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
        // 处理网站数据
        handleSiteData(data) {
            // 加载用户
            this.userid = data.target.id;
            this.is_vip = data.target.is_vip;
            // 加载 Site
            this.sitename = data.site_info.name;
            this.siteinfo = data.site_info.info;
            this.bglizi = data.site_info.bglizi;
            this.lybID = data.site_info.lyb_id;
            this.mobile_bg = data.site_info.mobile_bg;
            document.title = this.sitename;
            // 改背景颜色或图片
            var obj = document.getElementsByTagName('body')[0];
            var style = document.createElement('style');

            if (data.site_info.bg_switch) {// 有背景图
                let bg = ''
                if (window.innerWidth < 768 && this.mobile_bg) {
                    bg = this.mobile_bg;
                } else {
                    bg = data.site_info.bg;
                }
                this.isBorder = true;
                const shadow = 'radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%), radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%)'
                style.innerHTML = `body::before { background-image: ${shadow},url(${bg})}`;
                document.head.appendChild(style);
            } else {
                obj.style.backgroundColor = data.site_info.bg_color;
            }
            obj.style.color = data.site_info.font_color;
            // // 取文件夹和书签
            this.Folders = this.handlelinkSort(data.folder_with_links);
            //    载入所有书签到 AllLinks,检索用
            for (let i = 0; i < this.Folders.length; i++) {
                this.AllLinks = this.AllLinks.concat(this.Folders[i].links);
            }
            // 载入音乐和自定义底部
            if (data.site_info.music !== '') {
                let musicInfo = JSON.parse(data.site_info.music)

                let newList = musicInfo.list.map((item) => {
                    return {...item, name: item.title, cover: item.pic}
                })
                this.music = {...musicInfo, list: newList};
            }

            // if (!this.is_vip) {
            //     this.music.list.splice(1);
            // }
            if (data.site_info.subscribe) {
                this.subscribe = JSON.parse(data.site_info.subscribe);
                if (this.subscribe.allowRecommend) {
                    // 安排上最新推荐
                    this.subscribe.list.push(
                        {user_name: 'admin', alias: '球哥', id: 999991},
                        {user_name: 'chenyixi', alias: '以西', id: 999992},
                        {user_name: 'gmengshuai', alias: '小帅', id: 999993},
                        {user_name: 'loveai', alias: 'ChatGPT', id: 999994},
                        {user_name: 'yyds007', alias: 'YYDS', id: 999995},
                        {user_name: 'tiantian666', alias: '文学', id: 999996},
                    )
                }
            }
            if (data.site_info.customSearchEngines) {
                this.customSearchEngines.list = JSON.parse(data.site_info.customSearchEngines);
            }
            if (data.site_info.top_bottom !== '') {
                this.top_bottom = JSON.parse(data.site_info.top_bottom);
            }
        },
        load(uname) {
            // 获取缓存数据
            const cacheKey = `xydh_site_cached_data_for_id_${uname}`;
            const cachedData = window.localStorage.getItem(cacheKey);
            if (cachedData) {
                // 如果有缓存的数据，则直接使用
                this.handleSiteData(JSON.parse(cachedData));
            }
            siteService.getAllsiteandlinks(uname).then(res => {
                if (res.code > 0) {
                    this.$alert('', '走迷路了', {
                        confirmButtonText: '回主页',
                        callback: () => {
                            window.location.href = 'https://xydh.fun';
                        },
                    });
                } else {
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
                    // 比较数据是否和缓存中的一致
                    if (!_.isEqual(res.data, cachedData)) {
                        // 如果不一致，则进行更新，并将数据存入localStorage中
                        window.localStorage.setItem(cacheKey, JSON.stringify(res.data));
                        this.handleSiteData(res.data);
                    }
                    this.handleFoldersData(res.data.folder_with_links, uname, 0)
                }
            });
        },
        // 输入密码
        GetPWDFolder(index, id, password) {
            if (!password) return
            siteService.getLinksbyfolderid(id, password).then(res => {
                if (res.code > 0) {
                    this.$message({
                        message: '密码错误,请重试',
                        type: 'error',
                    });
                    return;
                }
                this.Folders[index].need_password = false;
                if (res.data == null) {
                    // 文件夹里没有书签
                    return;
                }
                this.Folders[index].links = res.data;
                this.Folders[index].links.sort(function (l1, l2) {
                    return l2.weight - l1.weight; // weight
                });
            });
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

            let cache = cookieGet('cacheLinkList');
            let existKey = false;
            if (cache) {
                let cacheExist = JSON.parse(cache);
                cacheExist.filter(d => {
                    if (d.id === linkInfo.id) {
                        existKey = true;
                        d.count += 1;
                    }
                });

                if (!existKey) {
                    linkInfo.count = 1;
                    cacheExist.push(linkInfo);
                }
                // 取最新10个
                let newArr = cacheExist.slice(-10);
                cookieSet('cacheLinkList', JSON.stringify(newArr));
                this.cacheList = [...newArr];
            } else {
                let array = [];
                linkInfo.count = 1;
                array.push(linkInfo);
                let newArr = array.slice(-10);
                cookieSet('cacheLinkList', JSON.stringify(newArr));
                this.cacheList = [...newArr];
            }
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
        addToTabs(folder) {
            let flag = 0;
            this.TabFolders.filter(function (element) {
                if (element.id === folder.id) return (flag = 1);
            });
            if (flag !== 1) this.TabFolders.push(folder);
            this.AimTabName = folder.name;
            this.switchLab();
        },
        addIMGToTabs(IMGLink) {
            let flag = 0;
            this.TabIMGs.filter(function (element) {
                if (element.id === IMGLink.id) return (flag = 1);
            });
            if (flag !== 1) this.TabIMGs.push(IMGLink);
            this.AimTabName = IMGLink.name;
            this.switchLab();
        },
        moreLinkModalCloseClick() {
            this.moreLinkModalVisible = false;
        },
        extendModalCloseClick() {
            this.extendModalVisible = false;
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
