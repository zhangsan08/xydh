<template>
<div class="hot">
    <p>又上线了两个热榜。更多爬虫24小时调教中。</p>
    <p>技术不精。几个服务器全跑成黑名单了。所以这个功能上线一直推迟</p>
    <p>在我线报群的应该知道我做爬虫有段时间了，等我！炫猿会越来越好的。</p>
    <p>别人做成一个整站的功能，我给大家完全复刻成导航的一个模块。</p>
    <div v-for="siteClass in siteClasses" :key="siteClass.id">
        <!-- 热点分类框 -->
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
            {{siteClass.name}}
            <!-- 选择具体热点网站 -->
            <el-col>
                <li class="li-tab" v-for="hotesite in hotsites[siteClass.id]" :key="hotesite.id"
                @click="getHotSite(siteClass.id,hotesite.id)"
                :class="{activeSite:selectedSite==hotesite.id}"
                >
                    {{hotesite.name}}
                </li>
            </el-col>
            <!-- 榜单数据 -->
            <div class="hot_site">
                <div class="hot_item" v-for="(item,index) in data[siteClass.id]" :key="item.id">
                <a :href="item.Url" target="_blank" >
                    <el-card shadow="hover">
                        <div>
                            <el-row>
                                <el-col :span="21">{{index+1}}.{{item.Title}}</el-col>
                                <!-- <el-col :span="3" ><div style="text-align: right;">{{item.hotDesc}}</div></el-col> -->
                            </el-row>
                        </div>
                    </el-card>
                </a>
                </div>
            </div>
        </el-col>
    </div>

    
    
</div>
</template>

<script>

import * as API from '@/api/site/'

export default {
    data() {
        return {
            data: [],
            selectedSite: 0,
            selectedSiteClass: 0,
            text:"百度一下,你就知道",
            txt:"",
            url:"https://www.baidu.com/s?wd=",
            siteClasses: [
                {"id":0,"name":"综合"},
                {"id":1,"name":"娱乐"},
            ],
            hotsites: [
                // 常用
                [
                    {"id":"1","name":"知乎",},
                    {"id":"58","name":"微博",},
                    {"id":"2","name":"虎扑",},                
                ],
                //  娱乐
                [
                    {"id":"115","name":"Bilibili",},
                    {"id":"111","name":"煎蛋",},
                    {"id":"1058","name":"3DM",},
                ],
            ],

        }
    },
    methods: {
        getHotSite(classid,siteid){
            console.log(classid,siteid)
            // this.selectedSite = siteid     
            API.getHot(siteid).then((res) => {
                if(!res.Code){
                    this.data[classid] = res.Data
                }
                alert("更新data"+classid)
            })
        },
    },
    beforeMount(){
        for(var i=0;i<this.siteClasses.length;i++){
            // console.log(i,this.hotsites[i][0].name)
            this.getHotSite(i,this.hotsites[i][0].id)
        }
        console.log(this.data)
    }
}
</script>

<style>
.hot_site {
    text-align: left;
    min-height: 300px;
}
.hot_item {
    margin: 10px;
}
.li-tab {
    float:left;
    cursor: pointer;
    line-height: 20px;
    margin: 10px;
}
.activeSite {
    font-size: 30px;
}
</style>