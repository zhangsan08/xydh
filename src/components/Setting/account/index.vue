<template>
    <div class="account">
        <div class="card">
            <a href="https://xydh.fun/me" class="felx" target="_blank">
                打开后台 <i class="el-icon-top-right"></i></a>
        </div>
        <div class="card">
            <a href="https://xydh.fun/u/login" class="felx" target="_blank">
                注册新账号 <i class="el-icon-top-right"></i></a>
        </div>
        <div class="card" @click="generateFile()">
            <div class="felx">
                导出书签到本地 </div>
        </div>
        <div class="accountTips">
            后台功能:
            <ul>
                <li>
                    生成个人专属导航，云端同步随时访问
                </li>
                <li>
                    设置主页标题、简介、背景、音乐
                </li>
                <li>
                    文件夹和书签的增删和排序
                </li>
                <li>
                    网站改名、书签文件夹扩容
                </li>
                <li>
                    浏览器书签导入、书签本地导出备份
                </li>
                <li>
                    克隆其他站长网站
                </li>
                <li>
                    订阅其他站长的书签实时同步
                </li>
            </ul>
        </div>

    </div>
</template>
<script>
export default {
    name: 'Account',
    props: {
        // visible: {
        //     type: Boolean,
        //     default: false,
        // },
    },
    data() {
        return {
            userNavInfo: this.$store.state.userNavInfo,
        };
    },

    mounted() {},
    methods: {
        generateFile() {
            this.$message({
                message: '已导出，请在下载里查看',
                type: 'success',
            });
            const {folder_with_links,site_info}=this.userNavInfo

            const listItems = folder_with_links.map(item => `<div>
                <h3>【${item.name}】</h3>
                 <div>${(item.links||[]).map((link) => `<a style="color: #000; margin-bottom: 10px; margin-right: 20px;display:inline-block" target="_blank" href="${link.url}">${link.name}</a>`).join('')}</div>
            </div>`).join('');
                    
            const htmlContent = `
                    <html>
                        <head>
                        <title>iLinks 数据导出</title>
                        <meta charset="utf-8">
                        </head>
                        <body>
                        <h1 style="text-align: center;">${site_info.name}</h1>
                        <p style="text-align: center;">${site_info.info}</p>
                        <ul>
                            ${listItems}
                        </ul>
                        <p style="text-align: center;">数据是每个用户宝贵的财富，您可以定期使用我们的数据导出能力，以在我们受到恶意攻击时仍然可以获取到您的书签。</p>
                        <p style="text-align: center;">请关注我们的公众号【炫技巧】防止失联</p>
                        </body>
                    </html>
                    `;
            // 创建一个 Blob 对象
            const blob = new Blob([htmlContent], { type: 'text/html' });
            // 使用 file-saver 保存 HTML 文件到本地
            const fileName = 'iLinks备份.html'; // 文件名
            saveAs(blob, fileName);
        }
    },
};
</script>

<style lang="less">
    @import './index.less';
    @import '../index.less';
</style>
