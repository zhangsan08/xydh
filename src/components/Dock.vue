<template>
    <div id="dockContainer" :class="activeKey === 'home' ? 'dockNoBg' : 'dockHaveBg'">
        <div v-for="dockItem in dockData" :key="dockItem.key" @click="dockClick(dockItem.key)" class="dockItem">
            <div class="title">{{ dockItem.title }}</div>
            <a href="#"><img :src="dockItem.imgSrc" /></a>
            <!-- <div class="drop" v-if="activeKey === dockItem.key"></div> -->
        </div>
    </div>
</template>
<script>
export default {
    name: 'Dock',
    data() {
        return {
            dockData: [
                {
                    title: '首页',
                    key: 'home',
                    imgSrc: require(`@/assets/dockIcon/home.txt`),
                },
                {
                    title: '网址集',
                    key: 'site',
                    imgSrc: require(`@/assets/dockIcon/siteIcon.txt`),
                },
                {
                    title: '搜索',
                    key: 'search',
                    imgSrc: require(`@/assets/dockIcon/searchIcon.txt`),
                },
                {
                    title: '水帘洞',
                    key: 'site2',
                    imgSrc: 'https://pic.rmb.bdstatic.com/a8ca2a4481936ec697a4cf5b25922dd4.png',
                },
                {
                    title: '月光宝盒',
                    imgSrc: 'https://pic.rmb.bdstatic.com/6ab1dd211f866ff2d0a869d4ee7b2597.png',
                },
                {
                    title: '设置',
                    key: 'setting',
                    imgSrc: require(`@/assets/dockIcon/setting.txt`),
                },
            ],
            activeKey: 'home',
        };
    },
    methods: {
        dockClick(key) {
            this.activeKey = key;
            this.$emit('dock-click', key);
        },
    },
};
</script>
<style scoped lang="less">
    #dockContainer {
        position: fixed;
        bottom: 30px;
        text-align: center;
        z-index: 20;
        text-align: center;
        margin: 0 auto;
        display: flex;
        align-content: center;
        justify-content: space-between;
        padding: 8px;
        left: 50%;
        transform: translateX(-50%);
    }
    #dockContainer img {
        width: 50px;
        height: 50px;
    }

    .dockHaveBg {
        background: rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(3px);
        border-radius: 22px;
    }
    .dockNoBg {
        img {
            -webkit-box-reflect: below 2px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.5, transparent), to(rgba(255, 255, 255, 0.5)));
            -webkit-transition: all 0.3s;
            -webkit-transform-origin: 40% 70%;
        }
    }
    #dockContainer .dockItem {
        list-style-type: none;
        display: inline-block;
        position: relative;
        margin-right: 10px;
        &:nth-last-child(1) {
            margin-right: 0;
        }
        position: relative;
        .drop {
            position: absolute;
            width: 3px;
            height: 3px;
            background: #fff;
            border-radius: 50%;
            left: 50%;
            bottom: 0.5px;
            transform: translateX(-50%);
        }
    }

    #dockContainer .dockItem .title {
        display: none;
        position: absolute;
        bottom: 65px;
        left: 50%;
        background: rgba(255, 255, 255, 0.7);
        padding: 4px 0;
        border-radius: 7px;
        padding: 5px 10px;
        transform: translateX(-50%);
        white-space: nowrap;
    }

    #dockContainer .dockItem:hover .title {
        display: block;
        color: #000;
        width: auto;
    }
</style>
