<template>
    <div class="notice">
    
    <div>
      <!--<el-divider>最新通知-净网行动</el-divider>
          <div class="note">
              <li>任意门的上线收到大量举报。对于举报者有奖励。</li> 
            <b>请严查你的书签中是否有违法网站。涉黄涉黑涉政。外网VPN一律禁止。</b>
            <li>很多东西你自己找个地方存好就行了 分享已经构成了违法犯罪<br>炫猿的很多用户都很年轻 希望你们有基础的法制观念</li>
      </div>-->

      <el-card header="进官方群交流" shadow="hover" style="max-width:1080px; text-align:center; margin:0 auto;" >
      <div>
        <p>入QQ群请报自己的炫猿id。进群后昵称改成id.xydh.fun。</p>
        <b>定期清理未改名的用户。(防止无账号的人混入)</b>
        <p>猿友们在群里互相帮助哈, 我基本不看群</p>
        <p>
          产品建议和Bug反馈优先从
          <a
            target="_blank"
            rel="nofollow"
            href="https://support.qq.com/products/106426"
          >https://support.qq.com/products/106426</a>发布。
        </p>
        <img
          width="200px"
          src="https://i.loli.net/2020/04/06/BJtIxrK6MzFbiqf.jpg"
          alt="BJtIxrK6MzFbiqf"
        />
      </div>
      </el-card>
    </div>
  <el-card header="更新历史" shadow="hover" style="max-width:1080px; text-align:center; margin:0 auto;" >
    <div style="text-align:left">
      <el-timeline>
        <el-timeline-item
          color="#FF8C00"
          v-for="n in Notice"
          :key="n.name"
          :timestamp="n.name"
          placement="top"
        >
          <li v-for="l in n.list" :key="l.id">{{ l.li }}</li>
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-card>
    </div>
</template>
<script>
  export default {
    props:["username"],
    data() {
      return {
        Notice: [
        { name: "v0.8.3 特性 2020.09.05", list: [{ li: "花果山上线" }] },
        { name: "v0.8.2 特性", list: [{ li: "快捷加书签上线" }] },
        { name: "v0.8.1 特性", list: [{ li: "花果山预览版上线" }] },
        { name: "v0.8.0 特性", list: [{ li: "水帘洞天上线" }] },
        { name: "v0.7.9 特性","list":[{"li":"优化任意门 基本不会再有白板啦"}]},
        { name: "v0.7.8 特性","list":[{"li":"足迹 书签开关"}]},
        { name: "v0.7.7 特性","list":[{"li":"留言板功能上线 使用方法请看6月30日炫技巧推文"}]},
        { name: "v0.7.6 特性","list":[{"li":"实验室全新UI上线,感谢 AHANA.xydh.fun 的布局设计!"}]},
        { name: "v0.7.5 特性","list":[{"li":"热榜新增两款爬虫 未来几天会增加更多 如果你有特别推荐的网站需要爬取可以给我提意见"}]},
        { name: "v0.7.4 特性","list":[{"li":"热榜预览版上线"}]},
        { name: "v0.7.3 特性","list":[{"li":"优化了宽度大于1920的高分辨率显示器的布局(改为一行4个文件夹)"},{"li":"UI布局优化"}]},
        { name: "v0.7.2 特性","list":[{"li":"任意门上线"},{"li":"正在憋一个大招(遇到问题了)"},]},
        { name: "v0.7.1 特性","list":[{"li":"书签排序上线"},{"li":"细节优化:打开首页光标自动聚焦到搜索框"},{"li":"正在憋一个大招"},]},
        { name: "v0.7.0 特性","list":[{"li":"扩容卡上线"},{"li":"去广告服务上线"},]},
        { name: "v0.6.3 特性","list":[{"li":"增加了更多背景颜色和字体颜色的选择"},]},
        { name: "v0.6.2 特性","list":[{"li":"书签备份/导出功能上线!"},{"li":"优化了手机端的访问: 手机访问时文件夹自动展开并出现直达按钮"},{"li":"新增搜索引擎"}]},
        { name: "v0.6.1 特性","list":[{"li":"搞怪猫、吹气泡特效上线"},{"li":"优化了手机端的访问: 手机访问时出现一键展开所有文件夹按钮"}]},
        { name: "v0.6 特性","list":[{"li":"文件夹排序功能上线!"},{"li":"双击文件夹名称自适应高度 单击复原"}]},
        { name: "v0.5 特性","list":[{"li":"背景特效上线!"},{"li":"修复了搜索框bug"},{"li":"新增几个搜索引擎"},]},
        { name: "v0.4.2 特性","list":[{"li":"调整了搜索框样式"},{"li":"黑色字体上线"},{"li":"修复了编辑书签界面闪动的bug"},]},
        { name: "v0.4.1 特性","list":[{"li":"修改书签时增加波动效果 可以更方便地定位 防止改错"},{"li":"新增了头部[天气、公告、按钮]区域的开关"},]},
        { name: "v0.4 特性","list":[{"li":"网站正式上线一天, 所有用户都在说想要自定义背景功能。 现在, 我们可以了！"},]},
        { name: "v0.3 特性","list":[{"li":"支持二级域名访问 如:在浏览器输入 http://ABC.xydh.fun 会自动跳转到 https://xydh.fun/ABC"},]},
        { name: "v0.2 特性","list":[{"li":"聚合搜索框新增更多选项"},{"li":"分类和书签前都可增加小图标"},]},
        { name: "v0.1 特性","list":[{"li":"站点基本信息自定义"},{"li":"书签自定义"},{"li":"文件夹自定义"},{"li":"聚合搜索框"},{"li":"天气模块"},]},
        ],
      };
    },
    methods: {
    },
    beforeMount(){
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