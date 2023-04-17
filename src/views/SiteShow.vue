<template>
    <div>
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
            <div style="margin: 0 auto 0">
                <span class="siteName">{{ sitename }}</span>
                <div style="margin: 10px auto"></div>
                <!-- <p class="siteInfo">{{ siteinfo }}</p> -->
                {{ siteinfo }}
            </div>
            <div style="height: 80px" v-if="!navSwitch && !labSwitch"></div>
            <!-- 搜索框 -->
            <div class="search">
                <SearchTool :AllLinks="AllLinks"></SearchTool>
            </div>

            <!-- 点击实验室按钮会打开实验室页面 -->
            <div class="Lab totop" v-if="labSwitch">
                <div class="hidden-sm-and-up" style="height: 50px"></div>
                <transition name="el-zoom-in-left">
                    <IndexLab
                        :lybID="lybID"
                        :Folders="TabFolders"
                        :IMGs="TabIMGs"
                        :AimName="AimTabName"
                        v-Clickoutside="switchLab"
                    ></IndexLab>
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
            <el-row>
                <div class="historyLinks" v-if="historySwitch">
                    <div v-if="cacheList.length > 0" class="historyLinkArea">
                        <div class="historyLink" v-for="link in cacheList" @click="goToUrl(link)" :key="link.id">
                            <p>{{ link.name }}</p>
                        </div>
                    </div>
                    <div v-else>
                        <el-divider>正常使用导航后此处将显示本地最常访问的书签哦</el-divider>
                    </div>
                </div>
            </el-row>
            <!-- <div class="recommendedSites">
                <ul>
                    <li v-for="(item) in tabsList" :key="item.id">
                        {{item.title}}
                    </li>
                </ul>
            </div> -->
            <div class="nav" v-if="username === 'admin'">
                <ul>
                    <li v-for="item in tabsList" :key="item.id" @click="clickTab(item.id)">
                        <div :class="item.id === activeTabId ? 'active' : ''">
                            {{ item.title }}
                        </div>
                    </li>
                </ul>
            </div>
            <div class="bookmark" v-if="!labSwitch && navSwitch">
                <!-- 手机端快捷导航 -->
                <div class="hidden-sm-and-up totop">
                    <el-divider>快捷导航</el-divider>
                    <div style="padding: 10px 10px">
                        <el-col :span="6" v-for="Folder in Folders" :key="Folder.id">
                            <div style="margin: 5px auto">
                                <a :href="'#' + Folder.name" style="font-size: 16px">
                                    {{ Folder.name }}
                                </a>
                            </div>
                        </el-col>
                    </div>
                </div>
                <div v-if="Folders.length === 0" class="loading">
                    <Loading />
                </div>

                <!-- 用户自定义内容 -->
                <el-row v-else>
                    <div v-for="(Folder, index) in Folders" :key="Folder.id">
                        <el-col :xs="24" :sm="12" :md="8" :xl="6">
                            <div class="foldername" :id="Folder.name">
                                <p v-if="Folder.icon"><i :class="'fa fa-' + Folder.icon"></i>{{ Folder.name }}</p>
                                <p v-else>{{ Folder.name }}</p>
                                <el-tooltip content="展开文件夹" placement="top">
                                    <div class="openFolder" @click="addToTabs(Folder)">
                                        <i class="fa fa-arrows-alt"></i>
                                    </div>
                                </el-tooltip>
                            </div>
                            <div
                                class="folder totop"
                                :style="{height: screenWidth > 768 ? '140px' : 'auto'}"
                                :id="Folder.id"
                                onselectstart="return false;"
                            >
                                <div class="linkbox">
                                    <div class="inputPWD" v-if="Folder.need_password">
                                        <!-- 如果文件夹需要密码 -->
                                        <el-input
                                            type="text"
                                            autosize
                                            v-model="passwords[index]"
                                            :placeholder="Folder.info"
                                            clearable
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
                                            <div class="link">
                                                <el-tooltip :content="link.info" placement="top" v-if="link.info">
                                                    <a @click="goToUrl(link)" target="_blank" rel="nofollow">
                                                        <p v-if="link.icon">
                                                            <i :class="'fa fa-' + link.icon"></i>&#160;{{ link.name }}
                                                        </p>
                                                        <p v-else>{{ link.name }}</p>
                                                    </a>
                                                </el-tooltip>
                                                <a @click="goToUrl(link)" target="_blank" rel="nofollow" v-else>
                                                    <p v-if="link.icon">
                                                        <i :class="'fa fa-' + link.icon"></i>&#160;{{ link.name }}
                                                    </p>
                                                    <p v-else>{{ link.name }}</p>
                                                </a>
                                            </div>
                                        </el-col>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </div>
                </el-row>
            </div>
        </div>
        <!-- 音乐 -->
        <span class="amusic">
            <aplayer
                :music="music.list[0]"
                :list="music.list"
                :narrow="false"
                float
                :listFolded="true"
                :autoplay="true"
                :mini="musicIsMini"
                ref="aplayer"
                theme="#fff"
            ></aplayer>
        </span>

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
import {cookieGet, cookieSet} from '@/common/cookie';
import IndexLab from '@/views/IndexLab.vue';
import {getUrl} from '@/common/pickup';
import {isWeiXin} from '@/common/env';

// import RightBar from '@/components/RightBar'
import SearchTool from '@/components/SearchTool.vue';
// import Paomadeng from '@/components/Paomadeng.vue'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Particle from '@/components/particle.vue';
import Aplayer from 'vue-aplayer';
import Clickoutside from 'element-ui/src/utils/clickoutside';
import Loading from '@/components/Loading.vue';

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
        IndexLab,
        // RightBar,
        Particle,
        Aplayer,
        Loading,
    },
    directives: {
        Clickoutside,
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
            musicIsMini: true,
            timeoutId: null, // 存储 setTimeout 的 ID
            top_bottom: {
                top_switch: true,
                bottom_list: [],
            },
            isWeiXin: isWeiXin(),
            activeIndex: '1',
            tabsList: [
                {title: '首页', id: 'admin'},
                {title: '以西笑嘻嘻', id: 'chenyixi'},
                {title: 'YYDS导航', id: 'yyds007'},
            ],
            activeTabId: 'admin',
            random: new Date().valueOf(), // 处理切换tab重复请求
        };
    },
    beforeMount() {
        // this.$message({
        //   showClose: true,
        //   message: '这几天网站进行技术维护.可能会一直出现打不开的情况.一定关注公众号【炫技巧】防止迷路',
        //   type: 'warning'
        // });
        this.screenWidth = document.body.clientWidth;
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
        const aplayer = this.$refs.aplayer.$el; // 获取 vue-aplayer 组件的 outerHTML 元素
        aplayer.addEventListener('mouseenter', this.handleMouseEnter);
        aplayer.addEventListener('mouseleave', this.handleMouseLeave);
    },
    beforeDestroy() {
        // 销毁组件前移除事件监听器
        const aplayer = this.$refs.aplayer.$el;
        aplayer.removeEventListener('mouseenter', this.handleMouseEnter);
        aplayer.removeEventListener('mouseleave', this.handleMouseLeave);
    },
    methods: {
        handleMouseEnter() {
            this.musicIsMini = false;
            clearTimeout(this.timeoutId); // 清除之前设置的定时器
        },
        handleMouseLeave() {
            this.timeoutId = setTimeout(() => {
                this.musicIsMini = true; // 鼠标移出后 1 秒钟
            }, 1000);
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
                if (this.random != random) return;
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
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
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
                    this.$alert('', '走迷路了', {
                        confirmButtonText: '回主页',
                        callback: () => {
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
                    if (res.data.site_info.bg_switch) {
                        if (window.innerWidth < 768 && this.mobile_bg) {
                            obj.style.backgroundImage = 'url(' + this.mobile_bg + ')';
                        } else {
                            obj.style.backgroundImage = 'url(' + res.data.site_info.bg + ')';
                        }
                        // window.onresize = () => {
                        //     if(window.innerWidth < 768 && this.mobile_bg) {
                        //         obj.style.backgroundImage = "url(" + this.mobile_bg + ")"
                        //     } else {
                        //         obj.style.backgroundImage = "url(" + res.data.site_info.bg + ")"
                        //     }
                        // }
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
                    const cacheKey = `xydh_tab_cached_data_for_id_${this.username}`;
                    window.localStorage.setItem(cacheKey, JSON.stringify(this.Folders));
                }
            });
        },
        // 输入密码
        GetPWDFolder(index, id, password) {
            siteService.getLinksbyfolderid(id, password).then(res => {
                if (res.code > 0) {
                    this.$alert('请重试', '密码错误', {});
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
                cookieSet('cacheLinkList', JSON.stringify(cacheExist));
            } else {
                let array = [];
                linkInfo.count = 1;
                array.push(linkInfo);
                cookieSet('cacheLinkList', JSON.stringify(array));
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
    body {
        /* background-image: url('../assets/bg.jpg'); */

        background-attachment: fixed;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        background-color: black;
        text-align: center;
        font-size: 13px;
        color: white;
        margin: 0;
    }
    .loading {
        margin-top: 20px;
    }
    .nav {
        background: rgba(0, 0, 0, 0.318);
        background-color: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(2px);
        margin: 0 20px;
        border-radius: 4px;
        overflow-x: scroll;
        ul {
            align-items: center;
            display: inline-flex;
            height: auto;
            margin: 0px;
            overflow: hidden;
            padding-inline: 0px;
            li {
                font-size: 14px;
                list-style: none;
                padding: 0px 10px;
                align-items: center;
                border-bottom: 2px solid transparent;
                box-sizing: border-box;
                cursor: pointer;
                fill: #ffffff;
                font-size: 14px;
                justify-content: center;
                line-height: 20px;
                outline: none;
                text-decoration: none;
                white-space: nowrap;

                .active {
                    font-weight: bold;
                    &::after {
                        border-bottom: 2px solid #3091dc;
                        border-radius: 40px;
                        content: '';
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                        margin-top: 3px;
                        width: 26px;
                    }
                }
            }
        }
        .recommendedSites {
            grid-row: 7 / auto;
            opacity: 1;
            transition: opacity 0.3s ease-out 0s;
            visibility: visible;
            align-items: center;
            display: flex;
            flex-direction: column;
            background-color: rgba(0, 0, 0, 0.2);
            ul {
                display: flex;
                flex-flow: row wrap;
                list-style: none;
                margin: 0px;
                overflow: hidden;
                margin: 0px;
                padding-top: 8px;
                padding-bottom: 8px;
                padding-inline: 8px 45px;
                li {
                    height: 28px;
                    margin: 4px;
                    padding: 0px 4px;
                    border-radius: 6px;
                }
            }
        }
    }
    .wx {
        height: 100vh;
        width: 100%;
        background: #000;
        position: absolute;
        top: 0;
        z-index: 1000;
        color: #000;
        font-size: 16px;
    }
    .wx img {
        width: 100%;
    }
    // .bg {
    //     height: 100%;
    //     width: 100%;
    //     overflow-y: scroll;
    //     position: absolute;
    //     top: 0;
    //     z-index: 1;
    // }
    .siteName {
        font-size: 36px;
        font-weight: bold;
    }
    .totop {
        z-index: 1;
        position: relative;
    }
    .folder {
        /* background: rgba(0, 0, 0, 0.03); */
        /* background: rgba(255, 255, 255, 0.06); */
        background-color: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(2px);
        min-height: 140px;
        margin: 12px 20px;
        padding: 5px 0 0 0;
        border-radius: 20px;
        /* 滚动条 */
        overflow: auto;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE 10+ */
        box-sizing: border-box;
    }

    /* 滚动条 */
    ::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }

    .folder:hover {
        background: rgba(0, 0, 0, 0.6);
        color: white;
        background-color: rgba(0, 125, 184, 0.4);
        backdrop-filter: blur(3px);
        border: 1px solid rgba(0, 125, 184, 0.4);
        box-sizing: border-box;
    }

    .foldername {
        position: relative;
        top: 0;
        left: 0;
        padding-top: 6px;
    }

    .foldername p {
        font-size: 16px;
        letter-spacing: 5px;
        font-weight: bolder;
        margin: 6px auto 6px;
        cursor: default;
    }

    .links {
        margin: 6px auto 0;
    }

    /* 每个书签 */
    .link {
        min-height: 33px;
        max-height: 33px;
        cursor: pointer;
        padding: 0 15px;
    }

    .link:hover {
        color: gold;
        /* cursor: pointer; */
    }

    /* Tooltip 文本 */
    .link .tooltiptext {
        text-align: left;
        visibility: hidden;
        background: rgba(0, 0, 0, 1);
        max-width: 400px;
        /* box-shadow: 0 0 5px #666; */
        /* color: gold; */
        font-size: 16px;
        /* 定位 */
        top: 30px;
        left: 0;
        padding: 10px 20px;
        position: fixed;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
    }

    .link:hover .tooltiptext {
        visibility: visible;
        color: white;
    }

    a {
        color: inherit;
    }

    .historyLinks {
        margin: 10px auto 100px;
        max-width: 1080px;
    }
    .historyLinkArea {
        display: flex;
    }
    .historyLink p {
        cursor: pointer;
        width: 200px;
        height: 50px;
        overflow: hidden;
        background-color: rgba(0, 125, 184, 0.4);
        backdrop-filter: blur(3px);
        margin-right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid transparent;
        border-radius: 0.25rem;
        font-size: 0.9375rem;
    }
    .historyLink p:hover {
        border: 1px dashed rgba(0, 125, 184, 0.4);
    }
    .inputPWD {
        padding: 10% 2%;
    }

    .inputPWD .el-input__inner {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 0;
        color: inherit;
        font-size: 12px;
        border: 0;
    }

    .inputPWD .el-input__inner::placeholder {
        color: inherit;
    }

    .inputPWD .el-input-group__append {
        background-color: rgba(255, 255, 255, 0.15);
        color: inherit;
        border-radius: 0;
        cursor: pointer;
        border: 0;
    }

    .amusic {
        position: fixed;
        // max-width: 500px;
        // left: -5px;
        bottom: 10px;
        left: 0;
        z-index: 999;
        width: 100%;
        .aplayer {
            background-color: rgba(0, 125, 184, 0.4);
            backdrop-filter: blur(3px);
            .aplayer-title {
                color: #fff;
            }
            .aplayer-body .aplayer-info .aplayer-music .aplayer-author {
                color: #c0c0c0;
            }
        }

        .aplayer-controller {
            height: 30px;
            .aplayer-time {
                width: 30%;
                .aplayer-time-inner {
                    font-size: 14px;
                }
                .aplayer-icon {
                    width: 20px;
                    height: 20px;
                }
                .aplayer-fill {
                    fill: #fff !important;
                }
                .aplayer-volume-wrap {
                    margin-left: 0px;
                    margin-right: 0px;
                }
                .aplayer-icon {
                    margin-left: 10px !important;
                    margin-right: 10px;
                }
            }
        }
    }

    .openFolder {
        position: absolute;
        right: 20px;
        top: 14px;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    .openFolder:hover {
        color: gold;
    }

    .particle {
        z-index: -999;
    }
</style>
