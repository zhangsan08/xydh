<template>
    <div class="header">
        <div  v-if="1">
            <div class="weather" id="he-plugin-simple"></div>
            <div style="text-align: right" class="headerbtns">
                <a class="headerbtn" href="/hgs" target="_blank">花果山 <i class="fa fa-sort-alpha-asc"></i></a>
                <a class="headerbtn" href="/sldt" target="_blank">水帘洞天 <i class="fa fa-external-link"></i></a>
                <a class="headerbtn" @click="getRandomUser">月光宝盒 <i class="fa fa-random"></i></a>
                <a class="headerbtn" @click="visible = true" >打开后台 <i class="fa fa-cog"></i></a>
                <Setting @setting-close="visible = false" :visible="visible"/>
            </div>
        </div>
        <div v-else>
            <Setting />
        </div>
        <RandomUserLoading v-if="randomUserLoadingShow" />
    </div>
</template>

<script>
import {userService} from '@/common/api';
import Setting from '@/components/Setting';
import RandomUserLoading from '@/components/RandomUserLoading';

export default {
    components: {
        Setting,
        RandomUserLoading,
    },
    data() {
        return {
            drawer: false,
            randomUserLoadingShow: false,
            visible: false
        };
    },
    methods: {
        logout() {
            userService.UserLogout({noQs: false});
            location.reload();
        },
        getRandomUser() {
            this.randomUserLoadingShow = true;
            // 判断登录状态,若登录则取出当前userID和userName
            userService.UserRandom().then(res => {
                this.retCode = res.code;
                if (this.retCode > 0) {
                    this.getRandomUser();
                } else {
                    window.open(`/${res.data.name}`, '_blank');
                    this.randomUserLoadingShow = false;
                }
            });
        },
    },
};
</script>

<style scoped lang="less">
    .header {
        padding: 10px 10px;
    }

    .headerbtn {
        margin: 5px;
        cursor: pointer;
    }

    .el-dropdown {
        color: inherit;
        cursor: pointer;
    }

    .dropdownMenu {
        text-align: left;
        width: 160px;
    }
</style>
