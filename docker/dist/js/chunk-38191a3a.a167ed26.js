(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-38191a3a"],{"07ad":function(t,n,e){"use strict";e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return r})),e.d(n,"d",(function(){return a})),e.d(n,"b",(function(){return s}));var i=e("bc3a"),l=e.n(i),o=function(t){return l.a.get("/api/v1/foldersbyid/".concat(t)).then((function(t){return t.data}))},r=function(t){return l.a.post("/api/v1/folder/",t).then((function(t){return t.data}))},a=function(t){return l.a.put("/api/v1/folder/",t).then((function(t){return t.data}))},s=function(t){return l.a.delete("/api/v1/folder/",t).then((function(t){return t.data}))}},b0c0:function(t,n,e){var i=e("83ab"),l=e("9bf2").f,o=Function.prototype,r=o.toString,a=/^\s*function ([^ (]*)/,s="name";!i||s in o||l(o,s,{configurable:!0,get:function(){try{return r.call(this).match(a)[1]}catch(t){return""}}})},fdb9:function(t,n,e){"use strict";e.r(n);var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("el-collapse",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{accordion:""},on:{change:function(n){return t.getLinksin(t.FolderID)}},model:{value:t.FolderID,callback:function(n){t.FolderID=n},expression:"FolderID"}},t._l(t.Folders,(function(n){return e("div",{key:n.id},[e("el-collapse-item",{attrs:{name:n.id}},[e("template",{slot:"title"},[t._v(" "+t._s(n.name)+" ")]),e("div",{staticClass:"links"},[e("el-row",{attrs:{type:"flex",justify:"center"}},[e("el-col",{attrs:{span:2}},[t._v("图标")]),e("el-col",{attrs:{span:4}},[t._v("名称")]),e("el-col",{attrs:{span:6}},[t._v("链接")]),e("el-col",{attrs:{span:6}},[t._v("介绍")]),e("el-col",{attrs:{span:3}},[t._v("文件夹")]),e("el-col",{attrs:{span:3}},[t._v("操作")])],1),e("el-row",{attrs:{model:t.linkform,gutter:1,type:"flex",justify:"center"}},[e("el-col",{attrs:{span:2}},[e("el-input",{attrs:{type:"text",placeholder:"可为空"},model:{value:t.linkform.icon,callback:function(n){t.$set(t.linkform,"icon",n)},expression:"linkform.icon"}})],1),e("el-col",{attrs:{span:4}},[e("el-input",{attrs:{type:"text",minlength:"0",maxlength:"8",placeholder:"0-8字/过长不好看"},model:{value:t.linkform.name,callback:function(n){t.$set(t.linkform,"name",n)},expression:"linkform.name"}})],1),e("el-col",{attrs:{span:6}},[e("el-input",{attrs:{type:"text",minlength:"0",maxlength:"50",placeholder:"http开头"},model:{value:t.linkform.url,callback:function(n){t.$set(t.linkform,"url",n)},expression:"linkform.url"}})],1),e("el-col",{attrs:{span:6}},[e("el-input",{attrs:{type:"text",minlength:"0",maxlength:"30",placeholder:"鼠标放上时的提示语(可为空)"},model:{value:t.linkform.info,callback:function(n){t.$set(t.linkform,"info",n)},expression:"linkform.info"}})],1),e("el-col",{attrs:{span:3}},[e("P",[t._v(t._s(n.name))])],1),e("el-col",{attrs:{span:3}},[e("el-button",{attrs:{size:"small",type:"success",icon:"el-icon-plus",circle:""},on:{click:function(e){return t.createLink(n.id)}}})],1)],1),e("el-divider"),t._l(t.links,(function(i){return e("el-row",{key:i.id,attrs:{gutter:1}},[e("el-col",{attrs:{span:2}},[e("el-input",{attrs:{type:"text"},model:{value:i.icon,callback:function(n){t.$set(i,"icon",n)},expression:"link.icon"}})],1),e("el-col",{attrs:{span:4}},[e("el-input",{attrs:{type:"text"},model:{value:i.name,callback:function(n){t.$set(i,"name",n)},expression:"link.name"}})],1),e("el-col",{attrs:{span:6}},[e("el-input",{attrs:{type:"text"},model:{value:i.url,callback:function(n){t.$set(i,"url",n)},expression:"link.url"}})],1),e("el-col",{attrs:{span:6}},[e("el-input",{attrs:{type:"text"},model:{value:i.info,callback:function(n){t.$set(i,"info",n)},expression:"link.info"}})],1),e("el-col",{attrs:{span:3}},[e("el-select",{model:{value:i.fid,callback:function(n){t.$set(i,"fid",n)},expression:"link.fid"}},t._l(t.Folders,(function(t){return e("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1),e("el-col",{attrs:{span:3}},[e("el-button-group",[e("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-edit"},on:{click:function(e){return t.updateLink(n.id,i)}}}),e("el-button",{attrs:{size:"small",type:"danger",icon:"el-icon-delete"},on:{click:function(e){return t.deleteLink(n.id,i)}}})],1)],1)],1)}))],2)],2)],1)})),0)],1)},l=[],o=(e("b0c0"),e("07ad")),r=e("bc3a"),a=e.n(r),s=function(t){return a.a.get("/api/v1/linksbyfolderid/".concat(t)).then((function(t){return t.data}))},c=function(t){return a.a.post("/api/v1/link/",t).then((function(t){return t.data}))},u=function(t){return a.a.put("/api/v1/link/",t).then((function(t){return t.data}))},f=function(t){return a.a.delete("/api/v1/link/",t).then((function(t){return t.data}))},d={props:["userID"],data:function(){return{loading:!1,FolderID:"",uid:0,Folders:[],links:[],linkform:{id:"",fid:"",icon:"",name:"",url:"",info:""}}},methods:{getFolder:function(){var t=this;this.uid=this.userID,o["c"](this.uid).then((function(n){t.Folders=n.data}))},getLinksin:function(t){var n=this;this.loading=!0,setTimeout((function(){n.loading=!1}),1e3),t&&s(t).then((function(t){n.links=t.data}))},createLink:function(t){var n=this;this.linkform.fid=t,c(this.linkform).then((function(e){e.code>0?n.$notify.error({title:"添加失败",message:e.msg}):(n.$notify({title:"添加成功!",type:"success",message:"刷新列表",duration:"800"}),n.linkform={id:"",fid:"",icon:"",name:"",url:"",info:""},n.getLinksin(t))})).catch((function(t){n.$notify.error({title:"错误 请检查",message:t})}))},updateLink:function(t,n){var e=this,i={id:n.id,fid:n.fid,icon:n.icon,name:n.name,url:n.url,info:n.info};u(i).then((function(n){n.code>0?e.$notify.error({title:"更新失败",message:n.msg}):(e.getLinksin(t),e.$notify({title:"更新成功!",type:"success",duration:"1000"}))})).catch((function(t){e.$notify.error({title:"错误 请检查",message:t})}))},deleteLink:function(t,n){var e=this;this.linkform.fid=t;var i={data:{id:n.id}};f(i).then((function(n){n.code>0?e.$notify.error({title:"删除失败",message:n.msg}):(e.$notify({title:"删除成功!",type:"success",duration:"800"}),e.getLinksin(t))})).catch((function(t){e.$notify.error({title:"错误 请检查",message:t})}))}},components:{},watch:{userID:function(){this.uid=this.userID,this.getFolder()}}},p=d,m=e("2877"),k=Object(m["a"])(p,i,l,!1,null,"18d58ef6",null);n["default"]=k.exports}}]);
//# sourceMappingURL=chunk-38191a3a.a167ed26.js.map