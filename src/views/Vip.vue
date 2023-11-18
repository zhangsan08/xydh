<template>
    <div class="vip">
        <div class="user-info">
            <img src="~@/assets/logo.svg" alt="" class="user-head" />
            <div class="user-desc" data-v-c95da3ac="">
                <div class="user-d-t" data-v-c95da3ac="">
                    <span
                        data-report-click='{"spm":"1008.2028.3001.8761"}'
                        class="user-name"
                        data-v-c95da3ac=""
                    >iLinks</span>
                    <!---->
                </div>
                <div class="user-d-c" data-v-c95da3ac="">开通会员年卡可享多种优质增值服务</div>
            </div>
        </div>
        <div class="content">
            <div class="card-box" data-v-794d7a3a="">
                <div class="card-item c-vip">
                    <span class="card-tips" data-v-5291983e="">限时特惠</span>
                    <p class="t1" data-v-5291983e="">VIP年卡</p>
                    <p class="t2" data-v-5291983e="">¥<span data-v-5291983e="">50.00</span>/年</p>
                    <div class="card-foot" data-v-5291983e="">享 多种特权</div>
                </div>
                <!-- <div class="card-item c-vip">
                    <p class="t1" data-v-5291983e="">改名卡</p>
                    <p class="t2" data-v-5291983e="">¥<span data-v-5291983e="">20.33</span>/个</p>
                    <div class="card-foot" data-v-5291983e="">名称随心换</div>
                </div>
                <div class="card-item c-vip">
                    <p class="t1" data-v-5291983e="">书签扩容卡</p>
                    <p class="t2" data-v-5291983e="">
                        ¥<span data-v-5291983e="">19.86</span>/个
                    </p>
                    <div class="card-foot" data-v-5291983e="">享400次+AIGC工具集</div>
                </div>
                <div class="card-item c-vip">
                    <p class="t1" data-v-5291983e="">文件夹扩容卡</p>
                    <p class="t2" data-v-5291983e="">
                        ¥<span data-v-5291983e="">32.33</span>/个
                    </p>
                    <div class="card-foot" data-v-5291983e="">精选课程、专栏免费看</div>
                </div> -->
            </div>
        </div>
        <div class="vip-rights-container">
            <div>
                <div class="rights-head">
                    <span> VIP会员权益 </span>
                </div>
                <div class="vip-rights-list">
                    <div class="list" v-for="item in vipRightsList" :key="item.title">
                        <span class="tips" v-if="item.tips">{{ item.tips }}</span>
                        <div class="title">{{ item.title }}</div>
                        <div class="info">{{ item.info }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="vip-join">
            <div>
                <div class="rights-head">
                    <span> 立即开通 </span>
                </div>
                <div class="join">
                    <img src="~@/assets/zsxq.jpg" alt="" />
                    <div class="info">扫码加入知识星球即可开通vip</div>
                </div>
            </div>
        </div>
        <!-- <el-row :gutter="20" justify="center">
            <el-col :xs="24" :sm="12">
                <el-card class="card" shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>扩容 | 改名 | 开通VIP</span>
                        <el-button
                            type="text"
                            style="float: right; padding: 13px 15px"
                            @click="go('https://pr.kuaifaka.net/item/xydh_fun')"
                        >购买卡密
                        </el-button>
                        <el-button style="float: right; padding: 13px 15px" type="text" @click="go2()">兑换卡密</el-button>
                    </div>
                    <div>
                        <p><b>介绍</b></p>
                        <li> 文件夹扩容卡：每次使用增加 10 个</li>
                        <li> 书签扩容卡：每次使用增加 180 个</li>
                        <li> 改名卡：可以获得更心仪的ID与域名。</li>
                        <li> VIP：顶部开关、底部自定义、BMG 歌单</li>
                    </div>
                </el-card>
            </el-col>
        </el-row> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            vipRightsList: [
                {
                    title: '99个文件夹',
                    info: '收藏分类，随心所欲',
                    tips: '限时福利',
                },
                {
                    title: '999个书签',
                    info: '超大容量，应存尽存',
                    tips: '限时福利',
                },
                {
                    title: '免广告',
                    info: '界面清爽，简单随心',
                },
                {
                    title: '超多背景音乐',
                    info: '专属音乐，多姿多彩',
                },
                {
                    title: '站点随心订阅',
                    info: '优质站点，随时订阅',
                },
                {
                    title: '自定义友链',
                    info: '你的友链，自己定义',
                },
                {
                    title: '优质社群',
                    info: '内容丰富，志同道合',
                },
                {
                    title: '更多功能',
                    info: '后续功能，最早体验',
                },
            ],
        };
    },
    methods: {
        go(link) {
            window.open(link, '_blank');
        },
        go2() {
            let routeData = this.$router.resolve({path: '/u/vip', query: {}});
            window.open(routeData.href, '_blank');
        },
    },
};
</script>

<style scoped lang="less">
    .vip {
        box-shadow: 0 4px 33px rgba(190, 196, 207, 0.28);
        .vipCard {
            height: 200px;
            width: 300px;
            color: #ffeaa7;
            background: #1f2029;
        }
        .user-info {
            height: 96px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            border-radius: 8px 8px 0 0;
            color: #fff;
            padding: 0 16px;
            background: #1a1a2a url(~@/assets/vipBg.png) 50% no-repeat;
            background-size: cover;
            text-align: left;
            .user-head {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-top: 16px;
                margin-right: 8px;
            }
            .user-desc {
                -webkit-box-flex: 1;
                -ms-flex-positive: 1;
                flex-grow: 1;
                margin-top: 16px;
            }
            .user-d-t {
                color: #fff;
                font-size: 16px;
                line-height: 24px;
                cursor: pointer;
            }
            .user-d-c{
                color: #fff;
                font-size: 16px;
                line-height: 24px;
                cursor: pointer;
                margin-top: 10px;
            }
        }
        .content {
            margin-top: -10px;
            background: #fff;
            border-radius: 8px 8px 0 0;
            padding: 20px;
            .card-box {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: start;
                -ms-flex-pack: start;
                justify-content: flex-start;
                margin-bottom: 16px;
                .card-item {
                    width: 204px;
                    height: 134px;
                    border-radius: 8px;
                    border: 2px solid #fae8d0;
                    background-color: #fff;
                    position: relative;
                    text-align: center;
                    margin-right: 26px;
                    -ms-flex-negative: 0;
                    flex-shrink: 0;
                    cursor: pointer;
                    .t1 {
                        font-size: 16px;
                        height: 22px;
                        line-height: 22px;
                        color: #222226;
                        font-weight: 700;
                        margin: 24px 0 12px;
                        position: relative;
                        z-index: 2;
                    }
                    .t2 {
                        font-size: 12px;
                        height: 32px;
                        line-height: 32px;
                        color: #b87100;
                        position: relative;
                        z-index: 2;
                        span {
                            font-size: 24px;
                            font-weight: 700;
                        }
                    }
                    .card-foot {
                        position: absolute;
                        z-index: 2;
                        width: 100%;
                        height: 32px;
                        background-color: #fae8d0;
                        font-size: 12px;
                        line-height: 32px;
                        color: #69421b;
                        font-weight: 500;
                        bottom: 0;
                        border-radius: 0 0 6px 6px;
                        overflow: hidden;
                    }
                    .card-tips {
                        position: absolute;
                        padding: 0 4px;
                        height: 24px;
                        line-height: 24px;
                        background: -webkit-gradient(linear, left top, right top, from(#fc5531), to(#fc1944));
                        background: linear-gradient(90deg, #fc5531, #fc1944);
                        border-radius: 6px 0 8px 0;
                        color: #fff;
                        left: -2px;
                        top: -2px;
                    }
                }
            }
        }
        .vip-rights-container {
            margin: 0 auto;
            background: #f8f8f8;
            padding: 16px 8px;
            .rights-head {
                font-size: 16px;
                line-height: 22px;
                color: #222226;
                font-weight: 700;
                margin-bottom: 8px;
                text-align: left;
            }
            .vip-rights-list {
                display: grid;
                grid-gap: 10px;
                grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
                justify-items: center;
                .list {
                    width: 190px;
                    height: 68px;
                    background-color: #fff;
                    border-radius: 8px;
                    padding: 8px;
                    position: relative;
                    .title {
                        font-size: 15px;
                        font-weight: bold;
                        color: #222226;
                        margin: 10px 0;
                    }
                    .info {
                        font-size: 12px;
                        font-weight: 400;
                        color: #999aaa;
                    }
                    .tips {
                        position: absolute;
                        padding: 0 4px;
                        height: 24px;
                        line-height: 24px;
                        background: -webkit-gradient(linear, left top, right top, from(#fc5531), to(#fc1944));
                        background: linear-gradient(90deg, #fc5531, #fc1944);
                        border-radius: 0 6px 0 8px;
                        color: #fff;
                        right: 0;
                        top: 0;
                        font-size: 12px;
                    }
                }
            }
        }
        .vip-join{
            margin: 0 auto;
            background: #f8f8f8;
            padding: 16px 8px;
            .rights-head {
                font-size: 16px;
                line-height: 22px;
                color: #222226;
                font-weight: 700;
                margin-bottom: 8px;
                text-align: left;
            }
            .join{
                text-align: left;
                display: flex;
                align-items: center;
                img{
                width: 200px;
                margin-right: 40px;
            }
            }

        }
    }
</style>
