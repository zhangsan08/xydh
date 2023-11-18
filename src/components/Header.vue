<template>
    <div class="headerArea">
        <div class="header">
            <div class="weather" id="he-plugin-simple"></div>
            <div v-if="isOpen">
                <div class="settingArea">
                    <!-- <a class="headerbtn" href="/hgs" target="_blank">花果山 </a> -->
                    <!-- <a class="headerbtn" href="/sldt" target="_blank">水帘洞天 </a> -->
                    <!-- <a class="headerbtn" @click="getRandomUser">月光宝盒 </a>
                    <a class="headerbtn" @click="visible = true"><i class="fa fa-cog fa-spin"></i>设置<i class="fa fa-cog fa-spin"></i></a> -->
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="随机探索"
                        placement="bottom"
                    >
                        <i
                            class="el-icon-s-promotion settingIcon"
                            @click="getRandomUser"
                        ></i>
                    </el-tooltip>
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="花果山"
                        placement="bottom"
                    >
                        <a class=" settingIcon" href="/hgs" target="_blank">
                            <i class="el-icon-s-data " slot="reference"></i></a>
                    </el-tooltip>
                    <!-- <el-tooltip
                        class="item"
                        effect="dark"
                        content="登陆/注册"
                        placement="bottom"
                    >
                        <a class=" settingIcon" href="https://xydh.fun/me" target="_blank">
                            <i class="el-icon-user-solid" slot="reference"></i>
                        </a>
                    </el-tooltip> -->
                    <!-- <el-popover
                        title="您尚未登录"
                        width="200"
                        trigger="hover"
                        content="登录后可云端同步您的个性化设置，网站书签"
                        placement="bottom-start"
                    >
                        <i class="el-icon-user-solid settingIcon" slot="reference"></i>
                    </el-popover> -->
                    <a
                        class="settingIcon"
                        @click="visible = true"
                    ><i class="el-icon-s-tools"></i></a>
                </div>
            </div>
            <div v-else class="settingArea">
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="登陆/注册"
                    placement="bottom"
                >
                    <a class=" settingIcon" href="https://xydh.fun/me" target="_blank">
                        <i class="el-icon-user-solid" slot="reference"></i>
                    </a>
                </el-tooltip>
                <a
                    class="settingIcon"
                    @click="visible = true"
                ><i class="el-icon-s-tools"></i></a>
            </div>
        </div>
        <Setting @setting-close="visible = false" :visible="visible" />
        <RandomUserLoading v-if="randomUserLoadingShow" />
    </div>
</template>

<script>
import { userService } from "@/common/api";
import Setting from "@/components/Setting";
import RandomUserLoading from "@/components/RandomUserLoading";

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
            userService.UserLogout({ noQs: false });
            location.reload();
        },
        getRandomUser() {
            this.randomUserLoadingShow = true;
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
.settingArea {
  text-align: right;
  line-height: 2;
  cursor: pointer;
}
/deep/.module {
  color: inherit !important;
}
.settingIcon {
  font-size: 20px;
//   margin-right: 10px;
  padding: 10px;
  color: inherit;
}
</style>
