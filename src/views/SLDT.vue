<template>
<div class="sldt">
 123
 {{ links }}
</div>
</template>

<script>

import { sldLinkService } from '@/common/api'

export default {
    data() {
        return {
            links: [],
        }
    },
    methods: {
        getSldLinks(){
            sldLinkService.getLinks().then((res) =>{
                this.links = res.data
            })
        },
    },
    beforeMount(){
        this.getSldLinks()
    }
}
</script>

<style>
.hot_site {
    text-align: left;
    min-height: 300px;
}
.hot_item {
    margin: 10px;
}
.li-tab {
    float:left;
    cursor: pointer;
    line-height: 20px;
    margin: 10px;
}
.activeSite {
    font-size: 30px;
}
</style>