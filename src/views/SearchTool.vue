<template>
    <div class="serach">
        <el-row type="flex" justify="center">
            <!-- 搜索框改变大小 -->
            <el-col :xs="24" :sm="18" :md="12">
                <el-tabs stretch v-model="selected">
                    <!-- 搜索标签 -->
                    <el-tab-pane v-for="item in engines" :key="item.id" :name="item.id" lazy>
                        <span slot="label">{{ item.name }}</span>
                        <el-col :span="23">
                            <el-input type="text" v-model="txt" :placeholder="item.text" @keyup.enter.native="Sou(item.url+txt)">
                                <span slot="append" type="text" @click="Sou(item.url+txt)"><i class="el-icon-search"></i></span>
                            </el-input>
                        </el-col>
                        <!-- <el-col :span="3">
                            <el-button type="primary" icon="el-icon-search"  @click="Sou(item.url+txt)" circle=""></el-button>
                        </el-col> -->
                    </el-tab-pane>
                    <!-- 下拉菜单 -->
                    <el-tab-pane name="999" disabled="">
                            <span slot="label">
                            <el-dropdown placement="bottom" @command="selectClass">
                                <span class="el-dropdown-link">
                                    <el-button size="" type="text" icon="el-icon-arrow-down" circle=""></el-button>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command=0><i class="fa fa-paw"></i>常用</el-dropdown-item>
                                    <el-dropdown-item command=1><i class="fa fa-skyatlas"></i>资源</el-dropdown-item>
                                    <el-dropdown-item command=2><i class="fa fa-youtube-play"></i>电影</el-dropdown-item>
                                    <el-dropdown-item command=3><i class="fa fa-music"></i>音乐</el-dropdown-item>
                                    <el-dropdown-item command=4><i class="fa fa-book"></i>书籍</el-dropdown-item>
                                    <el-dropdown-item command=5><i class="fa fa-mortar-board"></i>学术</el-dropdown-item>
                                    <el-dropdown-item command=6><i class="fa fa-weixin"></i>社交</el-dropdown-item>
                                    <el-dropdown-item command=7><i class="fa fa-shopping-cart"></i>购物</el-dropdown-item>
                                    <el-dropdown-item command=8><i class="fa fa-wrench"></i>工具</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>                                
                            </span>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            txt: "",
            selected: "0",
            engines: [
                {"id":"0","name":"百度","text":"百度一下,你就知道","url":"https://www.baidu.com/s?wd="},
                {"id":"1","name":"谷歌","text":"请自备工具","url":"https://www.google.com/search?q="},
                {"id":"2","name":"查快递","text":"请直接输入单号","url":"https://m.kuaidi100.com/result.jsp?nu="},
                {"id":"3","name":"B站","text":"干杯","url":"https://search.bilibili.com/all?keyword="},
                {"id":"4","name":"网络流行语","text":"爷爷再也不用担心听不懂","url":"https://jikipedia.com/search?phrase="},
                {"id":"7","name":"翻译","text":"","url":"https://cn.bing.com/dict/search?q="},
            ],
            x: [
                // 常用
                [
                    {"id":"0","name":"百度","text":"百度一下,你就知道","url":"https://www.baidu.com/s?wd="},
                    {"id":"1","name":"谷歌","text":"请自备工具","url":"https://www.google.com/search?q="},
                    {"id":"2","name":"查快递","text":"请直接输入单号","url":"https://m.kuaidi100.com/result.jsp?nu="},
                    {"id":"3","name":"B站","text":"干杯","url":"https://search.bilibili.com/all?keyword="},
                    {"id":"4","name":"网络流行语","text":"爷爷再也不用担心听不懂","url":"https://jikipedia.com/search?phrase="},
                    {"id":"7","name":"翻译","text":"","url":"https://cn.bing.com/dict/search?q="},
                ],
                //  资源
                [
                    {"id":"0","name":"网盘","text":"","url":"http://www.rufengso.net/s/name/"},
                    {"id":"1","name":"福利吧","text":"","url":"https://fulibus.net/?s="},
                    {"id":"2","name":"花瓣","text":"","url":"https://huaban.com/search/?q="},
                ],
                //  视频
                [
                    {"id":"0","name":"疯狂影视","text":"","url":"http://ifkdy.com/search?key="},
                ],
                //  音乐
                [
                    {"id":"0","name":"咪咕音乐","text":"因为它可以听周杰伦","url":"http://music.taihe.com/search?key="},
                    {"id":"1","name":"MV下载","text":"灯社","url":"http://www.dengshe.com/?s="},
                ],
                //  书籍
                [
                    {"id":"0","name":"鸠摩搜书","text":"请之间按回车进入搜索 此输入无效","url":"https://www.jiumodiary.com/"},
                    {"id":"1","name":"小说","text":"","url":"https://www.boyunso.com/search/?kw="},
                ],
                //  学术
                [
                    {"id":"0","name":"SCI-Hub","text":"请直接输入SCI/DOI文章地址 如https://doi.org/10.1094/MPMI-08-19-0239-IA","url":"https://sci-hub.shop/"},
                    {"id":"1","name":"百度学术","text":"","url":"https://xueshu.baidu.com/s?wd="},
                    {"id":"2","name":"知网","text":"","url":"http://kns.cnki.net/kns/brief/Default_Result.aspx?code=SCDB&kw="},
                    {"id":"3","name":"小木虫","text":"","url":"http://muchong.com/bbs/search.php?wd="},
                ],
                //  社交媒体
                [
                    {"id":"0","name":"公众号","text":"","url":"https://weixin.sogou.com/weixin?type=2&query="},
                    {"id":"1","name":"微博","text":"","url":"https://s.weibo.com/weibo/"},
                    {"id":"2","name":"知乎","text":"","url":"https://www.zhihu.com/search?type=content&q="},
                    {"id":"3","name":"Github","text":"全球最大男性社交平台","url":"https://github.com/search?q="},
                ],
                //  购物
                [
                    {"id":"0","name":"京东","text":"","url":"https://search.jd.com/Search?keyword="},
                    {"id":"1","name":"淘宝","text":"","url":"https://s.taobao.com/search?q="},
                    
                ],
                //  工具
                [
                    {"id":"0","name":"地图","text":"","url":"https://ditu.amap.com/search?query="},
                    {"id":"1","name":"查快递","text":"请直接输入单号","url":"https://m.kuaidi100.com/result.jsp?nu="},
                    {"id":"2","name":"学做菜","text":"输入菜名","url":"http://www.xiachufang.com/search/?keyword="},
                    {"id":"3","name":"翻译","text":"","url":"https://cn.bing.com/dict/search?q="},
                    {"id":"4","name":"网络流行语","text":"爷爷再也不用担心听不懂","url":"https://jikipedia.com/search?phrase="},
                ],
            ]
        }
    },
    methods:{
        selectClass(command) {
            // 换到第一个Tab上
            this.selected = "0"
            this.engines = this.x[command]
        },
        Sou(url){
            window.open(url,"target")
        }
    },
}
</script>

<style>
.el-tabs__item {
    color: white;
    font-size: 12.6px;
}
/* 选中的tab颜色 */
.el-tabs__item.is-active {
    color: white;
}
.el-tabs__nav-wrap::after {
    background-color: transparent;
}
/* 搜索框 */
.el-input__inner {
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 11px;
  border-radius: 25px;
  border-width: 0;
  /* border-color: rgba(0, 0, 0, 0.5); */
}
/* placeholder颜色 */
.el-input__inner::placeholder{
    color:white;
}
/* 搜索按钮 */
.el-input-group__append {
    background-color: rgba(255, 255, 255, 0.05);
    color: white;
    font-size: 15px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    border-width: 0;
    cursor: pointer;
}
.serach {
    color: white;
    margin: 100px 10px 150px;
}
.searchBtn {
    position: relative;
    /* left: 400px; */
}
</style>