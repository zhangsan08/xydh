<template>
    <div class="notice">
        <p>欢迎体验炫猿导航内测版</p>
        <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                正在开发<el-badge :value="8" class="item"></el-badge>
                </template>
                <li><el-checkbox>讨论模块</el-checkbox></li>
                <li><el-checkbox>线报模块</el-checkbox></li>
                <li><el-checkbox>密码访问</el-checkbox></li>
            </el-collapse-item>
            <div v-for="n in Notice" :key="n.name">
                <el-collapse-item>
                <template slot="title">
                {{ n.name }}<el-badge :value="n.list.length" class="item"></el-badge>
                </template>
                 <div v-for="l in n.list" :key="l.id">
                     {{ l.li }}
                 </div>
            </el-collapse-item>
            </div>
        </el-collapse>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        Notice: [
        {
            "name":"v0.2 特性 -2020.03.16",
            "list":
            [{"li":"聚合搜索框新增更多选项"},{"li":"分类和书签前都可增加小图标"},]
        },
        {
            "name":"v0.1 特性 -2020.03.10",
            "list":
            [{"li":"站点基本信息自定义"},{"li":"书签自定义"},{"li":"文件夹自定义"},{"li":"聚合搜索框"},{"li":"天气模块"},]
        },
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
</style>