(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4b9af102"],{"08b9":function(t,e,n){"use strict";var i=n("3947"),o=n.n(i);o.a},"0a99":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"me"},[n("p",[t._v("您的专属链接")]),n("div",[n("i",{staticClass:"fa fa-link"}),t._v(" "),n("el-link",{staticStyle:{"font-size":"24px"},attrs:{type:"primary",target:"_blank",href:"/"+t.username}},[t._v("https://"+t._s(t.username)+".xydh.fun")])],1),n("p",[t._v("访问此链接无需登录，欢迎分享给你的朋友")]),n("p",[t._v("请在个人电脑登录本控制台,否则请"),n("el-button",{attrs:{type:"",round:""},on:{click:t.logout}},[t._v("登出")])],1),n("el-tabs",{attrs:{type:"border-card",stretch:!0}},[n("el-tab-pane",{attrs:{label:"公告"}},[n("Notice")],1),n("el-tab-pane",{attrs:{label:"小站配置",lazy:!1}},[n("SiteSet",{attrs:{userID:t.userID}})],1),n("el-tab-pane",{attrs:{label:"文件夹",lazy:!1}},[n("FolderSet",{attrs:{userID:t.userID}})],1),n("el-tab-pane",{attrs:{label:"书签管理",lazy:!1}},[n("LinkSet",{attrs:{userID:t.userID}})],1),n("el-tab-pane",{attrs:{label:"排行榜",disabled:""}},[t._v("还没写")]),n("el-tab-pane",{attrs:{label:"其他"}},[n("Other")],1)],1),n("div",{staticClass:"notice"},[n("el-divider",[t._v("⚠️警告")]),n("p",[t._v("为了炫猿长久地发展，请勿上传涉政涉黄涉黑等违法犯罪网站。")]),n("p",{staticStyle:{color:"red","font-weight":"bolder"}},[t._v("发现一条永久封号。")]),n("p",[t._v("排行榜可任意查看用户数据。")]),n("p",[t._v("举报者可获得邀请码奖励。")]),n("el-divider")],1),n("el-col",{attrs:{span:24}},[n("Paomadeng")],1)],1)},o=[],r=(n("b0c0"),n("fab2")),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"notice"},[n("p",[t._v("欢迎您使用炫猿导航 更多功能氪命开发中 敬请期待")]),n("el-collapse",{attrs:{accordion:""}},[n("el-collapse-item",[n("template",{slot:"title"},[t._v(" 正在开发"),n("el-badge",{staticClass:"item",attrs:{value:4}})],1),n("li",[n("el-checkbox",[t._v("讨论模块")])],1),n("li",[n("el-checkbox",[t._v("线报模块")])],1),n("li",[n("el-checkbox",[t._v("个性化背景")])],1),n("li",[n("el-checkbox",[t._v("密码访问")])],1)],2),t._l(t.Notice,(function(e){return n("div",{key:e.name},[n("el-collapse-item",[n("template",{slot:"title"},[t._v(" "+t._s(e.name)),n("el-badge",{staticClass:"item",attrs:{value:e.list.length}})],1),t._l(e.list,(function(e){return n("div",{key:e.id},[t._v(" "+t._s(e.li)+" ")])}))],2)],1)}))],2)],1)},l=[],s={data:function(){return{Notice:[{name:"v0.2 特性 -2020.03.16",list:[{li:"聚合搜索框新增更多选项"},{li:"分类和书签前都可增加小图标"}]},{name:"v0.1 特性 -2020.03.10",list:[{li:"站点基本信息自定义"},{li:"书签自定义"},{li:"文件夹自定义"},{li:"聚合搜索框"},{li:"天气模块"}]}]}},methods:{}},c=s,u=(n("763f"),n("2877")),d=Object(u["a"])(c,a,l,!1,null,"b2647bca",null),f=d.exports,p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"siteForm"},[n("p",[t._v("热度: "+t._s(t.userview)+" [后期推出排行榜功能]")]),n("el-form",{attrs:{model:t.SiteForm}},[n("el-form-item",{attrs:{label:"站点名"}},[n("el-input",{attrs:{type:"text",minlength:"2",maxlength:"10",placeholder:"2-10字符"},model:{value:t.SiteForm.name,callback:function(e){t.$set(t.SiteForm,"name",e)},expression:"SiteForm.name"}})],1),n("el-form-item",{attrs:{label:"站点简介"}},[n("el-input",{attrs:{type:"text",minlength:"0",maxlength:"100",placeholder:"可为空"},model:{value:t.SiteForm.info,callback:function(e){t.$set(t.SiteForm,"info",e)},expression:"SiteForm.info"}})],1),n("el-popconfirm",{attrs:{confirmButtonText:"OK",cancelButtonText:"取消",icon:"el-icon-info",iconColor:"red",title:"确定更新站点信息吗"},on:{onConfirm:function(e){return t.updateSite()}}},[n("el-button",{attrs:{slot:"reference",type:"primary"},slot:"reference"},[t._v("更新站点信息")])],1)],1),n("el-divider",{attrs:{"content-position":"center"}},[t._v("更多定制化功能开发ing")]),n("el-divider",{attrs:{"content-position":"center"}},[t._v("欢迎提出你的意见")])],1)},m=[],v=n("1480"),h={props:["userID"],data:function(){return{uid:"",userview:0,SiteForm:{name:"",info:""}}},methods:{getSite:function(){var t=this;this.uid=this.userID,v["b"](this.uid).then((function(e){t.SiteForm.name=e.data.name,t.SiteForm.info=e.data.info,t.userview=e.data.view}))},updateSite:function(){var t=this;v["c"](this.SiteForm).then((function(e){e.code>0?t.$notify.error({title:"更新失败",message:e.msg}):(t.$router.push({name:"Me"}),t.$notify({title:"更新完成😊",type:"success"}))}))}},components:{},watch:{userID:function(){this.uid=this.userID,this.getSite()}}},g=h,b=(n("3f36"),Object(u["a"])(g,p,m,!1,null,"330d7f5f",null)),y=b.exports,_=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"tips"},[n("el-collapse",[n("el-collapse-item",{attrs:{title:"使用注意事项[必读]",name:"tips"}},[n("div",[t._v(" 以下原则同样适用于书签的操作 "),n("li",[n("b",[t._v("1. 以一条为单位更新")]),t._v(" "),n("span",[t._v("因为每次更新后会刷新列表")])]),n("li",[n("b",[t._v("2. 设计好文件夹顺序")]),t._v(" "),n("span",[t._v("因为后续炫猿不准备推出排序功能(使用一段时间后你会发现, 顺序并没有那么重要，首页九宫格的布局会让你通过记忆快速定位到想去的网站)")])])])]),n("el-collapse-item",{attrs:{title:"添加图标的方法",name:"icon"}},[n("div",[n("p",[t._v("打开"),n("el-link",{attrs:{target:"_blank",rel:"nofollow",href:"https://fontawesome.dashgame.com/"}},[t._v("https://fontawesome.dashgame.com/")]),t._v("后下拉，")],1),n("p",[t._v("找到想用的图标，图标后的英文就是图标代码")]),n("img",{attrs:{src:"https://i.loli.net/2020/03/17/ODYsLrRKwcjmTqx.png",width:"400px"}})])])],1)],1),n("el-divider"),n("el-row",{attrs:{type:"flex",justify:"center"}},[n("el-col",{attrs:{span:6}},[t._v("名称")]),n("el-col",{attrs:{span:3}},[t._v("图标")]),n("el-col",{attrs:{span:3}},[t._v("操作")])],1),n("el-row",{attrs:{model:t.Folderform,gutter:1,type:"flex",justify:"center"}},[n("el-col",{attrs:{span:6}},[n("el-input",{attrs:{type:"text",minlength:"0",maxlength:"8",placeholder:"0-8字/过长不好看"},model:{value:t.Folderform.name,callback:function(e){t.$set(t.Folderform,"name",e)},expression:"Folderform.name"}})],1),n("el-col",{attrs:{span:3}},[n("el-input",{attrs:{type:"text",minlength:"0",maxlength:"30",placeholder:"icon"},model:{value:t.Folderform.icon,callback:function(e){t.$set(t.Folderform,"icon",e)},expression:"Folderform.icon"}})],1),n("el-col",{attrs:{span:3}},[n("el-button",{attrs:{size:"small",type:"success",icon:"el-icon-plus",circle:""},on:{click:function(e){return t.createFolder()}}})],1)],1),n("el-divider"),t._l(t.Folders,(function(e){return n("el-row",{key:e.id,attrs:{gutter:1,type:"flex",justify:"center"}},[n("el-col",{attrs:{span:6}},[n("el-input",{attrs:{type:"text"},model:{value:e.name,callback:function(n){t.$set(e,"name",n)},expression:"Folder.name"}})],1),n("el-col",{attrs:{span:3}},[n("el-input",{attrs:{type:"text"},model:{value:e.icon,callback:function(n){t.$set(e,"icon",n)},expression:"Folder.icon"}})],1),n("el-col",{attrs:{span:3}},[n("el-button-group",[n("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-edit"},on:{click:function(n){return t.updateFolder(e)}}}),n("el-button",{attrs:{size:"small",type:"danger",icon:"el-icon-delete"},on:{click:function(n){return t.deleteFolder(e)}}})],1)],1)],1)}))],2)},k=[],x=n("bc3a"),F=n.n(x),$=function(t){return F.a.get("/api/v1/foldersbyid/".concat(t)).then((function(t){return t.data}))},w=function(t){return F.a.post("/api/v1/folder/",t).then((function(t){return t.data}))},D=function(t){return F.a.put("/api/v1/folder/",t).then((function(t){return t.data}))},S=function(t){return F.a.delete("/api/v1/folder/",t).then((function(t){return t.data}))},I={props:["userID"],data:function(){return{uid:0,Folders:[],Folderform:{id:"",name:"",icon:""}}},methods:{getFolder:function(){var t=this;this.uid=this.userID,$(this.uid).then((function(e){t.Folders=e.data}))},createFolder:function(){var t=this;w(this.Folderform).then((function(e){e.code>0?t.$notify.error({title:"添加失败",message:e.msg}):(t.$notify({title:"添加成功!",type:"success",duration:"800"}),t.Folderform={name:"",icon:""},t.getFolder())})).catch((function(e){t.$notify.error({title:"错误 请检查",message:e})}))},updateFolder:function(t){var e=this,n={id:t.id,name:t.name,url:t.url,icon:t.icon};D(n).then((function(t){t.code>0?e.$notify.error({title:"更新失败",message:t.msg}):(e.$notify({title:"更新成功!",type:"success",duration:"800"}),e.getFolder())})).catch((function(t){e.$notify.error({title:"错误 请检查",message:t})}))},deleteFolder:function(t){var e=this,n={data:{id:t.id}};S(n).then((function(t){t.code>0?e.$notify.error({title:"删除失败",message:t.msg}):(e.$notify({title:"删除成功!",type:"success",duration:"800"}),e.getFolder())})).catch((function(t){e.$notify.error({title:"错误 请检查",message:t})}))}},components:{},watch:{userID:function(){this.uid=this.userID,this.getFolder()}}},C=I,L=(n("516a"),Object(u["a"])(C,_,k,!1,null,null,null)),j=L.exports,O=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-collapse",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{accordion:""},on:{change:function(e){return t.getLinksin(t.FolderID)}},model:{value:t.FolderID,callback:function(e){t.FolderID=e},expression:"FolderID"}},t._l(t.Folders,(function(e){return n("div",{key:e.id},[n("el-collapse-item",{attrs:{name:e.id}},[n("template",{slot:"title"},[t._v(" "+t._s(e.name)+" ")]),n("div",{staticClass:"links"},[n("el-row",{attrs:{type:"flex",justify:"center"}},[n("el-col",{attrs:{span:2}},[t._v("图标")]),n("el-col",{attrs:{span:4}},[t._v("名称")]),n("el-col",{attrs:{span:6}},[t._v("链接")]),n("el-col",{attrs:{span:6}},[t._v("介绍")]),n("el-col",{attrs:{span:3}},[t._v("文件夹")]),n("el-col",{attrs:{span:3}},[t._v("操作")])],1),n("el-row",{attrs:{model:t.linkform,gutter:1,type:"flex",justify:"center"}},[n("el-col",{attrs:{span:2}},[n("el-input",{attrs:{type:"text",placeholder:"可为空"},model:{value:t.linkform.icon,callback:function(e){t.$set(t.linkform,"icon",e)},expression:"linkform.icon"}})],1),n("el-col",{attrs:{span:4}},[n("el-input",{attrs:{type:"text",minlength:"0",maxlength:"8",placeholder:"0-8字/过长不好看"},model:{value:t.linkform.name,callback:function(e){t.$set(t.linkform,"name",e)},expression:"linkform.name"}})],1),n("el-col",{attrs:{span:6}},[n("el-input",{attrs:{type:"text",minlength:"0",maxlength:"50",placeholder:"http开头"},model:{value:t.linkform.url,callback:function(e){t.$set(t.linkform,"url",e)},expression:"linkform.url"}})],1),n("el-col",{attrs:{span:6}},[n("el-input",{attrs:{type:"text",minlength:"0",maxlength:"30",placeholder:"鼠标放上时的提示语(可为空)"},model:{value:t.linkform.info,callback:function(e){t.$set(t.linkform,"info",e)},expression:"linkform.info"}})],1),n("el-col",{attrs:{span:3}},[n("P",[t._v(t._s(e.name))])],1),n("el-col",{attrs:{span:3}},[n("el-button",{attrs:{size:"small",type:"success",icon:"el-icon-plus",circle:""},on:{click:function(n){return t.createLink(e.id)}}})],1)],1),n("el-divider"),t._l(t.links,(function(i){return n("el-row",{key:i.id,attrs:{gutter:1}},[n("el-col",{attrs:{span:2}},[n("el-input",{attrs:{type:"text"},model:{value:i.icon,callback:function(e){t.$set(i,"icon",e)},expression:"link.icon"}})],1),n("el-col",{attrs:{span:4}},[n("el-input",{attrs:{type:"text"},model:{value:i.name,callback:function(e){t.$set(i,"name",e)},expression:"link.name"}})],1),n("el-col",{attrs:{span:6}},[n("el-input",{attrs:{type:"text"},model:{value:i.url,callback:function(e){t.$set(i,"url",e)},expression:"link.url"}})],1),n("el-col",{attrs:{span:6}},[n("el-input",{attrs:{type:"text"},model:{value:i.info,callback:function(e){t.$set(i,"info",e)},expression:"link.info"}})],1),n("el-col",{attrs:{span:3}},[n("el-select",{model:{value:i.fid,callback:function(e){t.$set(i,"fid",e)},expression:"link.fid"}},t._l(t.Folders,(function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1),n("el-col",{attrs:{span:3}},[n("el-button-group",[n("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-edit"},on:{click:function(n){return t.updateLink(e.id,i)}}}),n("el-button",{attrs:{size:"small",type:"danger",icon:"el-icon-delete"},on:{click:function(n){return t.deleteLink(e.id,i)}}})],1)],1)],1)}))],2)],2)],1)})),0)],1)},z=[],E=function(t){return F.a.get("/api/v1/linksbyfolderid/".concat(t)).then((function(t){return t.data}))},T=function(t){return F.a.post("/api/v1/link/",t).then((function(t){return t.data}))},N=function(t){return F.a.put("/api/v1/link/",t).then((function(t){return t.data}))},P=function(t){return F.a.delete("/api/v1/link/",t).then((function(t){return t.data}))},B={props:["userID"],data:function(){return{loading:!1,FolderID:"",uid:0,Folders:[],links:[],linkform:{id:"",fid:"",icon:"",name:"",url:"",info:""}}},methods:{getFolder:function(){var t=this;this.uid=this.userID,$(this.uid).then((function(e){t.Folders=e.data}))},getLinksin:function(t){var e=this;this.loading=!0,setTimeout((function(){e.loading=!1}),500),t&&E(t).then((function(t){e.links=t.data}))},createLink:function(t){var e=this;this.linkform.fid=t,T(this.linkform).then((function(n){n.code>0?e.$notify.error({title:"添加失败",message:n.msg}):(e.$notify({title:"添加成功!",type:"success",message:"刷新列表",duration:"800"}),e.linkform={id:"",fid:"",icon:"",name:"",url:"",info:""},e.getLinksin(t))})).catch((function(t){e.$notify.error({title:"错误 请检查",message:t})}))},updateLink:function(t,e){var n=this,i={id:e.id,fid:e.fid,icon:e.icon,name:e.name,url:e.url,info:e.info};N(i).then((function(e){e.code>0?n.$notify.error({title:"更新失败",message:e.msg}):(n.getLinksin(t),n.$notify({title:"更新成功!",type:"success",duration:"800"}))})).catch((function(t){n.$notify.error({title:"错误 请检查",message:t})}))},deleteLink:function(t,e){var n=this;this.linkform.fid=t;var i={data:{id:e.id}};P(i).then((function(e){e.code>0?n.$notify.error({title:"删除失败",message:e.msg}):(n.$notify({title:"删除成功!",type:"success",duration:"800"}),n.getLinksin(t))})).catch((function(t){n.$notify.error({title:"错误 请检查",message:t})}))}},components:{},watch:{userID:function(){this.uid=this.userID,this.getFolder()}}},U=B,K=Object(u["a"])(U,O,z,!1,null,"8215433c",null),J=K.exports,M=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-divider",{attrs:{"content-position":"center"}},[t._v("书签导入")]),n("el-divider",{attrs:{"content-position":"center"}},[t._v("开发ing")]),n("el-upload",{staticClass:"upload",attrs:{drag:"",action:"https://jsonplaceholder.typicode.com/posts/",multiple:""}},[n("i",{staticClass:"el-icon-upload"}),n("div",{staticClass:"el-upload__text"},[t._v("导入书签，将Chrome浏览器导出的html文件拖到此处，或"),n("em",[t._v("点击上传")])]),n("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("仅限赞助用户")])]),n("el-divider",{attrs:{"content-position":"center"}},[t._v("密码修改")]),n("div",{staticClass:"pwdForm"},[n("el-form",{ref:"pwdForm",attrs:{model:t.pwdForm,"status-icon":"","label-width":"100px"}},[n("el-form-item",{attrs:{label:"密码"}},[n("el-input",{attrs:{type:"password",autocomplete:"off",minlength:"6",maxlength:"40"},model:{value:t.pwdForm.password,callback:function(e){t.$set(t.pwdForm,"password",e)},expression:"pwdForm.password"}})],1),n("el-form-item",{attrs:{label:"确认密码"}},[n("el-input",{attrs:{type:"password",autocomplete:"off",minlength:"6",maxlength:"40"},model:{value:t.pwdForm.password_confirm,callback:function(e){t.$set(t.pwdForm,"password_confirm",e)},expression:"pwdForm.password_confirm"}})],1),n("el-popconfirm",{attrs:{confirmButtonText:"OK",cancelButtonText:"取消",icon:"el-icon-info",iconColor:"red",title:"确定更改密码吗"},on:{onConfirm:function(e){return t.updatePWD()}}},[n("el-button",{attrs:{slot:"reference",type:"primary"},slot:"reference"},[t._v("更改密码")])],1)],1)],1)],1)},W=[],q={data:function(){return{pwdForm:{password:"",password_confirm:""}}},methods:{updatePWD:function(){var t=this;r["f"](this.pwdForm).then((function(e){e.code>0?t.$notify.error({title:"更改失败",message:e.msg}):(t.$router.push({name:"ULogin"}),t.$notify({title:"更改成功!",message:"请重新登录",type:"success"}))})).catch((function(e){t.$notify.error({title:"错误 请检查",message:e})}))}}},H=q,R=(n("95cc"),Object(u["a"])(H,M,W,!1,null,"11bdc21c",null)),Y=R.exports,A=n("ec36"),G={data:function(){return{userID:0,username:"未登录",LoginCode:-1}},methods:{getUser:function(){var t=this;r["d"]().then((function(e){t.LoginCode=e.code,t.LoginCode>0?(t.$message({message:"请登录",center:!0,showClose:!0,type:"warning"}),t.$router.push({name:"ULogin"})):(t.userID=e.data.id,t.username=e.data.name)}))},logout:function(){var t=this;r["c"](),this.$alert("","注销成功",{type:"success",callback:function(){t.$router.push({name:"Home"})}})}},components:{Notice:f,SiteSet:y,FolderSet:j,LinkSet:J,Other:Y,Paomadeng:A["a"]},beforeMount:function(){document.title="炫猿控制台",this.getUser()}},Q=G,V=(n("d78b"),Object(u["a"])(Q,i,o,!1,null,"64e69ab8",null));e["default"]=V.exports},"0dad":function(t,e,n){},1480:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return l}));var i=n("bc3a"),o=n.n(i),r=function(t){return o.a.get("/api/v1/sitebyid/".concat(t)).then((function(t){return t.data}))},a=function(t){return o.a.put("/api/v1/site/",t).then((function(t){return t.data}))},l=function(t){return o.a.get("/api/v1/all/".concat(t)).then((function(t){return t.data}))}},3947:function(t,e,n){},"3f36":function(t,e,n){"use strict";var i=n("a063"),o=n.n(i);o.a},"4dd1":function(t,e,n){},"516a":function(t,e,n){"use strict";var i=n("4dd1"),o=n.n(i);o.a},"763f":function(t,e,n){"use strict";var i=n("0dad"),o=n.n(i);o.a},"95cc":function(t,e,n){"use strict";var i=n("9b24"),o=n.n(i);o.a},9701:function(t,e,n){},"9b24":function(t,e,n){},a063:function(t,e,n){},b0c0:function(t,e,n){var i=n("83ab"),o=n("9bf2").f,r=Function.prototype,a=r.toString,l=/^\s*function ([^ (]*)/,s="name";!i||s in r||o(r,s,{configurable:!0,get:function(){try{return a.call(this).match(l)[1]}catch(t){return""}}})},d78b:function(t,e,n){"use strict";var i=n("9701"),o=n.n(i);o.a},ec36:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"paomadeng"},[n("el-carousel",{attrs:{interval:6e3,"indicator-position":"none",height:"100px",arrow:"always"}},t._l(t.data,(function(e){return n("el-carousel-item",{key:e.name},[n("a",{attrs:{href:e.url,target:"_blank"}},[t._v(t._s(e.name))])])})),1)],1)},o=[],r={data:function(){return{data:[{name:"炫猿导航 王者归来",url:""},{name:"虚位以待",url:""}]}}},a=r,l=(n("08b9"),n("2877")),s=Object(l["a"])(a,i,o,!1,null,"9d11b80a",null);e["a"]=s.exports}}]);
//# sourceMappingURL=chunk-4b9af102.3195eaab.js.map