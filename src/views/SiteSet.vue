<template>
    <div class="siteForm">
        <!-- <p>热度: {{ userview }} [后期推出排行榜功能]</p> -->
        <el-form :model="SiteForm" label-width="150px" label-position="right">
            <el-form-item label="站点名">
                <el-input
                    type="text"
                    v-model="SiteForm.name"
                    minlength="2"
                    maxlength="10"
                    show-word-limit
                    placeholder="2-10字符"
                ></el-input>
            </el-form-item>

            <el-form-item label="站点简介">
                <el-input
                    type="text"
                    v-model="SiteForm.info"
                    minlength="0"
                    maxlength="100"
                    show-word-limit
                    placeholder="可为空"
                ></el-input>
            </el-form-item>

            <!-- <el-form-item label="顶部开关">
                <el-switch v-model="SiteForm.btn_switch" active-color="#13ce66" inactive-color="#ff4949" active-text="显示" inactive-text="隐藏">
                </el-switch>
                <div style="font-size:12px">关闭后可从主站进入控制台</div>
            </el-form-item> -->

            <el-form-item label="自定义背景">
                <el-switch
                    v-model="SiteForm.bg_switch"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="图片背景"
                    inactive-text="纯色背景"
                >
                </el-switch>
                <div v-if="SiteForm.bg_switch">
                    <el-row>
                        <p>横版(适用于PC端展示)</p>
                        <el-input
                            type="text"
                            v-model="SiteForm.bg"
                            minlength="0"
                            maxlength="100"
                            placeholder="请自行选择图床上传背景图片 不填则是默认"
                        ></el-input>
                    </el-row>
                    <el-row>
                        <p>竖版(适用于手机端展示)</p>
                        <el-input
                            type="text"
                            v-model="SiteForm.mobile_bg"
                            minlength="0"
                            maxlength="100"
                            placeholder="请自行选择移动端背景图片图床地址 不填则与PC端相同"
                        ></el-input>
                    </el-row>
                    <!-- <a target='_blank' rel='nofollow' href='https://support.qq.com/products/106426/faqs/62946'>怎么自定义背景图片?</a> -->
                </div>
                <div v-else>
                    <el-color-picker v-model="SiteForm.bg_color" :predefine="predefineColors"></el-color-picker>
                </div>
            </el-form-item>

            <el-form-item label="字体颜色">
                <el-color-picker v-model="SiteForm.font_color" :predefine="predefineColors"></el-color-picker>
            </el-form-item>

            <el-form-item label="背景特效">
                <el-select v-model="SiteForm.bglizi" placeholder="请选择">
                    <el-option v-for="item in texiao" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="留言板">
                <el-input
                    type="text"
                    v-model="SiteForm.lyb_id"
                    minlength="24"
                    maxlength="24"
                    show-word-limit
                    placeholder=""
                ></el-input>
            </el-form-item>
            <!-- 音乐模块 -->
            <el-form-item label="背景音乐">
                <el-switch
                    v-model="music.open"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="开启"
                    inactive-text="关闭"
                >
                </el-switch>
                <div v-if="music.open">
                    <p>普通用户添加音乐后只能加载2首，VIP用户可添加更多</p>
                    <el-form :inline="true">
                        <el-button
                            type="success"
                            @click="addToList(music.list, 1, 1)"
                            size="medium"
                            :disabled="(!isVIP && this.music.list.length > 1) || this.music.list.length > 30"
                        >添加至表头
                        </el-button>
                        <el-button
                            type="success"
                            @click="addToList(music.list, 1, 2)"
                            size="medium"
                            :disabled="(!isVIP && this.music.list.length > 1) || this.music.list.length > 30"
                        >添加至表尾
                        </el-button>
                    </el-form>
                    <el-table :data="music.list" stripe>
                        <el-table-column label="歌曲名" width="150">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.title"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="歌手名" width="120">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.artist"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="音乐外链地址">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.url"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="封面图片地址">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.pic"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="deleteFromList(music.list, scope.row)">
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-form-item>
            <!-- 站点订阅模块 -->
            <el-form-item label="站点订阅">
                <el-switch
                    v-model="subscribe.open"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="开启"
                    inactive-text="关闭"
                >
                </el-switch>
                <div v-if="subscribe.open">
                    <div class="recommendSubscribe">
                        <span class="item">
                            热门订阅（VIP功能，限时免费）
                        </span>
                        <el-tooltip class="item" effect="dark" placement="top">
                            <div slot="content">将热门/优质站点的内容嵌入到自己的页面<br/></div>
                            <i :class="'fa fa-question-circle-o'" />
                        </el-tooltip>

                        <el-switch
                            v-model="subscribe.allowRecommend"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="开启"
                            inactive-text="关闭"
                        >
                        </el-switch>
                    </div>

                    <div>
                        <span style="margin-right: 10px;">
                            <el-button
                                type="success"
                                @click="addToList(subscribe.list, 3, 2)"
                                size="medium"
                                :disabled="
                                    (!isVIP && this.subscribe.list.length > 2) || (isVIP && this.subscribe.list.length > 7)
                                "
                            >
                                <span v-if="!isVIP && this.subscribe.list.length > 2">
                                    普通用户可订阅3个站点，开通vip订阅更多
                                </span>
                                <span v-else-if="isVIP && this.subscribe.list.length > 7"> 最多可订阅8个 </span>
                                <span v-else> 添加订阅 </span>
                            </el-button>
                        </span>

                        <span>普通用户可订阅3个站点，VIP用户可订阅8个站点</span>
                    </div>
                    <el-table :data="subscribe.list" stripe ref="table" row-key="id">
                        <el-table-column label="排序" width="50">
                            <div class="el-rank">
                                <i class="el-icon-rank" />
                            </div>
                        </el-table-column>
                        <el-table-column label="用户id" width="250">
                            <template slot-scope="scope">
                                <el-input
                                    type="text"
                                    v-model="scope.row.user_name"
                                    :disabled="scope.row.disabled"
                                    maxlength="18" 
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="别名(实际展示名称)">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.alias" maxlength="8" show-word-limit></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="160">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="danger"
                                    :disabled="scope.row.disabled"
                                    @click="deleteFromList(subscribe.list, scope.row)"
                                >
                                    删除
                                </el-button>
                                <el-button
                                    size="mini"
                                    @click="goPreview(scope.row.user_name)"
                                >
                                    预览
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-form-item>
            <el-divider content-position="left">VIP 功能</el-divider>
            <!-- 自定义顶部和底部 -->
            <el-form-item label="顶部内容开关">
                <el-switch
                    v-model="top_bottom.top_switch"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="开启"
                    inactive-text="关闭"
                    :disabled="!isVIP"
                >
                </el-switch>
            </el-form-item>
            <el-form-item label="自定义友链" :disabled="!isVIP">
                <div>
                    <el-form :inline="true">
                        <el-button
                            type="success"
                            @click="addToList(top_bottom.bottom_list, 2, 1)"
                            :disabled="!isVIP || top_bottom.bottom_list.length > 15"
                            size="medium"
                        >添加至表头
                        </el-button>
                        <el-button
                            type="success"
                            @click="addToList(top_bottom.bottom_list, 2, 2)"
                            :disabled="!isVIP || top_bottom.bottom_list.length > 15"
                            size="medium"
                        >添加至表尾
                        </el-button>
                    </el-form>
                    <el-table :data="top_bottom.bottom_list" stripe>
                        <el-table-column label="文字" width="300">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.title"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="超链接">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.url"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="deleteFromList(top_bottom.bottom_list, scope.row)"
                                >
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-form-item>
        </el-form>
        <el-button slot="reference" type="primary" class="floatOnTop" @click="updateSite()">更新站点信息</el-button>
    </div>
</template>

<script>
// import * as UserAPI from '@/api/user/'
// import * as SiteAPI from '@/api/site/'
import {siteService} from '@/common/api';
import Sortable from 'sortablejs';

export default {
    props: ['userID', 'isVIP'],
    data() {
        return {
            userview: 0,
            SiteForm: {
                name: '',
                info: '',
                bg: '',
                mobile_bg: '',
                btn_switch: '',
                bg_switch: '',
                bg_color: '',
                font_color: '',
                bglizi: 0,
                lyb_id: '',
                music: '',
                top_bottom: '',
                subscribe: '',
            },
            texiao: [
                {value: 0, label: '关闭'},
                {value: 1, label: '繁星点点'},
                {value: 2, label: '科技线条'},
                {value: 3, label: '搞怪猫(会使背景图片失效)'},
                {value: 4, label: '吹气泡(点击生成气泡)'},
            ],
            predefineColors: [
                '#000000',
                '#ffffff',
                '#ff4500',
                '#ff8c00',
                '#ffd700',
                '#90ee90',
                '#00ced1',
                '#1e90ff',
                '#c71585',
            ],
            music: {
                open: false,
                list: [],
            },
            subscribe: {
                open: true,
                list: [],
                allowRecommend: true
            },
            top_bottom: {
                top_switch: true,
                bottom_list: [],
            },
        };
    },
    watch: {
        'subscribe.open': function (newVal) {
            if (newVal) {
                this.$nextTick(() => {
                    this.rowDrop();
                });
            }
        },
    },
    mounted() {
        this.getSite();
        this.$nextTick(() => {
            this.rowDrop();
        });
    },
    methods: {
        rowDrop() {
            if (this.subscribe.open) {
                const tableBody = this.$refs.table.$el.querySelector('.el-table__body-wrapper tbody');
                this.sortable = Sortable.create(tableBody, {
                    animation: 150,
                    handle: '.el-rank',
                    onEnd: evt => {
                        const item = this.subscribe.list.splice(evt.oldIndex, 1)[0];
                        this.subscribe.list.splice(evt.newIndex, 0, item);
                    },
                });
            }
        },
        getSite() {
            siteService.getSitebyID(this.userID).then(res => {
                this.SiteForm.name = res.data.name;
                this.SiteForm.info = res.data.info;
                this.SiteForm.bg = res.data.bg;
                this.SiteForm.mobile_bg = res.data.mobile_bg;
                this.SiteForm.btn_switch = res.data.btn_switch;
                this.SiteForm.bg_switch = res.data.bg_switch;
                this.SiteForm.bg_color = res.data.bg_color;
                this.SiteForm.font_color = res.data.font_color;
                this.SiteForm.bglizi = res.data.bglizi;
                this.SiteForm.lyb_id = res.data.lyb_id;
                if (res.data.music) {
                    this.music = JSON.parse(res.data.music);
                }
                if (res.data.subscribe) {
                    this.subscribe = JSON.parse(res.data.subscribe);
                }
                if (res.data.top_bottom) {
                    this.top_bottom = JSON.parse(res.data.top_bottom);
                }

                this.userview = res.data.view;
            });
        },
        // 判空函数
        hasEmptyValue(arr, key) {
            for (let i = 0; i < arr.length; i++) {
                if (!arr[i][key]) {
                    return true;
                }
            }
            return false;
        },
        notifyError(message) {
            this.$notify.error({
                title: message,
            });
        },
        updateSite() {
            if (this.subscribe.open) {
                if (this.subscribe.list.length === 0 && this.subscribe.allowRecommend == false) {
                    this.notifyError('订阅站点开关已打开，但未添加');
                    return;
                }
                if (this.hasEmptyValue(this.subscribe.list, 'user_name')) {
                    this.notifyError('有未填写id的订阅站点存在，请检查');
                    return;
                }
            }

            this.SiteForm.subscribe = JSON.stringify(this.subscribe);

            if (this.music.open) {
                if (this.music.list.length === 0) {
                    this.notifyError('背景音乐开关已打开，但未添加');
                    return;
                }
                if (this.hasEmptyValue(this.music.list, 'url')) {
                    this.notifyError('有未填写的音乐外链存在，请检查');
                    return;
                }
                if (this.music.length > 2000) {
                    this.notifyError('你添加的歌曲太多啦');
                    return;
                }
            }
            this.SiteForm.music = JSON.stringify(this.music);
            this.SiteForm.top_bottom = JSON.stringify(this.top_bottom);
            if (this.SiteForm.top_bottom.length > 1000) {
                this.$notify.error({
                    title: '你添加的友链太多啦',
                });
                return;
            }
            siteService.updateSite(this.SiteForm).then(res => {
                if (res.code > 0) {
                    this.$notify.error({
                        title: '更新失败',
                        message: res.msg,
                    });
                } else {
                    this.$notify({
                        title: '更新完成😊',
                        type: 'success',
                    });
                }
            });
        },
        addToList(list, x, where) {
            if (x === 1) {
                var item = {title: '', artist: '', url: ''};
            } else if (x === 2) {
                item = {title: '', url: ''};
            } else if (x === 3) {
                const id = Math.floor(100000 + Math.random() * 900000); // 生成6位随机数作为id，排序用
                item = {user_name: '', alias: '', id: id};
            }
            switch (where) {
            case 1:
                list.unshift(item);
                break;
            case 2:
                list.push(item);
                break;
            default:
                break;
            }
        },
        deleteFromList(list, item) {
            var index = list.indexOf(item);
            if (index !== -1) {
                list.splice(index, 1);
            }
        },
        goPreview(user_name) {
            window.open(`https://xydh.fun/${user_name}`, '_blank');
        }
    },
};
</script>

<style lang="less">
    .siteForm {
        min-width: 400px;
        /* max-width: 400px; */
        margin: 0 auto;
        text-align: left;
        padding-bottom: 40px;
    }

    .siteForm .el-input {
        max-width: 650px;
    }
    .floatOnTop {
        bottom: 40px;
        position: fixed;
        z-index: 99;
        right: 100px;
    }
    .recommendSubscribe{
        display: flex;
        align-items: center;
        .item{
            margin-right: 10px;
        }

    }
</style>
