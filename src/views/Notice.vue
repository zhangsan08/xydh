<template>
    <div class="notice">
        <p>欢迎体验炫猿导航内测版</p>
        <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                正在开发<el-badge :value="2" class="item"></el-badge>
                </template>
                <li><el-checkbox>文件夹</el-checkbox></li>
                <li><el-checkbox>小图标</el-checkbox></li>
                <li><el-checkbox>聚合搜索框</el-checkbox></li>
                <li><el-checkbox>讨论模块</el-checkbox></li>
                <li><el-checkbox>线报模块</el-checkbox></li>
                <li><el-checkbox>书签导入</el-checkbox></li>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                v0.1 特性 -2020.03.10<el-badge :value="2" class="item"></el-badge>
                </template>
                <li>站点信息修改</li>
                <li>书签增删改</li>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        drawer: false,
        count: 0,
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