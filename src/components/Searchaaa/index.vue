<template>
    <div
        class="searchArea"
        ref="searchArea"
    >
        <div class="sou">
            <form class="search" :action="activeSearchEngine.url" target="_Blank">
                <div class="all-search">
                    <div class="se" title="点击切换搜索引擎" @click="changeSearchEngine" ref="changeSearchEngine">
                        <i id="icon-se" :class="activeSearchEngine.icon"></i>
                    </div>
                    <input
                        class="wd"
                        type="text"
                        :name="activeSearchEngine.name"
                        placeholder="按下回车搜索"
                        autocomplete="off"
                        v-model="searchTxt"
                        autofocus="autofocus"
                    />
                    <div class="sou-button" @click="submitClick">
                        <div class="s" id="s-button">
                            <i id="icon-sou" class="iconfont icon-sousuo"></i>
                        </div>
                    </div>
                </div>
                <input type="submit" id="search-submit" style="display: none" />
            </form>
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
                        <div
                            :class="activeSearchEngine.id === searchEngine.id ? 'active-se-li' : ''"
                            class="se-li"
                            v-for="searchEngine in seListPreinstallArray"
                            :key="searchEngine.id"
                            @click="setSearchEngine(searchEngine)"
                        >
                            <a
                                class="se-li-text"
                                :data-url="searchEngine.url"
                                :data-name="searchEngine.name"
                                :data-icon="searchEngine.icon"
                            >
                                <i id="icon-sou-list" :class="searchEngine.icon"></i>
                                <span>{{ searchEngine.title }}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        userInfo: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            searchEngineListShow: false,
            seListPreinstallArray: [
                {
                    type: '搜索引擎',
                    list: [
                        {
                            id: 1,
                            title: '百度',
                            url: 'https://www.baidu.com/s',
                            name: 'wd',
                            icon: 'iconfont icon-baidu',
                        },
                        {
                            id: 2,
                            title: '必应',
                            url: 'https://cn.bing.com/search',
                            name: 'q',
                            icon: 'iconfont icon-bing',
                        },
                        {
                            id: 3,
                            title: '谷歌',
                            url: 'https://www.google.com/search',
                            name: 'q',
                            icon: 'iconfont icon-google',
                        },
                        {
                            id: '11',
                            title: 'F搜',
                            name: 'q',
                            url: 'https://fsoufsou.com/search?tbn=all&autoCorrection=0',
                            icon: 'iconfont icon-google',
                        },
                        {
                            id: 4,
                            title: '搜狗',
                            url: 'https://www.sogou.com/web',
                            name: 'query',
                            icon: 'iconfont icon-sougousousuo',
                        },
                        {
                            id: 5,
                            title: '360',
                            url: 'https://www.so.com/s',
                            name: 'q',
                            icon: 'iconfont icon-360sousuo',
                        },
                        {
                            id: 55,
                            title: '头条',
                            url: 'https://www.so.com/s',
                            name: 'q',
                            icon: 'iconfont icon-360sousuo',
                        },
                    ]
                },
                {
                    type: '视频',
                    list: [

                    ]
                },
                {
                    id: 6,
                    title: '微博',
                    url: 'https://s.weibo.com/weibo',
                    name: 'q',
                    icon: 'iconfont icon-xinlangweibo',
                },
                {
                    id: 7,
                    title: '知乎',
                    url: 'https://www.zhihu.com/search',
                    name: 'q',
                    icon: 'iconfont icon-zhihu',
                },
                {
                    id: 8,
                    title: 'Github',
                    url: 'https://github.com/search',
                    name: 'q',
                    icon: 'iconfont icon-github',
                },
                {
                    id: 9,
                    title: 'BiliBili',
                    url: 'https://search.bilibili.com/all',
                    name: 'keyword',
                    icon: 'iconfont icon-bilibilidonghua',
                },
                {
                    id: 10,
                    title: '淘宝',
                    url: 'https://s.taobao.com/search',
                    name: 'q',
                    icon: 'iconfont icon-taobao',
                },
                {
                    id: 11,
                    title: '京东',
                    url: 'https://search.jd.com/Search',
                    name: 'keyword',
                    icon: 'iconfont icon-jingdong',
                },
            ],
            activeSearchEngine: {
                id: 1,
                url: 'https://www.baidu.com/s',
                name: 'wd',
                icon: 'iconfont icon-baidu',
            },
            searchResultLinks: [],
            searchTxt: '',
            keywordsShow: false,
        };
    },
    watch: {
        searchTxt(newVal) {
            // 在searchTxt变化时更新allLinks的值
            if (newVal === '') {
                this.keywordsShow = false;
            } else {
                this.searchResultLinks = this.findObjectsWithSubstring(this.$props.userInfo.AllLinks, newVal);
                this.keywordsShow = true;
            }
        },
    },

    mounted() {
        // 回填搜索引擎
        const cachedActiveSearchEngine = window.localStorage.getItem('activeSearchEngine');
        if (cachedActiveSearchEngine) {
            this.activeSearchEngine = JSON.parse(cachedActiveSearchEngine);
        }
    },
    methods: {
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
        // 开搜
        submitClick() {
            document.querySelector('#search-submit').click();
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
            this.activeSearchEngine = {...item};
            window.localStorage.setItem('activeSearchEngine', JSON.stringify(item));
            this.searchEngineListShow = false
        },
    },
};
</script>

<style lang="less">
    @import '~@/css/font.css';
    @import './index.less';
</style>
