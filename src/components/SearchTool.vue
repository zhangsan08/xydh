<template>
    <div class="search">
        <!-- 搜索引擎分类 -->
        <el-row type="flex" justify="center">
            <li class="li-tab" @click="switchLab()">
                <i class="fa fa-cog fa-spin"></i> &nbsp;{{ labtext[labtextindex] }}
            </li>

            <li
                class="li-tab"
                v-for="item in searchClass"
                :key="item.id"
                @click="selectClass(item)"
                :class="{active: selectedClass === item.id}"
            >
                {{ item.name }}
                <div class="trangle"></div>
            </li>
        </el-row>
        <!-- 具体搜索引擎 -->
        <el-row type="flex" justify="center">
            <li
                class="li-tab"
                v-for="item in x[selectedClass]"
                :key="item.id"
                @click="toggleTabs(item)"
                :class="{activeEngine: selectedEngine === item.id}"
            >
                {{ item.name }}
            </li>
        </el-row>
        <br />
        <!-- 搜索输入框 -->
        <el-row type="flex" justify="center" class="searchBox">
            <el-col :xs="24" :sm="18" :md="10">
                <el-input
                    autofocus="autofocus"
                    type="text"
                    v-model="searchTxt"
                    :placeholder="text"
                    clearable
                    @keyup.enter.native="Sou(url + searchTxt)"
                    class="background"
                >
                    <span slot="append" type="text" @click="Sou(url + searchTxt)"><i class="el-icon-search"></i></span>
                </el-input>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" v-if="searchTxt && AllLinks" class="searchBox">
            <el-col :xs="24" :sm="18" :md="10">
                <div class="searchResult">
                    站内搜索结果：
                    <p :key="link.id" v-for="link in AllLinks.filter(SiteSearch)">
                        <a @click="goToUrl(link)" target="_blank" rel="nofollow">
                            <span v-if="link.icon">
                                <i :class="'fa fa-' + link.icon"></i>
                                &#160;{{ link.name }}:&#160;{{ link.info }}&#160;[
                                <span class="url"> {{ link.url }}</span>
                                ]
                            </span>
                            <span
                                v-else
                            >{{ link.name }}:&#160;{{ link.info }}&#160;[
                                <span class="url"> {{ link.url }}</span> ]</span>
                        </a>
                    </p>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: ['AllLinks'],
    data() {
        return {
            timer: '',
            labtext: ['实验室', '热点榜', '留言板', 'News'],
            labtextindex: 0, // 上面那个数组的下标
            selectedEngine: 0,
            selectedClass: 0,
            text: '输入即可站内搜索，按下回车使用百度搜索',
            searchTxt: '',
            url: 'https://www.baidu.com/s?wd=',
            labSwith: false,
            searchClass: [
                {id: 0, name: '常用'},
                {id: 1, name: '视频'},
                {id: 2, name: '资源'},
                {id: 3, name: '学术'},
                {id: 4, name: '社交'},
                {id: 5, name: '生活'},
            ],
            x: [
                // 常用
                [
                    {id: '0', name: '百度', text: '百度一下,你就知道', url: 'https://www.baidu.com/s?wd='},
                    {
                        id: '1',
                        name: 'F搜',
                        text: '按下回车搜索',
                        url: 'https://fsoufsou.com/search?tbn=all&autoCorrection=0&q=',
                    },
                    {id: '2', name: '谷歌', text: '请自备工具', url: 'https://www.google.com/search?q='},
                    {id: '3', name: '360', text: '', url: 'https://www.so.com/s?q='},
                    {id: '4', name: 'Bing', text: '', url: 'https://cn.bing.com/search?q='},
                    {id: '6', name: '搜狗', text: '', url: 'https://www.sogou.com/web?query='},
                ],
                //  视频
                [
                    {id: '0', name: 'Bilibili', text: '', url: 'https://search.bilibili.com/all?keyword='},
                    {id: '21', name: 'Acfun', text: '', url: 'https://www.acfun.cn/search?keyword='},
                    {id: '22', name: '爱奇艺', text: '', url: 'https://so.iqiyi.com/so/q_'},
                    {id: '23', name: '腾讯', text: '', url: 'https://v.qq.com/x/search/?q='},
                    {id: '24', name: '优酷', text: '', url: 'https://so.youku.com/search_video/q_'},
                    {id: '25', name: '芒果', text: '', url: 'https://so.mgtv.com/so?k='},
                ],
                //  资源
                [
                    {id: '0', name: '网易云音乐', text: '网易云', url: 'https://music.163.com/#/search/m/?s='},
                    {
                        id: '2',
                        name: 'QQ音乐',
                        text: '',
                        url: 'https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=',
                    },
                    {
                        id: '30',
                        name: '鸠摩搜书',
                        text: '请直接按回车进入搜索 此输入无效',
                        url: 'https://www.jiumodiary.com/',
                    },
                    {id: '31', name: '小说', text: '', url: 'https://www.boyunso.com/search/?kw='},
                    {id: '10', name: '网盘', text: '', url: 'http://www.rufengso.net/s/name/'},
                    {id: '11', name: '福利吧', text: '', url: 'https://fulibus.net/?s='},
                    {id: '12', name: '花瓣', text: '', url: 'https://huaban.com/search/?q='},
                ],
                //  学术
                [
                    {
                        id: '0',
                        name: 'SCI-Hub',
                        text: '请直接输入SCI/DOI文章地址 如https://doi.org/10.1094/MPMI-08-19-0239-IA',
                        url: 'https://sci-hub.shop/',
                    },
                    {id: '1', name: '百度学术', text: '', url: 'https://xueshu.baidu.com/s?wd='},
                    {
                        id: '2',
                        name: '知网',
                        text: '',
                        url: 'http://kns.cnki.net/kns/brief/Default_Result.aspx?code=SCDB&kw=',
                    },
                    {id: '3', name: '小木虫', text: '', url: 'http://muchong.com/bbs/search.php?wd='},
                    {
                        id: '4',
                        name: '影响因子',
                        text: '',
                        url: 'http://www.letpub.com.cn/index.php?page=journalapp&view=search&searchname=',
                    },
                    {id: '5', name: 'DOI', text: '', url: 'https://doi.org/'},
                    {id: '6', name: 'Google', text: '', url: 'https://scholar.google.com/scholar?q='},
                ],
                //  社交媒体
                [
                    {id: '0', name: '公众号', text: '', url: 'https://weixin.sogou.com/weixin?type=2&query='},
                    {id: '1', name: '微博', text: '', url: 'https://s.weibo.com/weibo/'},
                    {id: '2', name: '知乎', text: '', url: 'https://www.zhihu.com/search?type=content&q='},
                    {id: '3', name: '豆瓣', text: '', url: 'https://www.douban.com/search?q='},
                    {id: '4', name: 'Github', text: '全球最大男性社交平台', url: 'https://github.com/search?q='},
                ],
                //  生活
                [
                    {id: '0', name: '京东', text: '', url: 'https://search.jd.com/Search?enc=utf-8&keyword='},
                    {id: '1', name: '淘宝', text: '', url: 'https://s.taobao.com/search?q='},
                    {id: '10', name: '地图', text: '', url: 'https://ditu.amap.com/search?query='},
                    {
                        id: '11',
                        name: '查快递',
                        text: '请直接输入单号',
                        url: 'https://m.kuaidi100.com/result.jsp?nu=',
                    },
                    {id: '12', name: '学做菜', text: '输入菜名', url: 'http://www.xiachufang.com/search/?keyword='},
                    {id: '13', name: '翻译', text: '', url: 'https://cn.bing.com/dict/search?q='},
                    {
                        id: '14',
                        name: '网络流行语',
                        text: '爷爷再也不用担心听不懂',
                        url: 'https://jikipedia.com/search?phrase=',
                    },
                ],
            ],
        };
    },
    beforeMount() {
        this.timer = setInterval(this.switchLabText, 1600);
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    methods: {
        // 切换tab项
        toggleTabs(item) {
            //  this.nowIndex = index;
            // 选择具体的搜索引擎
            this.selectedEngine = item.id;
            this.url = item.url;
            this.text = item.text;
        },
        // 切换搜索分类
        selectClass(item) {
            // 换到第一个Tab上
            this.selectedEngine = '0';
            this.selectedClass = item.id;
            this.engines = this.x[item.id];
            this.url = this.x[item.id][0].url;
            this.text = this.x[item.id][0].text;
        },
        Sou(url) {
            url = encodeURI(url);
            window.open(url, '_blank');
        },
        switchLab() {
            this.$parent.switchLab();
        },
        switchLabText() {
            this.labtextindex = (this.labtextindex + 1) % 3; // 循环轮播【实验室、热榜等】
        },
        goToUrl(linkInfo) {
            window.open(linkInfo.url, '_blank');
        },
        SiteSearch(oneLink) {
            if (oneLink === null) {
                return false;
            }
            return (
                oneLink.name.toLowerCase().includes(this.searchTxt.toLowerCase()) ||
                    oneLink.info.toLowerCase().includes(this.searchTxt.toLowerCase()) ||
                    oneLink.url.toLowerCase().includes(this.searchTxt.toLowerCase())
            );
        },
    },
};
</script>

<style>
    .search {
        margin: 30px 0;
        text-align: center;
        z-index: 999;
    }
    .searchBox{
        margin: 0 20px;
    }
    .searchResult {
        z-index: 1;
        position: relative;
        cursor: pointer;
        text-align: left;
        background: rgba(0, 0, 0, 0.318);
        max-height: 300px;
        overflow-y: scroll;
        padding: 15px;
         border-radius:0 0 4px 4px;
    }
    .searchResult .url {
        text-decoration: underline;
    }
    .searchResult p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .background {
        background-color: transparent;
        backdrop-filter: blur(3px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        box-sizing: border-box;
    }

    .li-tab {
        float: left;
        cursor: pointer;
        line-height: 18px;
    }

    .active .trangle {
        /* position: absolute; */
        width: 0;
        height: 2px;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        border-top: 6px solid #ffffff;
        z-index: 99;
        bottom: 0;
        /* left: 50%; */
        margin-left: 8px;
    }

    .activeEngine {
        font-size: 17px;
    }

    /* 搜索框 */
    .search .el-input__inner {
        background-color: rgba(0, 0, 0, 0.1);
        /* border-top-left-radius: 25px;
        border-bottom-left-radius: 25px; */
        border: 0;
        color: inherit;
    }

    /* placeholder颜色 */
    .search .el-input__inner::placeholder {
        color: inherit;
    }

    /* 搜索按钮 */
    .search .el-input-group__append {
        background-color: rgba(0, 0, 0, 0.2);
        color: inherit;
        font-size: 18px;
        /* border-top-right-radius: 25px;
        border-bottom-right-radius: 25px; */
        border: 0;
        cursor: pointer;
    }
</style>
