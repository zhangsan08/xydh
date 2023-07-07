<template>
    <span :class="['amusic', musicIsMini ? 'musicIsMini' : 'musicIsNoMini']">
        <aplayer
            :audio="musicList"
            ref="aplayer"
            fixed
            :mini="musicIsMini"
            :listFolded="true"
            autoplay
        ></aplayer>
    </span>
</template>
<script>
export default {
    name: 'Player',
    components: {},
    props: {
        musicList: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            musicIsMini: true,
        };
    },
    beforeDestroy() {
        // 销毁组件前移除事件监听器
        const aplayer = this.$refs.aplayer.$el;
        aplayer.removeEventListener('mouseenter', this.handleMouseEnter);
        aplayer.removeEventListener('mouseleave', this.handleMouseLeave);
    },
    mounted() {
        this.$nextTick(() => {
            const aplayer = this.$refs.aplayer.$el;
            aplayer.addEventListener('mouseenter', this.handleMouseEnter);
            aplayer.addEventListener('mouseleave', this.handleMouseLeave);
        });
    },
    methods: {
        handleMouseEnter() {
            this.musicIsMini = false;
            clearTimeout(this.timeoutId); // 清除之前设置的定时器
        },
        handleMouseLeave() {
            this.timeoutId = setTimeout(() => {
                this.musicIsMini = true; // 鼠标移出后 1 秒钟
            }, 1000);
        },
    },
};
</script>
<style scoped lang="less">
    .amusic {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 999;
        max-width: 100%;
        /deep/ .aplayer-fixed {
            max-width: 100%;

            .aplayer-body {
                background-color: rgba(0, 125, 184, 0.4);
                backdrop-filter: blur(3px);
                margin: 0;
                max-width: 100%;
                box-sizing: content-box;
                .aplayer-pic {
                    height: 55px;
                    width: 55px;
                    border-radius: 7px;
                    margin-top: 5px;
                    margin-left: 5px;
                    margin-bottom: 5px;
                }
                .aplayer-info {
                    border: none !important;
                    .aplayer-music {
                        text-align: left;
                    }
                }
                .aplayer-title {
                    color: #fff;
                }

                .aplayer-controller {
                    height: 30px;
                    .aplayer-time {
                        min-width: 30%;
                        text-align: left;
                        .aplayer-icon-back {
                            left: 0;
                        }
                        .aplayer-icon-play {
                            left: 40px;
                        }
                        .aplayer-icon-forward {
                            left: 80px;
                        }
                        .aplayer-icon-menu {
                            left: 139px;
                        }
                        .aplayer-time-inner {
                            font-size: 14px;
                            min-width: 100px;
                        }
                        .aplayer-icon {
                            width: 20px;
                            height: 20px;
                        }
                        .aplayer-volume-wrap {
                            margin-left: 0px;
                            margin-right: 0px;
                            .aplayer-volume-bar-wrap:after {
                                background-color: transparent;
                                bottom: -20px;
                                height: 67px;
                            }
                            .aplayer-volume-bar {
                                bottom: 4px;
                                left: 17px;
                                width: 6px;
                            }
                        }
                        .aplayer-icon {
                            margin-left: 10px !important;
                            margin-right: 10px;
                        }
                    }
                }

                .aplayer-miniswitcher {
                    display: none;
                }
            }
            .aplayer-list {
                background: #fff;
                .aplayer-list-index {
                    float: left;
                }
            }
        }
    }
    .musicIsNoMini {
        width: 100%;
    }
    .musicIsMini {
        /deep/ .aplayer .aplayer-body {
            background-color: transparent;
            box-shadow: none;
        }
    }
</style>
