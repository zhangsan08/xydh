<template>
    <div>
        <div class="bg">
            <div class="bookmark" v-if="!labSwitch && navSwitch">
                <div class="nav" v-if="userName === 'admin'">
                    <ul>
                        <li v-for="item in tabsList" :key="item.id" @click="clickTab(item.id)">
                            <div :class="item.id === activeTabId ? 'active' : ''">
                                {{ item.title }}
                            </div>
                        </li>
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
                        <el-row :class="isBorder?'folder':'folderNoBorder'">
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
                <el-row>
                    <div class="historyLinks">
                        <div
                            @click="switchHistory()"
                            class="historyLinksArrow"
                        >我的足迹<i class="el-icon-arrow-down" v-if='historySwitch'></i>
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
                                <div class="openFolder" @click="addToTabs(Folder)">
                                    <i class="fa fa-arrows-alt"></i>
                                </div>
                            </el-tooltip>
                        </div>
                        <div
                            :class="isBorder?'folder':'folderNoBorder'"
                            class="totop"
                            :style="{height: screenWidth > 768 ? '140px' : 'auto'}"
                            :id="Folder.id"
                            onselectstart="return false;"
                        >
                            <div class="linkbox">
                                <div class="inputPWD" v-if="Folder.need_password">
                                    <p><i class="el-icon-lock"></i></p>
                                    <p v-if="Folder.info">密码提示：{{Folder.info}}</p>
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
                                <div class="links" v-else v-for="link in Folder.links" :key="link.id">
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
                                                    <span class="linkName">{{link.name}}</span>
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
        </div>
        <!-- 音乐 -->
        <Player :musicList="music.list" v-if="music.open"/>
        <el-col :span="24">
            <div class="totop">
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
import {siteService} from '@/common/api';
import {getPWDFolderFunc} from '@/common/mainRequest';

import {cookieGet, cookieSet} from '@/common/cookie';
import {getEnv} from '@/common/env';
import Footer from '@/components/Footer.vue';
import Player from '@/components/Player.vue'
import Loading from '@/components/Loading.vue';

export default {
    name: 'ShowSite',
    components: {
        Footer,
        Player,
        Loading,
    },
    props: {
        userName: {
            type: String,
            required: true,
        },
        userInfo: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            is_vip: 0,
            labSwitch: false,
            historySwitch: false,
            navSwitch: true,
            screenWidth: '',
            userid: 0,
            sitename: '',
            siteinfo: '',
            Folders: [],
            TabFolders: [],
            TabIMGs: [],
            AllLinks: this.userInfo.AllLinks || [], // 检索用
            AimTabName: '',
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
            activeIndex: '1',
            tabsList: [
                {title: '首页', id: 'admin'},
                {title: 'AI', id: 'loveai'},
                {title: '小帅', id: 'gmengshuai'},
                {title: '以西', id: 'chenyixi'},
                {title: 'YYDS', id: 'yyds007'},
                {title: '文学', id: 'tiantian666'},
                {title: '加入', id: 'friend'},
            ],
            activeTabId: 'admin',
            random: new Date().valueOf(), // 处理切换tab重复请求
            showMessage: false,
            infoTips: '',
            hoverFileId: '',
            env: '',
            isBorder: false,
        };
    },
    watch: {
        userInfo: {
            handler(newVal) {
                // 当 userInfo 变化时，将新的 userInfo 中的 Folders 赋值给组件的 Folders 属性
                this.Folders = newVal.Folders;
            },
            deep: true // 深度监听 userInfo 对象的变化
        }
    },
    beforeMount() {
        // this.$message({
        //   showClose: true,
        //   message: '这几天网站进行技术维护.可能会一直出现打不开的情况.一定关注公众号【炫技巧】防止迷路',
        //   type: 'warning'
        // });
        this.screenWidth = document.body.clientWidth;
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
            // 记录当前的随机数，用于判断是否需要更新数据
            const random = this.random;
            // 调用API获取数据
            siteService.getAllsiteandlinks(id).then(res => {
                // 如果随机数已经变化，则表示已经更新了tab，需要丢弃当前的数据
                if (this.random !== random) return;
                // 对数据进行相关处理
                let linksData = this.handlelinkSort(res.data.folder_with_links);
                // 比较数据是否和缓存中的一致
                const cacheKey = `xydh_tab_cached_data_for_id_${id}`;
                const cachedData = window.localStorage.getItem(cacheKey);
                if (!_.isEqual(linksData, cachedData)) {
                    // 如果不一致，则进行更新，并将数据存入localStorage中
                    this.Folders = [...linksData];
                    window.localStorage.setItem(cacheKey, JSON.stringify(linksData));
                }
            });
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
        // 输入密码
        getPWDFolder(index, id, password) {
            this.Folders[index] = getPWDFolderFunc(id, password)
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
                this.addIMGToTabs(linkInfo);
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
    },
};
</script>

<style lang="less">
    @import './index.less';
</style>
