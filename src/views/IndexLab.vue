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
                    <div v-for="link in Folder.links" :key="link.id" @click="openLink(link.url)" class="minlink">{{ link.name }}</div>
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
            this.Folders.filter(function (element, index, array) {
                if (element.name == targetName) array.splice(index, 1)
            })
            if (this.Folders[0]) {
                this.currentTabName = this.Folders[this.Folders.length - 1].name
            } else {
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
.minlink {
    float: left;
    box-sizing: border-box;
    height: 30px;
    /* line-height: 20px; */
    transform: translate(0, 0);
    border: 0.3px solid #000;
    color: #000;
    border-radius: 8px;
    padding: 0px 10px;
    cursor: pointer;
    background-color: #fff;
    margin: 5px 5px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>