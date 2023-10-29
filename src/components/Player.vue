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
        // position: fixed;
        // bottom: 100px;
        // left: 0;
        z-index: 999;
        max-width: 100%;

        /deep/ .aplayer-fixed {
            max-width: 650px;
            border-radius: 0 7px 0 0;
            overflow: hidden;
            .aplayer-body {
                // background-color: rgba(0, 125, 184, 0.4);
                // backdrop-filter: blur(3px);
                background-color: #e0e5ec;
                color: darken(#7e8a98, 10%);
                // box-shadow:  0px 0px 15px 5px #a3b1c6a8;
                border: 0;
                margin: 0;
                // max-width: 100%;
                max-width: 650px;
                box-sizing: content-box;
                padding-right: 0;
                width: 100%;
                height: auto;
                border-radius: 0 7px 0 0;

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
                    color: darken(#7e8a98, 10%);
                }
                .aplayer-author {
                    color: #7e8a98;
                }
                @media screen and (max-width: 500px) {
                    .aplayer-title {
                        max-width: 85px;
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
                        width: 560px;
                        padding: 0;
                        top: -7px;
                        left: 57px;

                        .aplayer-played {
                            background-color: #7e8a98 !important;
                        }
                    }
                    @media screen and (max-width: 500px) {
                        .aplayer-bar-wrap {
                        width: 85%;
                        left: 48px;
                    }
                    }
                    .aaa {
                        padding: 5px;
                        border-radius: 30px;
                        color: #7e8a98;
                        outline: none;
                        cursor: pointer;
                        box-shadow: -5px -5px 15px 0px #ffffff9e, 5px 5px 15px 0px #a3b1c6a8;
                        background: #e0e5ec;
                        border-radius: 2em;
                        border: 0;

                        path {
                            fill: #7e8a98;
                        }
                    }
                    .aplayer-time {
                        min-width: 30%;
                        position: static;
                        height: 100%;
                        width: 100%;
                        color: #7e8a98;
                        .aplayer-icon-back {
                            position: absolute;
                            left: 43%;
                            .aaa;
                        }

                        .aplayer-icon-play {
                            left: 52%;
                            width: 30px !important;
                            height: 30px !important;
                            bottom: 13px !important;
                            .aaa;
                        }

                        .aplayer-icon-forward {
                            left: 63%;
                            .aaa;
                        }

                        .aplayer-icon-menu {
                            position: absolute;
                            right: 0%;
                            bottom: 20px !important;
                        }

                        @media screen and (max-width: 500px) {
                            .aplayer-time-inner {
                                left: 51px !important;
                            }
                            .aplayer-icon-back {
                                left: 48%;
                            }
                            .aplayer-icon-play {
                                left: 60%;
                            }
                            .aplayer-icon-forward {
                                left: 75%;
                            }
                            .aplayer-icon-menu {
                                right: 0%;
                                path {
                                    fill: #7e8a98;
                                }
                            }

                            .aplayer-icon-loop {
                                right: 16% !important;
                                display: none;
                            }

                            .aplayer-icon-order {
                                right: 5% !important;
                                display: none;
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

                            // &:hover {
                            //     path {
                            //         fill: #c20c0c;
                            //     }
                            // }
                        }

                        .aplayer-volume-bar-wrap {
                            right: 0;

                            .aplayer-volume {
                                width: 6px;
                            }
                        }

                        .aplayer-volume-wrap {
                            right: 15%;
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
                            right: 5%;
                            bottom: 20px !important;
                            position: absolute;
                        }

                        .aplayer-icon-loop {
                            position: absolute;
                            width: 20px;
                            height: 20px;
                            right: 10%;
                            bottom: 20px !important;
                        }

                        .aplayer-icon {
                            margin-left: 10px !important;
                            margin-right: 10px;
                            bottom: 17px;
                            path {
                                fill: #7e8a98;
                            }
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
                border-radius: 0 7px 0 0;
                border: none;

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
