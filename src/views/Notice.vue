<template>
    <div class="notice">
        <!-- <h4>请关注官方公众号[炫技巧],获取最新导航站资讯!</h4> -->
        <p>欢迎您使用炫猿导航 更多客制化功能氪命开发中...</p>
        <div v-for="n in Notice" :key="n.name" >
            <el-divider >{{ n.name }} <el-badge :value="n.list.length" class="item"></el-badge></el-divider>
            <!-- <p class="noticename"></p> -->
             <div v-for="l in n.list" :key="l.id" style="text-align: left;">
                     {{ l.li }}
            </div>
        </div>
        <el-divider>进官方群交流</el-divider>
        <div>
            <p>入QQ群请报自己的炫猿id。进群后昵称改成id.xydh.fun。</p>
            <b>定期清理未改名的用户。(防止无账号的人混入)</b>
            <p>猿友们在群里互相帮助哈, 我基本不看群</p>
            <p>产品建议和Bug反馈优先从<a target='_blank' rel='nofollow' href='https://support.qq.com/products/106426'>https://support.qq.com/products/106426</a>发布。</p>
            <img width="200px" src='https://i.loli.net/2020/04/06/BJtIxrK6MzFbiqf.jpg' alt='BJtIxrK6MzFbiqf'/>
		</div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        Notice: [
        {"name":"v0.7.6 特性 -2020.06.22","list":[{"li":"实验室全新UI上线,感谢 AHANA.xydh.fun 的布局设计!"}]},
        {"name":"v0.7.5 特性 -2020.06.04","list":[{"li":"热榜新增两款爬虫 未来几天会增加更多 如果你有特别推荐的网站需要爬取可以给我提意见"}]},
        {"name":"v0.7.4 特性 -2020.06.01","list":[{"li":"热榜预览版上线"}]},
        {"name":"v0.7.3 特性 -2020.05.28","list":[{"li":"优化了宽度大于1920的高分辨率显示器的布局(改为一行4个文件夹)"},{"li":"UI布局优化"}]},
        {"name":"v0.7.2 特性 -2020.05.06","list":[{"li":"任意门上线"},{"li":"正在憋一个大招(遇到问题了)"},]},
        {"name":"v0.7.1 特性 -2020.04.26","list":[{"li":"书签排序上线"},{"li":"细节优化:打开首页光标自动聚焦到搜索框"},{"li":"正在憋一个大招"},]},
        {"name":"v0.7.0 特性 -2020.04.23","list":[{"li":"扩容卡上线"},{"li":"去广告服务上线"},]},
        {"name":"v0.6.3 特性 -2020.04.20","list":[{"li":"增加了更多背景颜色和字体颜色的选择"},]},
        {"name":"v0.6.2 特性 -2020.04.14","list":[{"li":"书签备份/导出功能上线!"},{"li":"优化了手机端的访问: 手机访问时文件夹自动展开并出现直达按钮"},{"li":"新增搜索引擎"}]},
        {"name":"v0.6.1 特性 -2020.04.12","list":[{"li":"搞怪猫、吹气泡特效上线"},{"li":"优化了手机端的访问: 手机访问时出现一键展开所有文件夹按钮"}]},
        {"name":"v0.6 特性 -2020.04.11","list":[{"li":"文件夹排序功能上线!"},{"li":"双击文件夹名称自适应高度 单击复原"}]},
        {"name":"v0.5 特性 -2020.04.10","list":[{"li":"背景特效上线!"},{"li":"修复了搜索框bug"},{"li":"新增几个搜索引擎"},]},
        {"name":"v0.4.2 特性 -2020.04.08","list":[{"li":"调整了搜索框样式"},{"li":"黑色字体上线"},{"li":"修复了编辑书签界面闪动的bug"},]},
        {"name":"v0.4.1 特性 -2020.04.02","list":[{"li":"修改书签时增加波动效果 可以更方便地定位 防止改错"},{"li":"新增了头部[天气、公告、按钮]区域的开关"},]},
        {"name":"v0.4 特性 -2020.04.01","list":[{"li":"网站正式上线一天, 所有用户都在说想要自定义背景功能。 现在, 我们可以了！"},]},
        {"name":"v0.3 特性 -2020.03.31","list":[{"li":"支持二级域名访问 如:在浏览器输入 http://ABC.xydh.fun 会自动跳转到 https://xydh.fun/ABC"},]},
        {"name":"v0.2 特性 -2020.03.16","list":[{"li":"聚合搜索框新增更多选项"},{"li":"分类和书签前都可增加小图标"},]},
        {"name":"v0.1 特性 -2020.03.10","list":[{"li":"站点基本信息自定义"},{"li":"书签自定义"},{"li":"文件夹自定义"},{"li":"聚合搜索框"},{"li":"天气模块"},]},
        ],
      };
    },
    methods: {
    }
  };
</script>
<style scoped>
.notice {
    max-width: 800px;
    margin: 10px auto;
}
/* .noticename {
    
} */
</style>