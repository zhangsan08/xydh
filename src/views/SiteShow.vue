<template>
    <div class="bg">
        <div class="particle" v-if="bglizi > 0">
            <Particle :bglizi="bglizi"></Particle>
        </div>

        <div class="totop" v-if="top_bottom.top_switch">
            <Header :historySwitch="historySwitch" :navSwitch="navSwitch" :Folders="Folders"></Header>
            <!-- <RightBar></RightBar> -->
        </div>

        <!-- 名称简介 -->
        <div style="margin: 0 auto 0">
            <span class="siteName">{{ sitename }}</span>
            <div style="margin: 10px auto"></div>
            <!-- <p class="siteInfo">{{ siteinfo }}</p> -->
            {{ siteinfo }}
        </div>

        <div style="height: 80px" v-if="!navSwitch && !labSwitch"></div>
        <!-- 搜索框 -->
        <div class="search">
            <SearchTool :AllLinks="AllLinks"></SearchTool>
        </div>

        <!-- 点击实验室按钮会打开实验室页面 -->
        <div class="Lab totop" v-if="labSwitch">
            <div class="hidden-sm-and-up" style="height: 50px"></div>
            <transition name="el-zoom-in-left">
                <IndexLab :lybID="lybID" :Folders="TabFolders"  :IMGs="TabIMGs" :AimName="AimTabName"
                          v-Clickoutside="switchLab"></IndexLab>
            </transition>
        </div>

        <!-- 历史足迹 -->
        <el-row>
            <div class="historyLinks" v-if="historySwitch">
                <div v-if="cacheList.length > 0">
                    <div class="historyLink" v-for="link in cacheList" @click="goToUrl(link)" :key="link.id">
                        <p>{{ link.name }}</p>
                    </div>
                </div>
                <div v-else>
                    <el-divider>正常使用导航后此处将显示本地最常访问的书签哦</el-divider>
                </div>
            </div>
        </el-row>

        <div class="bookmark" v-if="!labSwitch && navSwitch">
            <!-- 手机端快捷导航 -->
            <div class="hidden-sm-and-up totop">
                <el-divider>快捷导航</el-divider>
                <div style="padding: 10px 10px">
                    <el-col :span="6" v-for="Folder in Folders" :key="Folder.id">
                        <div style="margin: 5px auto">
                            <a :href="'#' + Folder.name" style="font-size: 16px">
                                {{ Folder.name }}
                            </a>
                        </div>
                    </el-col>
                </div>
            </div>
            <!-- 用户自定义内容 -->
            <div v-for="(Folder, index) in Folders" :key="Folder.id">
                <el-col :xs="24" :sm="12" :md="8" :xl="6">
                    <div class="foldername" :id="Folder.name">
                        <p v-if="Folder.icon"><i :class="'fa fa-' + Folder.icon"></i>{{ Folder.name }}</p>
                        <p v-else>{{ Folder.name }}</p>
                        <el-tooltip content="展开文件夹" placement="top">
                            <div class="openFolder" @click="addToTabs(Folder)">
                                <i class="fa fa-arrows-alt"></i>
                            </div>
                        </el-tooltip>
                    </div>
                    <div class="folder totop" :style="{height: screenWidth > 768 ? '140px' : 'auto'}" :id="Folder.id"
                         onselectstart="return false;">
                        <div class="linkbox">
                            <div class="inputPWD" v-if="Folder.need_password">
                                <!-- 如果文件夹需要密码 -->
                                <el-input type="text" autosize v-model="passwords[index]" :placeholder="Folder.info"
                                          clearable>
                                    <span slot="append" type="text"
                                          @click="GetPWDFolder(index, Folder.id, passwords[index])">确定</span>
                                </el-input>
                            </div>
                            <div class="links" v-else v-for="link in Folder.links" :key="link.id">
                                <el-col :span="8">
                                    <div class="link">
                                        <a @click="goToUrl(link)" target="_blank" rel="nofollow">
                                            <span v-if="link.info" class="tooltiptext"
                                            ><i class="fa fa-info-circle">{{ link.info }}</i></span
                                            >
                                            <p v-if="link.icon"><i :class="'fa fa-' + link.icon"></i>&#160;{{
                                                    link.name
                                                }}</p>
                                            <p v-else>{{ link.name }}</p>
                                        </a>
                                    </div>
                                </el-col>
                            </div>
                        </div>
                    </div>
                </el-col>
            </div>
        </div>

        <div class="amusic" v-if="music.open">
            <aplayer :music="music.list[0]" :list="music.list" :narrow="false" float :listFolded="true"
                     theme="#fff"></aplayer>
        </div>

        <!-- 跑马灯（暂时去掉了 本想留作广告位。发现接不到 -->
        <el-col :span="24">
            <div class="totop">
                <!-- <Paomadeng v-if="ad"></Paomadeng>
                <div v-else style="height:100px"></div> -->
                <!-- 这里是200px 高的占位符。不然不好看 -->
                <div style="height: 200px" v-if="!navSwitch && !labSwitch"></div>
                <div v-if="!is_vip || userid === 1">
                    <Footer></Footer>
                </div>
                <div v-else style="max-width: 768px; margin: 30px auto 30px; text-align: center">
                    <div style="height: 100px"></div>
                    <li style="float: left" v-for="link in top_bottom.bottom_list" :key="link.title">
                        <a @click="goToUrl(link)" target="_blank" rel="nofollow">
                            {{ link.title }}
                        </a>
                    </li>
                </div>
            </div>
        </el-col>
    </div>
</template>

<script>
// import * as UserAPI from '@/api/user/'
// import * as SiteAPI from '@/api/site/'
import {siteService} from "@/common/api"
import {cookieGet, cookieSet} from "@/common/cookie"
import IndexLab from "@/views/IndexLab.vue"
import {getUrl} from "@/common/pickup"

// import RightBar from '@/components/RightBar'
import SearchTool from "@/components/SearchTool.vue"
// import Paomadeng from '@/components/Paomadeng.vue'
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import Particle from "@/components/particle.vue"
import Aplayer from "vue-aplayer"
import Clickoutside from "element-ui/src/utils/clickoutside"

export default {
    name: "ShowSite",
    props: ["userName"],
    filters: {
        getDomain(url) {
            return getUrl(url)
        },
    },
    data() {
        return {
            is_vip: 0,
            labSwitch: false,
            historySwitch: false,
            navSwitch: true,
            screenWidth: "",
            userid: 0,
            username: "",
            sitename: "",
            siteinfo: "",
            bglizi: 0,
            mobile_bg: "",
            lybID: "",
            Folders: [],
            TabFolders: [],
            TabIMGs: [],
            AllLinks: [], //检索用
            AimTabName: "",
            f_color: "white",
            autoBgColor: "#fff",
            cacheList: [],
            passwords: [],
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
        switchHistory() {
            this.historySwitch = !this.historySwitch
            cookieSet("historySwitch", this.historySwitch)
        },
        switchLab() {
            this.labSwitch = !this.labSwitch
            cookieSet("labSwitch", this.labSwitch)
        },
        switchNav() {
            this.navSwitch = !this.navSwitch
            cookieSet("navSwitch", this.navSwitch)
        },
        load(uname) {
            siteService.getAllsiteandlinks(uname).then((res) => {
                if (res.code > 0) {
                    this.$alert("", "走迷路了", {
                        confirmButtonText: "回主页",
                        callback: () => {
                            window.location.href = "https://xydh.fun"
                        },
                    })
                } else {
                    // 加载用户
                    this.userid = res.data.target.id
                    this.is_vip = res.data.target.is_vip
                    // 违规用户
                    if (res.data.target.level <= 0) {
                        this.$alert("网络不是不法之地！请珍惜您的账号,账号申诉请联系邮箱 xuanyuandaohang@126.com 上传了非法网站的就不要申诉了", "该账号传播违法信息已被封禁", {
                            confirmButtonText: "回主页",
                            callback: () => {
                                window.location.href = "https://xydh.fun"
                            },
                        })
                        return
                    }
                    // 加载 Site
                    this.sitename = res.data.site_info.name
                    this.siteinfo = res.data.site_info.info
                    this.bglizi = res.data.site_info.bglizi
                    this.lybID = res.data.site_info.lyb_id
                    this.mobile_bg = res.data.site_info.mobile_bg
                    document.title = this.sitename
                    // 改背景颜色或图片
                    var obj = document.getElementsByTagName("body")[0]
                    if (res.data.site_info.bg_switch) {
                        if (window.innerWidth < 768 && this.mobile_bg) {
                            obj.style.backgroundImage = "url(" + this.mobile_bg + ")"
                        } else {
                            obj.style.backgroundImage = "url(" + res.data.site_info.bg + ")"
                        }
                        // window.onresize = () => {
                        //     if(window.innerWidth < 768 && this.mobile_bg) {
                        //         obj.style.backgroundImage = "url(" + this.mobile_bg + ")"
                        //     } else {
                        //         obj.style.backgroundImage = "url(" + res.data.site_info.bg + ")"
                        //     }
                        // }
                    } else {
                        obj.style.backgroundColor = res.data.site_info.bg_color
                    }
                    obj.style.color = res.data.site_info.font_color
                    // 取文件夹和书签
                    this.Folders = res.data.folder_with_links
                    // 文件夹排序
                    this.Folders.sort(function (f1, f2) {
                        return f1.weight - f2.weight //weight
                    })
                    // 文件夹里的每个书签排序
                    for (var i = 0; i < this.Folders.length; i++) {
                        if (!this.Folders[i].links) continue
                        this.Folders[i].links.sort(function (l1, l2) {
                            return l2.weight - l1.weight //weight
                        })
                    }
                    //    载入所有书签到 AllLinks,检索用
                    for (i = 0; i < this.Folders.length; i++) {
                        this.AllLinks = this.AllLinks.concat(this.Folders[i].links)
                    }
                    // 载入音乐和自定义底部
                    if (res.data.site_info.music !== "") {
                        this.music = JSON.parse(res.data.site_info.music)
                    }
                    if (!this.is_vip) {
                        this.music.list.splice(1)
                    }
                    if (res.data.site_info.top_bottom !== "") {
                        this.top_bottom = JSON.parse(res.data.site_info.top_bottom)
                    }

                }
            })
        },
        // 输入密码
        GetPWDFolder(index, id, password) {
            siteService.getLinksbyfolderid(id, password).then((res) => {
                if (res.code > 0) {
                    this.$alert("请重试", "密码错误", {})
                    return
                }
                this.Folders[index].need_password = false
                if (res.data == null) {
                    // 文件夹里没有书签
                    return;
                }
                this.Folders[index].links = res.data
                this.Folders[index].links.sort(function (l1, l2) {
                    return l2.weight - l1.weight //weight
                })
            })
        },
        // 打开url
        goToUrl(linkInfo) {
            // 如果是图片
            var thisUrl = linkInfo.url; 
            var houzhui = /.[^.]+$/.exec(thisUrl); 
            switch(houzhui[0])
            {
                case ".png":
                case ".jpg":
                case ".jpeg":
                case ".gif":
                case ".svg":
                    this.addIMGToTabs(linkInfo)
                    return
                default:
     
                    break;
            }

            let cache = cookieGet("cacheLinkList")
            let existKey = false
            if (cache) {
                let cacheExist = JSON.parse(cache)
                cacheExist.filter((d) => {
                    if (d.id === linkInfo.id) {
                        existKey = true
                        d.count += 1
                    }
                })

                if (!existKey) {
                    linkInfo["count"] = 1
                    cacheExist.push(linkInfo)
                }
                cookieSet("cacheLinkList", JSON.stringify(cacheExist))
            } else {
                let array = []
                linkInfo["count"] = 1
                array.push(linkInfo)
                cookieSet("cacheLinkList", JSON.stringify(array))
            }

            window.open(linkInfo.url, "_blank")
        },
        compare(array, key) {
            return array.sort(function (a, b) {
                var x = a[key]
                var y = b[key]
                return y < x ? -1 : x > y ? 1 : 0
            })
        },
        // 展开folder
        unfolder() {
            var folders = document.getElementsByClassName("folder")
            for (var i = 0; i < folders.length; i++) {
                folders[i].setAttribute("style", "height:auto;")
            }
            var openFolderBtns = document.getElementsByClassName("openFolder")
            for (var j = 0; j < openFolderBtns.length; j++) {
                openFolderBtns[j].setAttribute("style", "display:none;")
            }
        },
        enfolder() {
            var folders = document.getElementsByClassName("folder")
            for (var i = 0; i < folders.length; i++) {
                folders[i].setAttribute("style", "height:180px;")
            }
            var openFolderBtns = document.getElementsByClassName("openFolder")
            for (var j = 0; j < openFolderBtns.length; j++) {
                openFolderBtns[j].setAttribute("style", "display:inline;")
            }
        },
        addToTabs(folder) {
            let flag = 0
            this.TabFolders.filter(function (element) {
                if (element.id === folder.id) return (flag = 1)
            })
            if (flag !== 1) this.TabFolders.push(folder)
            this.AimTabName = folder.name
            this.switchLab()
        },
        addIMGToTabs(IMGLink) {
            let flag = 0
            this.TabIMGs.filter(function (element) {
                if (element.id === IMGLink.id) return (flag = 1)
            })
            if (flag !== 1) this.TabIMGs.push(IMGLink)
            this.AimTabName = IMGLink.name
            this.switchLab()
        },
    },
    components: {
        SearchTool,
        // Paomadeng,
        Header,
        Footer,
        IndexLab,
        // RightBar,
        Particle,
        Aplayer,
    },
    directives: {
        Clickoutside,
    },
    beforeMount() {
        // this.$message({
        //   showClose: true,
        //   message: '这几天网站进行技术维护.可能会一直出现打不开的情况.一定关注公众号【炫技巧】防止迷路',
        //   type: 'warning'
        // });
        this.screenWidth = document.body.clientWidth
        this.username = this.$route.params.username
        if (!this.username) this.username = "admin"
        this.load(this.username)
    },
    mounted() {
        // 动态调整folder高度
        window.onresize = () => {
            this.screenWidth = document.body.clientWidth
            if (this.screenWidth <= 768) {
                this.unfolder(0)
            } else {
                this.enfolder(0)
            }
        }

        // 取“足迹”
        let cache = cookieGet("cacheLinkList")
        if (cache) {
            this.cacheList = []
            let tempList = this.compare(JSON.parse(cache), "count")
            let showNum = tempList.length >= 12 ? 12 : tempList.length
            for (let i = 0; i < showNum; i++) {
                this.cacheList.push(tempList[i])
            }
        }

        // 取“足迹开关状态”
        let open1 = cookieGet("historySwitch")
        if (open1 !== undefined) {
            this.historySwitch = open1 === "true"
        }
        // 取“实验室开关状态”
        let open2 = cookieGet("labSwitch")
        if (open2 !== undefined) {
            this.labSwitch = open2 === "true"
        }
        // 取“导航开关状态”
        let open3 = cookieGet("navSwitch")
        if (open3 !== undefined) {
            this.navSwitch = open3 === "true"
        }
    },
}
</script>

<style>
body {
    /* background-image: url('../assets/bg.jpg'); */

    background-attachment: fixed;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-color: black;
    text-align: center;
    font-size: 13px;
    color: white;
    margin: 0;
}

.siteName {
    font-size: 36px;
    font-weight: bold;
}

.folder {
    background: rgba(0, 0, 0, 0.03);
    /* background: rgba(255, 255, 255, 0.06); */
    min-height: 140px;
    margin: 12px 20px;
    padding: 5px 0 0 0;
    border-radius: 20px;
    /* 滚动条 */
    overflow: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
}

/* 滚动条 */
::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}

.folder:hover {
    background: rgba(0, 0, 0, 0.6);
    color: white;
}

.foldername {
    position: relative;
    top: 0;
    left: 0;
    padding-top: 6px;
}

.foldername p {
    font-size: 16px;
    letter-spacing: 5px;
    font-weight: bolder;
    margin: 6px auto 6px;
    cursor: default;
}

.links {
    margin: 6px auto 0;
}

/* 每个书签 */
.link {
    min-height: 33px;
    max-height: 33px;
}

.link:hover {
    color: gold;
    /* cursor: pointer; */
}

/* Tooltip 文本 */
.link .tooltiptext {
    text-align: left;
    visibility: hidden;
    background: rgba(0, 0, 0, 1);
    max-width: 400px;
    /* box-shadow: 0 0 5px #666; */
    /* color: gold; */
    font-size: 16px;
    /* 定位 */
    top: 30px;
    left: 0;
    padding: 10px 20px;
    position: fixed;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
}

.link:hover .tooltiptext {
    visibility: visible;
    color: white;
}

.totop {
    z-index: 1;
    position: relative;
}

a {
    color: inherit;
}

.historyLinks {
    margin: 10px auto 100px;
    max-width: 1080px;
}

.historyLink {
    cursor: pointer;
    float: left;
    background: rgba(0, 0, 0, 1);
    max-width: 300px;
    height: 40px;
    border-radius: 10px;
    margin: 5px 10px;
    padding: 10px 15px;
    display: table-cell;
    vertical-align: middle;
    font-size: 20px;
    line-height: 20px;
    color: white;
}

.inputPWD {
    padding: 10% 2%;
}

.inputPWD .el-input__inner {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0;
    color: inherit;
    font-size: 0.33vmax;
    border: 0;
}

.inputPWD .el-input__inner::placeholder {
    color: inherit;
}

.inputPWD .el-input-group__append {
    background-color: rgba(255, 255, 255, 0.15);
    color: inherit;
    border-radius: 0;
    cursor: pointer;
    border: 0;
}

.amusic {
    position: fixed;
    max-width: 500px;
    left: -5px;
    bottom: 10px;
    z-index: 999;
}

.openFolder {
    position: absolute;
    right: 20px;
    top: 14px;
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.openFolder:hover {
    color: gold;
}

.particle {
    z-index: -999;
}
</style>