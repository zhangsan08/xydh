<template>
    <div class="siteForm">
        <!-- <p>热度: {{ userview }} [后期推出排行榜功能]</p> -->
        <el-form :model="SiteForm" label-width="150px" label-position="right">
            <el-form-item label="站点名">
                <el-input type="text" v-model="SiteForm.name" minlength="2" maxlength="10"
                          placeholder="2-10字符"></el-input>
            </el-form-item>

            <el-form-item label="站点简介">
                <el-input type="text" v-model="SiteForm.info" minlength="0" maxlength="100"
                          placeholder="可为空"></el-input>
            </el-form-item>

            <!-- <el-form-item label="顶部开关">
                <el-switch v-model="SiteForm.btn_switch" active-color="#13ce66" inactive-color="#ff4949" active-text="显示" inactive-text="隐藏">
                </el-switch>
                <div style="font-size:12px">关闭后可从主站进入控制台</div> 
            </el-form-item> -->

            <el-form-item label="自定义背景">
                <el-switch
                    v-model="SiteForm.bg_switch" active-color="#13ce66" inactive-color="#ff4949" active-text="图片背景"
                    inactive-text="纯色背景">
                </el-switch>
                <div v-if="SiteForm.bg_switch">
                    <el-row>
                        <p>横版(适用于PC端展示)</p>
                        <el-input type="text" v-model="SiteForm.bg" minlength="0" maxlength="100"
                              placeholder="请自行选择图床上传背景图片 不填则是默认"></el-input>
                    </el-row>
                    <el-row>
                        <p>竖版(适用于手机端展示)</p>
                        <el-input type="text" v-model="SiteForm.mobile_bg" minlength="0" maxlength="100"
                              placeholder="请自行选择移动端背景图片图床地址 不填则与PC端相同"></el-input>
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
                    <el-option
                        v-for="item in texiao"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="留言板">
                <el-input type="text" v-model="SiteForm.lyb_id" minlength="24" maxlength="24" placeholder=""></el-input>
            </el-form-item>
            <!-- 音乐模块 -->
            <el-form-item label="音乐">
                <el-switch
                    v-model="music.open" active-color="#13ce66" inactive-color="#ff4949" active-text="开启"
                    inactive-text="关闭">
                </el-switch>
                <div v-if="music.open">
                    <p>普通用户添加音乐后只能加载2首，VIP用户可添加更多</p>
                    <el-form :inline="true">
                        <el-button type="success" @click="addToList(music.list,1,1)"
                                   :disabled="!isVIP && this.music.list.length>1 || this.music.list.length>30">添加至表头
                        </el-button>
                        <el-button type="success" @click="addToList(music.list,1,2)"
                                   :disabled="!isVIP && this.music.list.length>1 || this.music.list.length>30">添加至表尾
                        </el-button>
                    </el-form>
                    <el-table :data="music.list" stripe>
                        <el-table-column label="歌曲名" width="200">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.title"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="歌手名" width="200">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.artist"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="音乐外链">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.url"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="封面图片">
                            <template slot-scope="scope">
                                <el-input type="text" v-model="scope.row.pic"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="80">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="deleteFromList(music.list,scope.row)"> 删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-form-item>
            <el-divider content-position="left">VIP 功能</el-divider>
            <!-- 自定义顶部和底部 -->
            <el-form-item label="顶部开关">
                <el-switch
                    v-model="top_bottom.top_switch" active-color="#13ce66" inactive-color="#ff4949" active-text="开启"
                    inactive-text="关闭" :disabled="!isVIP">
                </el-switch>
            </el-form-item>
            <el-form-item label="自定义友链" :disabled="!isVIP">
                <div>
                    <el-form :inline="true">
                        <el-button type="success" @click="addToList(top_bottom.bottom_list, 2, 1)"
                                   :disabled="!isVIP || top_bottom.bottom_list.length>15">添加至表头
                        </el-button>
                        <el-button type="success" @click="addToList(top_bottom.bottom_list, 2, 2)"
                                   :disabled="!isVIP || top_bottom.bottom_list.length>15">添加至表尾
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
                        <el-table-column
                            label="操作"
                            width="80">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger"
                                           @click="deleteFromList(top_bottom.bottom_list, scope.row)"> 删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-form-item>
        </el-form>
        <el-divider content-position="center">
           
        </el-divider>
         <el-button slot="reference" type="primary" @click="updateSite()">更新站点信息</el-button>
    </div>

</template>

<script>

// import * as UserAPI from '@/api/user/'
// import * as SiteAPI from '@/api/site/'
import {siteService} from '@/common/api'

export default {
    props: ["userID", "isVIP"],
    data() {
        return {
            userview: 0,
            SiteForm: {
                name: "",
                info: "",
                bg: "",
                mobile_bg: "",
                btn_switch: "",
                bg_switch: "",
                bg_color: "",
                font_color: "",
                bglizi: 0,
                lyb_id: "",
                music: "",
                top_bottom: "",
            },
            texiao: [
                {value: 0, label: '关闭'},
                {value: 1, label: '繁星点点'},
                {value: 2, label: '科技线条'},
                {value: 3, label: '搞怪猫(会使背景图片失效)'},
                {value: 4, label: '吹气泡(点击生成气泡)'},
            ],
            predefineColors: ['#000000', '#ffffff', '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585',],
            music: {
                open: false,
                list: [],
            },
            top_bottom: {
                top_switch: true,
                bottom_list: [],
            },
        }
    },
    methods: {
        getSite() {
            siteService.getSitebyID(this.userID).then((res) => {
                this.SiteForm.name = res.data.name
                this.SiteForm.info = res.data.info
                this.SiteForm.bg = res.data.bg
                this.SiteForm.mobile_bg = res.data.mobile_bg
                this.SiteForm.btn_switch = res.data.btn_switch
                this.SiteForm.bg_switch = res.data.bg_switch
                this.SiteForm.bg_color = res.data.bg_color
                this.SiteForm.font_color = res.data.font_color
                this.SiteForm.bglizi = res.data.bglizi
                this.SiteForm.lyb_id = res.data.lyb_id
                if (res.data.music) {
                    this.music = JSON.parse(res.data.music);
                }
                if (res.data.top_bottom) {
                    this.top_bottom = JSON.parse(res.data.top_bottom);
                }

                this.userview = res.data.view
            })
        },
        updateSite() {
            this.SiteForm.music = JSON.stringify(this.music)
            if (this.SiteForm.music.length > 2000) {
                this.$notify.error({
                    title: "你添加的歌曲太多啦",
                });
                return;
            }
            this.SiteForm.top_bottom = JSON.stringify(this.top_bottom)
            if (this.SiteForm.top_bottom.length > 1000) {
                this.$notify.error({
                    title: "你添加的友链太多啦",
                });
                return;
            }
            siteService.updateSite(this.SiteForm).then((res) => {
                if (res.code > 0) {
                    this.$notify.error({
                        title: "更新失败",
                        message: res.msg
                    });
                } else {
                    this.$notify({
                        title: "更新完成😊",
                        type: "success",
                    });
                }
            })
        },
        addToList(list, x, where) {
            if (x === 1) {
                var item = {title: "", artist: "", url: ""}
            } else if (x === 2) {
                item = {title: "", url: ""}
            }
            switch (where) {
                case 1:
                    list.unshift(item)
                    break;
                case 2:
                    list.push(item)
                    break;
                default:
                    break;
            }
        },
        deleteFromList(list, item) {
            var index = list.indexOf(item)
            if (index !== -1) {
                list.splice(index, 1)
            }
        }
    },
    components: {},
    beforeMount() {
    },
    watch: {
        userID: function () {
            this.getSite()
        },
    }
}

</script>

<style>
.siteForm {
    min-width: 400px;
    /* max-width: 400px; */
    margin: 0 auto;
    text-align: left;
}

.siteForm .el-input {
    max-width: 400px;
}

.siteForm .el-input__inner {
    border-radius: 20px;
}
</style>