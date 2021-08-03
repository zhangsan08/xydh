<template>
    <div class="indexLab">
        <el-page-header @back="switchLab" content="炫猿实验室" title="我的导航"> </el-page-header>
        <!-- 实验室内容 -->
        <div class="labTabs">
            <el-tabs type="card" v-model="currentTabName" @tab-remove="removeTab">
                <el-tab-pane label="留言板" name="留言板">
                    <div id="lv-container" data-id="city" :data-uid="lybID"></div>
                </el-tab-pane>
                <el-tab-pane label="热榜" name="热榜">
                    优化后回归
                    <!-- <Hot></Hot> -->
                </el-tab-pane>
                <el-tab-pane label="公告" name="公告">
                    <br />导航站最新资讯，每日送码，就关注官方公众号【炫技巧】
                    <p><img width="150px" src="https://pic.downk.cc/item/5ecfb96ac2a9a83be569795b.png" /></p>
                </el-tab-pane>
                <el-tab-pane v-for="Folder in Folders" :key="Folder.id" :label="Folder.name" :name="Folder.name" closable class="Folderbox">
                    <el-card v-for="link in Folder.links" :key="link.id" shadow="hover">
                        <div class="cardClickBox" @click="openLink(link.url)">
                            <div class="leftbox">
                                <div class="linkicon">
                                    <i :class="'fa fa-' + link.icon" v-if="link.icon"></i>
                                    <i :class="'fa fa-question-circle-o'" v-else></i>
                                </div>
                            </div>
                            <div class="rightbox">
                                <div class="linkname">{{ link.name }}</div>
                                <div class="linkinfo">{{ link.info }}</div>
                            </div>
                        </div>
                    </el-card>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    props: ["lybID", "Folders", "AimName"],
    data() {
        return {
            currentTabName: this.AimName,
        }
    },
    methods: {
        switchLab() {
            this.$parent.switchLab()
        },
        removeTab(targetName) {
            let deletename = this.Folders.filter(function (element, index, array) {
                if (element.name == targetName) return array.splice(index, 1)
            })
            if (this.Folders[0] && this.currentTabName == deletename[0].name) {
                this.currentTabName = this.Folders[this.Folders.length - 1].name
            } else if (!this.Folders[0]) {
                this.currentTabName = "留言板"
            }
        },
        openLink(link) {
            window.open(link, "_blank")
        },
    },
    mounted() {
        let lyb = document.getElementById("lv-container")
        if (this.lybID == "") {
            lyb.innerHTML = "该用户未开启留言板"
        } else {
            let script = document.createElement("script")
            script.src = "https://cdn-city.livere.com/js/embed.dist.js"
            lyb.appendChild(script)
        }
    },
}
</script>

<style scoped>
.indexLab {
    background-color: white;
    min-height: 500px;
    z-index: 999;

    color: black;
    margin: 0 20px;
    padding: 5px 10px;

    border-radius: 10px;
}

.closeBtn {
    position: absolute;
    top: 5px;
    right: 30px;
    cursor: pointer;
    font-size: 20px;
}

.labTabs {
    margin: 20px 0px;
}

#lv-container {
    margin: 0 auto;
    max-width: 800px;
}
.Folderbox {
    display: table-cell;
    position: relative;
    align-items: center;
}
.el-card {
    box-sizing: border-box;
    position: relative;
    float: left;
    margin: 5px 20px;
    min-width: 400px;
    height: 70px;
    padding: 0;
}
.cardClickBox {
    min-height: 60px;
    min-width: 350px;
    cursor: pointer;
}
.cardClickBox:hover {
    color: rgb(0, 153, 255);
}
.leftbox {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(20px, -50%);
    width: 50px;
    height: 50px;
    line-height: 48px;
    border: 1px solid #ccc;
    border-radius: 25px;
}
.rightbox {
    position: absolute;
    top: 50%;
    left: 85px;
    max-width: 250px;
    max-height: 50px;
    text-align: left;
    transform: translate(0, -50%);
}
.linkicon {
    font-size: 25px;
}
.linkname {
    font-size: 18px;
    font-weight: 700;
}
.linkinfo {
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>