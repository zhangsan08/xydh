<template>
    <IModal :visible="visible" :title="gameData.name" @close="close">
        <div class="extendModal">
            <div v-if="gameData.type==='iframe'" class="iframe">
                <iframe class="iframe" :src="gameData.path" :key="gameData.name" />
            </div >
            <div ref="htmlContainer" v-if="gameData.type==='builtIn'"></div>
        </div>
    </IModal>
</template>
<script>
import IModal from '@/components/IModal.vue';
export default {
    name: 'ExtendModal',
    components: {
        IModal,
    },
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        gameData: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            htmlContent: '', // 存储HTML内容的变量
        };
    },
    watch: {
    // 监听gameData属性
        visible: {
            deep: true, // 深度监听，用于对象内部值的变化
            handler(newVal, oldVal) {
                // newVal是新值，oldVal是旧值
                if (newVal && this.gameData.type === 'builtIn') {
                    this.fetchAndInsertHtml();
                }
            }
        }
    },
    methods: {
        fetchAndInsertHtml() {
            if (this.gameData.type === 'builtIn') {
                fetch(`/html/${this.gameData.path}.html`)
                    .then(response => response.text())
                    .then(html => {
                        this.insertHtmlAndExecuteScripts(html);
                    })
                    .catch(error => {
                        console.error('Error fetching HTML:', error);
                    });
            }
        },
        insertHtmlAndExecuteScripts(html) {
            const container = this.$refs.htmlContainer;
            container.innerHTML = html;
            Array.from(container.querySelectorAll('script')).forEach((oldScript) => {
                const newScript = document.createElement('script');
                if (oldScript.src) {
                    newScript.src = oldScript.src;
                } else {
                    newScript.textContent = oldScript.textContent;
                }
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
        },
        close() {
            this.$emit('close-click');
        },
    },
};
</script>
<style scoped lang="less">
.extendModal{
    height: 100%;
    .iframe{
        height: 100%;
    }
}
 iframe {
        width: 100%;
        height: 100%;
        // transform-origin: left top;
        border: 1px solid rgba(227, 227, 227, 1);
        border-radius: 6px;
    }
</style>
