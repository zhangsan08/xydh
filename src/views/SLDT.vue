<template>
    <div class="hgs">
        <div class="head">
            <div class="title">
                <h1 class="dynamic-text-shadow">iLinks优质推荐榜</h1>
                <p @click="ruleVisible = true">玩法简介</p>
            </div>
        </div>
        <div class="content">
            <div>
                <el-table class="top100table" :data="links" stripe v-loading="links.length === 0">
                    <el-table-column prop="url" label="名称" align="center">
                        <template slot-scope="scope">
                            <a target="_blank" rel="nofollow" :href="scope.row.url">
                                <el-popover trigger="hover" placement="bottom-start">
                                    链接：{{ scope.row.url }}
                                    <div slot="reference" class="name-wrapper">
                                        {{ scope.row.name }}
                                    </div>
                                </el-popover>
                            </a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="info" label="简介" class="info"> </el-table-column>
                    <el-table-column prop="tags" label="标签" class="info"> </el-table-column>
                    <el-table-column prop="user_name" label="推荐人" align="center">
                        <template slot-scope="scope">
                            <a target="_blank" :href="'https://xydh.fun/' + scope.row.user_name">{{
                                scope.row.user_name
                            }}</a>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog title="推荐内容" :visible.sync="addDialogVisible">
            <el-form :model="linkform" label-width="60px">
                <el-form-item label="名称">
                    <el-input v-model="linkform.name"></el-input>
                </el-form-item>
                <el-form-item label="链接">
                    <el-input v-model="linkform.url"></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input type="textarea" v-model="linkform.info"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <el-checkbox-group v-model="tags" style="text-align: left">
                        <el-checkbox v-for="tag in tagsOption" :label="tag" :key="tag">{{ tag }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="createLink()">添加</el-button>
            </span>
        </el-dialog>
        <el-dialog title="玩法简介" :visible.sync="ruleVisible">
            <div class="ruleContent">
                <li>1. 炫猿注册用户达到一定等级后可进行添加操作。(等级低时无权添加或看不到添加按钮)</li>
                <li>2. 不仅可以推荐网站、网址，也可以推荐好用的App、软件，比如放上官网等</li>
                <li>3. 你推荐的站点受欢迎时，则会展示在顶端，可为你的个人站点带来流量</li>
                <li>
                    4.
                    此功能就是为了更好地分享，因为好多猿友的站点很优质，但大家并不知道他的ID，通过水帘洞天我们可以看到优质的网站来自哪些大神推荐。
                </li>
            </div>
        </el-dialog>
        <div class="AddBtn" @click="addDialogVisible = true">
            <i class="el-icon-circle-plus-outline"></i>
        </div>
        <Player :musicList="audio" />
    </div>
</template>

<script>
import Player from '@/components/Player.vue';
import {sldLinkService} from '@/common/api';

export default {
    components: {
        Player,
    },
    data() {
        return {
            tagsOption: [
                '综合资源',
                '学习学术',
                '音乐电台',
                '电影电视',
                '图书图片',
                '动漫',
                '游戏',
                '设计素材',
                '论坛博客',
                'iOS',
                '安卓',
                'Windows',
                'Mac',
                '效率&工具',
                '导航',
            ],
            tagsOption2: [
                {text: '综合资源', value: '综合资源'},
                {text: '学习学术', value: '学习学术'},
                {text: '音乐电台', value: '音乐电台'},
                {text: '电影电视', value: '电影电视'},
                {text: '图书图片', value: '图书图片'},
                {text: '动漫', value: '动漫'},
                {text: '游戏', value: '游戏'},
                {text: '设计素材', value: '设计素材'},
                {text: '论坛博客', value: '论坛博客'},
                {text: 'iOS', value: 'iOS'},
                {text: '安卓', value: '安卓'},
                {text: 'Windows', value: 'Windows'},
                {text: 'Mac', value: 'Mac'},
                {text: '效率&工具', value: '效率&工具'},
                {text: '导航', value: '导航'},
            ],
            links: [],
            tags: [],
            linkform: {
                name: '',
                url: '',
                info: '',
                tags: '',
            },
            addDialogVisible: false,
            ruleVisible: false,
        };
    },
    beforeMount() {
        document.title = '水帘洞天 | 炫猿导航';
        this.getSldLinks();
    },
    methods: {
        filterDuplicateUrls(data) {
            const uniqueData = [];
            const urls = [];

            for (let i = 0; i < data.length; i++) {
                const url = data[i].url;

                if (!urls.includes(url)) {
                    uniqueData.push(data[i]);
                    urls.push(url);
                }
            }

            return uniqueData;
        },
        getSldLinks() {
            sldLinkService.getLinks().then(res => {
                this.links = this.filterDuplicateUrls(res.data);
            });
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        createLink() {
            this.linkform.tags = this.tags.toString();
            sldLinkService
                .createLink(this.linkform)
                .then(res => {
                    if (res.code > 0) {
                        this.$notify.error({
                            title: '添加失败',
                            message: res.msg,
                        });
                    } else {
                        this.$notify({
                            title: '添加成功!',
                            type: 'success',
                            duration: '800',
                        });
                        this.getSldLinks();
                    }
                })
                .catch(error => {
                    this.$notify.error({
                        title: '错误 请检查',
                        message: error,
                    });
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
        h1{
            margin: 0;
        }
        .dynamic-text-shadow {
            font-size: 40px;
            text-shadow: 0.1em 0.1em 0 hsl(200 50% 30%);
        }
        p {
            cursor: pointer;
            text-decoration: underline;
        }
    }

    .top10 {
        margin: 20px;
    }

    .top100card {
        margin: 10px 20px;
    }
    .content {
        padding: 0 4px;
    }
    .top100table {
        margin: 0px auto;
        max-width: 1080px;
        border-radius: 20px;
        margin-top: -40px;
        border: 1px solid rgb(198, 217, 252);
        box-shadow: 0 4px 8px 6px rgba(7,17,27,.06);

        img {
            width: 32px;
        }
    }
    .index {
        font-weight: bold;
    }
    a {
        color: #3855d5;
    }
    .amusic {
        position: fixed;
        max-width: 500px;
        left: 0px;
        bottom: 0px;
        z-index: 999;
    }
    .info {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    /deep/.el-table {
        .el-table__header-wrapper .el-table__cell {
            padding-top: 27px;
        }
        .el-table__body-wrapper .el-table__cell {
            padding: 27px 0;
            .cell {
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                padding: 0 6px;
            }
        }
        tr.el-table__row--striped td.el-table__cell {
            background: rgb(246, 251, 255, 0.1);
        }
    }
    .AddBtn {
        z-index: 999;
        font-size: 40px;
        cursor: pointer;
        position: fixed;
        bottom: 80px;
        right: 40px;
    }

    .AddBtn :hover {
        font-size: 45px;
    }
    .ruleContent {
        text-align: left;
        height: 300px;
        li {
            margin-bottom: 10px;
        }
    }
    @media screen and (max-width: 768px) {
        /deep/.el-dialog {
            width: 90%;
        }
    }
</style>
