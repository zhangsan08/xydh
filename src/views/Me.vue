<template>
  <div class="me">
    <el-dialog
      :visible.sync="dialogIconVisible"
      title="选择Icon"
      append-to-body
    >
      <ICON @callback="chooseCallback"></ICON>
    </el-dialog>

    <el-tabs type="border-card" :stretch="true">
      <el-tab-pane label="欢迎">
        <el-card shadow="hover" class="card">
          临时书签 放入文件夹后才可展示到导航站
          <el-table :data="tempLinks" height="360" stripe>
            <el-table-column label="名称" min-width="160">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.name"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="文件夹" min-width="130">
              <template slot-scope="scope">
                <el-select v-model="scope.row.fid">
                  <el-option
                    v-for="Folder in Folders"
                    :key="Folder.id"
                    :label="Folder.name"
                    :value="Folder.id"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="链接" min-width="160">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.url"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="图标" width="80">
              <template slot-scope="scope">
                <el-row>
                  <el-input type="text" v-model="scope.row.icon"></el-input>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="" width="60">
              <template slot-scope="scope">
                <el-row>
                  <el-button
                    title="选择图标"
                    style="max-width: 40px"
                    @click="iconHandle(scope.row)"
                  >
                    <i
                      :class="'fa fa-' + scope.row.icon"
                      v-if="scope.row.icon"
                    ></i>
                    <i :class="'fa fa-hand-pointer-o'" v-else></i>
                  </el-button>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="简介" min-width="180">
              <template slot-scope="scope">
                <el-input
                  type="textarea"
                  v-model="scope.row.info"
                  placeholder="鼠标放上时的提示语(可为空)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="150"
            >
              <template slot-scope="scope">
                <el-button-group>
                  <el-button
                    title="打开书签"
                    size="small"
                    type="success"
                    icon="el-icon-view"
                    @click="openLink(scope.row.url)"
                  ></el-button>
                  <el-button
                    title="确认编辑"
                    size="small"
                    type="primary"
                    icon="el-icon-edit"
                    @click="updateLink(scope.row)"
                  ></el-button>
                  <el-button
                    title="删除书签"
                    size="small"
                    type="danger"
                    icon="el-icon-delete"
                    @click="deleteLink(scope.row)"
                  ></el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-row>
          <el-col :xs="24" :sm="12">
            <el-card header="您的专属链接" shadow="hover" class="card">
              <i class="fa fa-link"></i>&#160;
              <el-link
                style="font-size: 24px"
                type="primary"
                target="_blank"
                :href="'https://xydh.fun/' + username"
                >{{ username }}.xydh.fun</el-link
              >
              <div style="font-size: 17px">
                <p>
                  直接在浏览器地址栏输入，
                  <b>无需加http的前缀</b>
                  <br />访问此链接无需登录，欢迎分享给你的朋友
                </p>
                <p>
                  <a
                    target="_blank"
                    rel="nofollow"
                    href="https://support.qq.com/products/106426/faqs/63457"
                    >关于如何让你的页面被搜索引擎收录</a
                  >
                </p>
                <p>请关注官方公众号 炫技巧 获取最新导航站资讯</p>
                <el-button type="" @click="logout" round="">登出</el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-card header="快捷添加书签" shadow="hover" class="card">
              <div v-if="showjscode">
                <div style="height: 10px"></div>
                使用方法一：<a :href="jscode">快捷添加书签</a>
                拖住左边这几蓝字放到你的浏览器书签栏<br />
                <el-popover placement="left" width="400" trigger="click">
                  <img
                    src="https://pic.downk.cc/item/5f5cd8e3160a154a67336afe.gif"
                    alt=""
                  />
                  <el-button slot="reference">如图所示</el-button>
                </el-popover>
                然后看到你想收藏的网站时，只需要点击它
                <div style="height: 10px"></div>
                方法二：手动复制下面这个代码到你的书签栏
                <el-input type="textarea" rows="2" v-model="jscode"></el-input>
                <div style="height: 10px"></div>
                <el-link
                  target="_blank"
                  rel="nofollow"
                  href="https://www.yuque.com/xydh/start/ky664n"
                  >方法二详细说明请点我查看</el-link
                ><br />
                <el-link
                  target="_blank"
                  rel="nofollow"
                  href="https://www.yuque.com/xydh/start/qgztd3"
                  >手机端玩法(iOS安卓均支持)</el-link
                >
              </div>
              <div v-else>
                <el-button type="" round="" @click="getJsToken()"
                  >点击生成快捷添加书签秘钥</el-button
                >
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-card header="添加书签" shadow="hover" class="card">
              <el-row type="flex" justify="center">
                <el-col :span="8">名称</el-col>
                <el-col :span="16">链接</el-col>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="8">
                  <el-input
                    type="text"
                    v-model="linkform.name"
                    minlength="0"
                    maxlength="12"
                    placeholder="0-8字/过长不好看"
                  ></el-input>
                </el-col>
                <el-col :span="16">
                  <el-input
                    type="text"
                    v-model="linkform.url"
                    minlength="0"
                    maxlength="100"
                    placeholder="http开头"
                  ></el-input>
                </el-col>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="6">图标</el-col>
                <el-col :span="10">介绍</el-col>
                <el-col :span="4">文件夹</el-col>
                <el-col :span="4"></el-col>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="4">
                  <el-input
                    type="text"
                    v-model="linkform.icon"
                    placeholder="可为空"
                  ></el-input>
                </el-col>
                <el-col :span="2">
                  <el-button
                    title="选择图标"
                    style="width: 40px"
                    id="bookmarks"
                    @click="iconHandle(linkform)"
                  >
                    <i
                      :class="'fa fa-' + linkform.icon"
                      v-if="linkform.icon"
                    ></i>
                    <i :class="'fa fa-hand-pointer-o'" v-else></i>
                  </el-button>
                </el-col>
                <el-col :span="10">
                  <el-input
                    type="text"
                    v-model="linkform.info"
                    minlength="0"
                    maxlength="30"
                    placeholder="鼠标放上时的提示语(可为空)"
                  >
                  </el-input>
                </el-col>
                <el-col :span="4">
                  <el-select v-model="linkform.fid">
                      <el-option
                      v-for="Folder in Folders"
                      :key="Folder.id"
                      :label="Folder.name"
                      :value="Folder.id"
                      ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <el-button
                    title="添加书签"
                    size="small"
                    type="success"
                    icon="el-icon-plus"
                    @click="createLink()"
                    circle
                  ></el-button>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>

        <Notice :username="username" v-if="userID != 7163"></Notice>
        <div v-else>
          该账号为测试账号。仅用于展示后台功能。使用上有多处限制。
        </div>
      </el-tab-pane>

      <el-tab-pane label="导航配置">
        <SiteSet :userID="userID" :isVIP="isVIP"></SiteSet>
      </el-tab-pane>

      <el-tab-pane label="文件夹" :lazy="false">
        <FolderSet :userID="userID" @chooseIcon="iconHandle"></FolderSet>
      </el-tab-pane>

      <el-tab-pane label="书签管理" :lazy="false">
        <LinkSet :userID="userID" @chooseIcon="iconHandle"></LinkSet>
      </el-tab-pane>

      <el-tab-pane label="进阶功能" lazy>
        <Lab></Lab>
      </el-tab-pane>

      <el-tab-pane label="账户" v-if="userID != 7163" lazy>
        <Other></Other>
      </el-tab-pane>
    </el-tabs>

    <el-divider>⚠️警告</el-divider>
    <!-- <p style="color:red;font-weight:bolder;">为了炫猿长久地发展，请勿上传涉政涉黄涉黑等违法犯罪网站。发现一条永久封号。</p> -->
    使用本站的服务即同意<a
      target="_blank"
      rel="nofollow"
      href="https://support.qq.com/products/106426/blog/11015"
      >法律与免责声明</a
    >
    <el-divider></el-divider>
    <!-- 跑马灯 -->
    <el-col :span="24">
      <Paomadeng></Paomadeng>
    </el-col>
  </div>
</template>

<script>
import { userService, folderService, linkService } from "@/common/api";
// import * as UserAPI from '@/api/user/'
import Notice from "./Notice";
import SiteSet from "./SiteSet";
import FolderSet from "./FolderSet";
import LinkSet from "./LinkSet";
import Lab from "./ConsoleLab";
import Other from "./Other";
import Paomadeng from "@/components/Paomadeng.vue";
import ICON from "@/components/icon.vue";
import iconModule from "@/plugins/icon";

export default {
  mixins: [iconModule],
  data() {
    return {
      userID: 0,
      username: "未登录",
      isVIP: false,
      LoginCode: -1,
      JsToken: "xxxxxxxx",
      jscode: "***** 秘钥关联用户 请勿外传",
      showjscode: false,
      Folders: [],
      linkform: {
        fid: "",
        icon: "",
        name: "",
        url: "",
        info: "",
      },
      tempLinks: [],
    };
  },
  methods: {
    getUser() {
      // 判断登录状态,若登录则取出当前userID和userName
      userService.UserMe().then((res) => {
        this.LoginCode = res.code;
        if (this.LoginCode > 0) {
          this.$message({
            message: "请登录",
            center: true,
            showClose: true,
            type: "warning",
          });
          this.$router.push({ name: "ULogin" });
        } else {
          if (res.data.level < 0) {
            this.$alert(
              "网络不是不法之地！请珍惜您的账号,账号申诉请联系邮箱 xuanyuandaohang@126.com 上传了非法网站的就不要申诉了",
              "该账号传播违法信息已被封禁",
              {
                confirmButtonText: "回主页",
                callback: () => {
                  this.logout();
                  window.location.href = "https://xydh.fun";
                },
              }
            );
            return;
          }
          if (res.data.level == 0) {
            this.$alert(
              "请在删除违规书签后联系邮箱 xuanyuandaohang@126.com 申请解封",
              "你的书签存在违规",
              {
                // confirmButtonText: '回主页',
                callback: () => {},
              }
            );
          }
          this.userID = res.data.id;
          this.username = res.data.name;
          this.isVIP = res.data.is_vip;
          this.getFolder();
        }
      });
    },
    logout() {
      userService.UserLogout({ noQs: false });
      this.$alert("", "注销成功", {
        type: "success",
        callback: () => {
          this.$router.push({ name: "Home" });
        },
      });
    },
    getFolder() {
      folderService.getMyFolders().then((res) => {
        this.Folders = res.data;
        var x = {
          id: 0,
          name: "选择文件夹",
        };
        this.Folders.push(x);
      });
    },
    createLink() {
      linkService
        .createLink(this.linkform)
        .then((res) => {
          if (res.code > 0) {
            this.$notify.error({
              title: "添加失败",
              message: res.msg,
            });
          } else {
            this.$notify({
              title: "添加成功!",
              type: "success",
              duration: "800",
            });
          }
        })
        .catch((error) => {
          this.$notify.error({
            title: "错误 请检查",
            message: error,
          });
        });
    },
    getJsToken() {
      userService.JsToken().then((res) => {
        this.JsToken = res.data;
        this.jscode =
          "javascript:window.open('http://xydh.fun/api/v1/jsadd?token=" +
          this.JsToken +
          "&name='+document.title+'&url='+decodeURIComponent(location.href));void(0);";
      });
      this.showjscode = true;
    },
    getTempLinks() {
      linkService.getTempLinks().then((res) => {
        this.tempLinks = res.data;
      });
    },
    openLink(link) {
      window.open(link, "_blank");
    },
    updateLink(link) {
      //传入folderID仅仅是为了更新后刷新列表
      var form = {
        id: link.id,
        fid: link.fid,
        icon: link.icon,
        name: link.name,
        url: link.url,
        info: link.info,
      };
      linkService
        .updateLink(form)
        .then((res) => {
          if (res.code > 0) {
            this.$notify.error({
              title: "更新失败",
              message: res.msg,
            });
          } else {
            // 刷新列表
            this.getTempLinks();
            this.$notify({
              title: "更新成功!",
              type: "success",
              duration: "800",
            });
          }
        })
        .catch((error) => {
          this.$notify.error({
            title: "错误 请检查",
            message: error,
          });
        });
    },
    deleteLink(link) {
      var form = { id: link.id };
      linkService
        .deleteLink(form)
        .then((res) => {
          if (res.code > 0) {
            this.$notify.error({
              title: "删除失败",
              message: res.msg,
            });
          } else {
            this.$notify({
              title: "删除成功!",
              type: "success",
              duration: "800",
            });
            this.getTempLinks();
          }
        })
        .catch((error) => {
          this.$notify.error({
            title: "错误 请检查",
            message: error,
          });
        });
    },
  },
  components: {
    Notice,
    SiteSet,
    FolderSet,
    LinkSet,
    Lab,
    Other,
    Paomadeng,
    ICON,
  },
  beforeMount() {
    document.title = "炫猿控制台";
    this.getUser();
    this.getTempLinks();
  },
};
</script>

<style scoped>
.me {
  /* min-width: 800px; */
  max-width: 1680px;
  margin: 0 auto;
  text-align: center;
  font-size: 17px;
}
.card {
  margin: 10px 10px;
}
.el-button i {
  transform: translateX(-6px);
}
</style>