<template>
    <div class="userexport">
        <p>生成的文档语法格式为markdown</p>
        <a target='_blank' rel='nofollow' href='https://support.qq.com/products/106426/faqs/63774'>导出的Markdown数据怎么用</a>
        <p>在线编辑器: https://tool.lu/markdown/</p>
        <p>markdown表格格式转换: https://tableconvert.com/</p>
        <p>输入用户名</p>
        <p>
            <el-input type="text" v-model="username" style="width:200px"></el-input>
        </p>
        <el-button type="primary" @click="getAllsiteandlinks(username)">输出</el-button>
        <el-divider>输出结果</el-divider>
        <!-- 用户自定义内容 -->
        <br>
        <div v-if="Folders.length>0">
            <div>背景图：{{bg}}</div>
            <div>竖版背景图：{{mobile_bg}}</div>
            <div>音乐：开发中 后序支持</div>
        </div>

        <div v-for="Folder in Folders" :key="Folder.id">
            # {{ Folder.name }}<br><br>
            | 名称 | 链接 | 介绍 |<br>
            | ---- | ---- | ---- |
            <div v-for="link in Folder.links" :key="link.id">
                | {{ link.name }} | {{ link.url }} | {{ link.info }} |
            </div>
            <br>
        </div>
    </div>
</template>

<script>
import {siteService} from '@/common/api'

// import * as UserAPI from '@/api/user/'
// import * as SiteAPI from '@/api/site/'

export default {
    data() {
        return {
            username: "admin",
            Folders: [],
            SiteInfo: {

            },
            bg: "",
            mobile_bg: "",
            music: {
                open: false,
                list: [],
            },
        }
    },
    methods: {
        // 取所有书签[文件夹、书签]
        getAllsiteandlinks(username) {
            siteService.getAllsiteandlinks(username).then((res) => {
                if (res.code > 0) {
                    this.$alert('', '请勿滥用此功能', {
                        confirmButtonText: '回主页',
                        callback: () => {
                            this.$router.push({name: 'Home'}).catch(() => {
                            })
                        }
                    });
                } else {
                    const siteInfo = res.data.site_info;
                    this.bg = siteInfo.bg
                    this.mobile_bg = siteInfo.mobile_bg
                    this.Folders = res.data.folder_with_links
                    this.Folders.sort(function (f1, f2) {
                        return f1.weight - f2.weight//weight
                    })
                }
            })
        },
    },
}
</script>

<style scoped>
.userexport {
    /* margin: 0 auto; */
    text-align: center;
}
</style>