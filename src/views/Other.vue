<template>
<div>
    <el-divider content-position="center">书签导入</el-divider>
    <el-divider content-position="center">开发ing</el-divider>
    <el-upload
        class="upload"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">导入书签，将Chrome浏览器导出的html文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">此功能未来开发</div>
    </el-upload>
    <el-divider content-position="center">密码修改</el-divider>
    <div>
        仅赞助1w元用户可改密码
        <el-divider content-position="center">我去这么狗血吗？</el-divider>
        <el-divider content-position="center">逗你的只是还懒得写代码</el-divider>
    </div>
</div>

</template>

<style scoped>
.upload {
	margin: 20px auto 50px;
}
</style>