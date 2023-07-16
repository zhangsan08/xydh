<template>
    <div class="hgs">
        <div class="head">
            <div class="title">
                <h1 class="dynamic-text-shadow">iLinks百大站长榜</h1>
            </div>
        </div>
        <div class="content">
            <div>
                <el-table
                    class="top100table"
                    highlight-current-row
                    stripe
                    v-loading="topSite.length === 0"
                    :data="
                        topSite.filter(
                            data => !topSearch || data.name.includes(topSearch) || data.uName.includes(topSearch)
                        )
                    "
                >
                    <el-table-column label="排名" align="center" type="index" width="60">
                        <template slot-scope="scope">
                            <img
                                v-if="scope.$index + 1 == 1"
                                src="https://pic.rmb.bdstatic.com/ec64bc65b2f3f58ffa0c16346bb96521.png"
                                alt=""
                            />
                            <img
                                v-else-if="scope.$index + 1 == 2"
                                src="https://pic.rmb.bdstatic.com/a5ffc5596aa2fe154f03de2cd4c2a7d0.png"
                                alt=""
                            />
                            <img
                                v-else-if="scope.$index + 1 == 3"
                                src="https://pic.rmb.bdstatic.com/49501e43557b6929f825f97ac9574e69.png"
                                alt=""
                            />
                            <div v-else class="index">
                                {{ scope.$index + 1 }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" align="center">
                        <template slot-scope="scope">
                            <a target="_blank" :href="'/' + scope.row.uName" class="name">{{ scope.row.name }}</a>
                        </template>
                    </el-table-column>
                    <el-table-column align="left" min-width="170">
                        <template slot="header" slot-scope="scope">
                            <el-row :gutter="20">
                                <el-col :span="8" :xs="24" style="marginBottom: 10px">
                                    <el-radio-group v-model="radio" size="mini" @input="getUserRank">
                                        <el-radio-button label="d">日榜</el-radio-button>
                                        <el-radio-button label="m">月榜</el-radio-button>
                                        <el-radio-button label="t">总榜</el-radio-button>
                                    </el-radio-group>
                                </el-col>
                                <el-col :span="14" :xs="24">
                                    <el-input
                                        v-model="topSearch"
                                        placeholder="输入姓名搜索是否在榜"
                                        size="mini"
                                    /></el-col>
                            </el-row>
                            {{ scope.info }}
                        </template>
                        <template slot-scope="scope">
                            {{ scope.row.info }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <Player :musicList="audio" />
    </div>
</template>

<script>
import {userService} from '@/common/api';
import Player from '@/components/Player.vue';

export default {
    components: {
        Player,
    },
    data() {
        return {
            topUname: [],
            topSite: [],
            topSearch: '',
            // 音频列表
            audio: [
                {
                    name: '花果山',
                    artist: '球哥',
                    url: 'https://cdn.jsdelivr.net/gh/ixsim/upload/xyj.mp3',
                },
                {
                    name: '夜的第七章',
                    artist: '杰伦',
                    url: 'https://cdn.jsdelivr.net/gh/ixsim/upload/yddqz.m4a',
                    pic: 'http://img.mp.itc.cn/upload/20160717/89429f4074754a20996ec74d6bcf0304_th.jpg',
                },
            ],
            radio: 'd',
        };
    },
    beforeMount() {
        document.title = '花果山 | 炫猿导航';
        this.getUserRank('d');
    },
    methods: {
        getUserRank(t) {
            userService.UserRank(t).then(res => {
                this.topUname = res.data.top_uname;
                this.topSite = res.data.top_site;
                for (var i = 0, l = this.topSite.length; i < l; i++) {
                    this.topSite[i].uName = this.topUname[i];
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
    .hgs {
        background-image: url('https://pic.rmb.bdstatic.com/9dd4b7f26325e8568da05d99f97280dc.png');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        text-align: center;
        padding-bottom: 20px;
        min-height: 100vh;
    }
    .head {
        background-image: url('https://pic.rmb.bdstatic.com/e444cc70bae6a9c2e96d231737a6f649.png');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 200px;
    }
    .title {
        color: #fff;
        font-weight: bold;
        padding-top: 55px;
        .dynamic-text-shadow {
            font-size: 40px;
            text-shadow: 0.1em 0.1em 0 hsl(200 50% 30%);
        }
    }

    .top10 {
        margin: 20px;
    }

    .top100card {
        margin: 10px 20px;
    }

    .top100table {
        margin: 0px auto;
        max-width: 1080px;
        border-radius: 20px;
        margin-top: -40px;
        border: 1px solid rgb(198, 217, 252);

        img {
            width: 32px;
        }
    }
    .index {
        font-weight: bold;
    }
    .name {
        font-weight: bold;
        color: #3855d5;
    }
    .amusic {
        position: fixed;
        max-width: 500px;
        left: 0px;
        bottom: 0px;
        z-index: 999;
    }
    /deep/.el-table {
        .el-table__header-wrapper .el-table__cell {
            padding-top: 27px;
        }
        .el-table__body-wrapper .el-table__cell {
            padding: 27px 0;
        }
        tr.el-table__row--striped td.el-table__cell {
            background: rgb(246, 251, 255, 0.1);
        }
    }
</style>
