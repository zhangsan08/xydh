import Vue from 'vue';
import App from './App.vue';
import router from './router';
import {Message} from 'element-ui';
import APlayer from '@moefe/vue-aplayer';
Vue.config.productionTip = false;
Vue.prototype.$message = Message;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
Vue.use(APlayer, {
    defaultCover: 'https://pic.rmb.bdstatic.com/e92e4d8c9226db1c2194eb043128b945.jpeg',
    productionTip: true,
});
// //main.js里面的代码
// router.beforeEach((to) => {
//   /* 路由发生变化修改页面meta */
//   if(to.meta.content){
//     let head = document.getElementsByTagName('head');
//     let meta = document.createElement('meta');
//     meta.content = to.meta.content;
//     head[0].appendChild(meta)
//   }
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = to.meta.title;
//   }
// })
