(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3d428f56"],{3655:function(t,n,e){"use strict";var a=e("c5a9");e.n(a).a},b0c0:function(t,n,e){var a=e("83ab"),r=e("9bf2").f,u=Function.prototype,i=u.toString,o=/^\s*function ([^ (]*)/,c="name";!a||c in u||r(u,c,{configurable:!0,get:function(){try{return i.call(this).match(o)[1]}catch(t){return""}}})},c5a9:function(t,n,e){},e1ec:function(t,n,e){"use strict";e.r(n);e("b0c0");var a=e("fab2"),r={data:function(){return{userID:0,username:"未登录",LoginCode:-1,VipForm:{key:""},maxf:0,maxl:0,rmad:0}},methods:{getUser:function(){var n=this;a.d().then(function(t){n.LoginCode=t.code,0<n.LoginCode?(n.$message({message:"请登录",center:!0,showClose:!0,type:"warning"}),n.$router.push({name:"ULogin"})):(n.userID=t.data.id,n.username=t.data.name,n.maxf=t.data.max_folder,n.maxl=t.data.max_link,n.rmad=t.data.rm_ad)})},Use:function(){var n=this;a.g(this.VipForm).then(function(t){0<t.code?n.$notify.error({title:"兑换失败",message:t.msg}):(n.$notify({title:"兑换成功!",message:"感谢您的支持了!",type:"success"}),n.username=t.data.name,n.maxf=t.data.max_folder,n.maxl=t.data.max_link,n.rmad=t.data.rm_ad)})}},beforeMount:function(){this.getUser()}},u=(e("3655"),e("2877")),i=Object(u.a)(r,function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"vip"},[e("h3",[n._v("卡密兑换")]),e("el-form",{attrs:{model:n.VipForm,"status-icon":"","label-width":"100px"}},[e("el-form-item",[n._v(" 您要充值的账号id为: "+n._s(n.username)+" ")]),e("el-form-item",[n._v("当前最大文件夹容量: "+n._s(n.maxf))]),e("el-form-item",[n._v("当前最大书签容量: "+n._s(n.maxl))]),e("el-form-item",[n._v("是否去除猿选文件夹: "+n._s(n.rmad))]),e("el-form-item",{attrs:{label:"输入兑换卡密"}},[e("el-col",{attrs:{span:"18"}},[e("el-input",{attrs:{type:"text",placeholder:""},model:{value:n.VipForm.key,callback:function(t){n.$set(n.VipForm,"key",t)},expression:"VipForm.key"}})],1),e("el-col",{attrs:{span:"4"}},[e("el-button",{attrs:{type:"primary"},on:{click:function(t){return n.Use()}}},[n._v("兑换")])],1)],1)],1)],1)},[],!1,null,"078aa3d5",null);n.default=i.exports},fab2:function(t,n,e){"use strict";e.d(n,"e",function(){return u}),e.d(n,"b",function(){return i}),e.d(n,"f",function(){return o}),e.d(n,"c",function(){return c}),e.d(n,"d",function(){return s}),e.d(n,"a",function(){return f}),e.d(n,"g",function(){return d});var a=e("bc3a"),r=e.n(a),u=function(t){return r.a.post("/api/v1/user/register",t).then(function(t){return t.data})},i=function(t){return r.a.post("/api/v1/user/login",t).then(function(t){return t.data})},o=function(t){return r.a.put("/api/v1/user/update",t).then(function(t){return t.data})},c=function(){return r.a.delete("/api/v1/user/logout/").then(function(t){return t.data})},s=function(){return r.a.get("/api/v1/user/me").then(function(t){return t.data})},f=function(t){return r.a.get("/api/v1/getuserid/".concat(t)).then(function(t){return t.data})},d=function(t){return r.a.post("/api/v1/user/vip",t).then(function(t){return t.data})}}}]);