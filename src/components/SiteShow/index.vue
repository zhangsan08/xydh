<template>
    <div>
        <div class="bg">
            <!-- 历史足迹 -->
            <el-row v-if="showHistory">
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
            <div class="bookmark" >
                <div class="nav">
                    <ul>
                        <div v-for="item in tabsList" :key="item.id">
                            <li @click="clickTab(item.id)" v-if="item.noUrl" >
                                <div :class="item.id === activeTabId ? 'active' : ''">
                                    {{ item.title }}
                                </div>
                            </li>
                            <el-popover
                                placement="top"
                                trigger="hover"
                                v-else
                            >
                                <div class="tooltipContent">
                                    <a
                                        :href="`https://xydh.fun/${item.id}`"
                                        target="_blank"
                                    >前往站长主页 <i class="el-icon-top-right"></i></a>
                                </div>
                                <li @click="clickTab(item.id)" slot="reference">
                                    <div :class="item.id === activeTabId ? 'active' : ''">
                                        {{ item.title }}
                                    </div>
                                </li>
                            </el-popover>
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
                <!-- <div class="commonUse">
                    <div v-for="item in 30" :key="item" class="item">
                        item
                    </div>
                </div> -->
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
                                            :class="{ [env]: true, 'lineTextCenter': lineTextCenter }"
                                            v-on:mouseenter="linkMouseEnter(link.info,link.name, Folder.id)"
                                            v-on:mouseleave="linkMouseLeave"
                                        >
                                            <a @click="goToUrl(link)" target="_blank" rel="nofollow">
                                                <div class="linkContent">
                                                    <span class="icon" v-if="showLineIcon">
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

    </div>
</template>

<script>
import {getPWDFolderFunc, getActiveLabelDataFunc, setHistoryLink} from '@/common/mainRequest';
import {cookieGet, cookieSet} from '@/common/cookie';
import {getEnv} from '@/common/env';
import Loading from '@/components/Loading.vue';
import MoreLinkModal from '@/components/MoreLinkModal.vue';
import ImgLinkModal from '@/components/ImgLinkModal.vue';

export default {
    name: 'ShowSite',
    components: {
        Loading,
        MoreLinkModal,
        ImgLinkModal,
    },

    props: {
        userInfo: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            is_vip: 0,
            historySwitch: false,
            screenWidth: '',
            userId: this.userInfo.userId,
            Folders: this.userInfo.Folders || [],
            cacheList: [],
            passwords: [],
            timeoutId: null, // 存储 setTimeout 的 ID
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
    },
    methods: {
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
                console.log(111);
                console.log(JSON.parse(cachedData));

                // 如果有缓存的数据，则直接使用
                this.Folders = JSON.parse(cachedData);
            }
            // 请求数据
            this.getActiveLabelData(id);
        },
        // 切换tab,请求数据
        async getActiveLabelData(id) {
            this.Folders = await getActiveLabelDataFunc(id, this.random);
        },
        switchHistory() {
            this.historySwitch = !this.historySwitch;
            cookieSet('historySwitch', this.historySwitch);
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
