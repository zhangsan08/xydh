<template>
    <transition name="IModal" >
        <div class="IModal" v-if="visible" @click="close">
            <div class="popInner" @click.stop :style="propsStyle">
                <div>
                    <h3 class="foldersTitle">
                        {{ title}}
                    </h3>
                </div>
                <img src="~@/assets/closeIcon.svg" alt="" class="close" @click="close"/>
                <div class="IModalContent">
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'IModal',
    props: {
        title: {
            default: ''
        },
        visible: {
            type: Boolean,
            required: true,
        },
        propsStyle: {
            default: ''
        },
    },
    watch: {
        visible(value) {
            if (value) {
                this.disableScroll();
            } else {
                this.enableScroll();
            }
        },
    },
    methods: {
        // 禁止滚动
        disableScroll() {
            var mo = function(e) {e.preventDefault();};
            document.body.style.overflow = 'hidden';
            document.addEventListener("touchmove", mo, false);// 禁止页面滑动
        },

        enableScroll() {
            var mo = function(e) {e.preventDefault();};
            document.body.style.overflow = '';// 出现滚动条
            document.removeEventListener("touchmove", mo, false);
        },
        openLink(link) {
            window.open(link, '_blank');
        },
        close() {
            this.$emit('close');
        },
    },
};
</script>
<style scoped lang="less">
    .IModal {
        position: fixed;
        top: 0;
        left: 0;
        margin: auto;
        width: 100%;
        height: 100%;
        background-color: #00000080;
        backdrop-filter: blur(20px);
        z-index: 9999;
        .IModalContent {
            overflow-y: scroll;
            width: 100%;
            height: 100%;
        }
        .popInner {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 76%;
            height: 500px;
            background-color: #ffffff66;
            border-radius: 6px;
            z-index: 999;
            padding: 15px;
            padding-top: 45px;
            .foldersTitle {
                position: absolute;
                top: 9px;
                left: 20px;
                font-size: 17px;
            }
            .close {
                position: absolute;
                top: 9px;
                right: 15px;
                width: 28px;
                height: 28px;
                display: block;
                &:hover {
                    transform: scale(1.2);
                }
                // &:active {
                //     transform: scale(0.95);
                // }
            }
        }
    }
    // 弹窗动画
    .IModal-enter-active,
    .IModal-leave-active {
        transition: opacity 0.3s;
    }

    .IModal-enter,
    .IModal-leave-to {
        opacity: 0;
    }

</style>
