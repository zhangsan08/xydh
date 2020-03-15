<template>
    <div class="serach">
        <el-row type="flex" justify="center">
            <!-- 搜索框改变大小 -->
            <el-col :xs="24" :sm="18" :md="12">
                <el-tabs stretch>
                        <el-tab-pane v-for="item in engines" :key="item.id">
                            <span slot="label">{{ item.name }}</span>
                        <el-row  type="flex" justify="space-between">
                            <el-col :span="21">
                                <el-input type="text" v-model="txt" :placeholder="item.text" @keyup.enter.native="Sou(item.url+txt)"></el-input>
                            </el-col>
                            <el-col :span="3">
                                <el-button type="primary" icon="el-icon-search"  @click="Sou(item.url+txt)"></el-button>
                            </el-col>
                        </el-row>
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
           engines: [
               {"id":1,"name":"百度","text":"百度一下,你就知道","url":"https://www.baidu.com/s?wd="},
               {"id":1,"name":"B站","text":"干杯","url":"https://search.bilibili.com/all?keyword="},
               {"id":2,"name":"学术","text":"请直接输入SCI文章地址","url":"https://sci-hub.shop/"},
               {"id":3,"name":"谷歌","text":"请自备工具","url":"https://www.google.com/search?q="},
               {"id":3,"name":"必应","text":"","url":"https://www.bing.com/search?q="},
               {"id":4,"name":"知乎","text":"","url":"https://www.zhihu.com/search?type=content&q="},
               {"id":4,"name":"Github","text":"全球最大男性社交平台","url":"https://github.com/search?q="},
           ]
        }
    },
    methods:{
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
.el-tabs__nav-wrap::after {
    background-color: transparent;
}
/* 搜索框 */
.el-input__inner {
  background-color: transparent;
  color: white;
  font-size: 13px;
}
.serach {
    color: white;
    margin: 100px auto 200px;
}
</style>