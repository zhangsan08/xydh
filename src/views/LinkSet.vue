<template>
  <div>
    <!-- 添加 -->
    隐私与法律免责声明: 炫猿会记录你的信息, 你所添加的每一个链接都将负法律责任
    <el-card header="添加书签" shadow="hover" class="card" :model="linkform">
      <el-row type="flex" justify="center">
        <el-col :span="8">名称</el-col>
        <el-col :span="16">链接</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="8"
          ><el-input
            type="text"
            v-model="linkform.name"
            minlength="0"
            maxlength="12"
            placeholder="0-8字/过长不好看"
          ></el-input
        ></el-col>
        <el-col :span="16"
          ><el-input
            type="text"
            v-model="linkform.url"
            minlength="0"
            maxlength="100"
            placeholder="http开头"
          ></el-input
        ></el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="6">图标</el-col>
        <el-col :span="10">介绍</el-col>
        <el-col :span="4">文件夹</el-col>
        <el-col :span="4">添加</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="4"
          ><el-input
            type="text"
            v-model="linkform.icon"
            placeholder="可为空"
          ></el-input
        ></el-col>
        <el-col :span="2">
          <el-button @click="iconHandleLink()" title="选择图标">
            <i :class="'fa fa-' + linkform.icon" v-if="linkform.icon"></i>
            <i :class="'fa fa-hand-pointer-o'" v-else></i>
          </el-button>
        </el-col>
        <el-col :span="10"
          ><el-input
            type="text"
            v-model="linkform.info"
            minlength="0"
            maxlength="30"
            placeholder="鼠标放上时的提示语(可为空)"
          ></el-input
        ></el-col>
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
            size="small"
            type="success"
            icon="el-icon-plus"
            @click="createLink()"
            circle
          ></el-button>
        </el-col>
      </el-row>
    </el-card>
    <div class="mainbox">
      <div
        v-for="Folder in showFolders"
        :key="Folder.id"
        :id="Folder.id"
        @click="getLinksin(Folder.id)"
      >
        <p v-if="Folder.icon">
          <i :class="'fa fa-' + Folder.icon"></i>{{ Folder.name }}
        </p>
        <p v-else>{{ Folder.name }}</p>
      </div>
      <span class="leftBtn" @click="changePage(0)">&lt;</span>
      <span class="rightBtn" @click="changePage(1)">&gt;</span>
    </div>
    <div class="bookmarkcard">
      <div class="marklist">
        <!-- 更删 -->
        <el-divider>更新书签</el-divider>
        <el-table :data="links" stripe>
          <el-table-column label="图标" width="80">
            <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.icon"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="" width="62">
            <template slot-scope="scope">
              <el-button
                style="width: 40px"
                title="选择图标"
                id="bookmarks"
                @click="iconHandleLink(scope.row)"
              >
                <i :class="'fa fa-' + scope.row.icon" v-if="scope.row.icon"></i>
                <i :class="'fa fa-hand-pointer-o'" v-else></i>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="名称" min-width="160">
            <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="链接" min-width="160">
            <template slot-scope="scope">
              <el-input type="text" v-model="scope.row.url"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="简介" min-width="180">
            <template slot-scope="scope">
              <el-input
                type="textarea"
                resize="none"
                v-model="scope.row.info"
                placeholder="鼠标放上时的提示语(可为空)"
              ></el-input>
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
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="160"
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
      </div>
    </div>
  </div>
</template>
<script>
// import * as FolderAPI from '@/api/folder/'
// import * as LinkAPI from '@/api/link/'

import { folderService, linkService } from "@/common/api";

export default {
  props: ["userID"],
  data() {
    return {
      loading: false,
      FolderID: "",
      uid: 0,
      Folders: [],
      rigthnowPage: 0,
      showFolders: [],
      links: [],
      linkform: {
        id: "",
        fid: "",
        icon: "",
        name: "",
        url: "",
        info: "",
      },
    };
  },
  methods: {
    getFolder() {
      folderService.getMyFolders().then((res) => {
        this.Folders = res.data;
        this.showFolders = this.Folders;
        this.Folders.sort(function (f1, f2) {
          return f1.weight - f2.weight; //weight
        });
      });
    },
    getLinksin(fid) {
      // 这样只在折页打开时执行
      // this.loading = true;
      // setTimeout(() => {
      // 	this.loading = false;
      // }, 500);
      this.aimDiv(fid);
      if (fid) {
        linkService.getLinksbyFolderID(fid).then((res) => {
          if (res.data) {
            this.links = res.data;
            this.links.sort(function (l1, l2) {
              return l2.weight - l1.weight; //weight
            });
          } else {
            this.links = [];
          }
        });
      } else {
        // 折页关闭
      }
    },
    createLink() {
      // this.linkform.fid = fid;
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
              message: "刷新列表",
              duration: "800",
            });
            this.linkform = {
              id: "",
              fid: "",
              icon: "",
              name: "",
              url: "",
              info: "",
            };
            this.getLinksin(this.linkform.fid);
          }
        })
        .catch((error) => {
          this.$notify.error({
            title: "错误 请检查",
            message: error,
          });
        });
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
            this.getLinksin(link.fid);
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
      this.linkform.fid = link.fid;
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
            this.getLinksin(link.fid);
          }
        })
        .catch((error) => {
          this.$notify.error({
            title: "错误 请检查",
            message: error,
          });
        });
    },
    openLink(link) {
      window.open(link, "_blank");
    },
    iconHandleLink(content) {
      if (content) {
        this.$emit("chooseIcon", content);
        return;
      }
      this.$emit("chooseIcon", this.linkform);
    },
    changePage(flag) {
      if (flag == 0) {
        this.rigthnowPage <= 0 ? "" : this.rigthnowPage--;
        this.showFolders = this.Folders.slice(
          this.rigthnowPage,
          this.rigthnowPage + 9
        );
      } else {
        this.rigthnowPage + 9 >= this.pageCount ? "" : this.rigthnowPage++;
        this.showFolders = this.Folders.slice(
          this.rigthnowPage,
          this.rigthnowPage + 9
        );
      }
    },
    aimDiv(id) {
      var divs = document.querySelector(".mainbox").querySelectorAll("div");
      Array.from(divs).filter(function (element) {
        element.className = "";
        if (element.id == id) {
          element.className = "aim";
        }
      });
    },
  },
  computed: {
    pageCount() {
      return this.Folders.length;
    },
  },
  components: {},
  // beforeMount() {
  // 	this.getUser()
  // },
  watch: {
    userID: function () {
      (this.uid = this.userID), this.getFolder();
    },
  },
};
</script>

<style scoped>
#bookmarks i i {
  transform: translateX(-6px);
}
.mainbox {
  display: flex;
  position: relative;
  align-items: center;
  height: 150px;
}
.mainbox div {
  box-sizing: border-box;
  min-width: 173px;
  height: 100px;
  line-height: 100px;
  transform: translate(0, 0);
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 0 5px;
  cursor: pointer;
  font-size: 20px;
  background-color: #fff;
  color: #ccc;
  margin: 0 5px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mainbox div:hover {
  border: 3px solid #000;
  background-color: #fff;
  font-size: 700;
  color: #000;
}
.mainbox .aim {
  border: 3px solid #000;
  background-color: #fff;
  color: #000;
  font-size: 700;
}
.mainbox .leftBtn {
  position: absolute;
  left: 0;
  top: middle;
  min-width: 40px;
  height: 100px;
  line-height: 100px;
  border-radius: 20px;
  margin: 0;
  margin-left: 5px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.1);
  border: 0;
}
.mainbox .leftBtn:hover {
  background: rgba(0, 0, 0, 0.3);
  border: 0;
}
.mainbox .rightBtn {
  position: absolute;
  right: 0;
  top: middle;
  min-width: 40px;
  height: 100px;
  line-height: 100px;
  border-radius: 20px;
  margin: 0;
  margin-right: 5px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.1);
  border: 0;
}
.mainbox .rightBtn:hover {
  background: rgba(0, 0, 0, 0.3);
  border: 0;
}
.bookmarkcard {
  display: flex;
  box-sizing: border-box;
  min-height: 173px;
  width: 100%;
}
.marklist {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>