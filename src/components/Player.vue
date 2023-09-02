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
                // background-color: rgba(0, 125, 184, 0.4);
                // backdrop-filter: blur(3px);
                background-color: #fff;
                margin: 0;
                max-width: 100%;
                box-sizing: content-box;
                padding-right: 0;
                width: 100%;
                height: auto;

                .aplayer-pic {
                    height: 50px;
                    width: 50px;
                    border-radius: 7px;
                    margin-top: 5px;
                    margin-left: 5px;
                    margin-bottom: 5px;
                    z-index: 2;
                }

                .aplayer-info {
                    border: none !important;
                    position: relative;
                    margin: 0;
                    height: auto;
                    padding: 9px 7px 0 10px;

                    .aplayer-music {
                        position: absolute;
                        text-align: left;
                        width: auto;
                        left: 66px;
                        display: flex;
                        align-items: center;
                    }

                    @media screen and (max-width: 500px) {
                        .aplayer-music {
                            left: 55px !important;
                        }
                    }
                }

                .aplayer-title {
                    color: #000;
                }

                @media screen and (max-width: 500px) {
                    .aplayer-title {
                        max-width: 75px;
                        display: inline-block;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .aplayer-author {
                        max-width: 50px;
                        display: inline-block;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }

                .aplayer-controller {
                    width: 100%;

                    .aplayer-bar-wrap {
                        position: absolute;
                        width: 100vw;
                        bottom: 60px;
                        left: -15px;
                        padding: 0;

                        .aplayer-played {
                            background-color: #c20c0c !important;
                        }
                    }

                    .aplayer-time {
                        min-width: 30%;
                        position: static;
                        height: 100%;
                        width: 100%;

                        .aplayer-icon-back {
                            position: absolute;
                            left: 42%;

                            path {
                                fill: #c20c0c;
                            }
                        }

                        .aplayer-icon-play {
                            left: 48%;
                            width: 35px !important;
                            height: 35px !important;
                            bottom: 13px !important;

                            path {
                                fill: #c20c0c;
                            }
                        }

                        .aplayer-icon-forward {
                            left: 55%;

                            path {
                                fill: #c20c0c;
                            }
                        }

                        .aplayer-icon-menu {
                            position: absolute;
                            right: 5%;
                        }

                        @media screen and (max-width: 500px) {
                            .aplayer-time-inner {
                                left: 51px !important;
                            }

                            .aplayer-icon-play {
                                left: 48%;
                            }

                            .aplayer-icon-menu {
                                right: 0%;
                            }

                            .aplayer-icon-loop {
                                right: 16% !important;
                            }

                            .aplayer-icon-order {
                                right: 8% !important;
                            }
                        }

                        .aplayer-time-inner {
                            font-size: 14px;
                            min-width: 100px;
                            position: absolute;
                            left: 61px;
                            bottom: 12px;
                            text-align: left;
                        }

                        .aplayer-icon {
                            width: 20px;
                            height: 20px;

                            &:hover {
                                path {
                                    fill: #c20c0c;
                                }
                            }
                        }

                        .aplayer-volume-bar-wrap {
                            right: 0;

                            .aplayer-volume {
                                width: 6px;
                            }
                        }

                        .aplayer-volume-wrap {
                            right: 20%;
                            bottom: 20px;
                            position: absolute;

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

                        .aplayer-icon-order {
                            right: 10%;
                            position: absolute;
                        }

                        .aplayer-icon-loop {
                            position: absolute;
                            width: 20px;
                            height: 20px;
                            right: 15%;
                        }

                        .aplayer-icon {
                            margin-left: 10px !important;
                            margin-right: 10px;
                            bottom: 20px;
                        }
                    }
                }

                .aplayer-miniswitcher {
                    display: none;
                }
            }

            .aplayer-list {
                background: #fff;
                margin-bottom: 60px;

                .aplayer-list-index {
                    float: left;
                }

                .aplayer-list-title {
                    color: #666;
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
