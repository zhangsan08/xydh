(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-497f8bf6"],{"08b9":function(t,e,n){"use strict";var a=n("3947"),i=n.n(a);i.a},1409:function(t,e,n){},1480:function(t,e,n){"use strict";n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var a=n("bc3a"),i=n.n(a),s=function(t){return i.a.get("/api/v1/sitebyid/".concat(t)).then((function(t){return t.data}))},o=function(t){return i.a.put("/api/v1/site/",t).then((function(t){return t.data}))},r=function(t){return i.a.get("/api/v1/all/".concat(t)).then((function(t){return t.data}))}},"17ca":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._m(0),n("div",[n("p",{staticClass:"siteName"},[t._v(t._s(t.sitename))]),n("p",{staticClass:"siteInfo"},[t._v(t._s(t.siteinfo))])]),n("div",[n("SearchTool")],1),n("el-col",{attrs:{xs:24,sm:12,md:8}},[n("div",{staticClass:"folder"},[n("div",{staticClass:"foldername"},[n("p",[t._v("猿选")])]),t._l(t.yuanxuan,(function(e){return n("div",{key:e.id,on:{click:function(n){return t.go(e.url)}}},[n("el-col",{attrs:{span:8}},[n("div",{staticClass:"link"},[e.info?n("span",{staticClass:"tooltiptext"},[n("i",{staticClass:"fa fa-info-circle"},[t._v(t._s(e.info))])]):t._e(),e.icon?n("p",[n("i",{class:"fa fa-"+e.icon}),t._v(" "+t._s(e.name))]):n("p",[t._v(t._s(e.name))])])])],1)}))],2)]),t._l(t.Folders,(function(e){return n("div",{key:e.id},[n("el-col",{attrs:{xs:24,sm:12,md:8}},[n("div",{staticClass:"folder"},[n("div",{staticClass:"foldername"},[e.icon?n("p",[n("i",{class:"fa fa-"+e.icon}),t._v(t._s(e.name))]):n("p",[t._v(t._s(e.name))])]),t._l(e.links,(function(e){return n("div",{key:e.id,on:{click:function(n){return t.go(e.url)}}},[n("el-col",{attrs:{span:8}},[n("div",{staticClass:"link"},[e.info?n("span",{staticClass:"tooltiptext"},[n("i",{staticClass:"fa fa-info-circle"},[t._v(t._s(e.info))])]):t._e(),e.icon?n("p",[n("i",{class:"fa fa-"+e.icon}),t._v(" "+t._s(e.name))]):n("p",[t._v(t._s(e.name))])])])],1)}))],2)])],1)})),n("el-col",{attrs:{span:24}},[n("Paomadeng")],1)],2)},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header"},[n("div",{attrs:{id:"tp-weather-widget"}}),t._v(" 公告: 新炫猿上线啦 高度可定制化 快来建一个你的个人导航吧 ")])}],s=(n("b0c0"),n("d3b7"),n("25f0"),n("fab2")),o=n("1480"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"serach"},[n("el-row",{attrs:{type:"flex",justify:"center"}},[n("el-col",{attrs:{xs:24,sm:18,md:12}},[n("el-tabs",{attrs:{stretch:""},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},[t._l(t.engines,(function(e){return n("el-tab-pane",{key:e.id,attrs:{name:e.id,lazy:""}},[n("span",{attrs:{slot:"label"},slot:"label"},[t._v(t._s(e.name))]),n("el-col",{attrs:{span:23}},[n("el-input",{attrs:{type:"text",placeholder:e.text},nativeOn:{keyup:function(n){return!n.type.indexOf("key")&&t._k(n.keyCode,"enter",13,n.key,"Enter")?null:t.Sou(e.url+t.txt)}},model:{value:t.txt,callback:function(e){t.txt=e},expression:"txt"}},[n("span",{attrs:{slot:"append",type:"text"},on:{click:function(n){return t.Sou(e.url+t.txt)}},slot:"append"},[n("i",{staticClass:"el-icon-search"})])])],1)],1)})),n("el-tab-pane",{attrs:{name:"999",disabled:""}},[n("span",{attrs:{slot:"label"},slot:"label"},[n("el-dropdown",{attrs:{placement:"bottom"},on:{command:t.selectClass}},[n("span",{staticClass:"el-dropdown-link"},[n("el-button",{attrs:{size:"",type:"text",icon:"el-icon-arrow-down",circle:""}})],1),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{attrs:{command:"0"}},[n("i",{staticClass:"fa fa-paw"}),t._v("常用")]),n("el-dropdown-item",{attrs:{command:"1"}},[n("i",{staticClass:"fa fa-skyatlas"}),t._v("资源")]),n("el-dropdown-item",{attrs:{command:"2"}},[n("i",{staticClass:"fa fa-youtube-play"}),t._v("电影")]),n("el-dropdown-item",{attrs:{command:"3"}},[n("i",{staticClass:"fa fa-music"}),t._v("音乐")]),n("el-dropdown-item",{attrs:{command:"4"}},[n("i",{staticClass:"fa fa-book"}),t._v("书籍")]),n("el-dropdown-item",{attrs:{command:"5"}},[n("i",{staticClass:"fa fa-mortar-board"}),t._v("学术")]),n("el-dropdown-item",{attrs:{command:"6"}},[n("i",{staticClass:"fa fa-weixin"}),t._v("社交")]),n("el-dropdown-item",{attrs:{command:"7"}},[n("i",{staticClass:"fa fa-shopping-cart"}),t._v("购物")]),n("el-dropdown-item",{attrs:{command:"8"}},[n("i",{staticClass:"fa fa-wrench"}),t._v("工具")])],1)],1)],1)])],2)],1)],1)],1)},c=[],l={data:function(){return{txt:"",selected:"0",engines:[{id:"0",name:"百度",text:"百度一下,你就知道",url:"https://www.baidu.com/s?wd="},{id:"1",name:"谷歌",text:"请自备工具",url:"https://www.google.com/search?q="},{id:"2",name:"查快递",text:"请直接输入单号",url:"https://m.kuaidi100.com/result.jsp?nu="},{id:"3",name:"B站",text:"干杯",url:"https://search.bilibili.com/all?keyword="},{id:"4",name:"网络流行语",text:"爷爷再也不用担心听不懂",url:"https://jikipedia.com/search?phrase="},{id:"7",name:"翻译",text:"",url:"https://cn.bing.com/dict/search?q="}],x:[[{id:"0",name:"百度",text:"百度一下,你就知道",url:"https://www.baidu.com/s?wd="},{id:"1",name:"谷歌",text:"请自备工具",url:"https://www.google.com/search?q="},{id:"2",name:"查快递",text:"请直接输入单号",url:"https://m.kuaidi100.com/result.jsp?nu="},{id:"3",name:"B站",text:"干杯",url:"https://search.bilibili.com/all?keyword="},{id:"4",name:"网络流行语",text:"爷爷再也不用担心听不懂",url:"https://jikipedia.com/search?phrase="},{id:"7",name:"翻译",text:"",url:"https://cn.bing.com/dict/search?q="}],[{id:"0",name:"网盘",text:"",url:"http://www.rufengso.net/s/name/"},{id:"1",name:"福利吧",text:"",url:"https://fulibus.net/?s="},{id:"2",name:"花瓣",text:"",url:"https://huaban.com/search/?q="}],[{id:"0",name:"疯狂影视",text:"",url:"http://ifkdy.com/search?key="}],[{id:"0",name:"咪咕音乐",text:"因为它可以听周杰伦",url:"http://music.taihe.com/search?key="},{id:"1",name:"MV下载",text:"灯社",url:"http://www.dengshe.com/?s="}],[{id:"0",name:"鸠摩搜书",text:"请之间按回车进入搜索 此输入无效",url:"https://www.jiumodiary.com/"},{id:"1",name:"小说",text:"",url:"https://www.boyunso.com/search/?kw="}],[{id:"0",name:"SCI-Hub",text:"请直接输入SCI/DOI文章地址 如https://doi.org/10.1094/MPMI-08-19-0239-IA",url:"https://sci-hub.shop/"},{id:"1",name:"百度学术",text:"",url:"https://xueshu.baidu.com/s?wd="},{id:"2",name:"知网",text:"",url:"http://kns.cnki.net/kns/brief/Default_Result.aspx?code=SCDB&kw="},{id:"3",name:"小木虫",text:"",url:"http://muchong.com/bbs/search.php?wd="}],[{id:"0",name:"公众号",text:"",url:"https://weixin.sogou.com/weixin?type=2&query="},{id:"1",name:"微博",text:"",url:"https://s.weibo.com/weibo/"},{id:"2",name:"知乎",text:"",url:"https://www.zhihu.com/search?type=content&q="},{id:"3",name:"Github",text:"全球最大男性社交平台",url:"https://github.com/search?q="}],[{id:"0",name:"京东",text:"",url:"https://search.jd.com/Search?keyword="},{id:"1",name:"淘宝",text:"",url:"https://s.taobao.com/search?q="}],[{id:"0",name:"地图",text:"",url:"https://ditu.amap.com/search?query="},{id:"1",name:"查快递",text:"请直接输入单号",url:"https://m.kuaidi100.com/result.jsp?nu="},{id:"2",name:"学做菜",text:"输入菜名",url:"http://www.xiachufang.com/search/?keyword="},{id:"3",name:"翻译",text:"",url:"https://cn.bing.com/dict/search?q="},{id:"4",name:"网络流行语",text:"爷爷再也不用担心听不懂",url:"https://jikipedia.com/search?phrase="}]]}},methods:{selectClass:function(t){this.selected="0",this.engines=this.x[t]},Sou:function(t){window.open(t,"target")}}},u=l,d=(n("649c"),n("2877")),m=Object(d["a"])(u,r,c,!1,null,null,null),p=m.exports,f=n("ec36"),h={name:"ShowSite",props:["userName"],data:function(){return{baseImg:"url(../assets/bg.jpg)",bg:"https://www.baidu.com/img/baidu_resultlogo@2.png",note:{backgroundImage:"url("+n("86d5")+") ",backgroundPosition:"center center",backgroundRepeat:"no-repeat",backgroundSize:"cover"},userid:"",username:"",sitename:"",siteinfo:"",Folders:[],yuanxuan:[{icon:"",name:"炫猿经典版",url:"https://oo1.win",info:"还记得那个老版的炫猿吗"},{icon:"windows",name:"大白软件站",url:"https://win.o--o.win",info:"重装系统后的第一站"},{icon:"apple",name:"大白软件站",url:"https://o--o.win",info:"新Mac的第一站"}]}},methods:{getWeather:function(){(function(t,e,n,a,i,s,o,r){r=function(){s=e.createElement(n),o=e.getElementsByTagName(n)[0],s.src=i,s.charset="utf-8",s.async=1,o.parentNode.insertBefore(s,o)},t["SeniverseWeatherWidgetObject"]=a,t[a]||(t[a]=function(){(t[a].q=t[a].q||[]).push(arguments)}),t[a].l=+new Date,t.attachEvent?t.attachEvent("onload",r):t.addEventListener("load",r,!1)})(window,document,"script","SeniverseWeatherWidget","//cdn.sencdn.com/widget2/static/js/bundle.js?t="+parseInt(((new Date).getTime()/1e8).toString(),10)),window.SeniverseWeatherWidget("show",{flavor:"bubble",location:"WX4FBXXFKE4F",geolocation:!0,language:"zh-Hans",unit:"c",theme:"auto",token:"8910fc0f-7319-4498-a8c4-64caf9a9f4c9",hover:"enabled",container:"tp-weather-widget"})},load:function(t){var e=this;s["a"](t).then((function(t){t.code>0?e.$alert("","走迷路了",{confirmButtonText:"回主页",callback:function(){window.location.href="https://xydh.fun"}}):(e.userid=t.data.id,e.getSite(e.userid),e.getAll(e.userid))}))},getSite:function(t){var e=this;o["b"](t).then((function(t){t.code>0?e.$alert("","走迷路了",{confirmButtonText:"回主页",callback:function(){e.$router.push({name:"Home"}).catch((function(){}))}}):(e.sitename=t.data.name,e.siteinfo=t.data.info,document.title=e.sitename)}))},getAll:function(t){var e=this;o["a"](t).then((function(t){t.code>0?e.$alert("","走迷路了",{confirmButtonText:"回主页",callback:function(){e.$router.push({name:"Home"}).catch((function(){}))}}):e.Folders=t.data}))},go:function(t){window.open(t,"_blank")}},components:{SearchTool:p,Paomadeng:f["a"]},beforeMount:function(){this.username=this.$route.params.username,this.username||(this.username="admin"),this.username&&this.load(this.username),this.getWeather()}},w=h,b=(n("fd56"),Object(d["a"])(w,a,i,!1,null,null,null));e["default"]=b.exports},"25f0":function(t,e,n){"use strict";var a=n("6eeb"),i=n("825a"),s=n("d039"),o=n("ad6d"),r="toString",c=RegExp.prototype,l=c[r],u=s((function(){return"/a/b"!=l.call({source:"a",flags:"b"})})),d=l.name!=r;(u||d)&&a(RegExp.prototype,r,(function(){var t=i(this),e=String(t.source),n=t.flags,a=String(void 0===n&&t instanceof RegExp&&!("flags"in c)?o.call(t):n);return"/"+e+"/"+a}),{unsafe:!0})},3947:function(t,e,n){},"649c":function(t,e,n){"use strict";var a=n("b224"),i=n.n(a);i.a},"86d5":function(t,e,n){t.exports=n.p+"img/bg.1d5166f9.jpg"},ad6d:function(t,e,n){"use strict";var a=n("825a");t.exports=function(){var t=a(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},b0c0:function(t,e,n){var a=n("83ab"),i=n("9bf2").f,s=Function.prototype,o=s.toString,r=/^\s*function ([^ (]*)/,c="name";!a||c in s||i(s,c,{configurable:!0,get:function(){try{return o.call(this).match(r)[1]}catch(t){return""}}})},b224:function(t,e,n){},ec36:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"paomadeng"},[n("el-carousel",{attrs:{interval:6e3,"indicator-position":"none",height:"100px",arrow:"always"}},t._l(t.data,(function(e){return n("el-carousel-item",{key:e.name},[n("a",{attrs:{href:e.url,target:"_blank"}},[t._v(t._s(e.name))])])})),1)],1)},i=[],s={data:function(){return{data:[{name:"炫猿导航 王者归来",url:""},{name:"虚位以待",url:""}]}}},o=s,r=(n("08b9"),n("2877")),c=Object(r["a"])(o,a,i,!1,null,"9d11b80a",null);e["a"]=c.exports},fd56:function(t,e,n){"use strict";var a=n("1409"),i=n.n(a);i.a}}]);
//# sourceMappingURL=chunk-497f8bf6.153e32dd.js.map