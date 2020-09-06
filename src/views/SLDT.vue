<template>
<div class="sldt">
    <Header></Header>
    <h2>水帘洞天 | 炫猿导航</h2>
预览版 可能删档
    <div class="tips">
          <el-divider>玩法简介</el-divider>
        <li>1. 炫猿注册用户达到一定等级后可进行添加操作。(等级低时无权添加或看不到添加按钮)</li>
        <li>2. 不仅可以推荐网站、网址，也可以推荐好用的App、软件，比如放上官网等</li>
        <li>3. 你推荐的站点受欢迎时，则会展示在顶端，可为你的个人站点带来流量</li>
        <li>4. 此功能就是为了更好地分享，因为好多猿友的站点很优质，但大家并不知道他的ID，通过水帘洞天我们可以看到优质的网站来自哪些大神推荐。</li>
    </div>

    <div class="order">
         <el-divider>排序方式 【未上线，基于点赞功能，与点赞一起上线】</el-divider>
        <p>最新 | 倒序 | 最受欢迎(Top100)</p>
    </div>
    <el-dialog
        title="添加书签"
        :visible.sync="addDialogVisible">
    <el-form :model="linkform" label-width="80px">
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
            <el-checkbox-group v-model="tags">
                <el-checkbox v-for="tag in tagsOption" :label="tag" :key="tag">{{tag}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
            
    </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="createLink()">添加</el-button>
        </span>
    </el-dialog>
    <div class="AddBtn" @click="addDialogVisible = true">
        <i class="el-icon-circle-plus-outline"></i>
    </div>

    <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="24" :md="22">
            <el-table
                class="sldtable"
                :data="links"
                stripe>
                <el-table-column
                    prop="url"
                    label="名称"
                    align="center"
                    width="180">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="bottom-start">
                        链接：{{ scope.row.url }}
                        <div slot="reference" class="name-wrapper">
                            <a target='_blank' rel='nofollow' :href='scope.row.url'>{{ scope.row.name }}</a>
                        </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="info"
                    label="简介">
                </el-table-column>
                <el-table-column
                    prop="tags"
                    label="标签">
                </el-table-column>
                <el-table-column
                    prop="user_name"
                    label="推荐人"
                    align="center"
                    width="100">
                    <template slot-scope="scope">
                        <a target='_blank' :href="'https://xydh.fun/'+scope.row.user_name">{{ scope.row.user_name }}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="赞"
                    align="center"
                    width="80">
                    <i class="fa fa-star" disabled></i>
                </el-table-column>
                </el-table>
        </el-col>
    </el-row>
<p>TODO: [翻页按钮]</p>


</div>
</template>

<script>

import Header from '@/components/Header.vue'
import { sldLinkService } from '@/common/api'

export default {
    components:{
        Header,
	},
    data() {
        return {
            tagsOption: ['综合资源','学习学术','音乐电台','电影电视','图书图片','动漫','游戏','设计素材','论坛博客','iOS','安卓','Windows','Mac','效率&工具','导航'],
            tagsOption2: [  {text:'综合资源', value:'综合资源'},
                            {text:'学习学术', value:'学习学术'},
                            {text:'音乐电台', value:'音乐电台'},
                            {text:'电影电视', value:'电影电视'},
                            {text:'图书图片', value:'图书图片'},
                            {text:'动漫', value:'动漫'},
                            {text:'游戏', value:'游戏'},
                            {text:'设计素材', value:'设计素材'},
                            {text:'论坛博客', value:'论坛博客'},
                            {text:'iOS', value:'iOS'},
                            {text:'安卓', value:'安卓'},
                            {text:'Windows', value:'Windows'},
                            {text:'Mac', value:'Mac'},
                            {text:'效率&工具', value:'效率&工具'},
                            {text:'导航', value:'导航'}],
            links: [],
            tags: [],
            linkform: {
				name: "",
				url: "",
                info: "",
                tags: "",
			},
            addDialogVisible: false,
        }
    },
    methods: {
        getSldLinks(){
            sldLinkService.getLinks().then((res) =>{
                this.links = res.data
            })
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        createLink(){
            this.linkform.tags = this.tags.toString()
			sldLinkService.createLink(this.linkform).then((res) => {
				if (res.code > 0) {
					this.$notify.error({
					title: "添加失败",
					message: res.msg
					});
				} else {
					this.$notify({
						title: "添加成功!",
						type: "success",
						duration: "800"
                    });
                    this.getSldLinks()
				}
				})
				.catch(error => {
				this.$notify.error({
					title: "错误 请检查",
					message: error
				});
			});
		},
    },
    beforeMount(){
        document.title = "水帘洞天 | 炫猿导航"
        this.getSldLinks()
    }
}
</script>

<style>
.sldt {
    margin: 20px auto;
    text-align: center;
}
.tips {
    max-width: 800px;
    text-align: left;
    margin: 0 auto;
}
.sldtable {
    margin: 0px auto;
    max-width: 1080px;
}
.AddBtn {
    z-index: 999;
    font-size: 40px;
    cursor: pointer;
    position: fixed;
    bottom: 80px;
    right: 40px;
}
.AddBtn :hover{
    font-size: 45px;
}
</style>