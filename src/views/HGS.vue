<template>
<div class="hgs">
    <Header></Header>
    <h2>花果山 | 炫猿导航</h2>
    <el-button-group>
        <el-button @click="getUserRank('d')">日榜</el-button>
        <el-button @click="getUserRank('m')">月榜</el-button>
        <el-button @click="getUserRank('t')">总榜</el-button>
    </el-button-group>
    <!-- <el-carousel :interval="2000" type="card" height="150px" arrow="always" class="top10">
        <el-carousel-item v-for="(item,i) in topSite" :key="item.id" :label=top100[i]>
            <a target='_blank' :href='"/"+topUname[i]'>
                <el-card class="top10card">
                    <img :src="item.bg" style="width: 100%;">
                    <div class="userInfo">
                        <p>No.{{ i+1 }}<span v-if="i==0">-大圣</span><span v-if="i==1">-猴王</span><span v-if="i==2">-猴哥</span></p>
                        <div style="font-size:24px">
                            {{ item.name }}
                        </div> 
                        <p>{{item.info}}</p>
                    </div>
                </el-card>
            </a>          
        </el-carousel-item>
    </el-carousel> -->
<!-- {{top100}} -->

<div class="amusic">
    <aplayer autoplay :music="audio[0]" :list="audio" :narrow=false float theme="#fff">
    </aplayer>
</div>

<div>
    <el-table class="top100table" highlight-current-row stripe
        :data="topSite.filter(data => !topSearch || data.name.includes(topSearch) || data.uName.includes(topSearch))" >
        <el-table-column
            label="排名" fixed
            align="center"
            type="index">
        </el-table-column>
        <el-table-column
            label="名称"
            align="center" width="150"
            prop="name">
        </el-table-column>
        <el-table-column
            label="用户"
            align="left">
            <template slot-scope="scope">
                <a target='_blank' :href='"/"+scope.row.uName'>{{scope.row.uName}}</a>    
            </template>
        </el-table-column>
        <el-table-column
            align="left" min-width="200">
            <template slot="header" slot-scope="scope">
                <el-input
                v-model="topSearch"
                placeholder="输入姓名搜索是否在榜"/>{{scope.info}}
            </template>
            <template slot-scope="scope">
                {{ scope.row.info }}
            </template>
        </el-table-column>
    </el-table>
</div>

</div>
</template>

<script>

import Header from '@/components/Header.vue'
import { userService } from '@/common/api'
import Aplayer from 'vue-aplayer'

export default {
    components:{
        Header,
        Aplayer,
    },
    data() {
        return {
            topUname: [],
            topSite: [],
            topSearch: "",
            // 音频列表
            audio:  [
                {
                    title:'夜的第七章',
                    artist: '杰伦',
                    url: 'https://cdn.jsdelivr.net/gh/ixsim/upload/yddqz.m4a',
                    pic: 'http://img.mp.itc.cn/upload/20160717/89429f4074754a20996ec74d6bcf0304_th.jpg',
        
                },
                {
                    title:'花果山',
                    artist: '球哥',
                    url: 'https://cdn.jsdelivr.net/gh/ixsim/upload/xyj.mp3',
                },

            ],
        }
    },
    methods: {
        getUserRank(t){
            userService.UserRank(t).then((res) =>{
                this.topUname = res.data.top_uname
                this.topSite = res.data.top_site
                for (var i=0,l=this.topSite.length; i<l; i++){
                    this.topSite[i].uName = this.topUname[i]
                }
            })
        },
    },
    beforeMount(){
        document.title = "花果山 | 炫猿导航"
        this.getUserRank('d')
    }
}
</script>

<style>
.hgs {
    text-align: center;
}
.top10 {
    margin: 20px;
}

.top100card {
    margin: 10px 20px;
}
.top100table {
    margin: 20px auto;
    max-width: 1080px;
}

.amusic {
    position:fixed;
    max-width: 500px;
    left: 10px;
    bottom: 10px;
}

</style>