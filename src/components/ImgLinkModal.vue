<template>
    <IModal :visible="visible" :title="imgLinkInfo.name" @close="close">
        <div class="imgLinkModal">
            <img :src="imgLinkInfo.url" alt="" />
        </div>
    </IModal>
</template>
<script>
import IModal from '@/components/IModal.vue';
export default {
    name: 'ImgLinkModal',
    components: {
        IModal,
    },
    props: {
        imgLinkInfo: {
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
    .imgLinkModal {
        cursor: pointer;
        height: 100%;
        img {
            width: 100%;
        }
    }
</style>
