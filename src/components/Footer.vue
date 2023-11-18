<template>
    <div class="footer">
        友情链接
        <a
            target="_blank"
            rel="follow"
            :href="friendlyLink.url"
            v-for="friendlyLink in friendlyLinks"
            :key="friendlyLink.name"
        ><span class="line">|</span><span class="name">{{ friendlyLink.name }}</span></a>
    </div>
</template>
<script>
export default {
    data() {
        return {
            friendlyLinks: [
                {
                    name: '24k导航',
                    url: 'https://www.24kdh.net/',
                },
                {
                    name: '创造者日报',
                    url: 'https://creatorsdaily.com/',
                },
                {
                    name: 'ZYPlayer',
                    url: 'http://zyplayer.fun/',
                },
                {
                    name: '爱达杂货铺',
                    url: 'https://adzhp.cn/',
                },
                {
                    name: '咪咕鱼',
                    url: 'https://www.miguyu.com/?ext=xy',
                },
            ],
        };
    },
    methods: {},
};
</script>
<style lang="less">
    li {
        margin: 10px;
    }
    .footer {
        text-align: center;
        padding: 50px 0 30px 0;
        max-width: 80%;
        margin: 0 auto;
        cursor: pointer;
        .name {
            white-space: nowrap;
        }
        .line {
            margin: 0 5px;
        }
    }
</style>
