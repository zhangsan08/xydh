<template>
    <div class="header">
        <!-- 天气 -->
        <div class="weather" id="he-plugin-simple"></div>
        <div style="text-align: right" class="headerbtns">
            <a
                class="headerbtn"
                href="/hgs"
                target="_blank"
            >花果山 <i class="fa fa-sort-alpha-asc"></i></a>
            <a
                class="headerbtn"
                href="/sldt"
                target="_blank"
            >水帘洞天 <i class="fa fa-external-link"></i></a>
            <a
                class="headerbtn"
                href="/u/rand"
                target="_blank"
            >月光宝盒 <i class="fa fa-random"></i></a>
            <el-dropdown :hide-on-click="false">
                <span style="color: inherit"> 自定义<i class="fa fa-cog"></i> </span>
                <el-dropdown-menu slot="dropdown" class="dropdownMenu">
                    <el-dropdown-item>
                        <i class="fa fa-user-circle-o"></i><a
                            class="headerbtn"
                            href="https://xydh.fun/me"
                            target="_blank"
                        >打开后台</a></el-dropdown-item>
                    <el-dropdown-item>
                        <i class="fa fa-reply-all"></i>
                        <span
                            class="headerbtn"
                            @click="onChangeHis()"
                        > 足迹开关</span></el-dropdown-item>
                    <el-dropdown-item>
                        <i class="fa fa-anchor"></i>
                        <span
                            class="headerbtn"
                            @click="onChangeNav()"
                        > 书签开关</span></el-dropdown-item>
                    <el-dropdown-item>
                        <i class="fa fa-power-off"></i>
                        <span
                            class="headerbtn"
                            @click="logout()"
                        > 退出登录</span></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="paomadeng">
            <el-carousel
                indicator-position="none"
                arrow="always"
                direction="vertical"
                height="25px"
            >
                <!-- <el-carousel-item>
                公告
            </el-carousel-item> -->
                <el-carousel-item v-for="item in data" :key="item.name">
                    {{ item.name }}
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
import { userService } from "@/common/api";

export default {
    props: ["historySwitch", "navSwitch"],
    data() {
        return {
            data: [
                // {"name":"留言板添加方法见上午8点炫技巧推文"},
            ],
        };
    },
    methods: {
        onChangeHis() {
            this.$parent.switchHistory();
        },
        onChangeNav() {
            this.$parent.switchNav();
        },
        logout() {
            userService.UserLogout({ noQs: false });
            location.reload();
        },
    },
};
</script>

<style scoped>
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
