<template>
    <div class="searchArea" ref="searchArea">
        <div class="sou" ref="searchAreaInput">
            <div class="search">
                <div class="all-search" :class="{searchBoxFillet: searchBoxFillet}">
                    <div class="se" title="点击切换搜索引擎" @click="changeSearchEngine" ref="changeSearchEngine">
                        <i id="icon-se" :class="activeSearchEngine.icon" v-if="activeSearchEngine.icon"></i>
                        <span v-else>{{ activeSearchEngine.title }}</span>
                    </div>
                    <el-input
                        class="wd"
                        type="text"
                        :placeholder="activeSearchEngine.placeholder || '想要搜点什么'"
                        autocomplete="off"
                        v-model="searchTxt"
                        autofocus="autofocus"
                        clearable
                        @keyup.enter.native="Sou(activeSearchEngine.url + searchTxt)"
                    />
                    <div class="sou-button" @click="Sou(activeSearchEngine.url + searchTxt)">
                        <div class="s" id="s-button">
                            <i id="icon-sou" class="iconfont icon-sousuo"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div id="keywords" v-show="keywordsShow">
                <p class="title">
                    站内搜索结果：
                    <span v-if="searchResultLinks.length === 0"> 没有符合的结果 </span>
                </p>
                <div class="keyword" v-for="link in searchResultLinks" :key="link.id" @click="goToUrl(link)">
                    <i class="iconfont icon-sousuo"></i>
                    <span>
                        {{ link.name }}
                    </span>
                    <span v-if="link.info"> ：{{ link.info }} </span>
                </div>
            </div>
            <transition name="fade">
                <div class="search-engine" v-if="searchEngineListShow">
                    <div class="search-engine-list">
                        <el-tabs v-model="tabActiveName">
                            <el-tab-pane
                                v-for="searchEngine in seListPreinstallArray"
                                :key="searchEngine.type"
                                :label="searchEngine.type"
                                :name="searchEngine.type"
                            >
                                <div class="searchEngineList">
                                    <div
                                        v-for="item in searchEngine.list"
                                        :key="item.url"
                                        @click="setSearchEngine(item)"
                                        class="se-li"
                                        :class="activeSearchEngine.title === item.title ? 'active-se-li' : ''"
                                    >
                                        <a class="se-li-text" :data-url="item.url" :data-icon="item.icon">
                                            <i id="icon-sou-list" :class="item.icon" v-if="item.icon"></i>
                                            <span>{{ item.title }}</span>
                                        </a>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import {searchEngineList} from '@/common/searchConfig';

export default {
    props: {
        AllLinks: {
            type: Array,
            required: true,
        },
        customSearchEngines: [],
    },
    data() {
        return {
            searchEngineListShow: false,
            tabActiveName: '搜索引擎',
            seListPreinstallArray:
                    this.customSearchEngines.list.length > 0
                        ? [this.customSearchEngines, ...searchEngineList]
                        : searchEngineList,
            activeSearchEngine: {
                type: '搜索引擎',
                url: 'https://www.baidu.com/s?wd=',
                title: '百度',
                placeholder: '百度一下,你就知道',
                icon: 'iconfont icon-baidu',
            },
            searchResultLinks: [],
            searchTxt: '',
            keywordsShow: false,
        };
    },
    computed: {
        searchBoxFillet() {
            return this.$store.state.userConfig.searchBoxFillet;
        },
    },
    watch: {
        searchTxt(newVal) {
            // 在searchTxt变化时更新allLinks的值
            if (newVal === '') {
                this.keywordsShow = false;
            } else {
                this.searchResultLinks = this.findObjectsWithSubstring(this.$props.AllLinks, newVal);
                this.keywordsShow = true;
                this.searchEngineListShow = false;
            }
        },
    },

    mounted() {
        window.addEventListener('click', this.handleOutsideClick);
        // 回填搜索引擎
        const cachedActiveSearchEngine = window.localStorage.getItem('activeSearchEngine');
        if (cachedActiveSearchEngine) {
            let cachedActiveSearchEngineObj = JSON.parse(cachedActiveSearchEngine);
            let cachedActiveSearchEngineType = cachedActiveSearchEngineObj.type;
            // 缓存类型为自定义 且 当前有自定义搜索 且 两者不匹配 显示默认
            if (cachedActiveSearchEngineType === '自定义') {
                if (this.seListPreinstallArray[0].type === '自定义') {
                    let exists = this.seListPreinstallArray[0].list.some(
                        item => item.url === cachedActiveSearchEngineObj.url
                    );
                    if (!exists) {
                        return;
                    }
                } else {
                    return
                }
            }
            this.activeSearchEngine = cachedActiveSearchEngineObj;
            this.tabActiveName = cachedActiveSearchEngineType;
        }
    },
    beforeDestroy() {
        window.removeEventListener('click', this.handleOutsideClick);
    },

    methods: {
        Sou(url) {
            console.log(url);

            url = encodeURI(url);
            window.open(url, '_blank');
        },
        handleOutsideClick(e) {
            if (!this.$refs.searchAreaInput.contains(e.target)) {
                this.searchEngineListShow = false;
            }
        },
        // 查询 searchTxt
        findObjectsWithSubstring(arr, substr) {
            return arr.filter(obj => {
                return Object.values(obj || {}).some(
                    value => typeof value === 'string' && value.toLowerCase().includes(substr.toLowerCase())
                );
            });
        },
        goToUrl(linkInfo) {
            window.open(linkInfo.url, '_blank');
        },
        // 点击切换搜索引擎
        changeSearchEngine() {
            this.handleKeywordsShow();
            this.searchEngineListShow = !this.searchEngineListShow;
        },
        // 处理热词提示和搜索引擎弹窗冲突
        handleKeywordsShow() {
            if (this.searchTxt !== '') {
                if (this.searchEngineListShow) {
                    this.keywordsShow = true;
                } else {
                    this.keywordsShow = false;
                }
            }
        },
        // 设置搜索引擎
        setSearchEngine(item) {
            this.handleKeywordsShow();
            const activeEngine = {
                type: this.tabActiveName,
                ...item,
            };
            this.activeSearchEngine = {...activeEngine};
            window.localStorage.setItem('activeSearchEngine', JSON.stringify(activeEngine));
            this.searchEngineListShow = false;
        },
    },
};
</script>

<style lang="less">
    @import '~@/css/font.css';
    @import './index.less';
</style>
