<template>
    <IModal :visible="visible" :title="foldersInfo.name" @close="close">
        <div class="moreLinkMoalContent">
            <div v-for="item in foldersInfo.links" :key="item.id" class="expandModalLink" @click="openLink(item.url)">
                <div class="item">
                    <div class="icon">
                        <i :class="'fa fa-' + item.icon" v-if="item.icon"></i>
                        <i :class="'fa fa-bookmark-o'" v-else></i>
                    </div>
                    <div class="content">
                        <h3 class="title">
                            {{ item.name }}
                        </h3>
                        <h4 class="tips">
                            {{ item.info }}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    </IModal>
</template>
<script>
import IModal from '@/components/IModal.vue';
export default {
    name: 'MoreLinkModal',
    components: {
        IModal,
    },
    props: {
        foldersInfo: {
            type: Object,
            required: true,
        },
        visible: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {};
    },

    methods: {
        openLink(link) {
            window.open(link, '_blank');
        },
        close() {
            this.$emit('close-click');
        },
    },
};
</script>
<style scoped lang="less">
    .moreLinkMoalContent {
        display: grid;
        justify-content: center;
        grid-gap: 15px;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-template-rows: min-content min-content min-content min-content min-content;
        cursor: pointer;
        margin: 7px;

        .expandModalLink {
            height: 70px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            border-radius: 10px;
            border: 1px solid #fff;
            background-color: rgba(255, 255, 255, 0.7);
            // box-shadow: 0 12px 18px 2px rgba(204, 204, 204, 0.17);
            position: relative;
            padding: 10px 10px;
            text-align: left;
            .item {
                display: flex;
                align-items: center;
                position: relative;
                z-index: 2;
                .icon {
                    border: 1px solid #fff;
                    border-radius: 25px;
                    width: 40px;
                    height: 40px;
                    font-size: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 10px;
                }
                .content {
                    flex: 1;
                    width: 0;
                    .title {
                        color: #282c33;
                        font-size: 17px;
                        font-weight: 500;
                    }
                    .tips {
                        margin: 0;
                        color: #848b99;
                        font-size: 13px;
                        font-weight: normal;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                }
            }

            transition: transform 0.3s ease-out;
            &:hover {
                transition: transform 0.3s ease-out;
                border: 1px solid #1890ff;
                box-shadow: 0 5px 10px #1890ffb3;
                .title,
                .tips {
                    color: #fff !important;
                }
            }
            &:before {
                position: absolute;
                z-index: 1;
                border-radius: 8px;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background: #1890ff !important;
                content: '';
                transition-timing-function: ease-out;
                transition-duration: 0.3s;
                transition-property: transform;
                transform: scale(0);
            }
            &:hover:before {
                transform: scale(1);
            }
        }
    }
</style>
