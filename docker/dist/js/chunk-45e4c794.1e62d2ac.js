(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45e4c794"],{1409:function(t,e,a){},1480:function(t,e,a){"use strict";a.d(e,"b",(function(){return s})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return r}));var n=a("bc3a"),i=a.n(n),s=function(t){return i.a.get("/api/v1/sitebyid/".concat(t)).then((function(t){return t.data}))},o=function(t){return i.a.put("/api/v1/site/",t).then((function(t){return t.data}))},r=function(t){return i.a.get("/api/v1/all/".concat(t)).then((function(t){return t.data}))}},"17ca":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._m(0),a("div",[a("p",{staticClass:"siteName"},[t._v(t._s(t.sitename))]),a("p",{staticClass:"siteInfo"},[t._v(t._s(t.siteinfo))])]),a("div",[a("SearchTool")],1),a("el-col",{attrs:{xs:24,sm:12,md:8}},[a("div",{staticClass:"folder"},[a("div",{staticClass:"foldername"},[a("p",[t._v("猿选")])]),t._l(t.yuanxuan,(function(e){return a("div",{key:e.id,on:{click:function(a){return t.go(e.url)}}},[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"link"},[e.info?a("span",{staticClass:"tooltiptext"},[a("i",{staticClass:"fa fa-info-circle"},[t._v(t._s(e.info))])]):t._e(),e.icon?a("p",[a("i",{class:"fa fa-"+e.icon}),t._v(" "+t._s(e.name))]):a("p",[t._v(t._s(e.name))]),t._v(" "+t._s(t.item)+" ")])])],1)}))],2)]),t._l(t.Folders,(function(e){return a("div",{key:e.id},[a("el-col",{attrs:{xs:24,sm:12,md:8}},[a("div",{staticClass:"folder"},[a("div",{staticClass:"foldername"},[e.icon?a("p",[a("i",{class:"fa fa-"+e.icon}),t._v(t._s(e.name))]):a("p",[t._v(t._s(e.name))])]),t._l(e.links,(function(e){return a("div",{key:e.id,on:{click:function(a){return t.go(e.url)}}},[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"link"},[e.info?a("span",{staticClass:"tooltiptext"},[a("i",{staticClass:"fa fa-info-circle"},[t._v(t._s(e.info))])]):t._e(),e.icon?a("p",[a("i",{class:"fa fa-"+e.icon}),t._v(" "+t._s(e.name))]):a("p",[t._v(t._s(e.name))])])])],1)}))],2)])],1)})),a("el-col",{attrs:{span:24}},[a("Paomadeng")],1)],2)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"header"},[a("div",{attrs:{id:"tp-weather-widget"}}),t._v(" 公告: 新炫猿上线啦 系兄弟就来砍我 ")])}],s=(a("b0c0"),a("d3b7"),a("25f0"),a("fab2")),o=a("1480"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"serach"},[a("el-row",{attrs:{type:"flex",justify:"center"}},[a("el-col",{attrs:{xs:24,sm:18,md:12}},[a("el-tabs",{attrs:{stretch:""},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},[t._l(t.engines,(function(e){return a("el-tab-pane",{key:e.id,attrs:{name:e.id,lazy:""}},[a("span",{attrs:{slot:"label"},slot:"label"},[t._v(t._s(e.name))]),a("el-col",{attrs:{span:23}},[a("el-input",{attrs:{type:"text",placeholder:e.text},nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.Sou(e.url+t.txt)}},model:{value:t.txt,callback:function(e){t.txt=e},expression:"txt"}},[a("span",{attrs:{slot:"append",type:"text"},on:{click:function(a){return t.Sou(e.url+t.txt)}},slot:"append"},[a("i",{staticClass:"el-icon-search"})])])],1)],1)})),a("el-tab-pane",{attrs:{name:"999",disabled:""}},[a("span",{attrs:{slot:"label"},slot:"label"},[a("el-dropdown",{attrs:{placement:"bottom"},on:{command:t.selectClass}},[a("span",{staticClass:"el-dropdown-link"},[a("el-button",{attrs:{size:"",type:"text",icon:"el-icon-arrow-down",circle:""}})],1),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"0"}},[a("i",{staticClass:"fa fa-paw"}),t._v("常用")]),a("el-dropdown-item",{attrs:{command:"1"}},[a("i",{staticClass:"fa fa-skyatlas"}),t._v("资源")]),a("el-dropdown-item",{attrs:{command:"2"}},[a("i",{staticClass:"fa fa-youtube-play"}),t._v("电影")]),a("el-dropdown-item",{attrs:{command:"3"}},[a("i",{staticClass:"fa fa-music"}),t._v("音乐")]),a("el-dropdown-item",{attrs:{command:"4"}},[a("i",{staticClass:"fa fa-book"}),t._v("书籍")]),a("el-dropdown-item",{attrs:{command:"5"}},[a("i",{staticClass:"fa fa-mortar-board"}),t._v("学术")]),a("el-dropdown-item",{attrs:{command:"6"}},[a("i",{staticClass:"fa fa-weixin"}),t._v("社交")]),a("el-dropdown-item",{attrs:{command:"7"}},[a("i",{staticClass:"fa fa-shopping-cart"}),t._v("购物")]),a("el-dropdown-item",{attrs:{command:"8"}},[a("i",{staticClass:"fa fa-wrench"}),t._v("工具")])],1)],1)],1)])],2)],1)],1)],1)},c=[],l={data:function(){return{txt:"",selected:"0",engines:[{id:"0",name:"百度",text:"百度一下,你就知道",url:"https://www.baidu.com/s?wd="},{id:"1",name:"谷歌",text:"请自备工具",url:"https://www.google.com/search?q="},{id:"2",name:"查快递",text:"请直接输入单号",url:"https://m.kuaidi100.com/result.jsp?nu="},{id:"3",name:"B站",text:"干杯",url:"https://search.bilibili.com/all?keyword="},{id:"6",name:"音乐",text:"",url:"http://music.taihe.com/search?key="},{id:"7",name:"翻译",text:"",url:"https://cn.bing.com/dict/search?q="}],x:[[{id:"0",name:"百度",text:"百度一下,你就知道",url:"https://www.baidu.com/s?wd="},{id:"1",name:"谷歌",text:"请自备工具",url:"https://www.google.com/search?q="},{id:"2",name:"查快递",text:"请直接输入单号",url:"https://m.kuaidi100.com/result.jsp?nu="},{id:"3",name:"B站",text:"干杯",url:"https://search.bilibili.com/all?keyword="},{id:"6",name:"音乐",text:"",url:"http://music.taihe.com/search?key="},{id:"7",name:"翻译",text:"",url:"https://cn.bing.com/dict/search?q="}],[{id:"0",name:"网盘",text:"",url:"http://www.rufengso.net/s/name/"},{id:"1",name:"福利吧",text:"",url:"https://fulibus.net/?s="},{id:"2",name:"花瓣",text:"",url:"https://huaban.com/search/?q="}],[{id:"0",name:"疯狂影视",text:"",url:"http://ifkdy.com/search?key="}],[{id:"0",name:"咪咕音乐",text:"因为它可以听周杰伦",url:"http://music.taihe.com/search?key="},{id:"1",name:"MV下载",text:"灯社",url:"http://www.dengshe.com/?s="}],[{id:"0",name:"鸠摩搜书",text:"请之间按回车进入搜索 此输入无效",url:"https://www.jiumodiary.com/"},{id:"1",name:"小说",text:"",url:"https://www.boyunso.com/search/?kw="}],[{id:"0",name:"SCI-Hub",text:"请直接输入SCI文章地址",url:"https://sci-hub.shop/"},{id:"1",name:"百度学术",text:"",url:"https://xueshu.baidu.com/s?wd="},{id:"2",name:"知网",text:"",url:"http://kns.cnki.net/kns/brief/Default_Result.aspx?code=SCDB&kw="},{id:"3",name:"小木虫",text:"",url:"http://muchong.com/bbs/search.php?wd="}],[{id:"0",name:"公众号",text:"",url:"https://weixin.sogou.com/weixin?type=2&query="},{id:"1",name:"微博",text:"",url:"https://s.weibo.com/weibo/"},{id:"2",name:"知乎",text:"",url:"https://www.zhihu.com/search?type=content&q="},{id:"3",name:"Github",text:"全球最大男性社交平台",url:"https://github.com/search?q="}],[{id:"0",name:"京东",text:"",url:"https://search.jd.com/Search?keyword="},{id:"1",name:"淘宝",text:"",url:"https://s.taobao.com/search?q="}],[{id:"0",name:"地图",text:"",url:"https://ditu.amap.com/search?query="},{id:"1",name:"查快递",text:"请直接输入单号",url:"https://m.kuaidi100.com/result.jsp?nu="},{id:"2",name:"学做菜",text:"输入菜名",url:"http://www.xiachufang.com/search/?keyword="},{id:"3",name:"翻译",text:"",url:"https://cn.bing.com/dict/search?q="}]]}},methods:{selectClass:function(t){this.selected="0",this.engines=this.x[t]},Sou:function(t){window.open(t,"target")}}},u=l,d=(a("649c"),a("2877")),m=Object(d["a"])(u,r,c,!1,null,null,null),f=m.exports,p=a("ec36"),h={name:"ShowSite",props:["userName"],data:function(){return{baseImg:"url(../assets/bg.jpg)",bg:"https://www.baidu.com/img/baidu_resultlogo@2.png",note:{backgroundImage:"url("+a("86d5")+") ",backgroundPosition:"center center",backgroundRepeat:"no-repeat",backgroundSize:"cover"},userid:"",username:"",sitename:"",siteinfo:"",Folders:[],yuanxuan:[{icon:"",name:"炫猿经典版",url:"https://oo1.win",info:"还记得那个老版的炫猿吗"},{icon:"windows",name:"大白软件站",url:"https://win.o--o.win",info:"重装系统后的第一站"}]}},methods:{getWeather:function(){(function(t,e,a,n,i,s,o,r){r=function(){s=e.createElement(a),o=e.getElementsByTagName(a)[0],s.src=i,s.charset="utf-8",s.async=1,o.parentNode.insertBefore(s,o)},t["SeniverseWeatherWidgetObject"]=n,t[n]||(t[n]=function(){(t[n].q=t[n].q||[]).push(arguments)}),t[n].l=+new Date,t.attachEvent?t.attachEvent("onload",r):t.addEventListener("load",r,!1)})(window,document,"script","SeniverseWeatherWidget","//cdn.sencdn.com/widget2/static/js/bundle.js?t="+parseInt(((new Date).getTime()/1e8).toString(),10)),window.SeniverseWeatherWidget("show",{flavor:"bubble",location:"WX4FBXXFKE4F",geolocation:!0,language:"zh-Hans",unit:"c",theme:"auto",token:"8910fc0f-7319-4498-a8c4-64caf9a9f4c9",hover:"enabled",container:"tp-weather-widget"})},load:function(t){var e=this;s["a"](t).then((function(t){t.code>0?e.$alert("","走迷路了",{confirmButtonText:"回主页",callback:function(){e.$router.push({name:"Home"}).catch((function(){}))}}):(e.userid=t.data.id,e.getSite(e.userid),e.getAll(e.userid))}))},getSite:function(t){var e=this;o["b"](t).then((function(t){t.code>0?e.$alert("","走迷路了",{confirmButtonText:"回主页",callback:function(){e.$router.push({name:"Home"}).catch((function(){}))}}):(e.sitename=t.data.name,e.siteinfo=t.data.info,document.title=e.sitename)}))},getAll:function(t){var e=this;o["a"](t).then((function(t){t.code>0?e.$alert("","走迷路了",{confirmButtonText:"回主页",callback:function(){e.$router.push({name:"Home"}).catch((function(){}))}}):e.Folders=t.data}))},go:function(t){window.open(t,"target")}},components:{SearchTool:f,Paomadeng:p["a"]},beforeMount:function(){this.username=this.$route.params.username,this.username&&this.load(this.username),this.getWeather()}},w=h,b=(a("fd56"),Object(d["a"])(w,n,i,!1,null,null,null));e["default"]=b.exports},"25f0":function(t,e,a){"use strict";var n=a("6eeb"),i=a("825a"),s=a("d039"),o=a("ad6d"),r="toString",c=RegExp.prototype,l=c[r],u=s((function(){return"/a/b"!=l.call({source:"a",flags:"b"})})),d=l.name!=r;(u||d)&&n(RegExp.prototype,r,(function(){var t=i(this),e=String(t.source),a=t.flags,n=String(void 0===a&&t instanceof RegExp&&!("flags"in c)?o.call(t):a);return"/"+e+"/"+n}),{unsafe:!0})},"649c":function(t,e,a){"use strict";var n=a("b224"),i=a.n(n);i.a},"86d5":function(t,e,a){t.exports=a.p+"img/bg.1d5166f9.jpg"},aa07:function(t,e,a){},ad6d:function(t,e,a){"use strict";var n=a("825a");t.exports=function(){var t=n(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},b0c0:function(t,e,a){var n=a("83ab"),i=a("9bf2").f,s=Function.prototype,o=s.toString,r=/^\s*function ([^ (]*)/,c="name";!n||c in s||i(s,c,{configurable:!0,get:function(){try{return o.call(this).match(r)[1]}catch(t){return""}}})},b224:function(t,e,a){},d256:function(t,e,a){"use strict";var n=a("aa07"),i=a.n(n);i.a},ec36:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"paomadeng"},[a("el-carousel",{attrs:{interval:6e3,autoplay:"false","indicator-position":"none",height:"100px",arrow:"always"}},t._l(t.data,(function(e){return a("el-carousel-item",{key:e},[a("a",{attrs:{href:e.url,target:"_blank"}},[t._v(t._s(e.name))])])})),1)],1)},i=[],s={data:function(){return{data:[{}]}}},o=s,r=(a("d256"),a("2877")),c=Object(r["a"])(o,n,i,!1,null,"0bec0201",null);e["a"]=c.exports},fd56:function(t,e,a){"use strict";var n=a("1409"),i=a.n(n);i.a}}]);
//# sourceMappingURL=chunk-45e4c794.1e62d2ac.js.map