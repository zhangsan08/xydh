<template>
    <div class="headerArea" >
        <div class="header">
            <div class="weather" id="he-plugin-simple"></div>
            <div v-if="isOpen">
                <div  class="settingArea">
                    <a class="headerbtn" href="/hgs" target="_blank">花果山 </a>
                    <!-- <a class="headerbtn" href="/sldt" target="_blank">水帘洞天 </a> -->
                    <a class="headerbtn" @click="getRandomUser">月光宝盒 </a>
                    <a class="headerbtn" @click="visible = true"><i class="fa fa-cog fa-spin"></i>设置<i class="fa fa-cog fa-spin"></i></a>
                </div>
            </div>
            <div v-else class="settingArea">
                <a class="settingIcon" @click="visible = true"><i class="el-icon-setting"></i></a>
            </div>
        </div>
        <Setting @setting-close="visible = false" :visible="visible" />
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
    props: {
        isOpen: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            drawer: false,
            randomUserLoadingShow: false,
            visible: false,
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
        height: 70px;
        z-index: 1;
        position: relative;
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
    .settingArea{
        text-align: right;
        line-height: 1.4;
        cursor: pointer;
    }
    /deep/.module{
        color: inherit !important;
    }
    .settingIcon{
        font-size:20px;
        padding-right: 20px;
        color: inherit;
    }
</style>
